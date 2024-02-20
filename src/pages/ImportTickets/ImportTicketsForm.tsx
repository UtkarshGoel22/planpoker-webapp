import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import SaveSharpIcon from "@mui/icons-material/SaveSharp"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { Form, Formik } from "formik"

import Pagination from "@components/Pagination"
import { API } from "@constants/api.const"
import { FIELDS } from "@constants/fields.const"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { ImportBy } from "@enums/ticket.enum"
import { IMPORT_TICKETS_SCHEMA } from "@pages/ImportTickets/constants"
import {
  ImportTicketsFormProps,
  ImportTicketsFormValues,
} from "@pages/ImportTickets/types"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { ticketActions } from "@state/redux/ticketSlice"

function ImportTicketsForm({ loading, pokerboardId }: ImportTicketsFormProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { importTickets } = useAppSelector(state => state.ticket)
  const [pageNumber, setPageNumber] = useState(0)
  const theme = useTheme()

  const initialValues: ImportTicketsFormValues = {
    ticketsInput: "",
    importBy: ImportBy.ID,
  }

  function handleSave() {
    dispatch(
      ticketActions.addTicketsToPokerboard({
        tickets: importTickets.selectedOptions,
        pokerboardId,
        token,
      }),
    )
  }

  function handleSubmit(values: ImportTicketsFormValues) {
    dispatch(ticketActions.importTickets({ queryParams: values, token }))
  }

  function handlePrev(values: ImportTicketsFormValues) {
    dispatch(
      ticketActions.importTickets({
        queryParams: values,
        startAt: (pageNumber - 1) * API.paginationLimit - API.paginationLimit,
        token,
      }),
    )
    setPageNumber(pageNumber - 1)
  }

  function handleNext(values: ImportTicketsFormValues) {
    dispatch(
      ticketActions.importTickets({
        queryParams: values,
        startAt: pageNumber * API.paginationLimit,
        token,
      }),
    )
    setPageNumber(pageNumber + 1)
  }

  useEffect(() => {
    setPageNumber(
      importTickets.pagination.total === 0
        ? 0
        : Math.floor(
            importTickets.pagination.startAt /
              importTickets.pagination.maxResults,
          ) + 1,
    )
  }, [importTickets.pagination])

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={IMPORT_TICKETS_SCHEMA}
      >
        {props => {
          const {
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldError,
          } = props

          return (
            <Form noValidate>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ mt: theme.spacing(1) }}
              >
                <Grid item xs={12} sm={9}>
                  <TextField
                    error={Boolean(errors.ticketsInput)}
                    fullWidth
                    helperText={errors.ticketsInput}
                    id={FIELDS.ticketsInput.name}
                    label={FIELDS.ticketsInput.label}
                    name={FIELDS.ticketsInput.name}
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e)
                      touched.ticketsInput
                        ? setFieldError(FIELDS.ticketsInput.name, "")
                        : ""
                    }}
                    required
                    value={values.ticketsInput}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel id={FIELDS.importBy.name}>
                      {FIELDS.importBy.name}
                    </InputLabel>
                    <Select
                      error={Boolean(errors.importBy)}
                      id={FIELDS.importBy.name}
                      name={FIELDS.importBy.name}
                      label={FIELDS.importBy.label}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        touched.importBy
                          ? setFieldError(FIELDS.importBy.name, "")
                          : ""
                      }}
                      value={values.importBy}
                    >
                      <MenuItem value={ImportBy.ID}>{ImportBy.ID}</MenuItem>
                      <MenuItem value={ImportBy.JQL}>{ImportBy.JQL}</MenuItem>
                      <MenuItem value={ImportBy.SPRINT}>
                        {ImportBy.SPRINT}
                      </MenuItem>
                    </Select>
                    <FormHelperText error>{errors.importBy}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Button
                    color="primary"
                    disabled={loading}
                    fullWidth
                    startIcon={<ArrowDownwardSharpIcon />}
                    type="submit"
                    variant="contained"
                  >
                    {TEXT.import}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Button
                    color="primary"
                    disabled={
                      loading || importTickets.selectedOptions.length === 0
                    }
                    fullWidth
                    onClick={handleSave}
                    startIcon={<SaveSharpIcon />}
                    type="button"
                    variant="contained"
                  >
                    {TEXT.save}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Button
                    color="primary"
                    disabled={loading}
                    fullWidth
                    onClick={() =>
                      navigate(`${ROUTES.pokerboard}/${pokerboardId}`)
                    }
                    startIcon={<ArrowForwardIosSharpIcon />}
                    type="button"
                    variant="contained"
                  >
                    {TEXT.goToPokerboard}
                  </Button>
                </Grid>
              </Grid>
              <Pagination
                data={importTickets.pagination}
                loading={loading}
                handleNext={handleNext}
                handlePrev={handlePrev}
                queryParams={values}
              />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default ImportTicketsForm
