import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Container, TextField } from '@material-ui/core';
import { backdropStyles, signinStyles } from '../styles/style';
import { ROUTE } from '../constants/route';
import { ERROR } from '../constants/error';
import { resendEmail, verifyEmail } from '../services/auth.services';
import { CONSTANT, LABEL } from '../constants/constant';
import { REGEX_FOR_EMAIL, TEXT } from '../constants/finalConstant';
import CustomModal from './CustomModal';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Verify() {
  const query = useQuery();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');
  const token = query.get(CONSTANT.token);
  const history = useHistory();

  function verifyEmailCallback(success: boolean, error: any) {
    setLoading(false);
    if (success) {
      setError('');
      setAlert(CONSTANT.emailVerified);
    } else {
      setError(
        error.verify || error.reVerify || error.api || error.alreadyVerified
          ? error.verify || error.reVerify || error.api || error.alreadyVerified
          : ''
      );
    }
  }

  useEffect(() => {
    if (token) {
      verifyEmail(token, verifyEmailCallback);
    } else {
      setLoading(false);
      history.push(ROUTE.notFound);
    }
  }, []);

  function handleClick() {
    setAlert('');
    history.replace(ROUTE.signin);
  }

  // validate form function

  function validateForm() {
    if (!REGEX_FOR_EMAIL.test(email)) {
      setEmailError(ERROR.invalidEmail);
      return false;
    }
    return true;
  }

  // handle submit function

  function handleSubmit(e: any) {
    e.preventDefault();
    if (validateForm()) {
      resendEmail(email, verifyEmailCallback);
    }
  }

  const classes = signinStyles();
  const backdropClasses = backdropStyles();

  return (
    <div>
      {alert.length > 0 ? (
        <CustomModal
          open={true}
          handleOnClick={handleClick}
          message={alert}
          buttonText={CONSTANT.signIn}
        />
      ) : (
        ''
      )}
      {loading ? (
        <Backdrop className={backdropClasses.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : error.length > 0 ? (
        error == ERROR.invalidToken ? (
          <div className="container">
            <h3>{error}</h3>
          </div>
        ) : (
          <Container component="main" maxWidth="xs">
            <div className="container">
              <h3>{error}</h3>
            </div>
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  label={LABEL.email}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {TEXT.resendEmail}
                </Button>
              </form>
            </div>
          </Container>
        )
      ) : (
        ''
      )}
    </div>
  );
}

export default Verify;
