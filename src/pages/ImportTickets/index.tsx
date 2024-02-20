import { useTheme } from "@mui/material/styles"
import Alert from "@mui/material/Alert"
import Grid from "@mui/material/Grid"

import BackDropLoader from "@components/BackDropLoader"
import CustomSnackbar from "@components/CustomSnackbar"
import JiraTicket from "@components/JiraTicket"
import { TEXT } from "@constants/text.const"
import ImportTicketsForm from "@pages/ImportTickets/ImportTicketsForm"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { ticketActions } from "@src/state/redux/ticketSlice"

function ImportTickets() {
  const dispatch = useAppDispatch()
  const { loading, addTicketstoPokerboard, importTickets } = useAppSelector(
    state => state.ticket,
  )
  const { userData } = useAppSelector(state => state.user)
  const { data: pokerboardData } = useAppSelector(
    state => state.pokerboard.fetchPokerboard,
  )
  const theme = useTheme()

  return (
    <>
      {userData && pokerboardData && pokerboardData.manager === userData.id ? (
        <>
          <BackDropLoader open={loading} />
          <ImportTicketsForm
            loading={loading}
            pokerboardId={pokerboardData.id}
          />
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ mt: theme.spacing(1) }}
          >
            <>
              {importTickets.options?.map(option => {
                return <JiraTicket key={option.id} data={option} />
              })}
              {addTicketstoPokerboard.success && (
                <CustomSnackbar
                  open={addTicketstoPokerboard.success}
                  message={addTicketstoPokerboard.message}
                  severity="success"
                  handleClose={() =>
                    dispatch(ticketActions.resetAddTicketsToPokerboardSuccess())
                  }
                />
              )}
              {importTickets.success === false && (
                <CustomSnackbar
                  open={importTickets.success === false}
                  message={importTickets.message}
                  severity="error"
                  handleClose={() =>
                    dispatch(ticketActions.resetImportTicketsSuccess())
                  }
                />
              )}
              {addTicketstoPokerboard.success === false && (
                <CustomSnackbar
                  open={addTicketstoPokerboard.success === false}
                  message={addTicketstoPokerboard.message}
                  severity="error"
                  handleClose={() =>
                    dispatch(ticketActions.resetAddTicketsToPokerboardSuccess())
                  }
                />
              )}
            </>
          </Grid>
        </>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Alert severity="error">{TEXT.accessDenied}</Alert>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ImportTickets
