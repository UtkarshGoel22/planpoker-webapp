import { useEffect, useState } from "react"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import BackDropLoader from "@components/BackDropLoader"
import CustomSnackbar from "@components/CustomSnackbar"
import PokerboardDetails from "@components/PokerboardDetails"
import { TEXT } from "@constants/text.const"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { pokerboardActions } from "@state/redux/pokerboardSlice"

function Dashboard() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { listPokerboards, loading } = useAppSelector(state => state.pokerboard)
  const [showSnackbar, setShowSnackbar] = useState(true)
  const theme = useTheme()

  function handleClose() {
    setShowSnackbar(false)
  }

  useEffect(() => {
    dispatch(pokerboardActions.listPokerboards(token))
  }, [])

  return (
    <>
      <BackDropLoader open={loading} />
      <Typography align="center" component="h1" variant="h4">
        {TEXT.Pokerboards}
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: theme.spacing(1) }}
      >
        {listPokerboards.data?.map(pokerboard => (
          <PokerboardDetails key={pokerboard.id} data={pokerboard} />
        ))}
        {showSnackbar && listPokerboards.success && (
          <CustomSnackbar
            open={listPokerboards.success}
            message={listPokerboards.message}
            severity="success"
            handleClose={handleClose}
          />
        )}
        {showSnackbar && listPokerboards.success === false && (
          <CustomSnackbar
            open={listPokerboards.success === false}
            message={listPokerboards.message}
            severity="error"
            handleClose={handleClose}
          />
        )}
      </Grid>
    </>
  )
}

export default Dashboard
