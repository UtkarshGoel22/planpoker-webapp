import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import LoadingButton from "@mui/lab/LoadingButton"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import { Form, Formik } from "formik"

import { FIELDS } from "@constants/fields.const"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { SIGNIN_SCHEMA } from "@pages/Signin/constants"
import { SigninFormProps } from "@pages/Signin/types"

function SigninForm({
  initialValues,
  errors: loginErrors,
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

          if (loginErrors) {
            setErrors(loginErrors)
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
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <div className="container">
                    <h4>{loginErrors?.api}</h4>
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
