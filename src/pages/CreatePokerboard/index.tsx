import { useTheme } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import CustomSnackbar from "@components/CustomSnackbar"
import { TEXT } from "@constants/text.const"
import { CreatePokerboardFormValues } from "@pages/CreatePokerboard/types"
import CreatePokerboardForm from "@pages/CreatePokerboard/CreatePokerboardForm"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { pokerboardActions } from "@state/redux/pokerboardSlice"

function CreatePokerboard() {
  const { token } = useAppSelector(state => state.auth)
  const pokerboard = useAppSelector(state => state.pokerboard)
  const { userData } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const initialValues: CreatePokerboardFormValues = {
    boardName: "",
    deckType: "",
    members: [],
    groups: [],
  }

  function handleClose() {
    dispatch(pokerboardActions.resetCreatePokerboardState())
  }

  function handleSubmit(values: CreatePokerboardFormValues) {
    if (userData) {
      const requestData = {
        ...values,
        manager: userData.id,
        members: values.members.map(member => ({
          id: member.id,
          email: member.email,
        })),
        groups: values.groups.map(group => group.id),
      }
      dispatch(pokerboardActions.createPokerboard({ requestData, token }))
    }
  }

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        {TEXT.createPokerboard}
      </Typography>
      <Grid container spacing={2} sx={{ mt: theme.spacing(1) }}>
        <Grid item xs={12} md={6} margin="auto">
          <Card>
            <CardContent>
              <Grid spacing={3} container direction="column">
                <CreatePokerboardForm
                  initialValues={initialValues}
                  handleSubmit={handleSubmit}
                  loading={pokerboard.loading}
                  errors={pokerboard.createPokerboard.errors}
                />
              </Grid>
              {pokerboard.createPokerboard.success && (
                <CustomSnackbar
                  open={pokerboard.createPokerboard.success}
                  message={pokerboard.createPokerboard.message}
                  severity="success"
                  handleClose={handleClose}
                />
              )}
              {pokerboard.createPokerboard.success === false && (
                <CustomSnackbar
                  open={pokerboard.createPokerboard.success === false}
                  message={pokerboard.createPokerboard.message}
                  severity="error"
                  handleClose={handleClose}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CreatePokerboard
