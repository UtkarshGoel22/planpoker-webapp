import SaveIcon from "@mui/icons-material/Save"
import { useTheme } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import Fab from "@mui/material/Fab"
import TextField from "@mui/material/TextField"
import { Form, Formik } from "formik"

import { FIELDS } from "@constants/fields.const"
import { UPDATE_USER_SCHEMA } from "@pages/MyProfile/constants"
import { EditProfileFormProps } from "@pages/MyProfile/types"

function EditProfileForm({
  initialValues,
  errors: updateUserErrors,
  loading,
  handleSubmit,
}: EditProfileFormProps) {
  const theme = useTheme()

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={UPDATE_USER_SCHEMA}
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

          if (updateUserErrors) {
            setErrors(updateUserErrors)
          }

          return (
            <Form noValidate style={{ paddingLeft: theme.spacing(2.8) }}>
              <TextField
                autoFocus
                error={Boolean(errors.firstName)}
                fullWidth
                helperText={errors.firstName}
                id={FIELDS.firstName.name}
                label={FIELDS.firstName.label}
                margin="normal"
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
              <TextField
                error={Boolean(errors.lastName)}
                fullWidth
                helperText={errors.lastName}
                id={FIELDS.lastName.name}
                label={FIELDS.lastName.label}
                margin="normal"
                name={FIELDS.lastName.name}
                onBlur={handleBlur}
                onChange={e => {
                  handleChange(e)
                  touched.lastName
                    ? setFieldError(FIELDS.lastName.name, "")
                    : ""
                }}
                required
                value={values.lastName}
                variant="outlined"
              />
              <TextField
                error={Boolean(errors.username)}
                fullWidth
                helperText={errors.username}
                id={FIELDS.username.name}
                label={FIELDS.username.label}
                margin="normal"
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
              <Fab
                aria-label="save"
                color="primary"
                disabled={loading}
                type="submit"
                sx={{
                  position: "absolute",
                  bottom: theme.spacing(2),
                  right: theme.spacing(2),
                }}
              >
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -9,
                      marginLeft: -12,
                    }}
                  />
                )}
                <SaveIcon />
              </Fab>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default EditProfileForm
