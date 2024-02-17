import { Field, Form, Formik } from "formik"

import AddIcon from "@mui/icons-material/Add"
import LoadingButton from "@mui/lab/LoadingButton"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"

import SearchGroup from "@components/SearchGroup"
import SearchUser from "@components/SearchUser"
import { FIELDS } from "@constants/fields.const"
import { TEXT } from "@constants/text.const"
import { CREATE_POKERBOARD_SCHEMA } from "@pages/CreatePokerboard/constants"
import { CreatePokerboardFormProps } from "@pages/CreatePokerboard/types"

function CreatePokerboardForm({
  initialValues,
  errors: createPokerboardErrors,
  loading,
  handleSubmit,
}: CreatePokerboardFormProps) {
  const theme = useTheme()

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={CREATE_POKERBOARD_SCHEMA}
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

          if (createPokerboardErrors) {
            setErrors(createPokerboardErrors)
          }

          return (
            <Form noValidate style={{ paddingLeft: theme.spacing(2.8) }}>
              <TextField
                autoFocus
                error={Boolean(errors.boardName)}
                fullWidth
                helperText={errors.boardName}
                id={FIELDS.boardName.name}
                label={FIELDS.boardName.label}
                margin="normal"
                name={FIELDS.boardName.name}
                onBlur={handleBlur}
                onChange={e => {
                  e.target.value = e.target.value ? e.target.value.trim() : ""
                  handleChange(e)
                  touched.boardName
                    ? setFieldError(FIELDS.boardName.name, "")
                    : ""
                }}
                required
                value={values.boardName}
                variant="outlined"
              />
              <FormControl
                fullWidth
                required
                sx={{ marginBottom: theme.spacing(1) }}
                variant="outlined"
              >
                <InputLabel id={FIELDS.deckType.name}>
                  {TEXT.deckType}
                </InputLabel>
                <Select
                  error={Boolean(errors.deckType)}
                  id={FIELDS.deckType.name}
                  name={FIELDS.deckType.name}
                  label={FIELDS.deckType.label}
                  onBlur={handleBlur}
                  onChange={e => {
                    handleChange(e)
                    touched.deckType
                      ? setFieldError(FIELDS.deckType.name, "")
                      : ""
                  }}
                  value={values.deckType}
                >
                  <MenuItem value={TEXT.serial}>{TEXT.serial}</MenuItem>
                  <MenuItem value={TEXT.even}>{TEXT.even}</MenuItem>
                  <MenuItem value={TEXT.odd}>{TEXT.odd}</MenuItem>
                  <MenuItem value={TEXT.fibonacci}>{TEXT.fibonacci}</MenuItem>
                </Select>
                <FormHelperText error>{errors.deckType}</FormHelperText>
              </FormControl>
              <Box component="div" sx={{ marginBottom: theme.spacing(1) }}>
                <Field name={FIELDS.members.name}>
                  {({ form }: any) => (
                    <SearchUser
                      error={
                        typeof errors?.members == "string"
                          ? errors.members
                          : undefined
                      }
                      form={form}
                      handleUnregisteredUsers={true}
                    />
                  )}
                </Field>
              </Box>
              <Field name={FIELDS.groups.name}>
                {({ form }: any) => (
                  <SearchGroup
                    form={form}
                    error={
                      typeof errors?.groups == "string"
                        ? errors.groups
                        : undefined
                    }
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
                {TEXT.createPokerboard}
              </LoadingButton>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default CreatePokerboardForm
