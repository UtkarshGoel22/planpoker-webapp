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
import { loaderStyles, signinStyles } from '../styles/style';
import { ROUTE } from '../constants/route';
import { LABEL, TEXT } from '../constants/finalConstant';
import { authInput } from './Signup';
import { validateForm } from '../utils/auth.util';
import { signinUser } from '../redux/actions/authActions';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<authInput>();

  const dispatch = useDispatch();
  const history = useHistory();

  function signInCallback(success: boolean, error: any) {
    setLoading(false);
    if (success) {
      history.replace(ROUTE.dashboard);
    } else {
      setErrors({
        email: error.email ? error.email : '',
        password: error.password ? error.password : '',
        api: error.api ? error.api : '',
      });
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const validateFormResult = validateForm({
      email,
      password,
    });
    setErrors(validateFormResult.temp);
    if (validateFormResult.noError) {
      dispatch(
        signinUser(
          {
            email,
            password,
          },
          signInCallback
        )
      );
    } else {
      setLoading(false);
    }
  }

  const classes = signinStyles();
  const loaderclasses = loaderStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {TEXT.signIn}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            required
            margin="normal"
            fullWidth
            label={LABEL.email}
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={Boolean(errors?.email)}
            helperText={errors?.email}
          />
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
          <div className="container">
            <h3>{errors?.api}</h3>
          </div>
          <div className={loaderclasses.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              {TEXT.signIn}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={loaderclasses.buttonProgress}
              />
            )}
          </div>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to={ROUTE.signup} variant="body2">
                {TEXT.dontHaveAnAccountSignup}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Signin;
