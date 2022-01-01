import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loaderStyles, signupStyles } from '../styles/style';
import { signupUser } from '../redux/actions/authActions';
import { ROUTE } from '../constants/route';
import { CONSTANT, LABEL } from '../constants/constant';
import { validateForm } from '../utils/auth.util';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import CustomModal from './CustomModal';

export type authInput = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  api?: string;
};

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<authInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick() {
    setAlert('');
    history.replace(ROUTE.signin);
  }

  function signUpCallback(success: boolean, error: any) {
    setLoading(false);
    if (success) {
      setAlert(CONSTANT.emailVerificationLinkSent);
    } else {
      setErrors({
        username: error.username ? error.username : '',
        email:
          error.email || error.duplicateEntry
            ? error.email || error.duplicateEntry
            : '',
        password: '',
        api: error.api ? error.api : '',
      });
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const validateFormResult = validateForm({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    });
    setErrors(validateFormResult.temp);
    if (validateFormResult.noError) {
      dispatch(
        signupUser(
          {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
          },
          signUpCallback
        )
      );
    } else {
      setLoading(false);
    }
  }

  const classes = signupStyles();
  const loaderClasses = loaderStyles();

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {CONSTANT.signUp}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label={LABEL.firstName}
                  autoFocus
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  error={Boolean(errors?.firstName)}
                  helperText={errors?.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label={LABEL.lastName}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  error={Boolean(errors?.lastName)}
                  helperText={errors?.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label={LABEL.username}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  error={Boolean(errors?.username)}
                  helperText={errors?.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label={LABEL.email}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={Boolean(errors?.email)}
                  helperText={errors?.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label={LABEL.password}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={Boolean(errors?.password)}
                  helperText={errors?.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label={LABEL.confirmPassword}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  error={Boolean(errors?.confirmPassword)}
                  helperText={errors?.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <div className="container">
                <h3>{errors?.api}</h3>
              </div>
            </Grid>
            <div className={loaderClasses.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                {CONSTANT.signUp}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={loaderClasses.buttonProgress}
                />
              )}
            </div>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to={ROUTE.signin} variant="body2">
                  {CONSTANT.alreadyHaveAnAccountSignin}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
