import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  useTheme,
} from "@mui/material"
import { Form, Formik } from "formik"

import { FIELDS } from "@constants/fields.const"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { SIGNUP_SCHEMA } from "@pages/Signup/constants"
import { SignupFormProps } from "@pages/Signup/types"

function SignupForm({
  initialValues,
  errors: authErrors,
  loading,
  handleSubmit,
}: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={SIGNUP_SCHEMA}
      >
        {props => {
          const {
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setErrors,
            setFieldError,
          } = props

          if (authErrors) {
            setErrors(authErrors)
          }

          return (
            <Form noValidate>
              <Box sx={{ mt: theme.spacing(3) }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      error={touched.firstName && Boolean(errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      id={FIELDS.firstName.name}
                      label={FIELDS.firstName.label}
                      name={FIELDS.firstName.name}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.firstName
                          ? setFieldError(FIELDS.firstName.name, "")
                          : ""
                      }}
                      required
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(errors.lastName)}
                      fullWidth
                      helperText={errors.lastName}
                      id={FIELDS.lastName.name}
                      label={FIELDS.lastName.label}
                      name={FIELDS.lastName.name}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.lastName
                          ? setFieldError(FIELDS.lastName.name, "")
                          : ""
                      }}
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(errors.username)}
                      fullWidth
                      helperText={errors.username}
                      id={FIELDS.username.name}
                      label={FIELDS.username.label}
                      name={FIELDS.username.name}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.username
                          ? setFieldError(FIELDS.username.name, "")
                          : ""
                      }}
                      required
                      value={values.username}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(errors.email)}
                      fullWidth
                      helperText={errors.email}
                      id={FIELDS.email.name}
                      label={FIELDS.email.label}
                      name={FIELDS.email.name}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.email
                          ? setFieldError(FIELDS.email.name, "")
                          : ""
                      }}
                      required
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(errors.password)}
                      fullWidth
                      helperText={errors.password}
                      id={FIELDS.password.name}
                      label={FIELDS.password.label}
                      name={FIELDS.password.name}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.password
                          ? setFieldError(FIELDS.password.name, "")
                          : ""
                      }}
                      required
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(errors.confirmPassword)}
                      fullWidth
                      helperText={errors.confirmPassword}
                      id={FIELDS.confirmPassword.name}
                      label={FIELDS.confirmPassword.label}
                      name={FIELDS.confirmPassword.name}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.confirmPassword
                          ? setFieldError(FIELDS.confirmPassword.name, "")
                          : ""
                      }}
                      required
                      type={showPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <div className="container">
                    <h4>{authErrors?.api}</h4>
                  </div>
                </Grid>
                <LoadingButton
                  color="primary"
                  fullWidth
                  loading={loading}
                  type="submit"
                  variant="contained"
                  sx={{ m: theme.spacing(2, 0) }}
                >
                  {TEXT.signup}
                </LoadingButton>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to={ROUTES.signin}
                      variant="body2"
                    >
                      {TEXT.alreadyHaveAnAccout}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default SignupForm
