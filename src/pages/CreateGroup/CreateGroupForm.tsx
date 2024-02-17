import { Field, Form, Formik } from "formik"

import AddIcon from "@mui/icons-material/Add"
import LoadingButton from "@mui/lab/LoadingButton"
import { useTheme } from "@mui/material/styles"
import TextField from "@mui/material/TextField"

import SearchUser from "@components/SearchUser"
import { FIELDS } from "@constants/fields.const"
import { TEXT } from "@constants/text.const"
import { CREATE_GROUP_SCHEMA } from "@pages/CreateGroup/constants"
import { CreateGroupFormProps } from "@pages/CreateGroup/types"

function CreateGroupForm({
  initialValues,
  errors: createGroupErrors,
  loading,
  handleSubmit,
}: CreateGroupFormProps) {
  const theme = useTheme()

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={CREATE_GROUP_SCHEMA}
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

          if (createGroupErrors) {
            setErrors(createGroupErrors)
          }

          return (
            <Form noValidate style={{ paddingLeft: theme.spacing(2.8) }}>
              <TextField
                autoFocus
                error={Boolean(errors.groupName)}
                fullWidth
                helperText={errors.groupName}
                id={FIELDS.groupName.name}
                label={FIELDS.groupName.label}
                margin="normal"
                name={FIELDS.groupName.name}
                onBlur={handleBlur}
                onChange={e => {
                  e.target.value = e.target.value ? e.target.value.trim() : ""
                  handleChange(e)
                  touched.groupName
                    ? setFieldError(FIELDS.groupName.name, "")
                    : ""
                }}
                required
                value={values.groupName}
                variant="outlined"
              />
              <Field name={FIELDS.members.name}>
                {({ form }: any) => (
                  <SearchUser
                    error={
                      typeof errors?.members == "string"
                        ? errors.members
                        : undefined
                    }
                    form={form}
                    handleUnregisteredUsers={false}
                  />
                )}
              </Field>
              <LoadingButton
                color="primary"
                fullWidth
                loading={loading}
                startIcon={<AddIcon />}
                type="submit"
                variant="contained"
                sx={{ m: theme.spacing(2, 0) }}
              >
                {TEXT.createGroup}
              </LoadingButton>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default CreateGroupForm
