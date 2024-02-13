import LoadingButton from "@mui/lab/LoadingButton"
import { useTheme } from "@mui/material/styles"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { Form, Formik } from "formik"

import { FIELDS } from "@constants/fields.const"
import { TEXT } from "@constants/text.const"
import { USER_VERIFICATION_SCHEMA } from "@pages/UserVerification/constants"
import { UserVerificationFormProps } from "@pages/UserVerification/types"

function UserVerificationForm({
  initialValues,
  errors: userVerificationErrors,
  loading,
  handleSubmit,
}: UserVerificationFormProps) {
  const theme = useTheme()

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={USER_VERIFICATION_SCHEMA}
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

          if (userVerificationErrors) {
            setErrors(userVerificationErrors)
          }

          return (
            <Form noValidate>
              <Box sx={{ mt: theme.spacing(3) }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Alert severity="info">
                      {TEXT.emailVerificationLinkValidity}
                    </Alert>
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
                  <div className="container">
                    <h4>
                      {userVerificationErrors?.verify ||
                        userVerificationErrors?.reVerify ||
                        userVerificationErrors?.api}
                    </h4>
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
                  {TEXT.reSendEmail}
                </LoadingButton>
              </Box>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default UserVerificationForm
