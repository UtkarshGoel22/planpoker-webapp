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
import { TEXT } from "@constants/text.const"
import { ROUTES } from "@constants/routes.const"
import { SIGNIN_SCHEMA } from "@pages/Signin/constants"
import { SigninFormProps } from "@pages/Signin/types"

function SigninForm({
  initialValues,
  errors: authErrors,
  loading,
  handleSubmit,
}: SigninFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={SIGNIN_SCHEMA}
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
                  {TEXT.signin}
                </LoadingButton>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to={ROUTES.signup}
                      variant="body2"
                    >
                      {TEXT.doNotHaveAnAccount}
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

export default SigninForm
