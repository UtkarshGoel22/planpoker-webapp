import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import BackDropLoader from "@components/BackDropLoader"
import CustomModal from "@components/CustomModal"
import CustomSnackbar from "@components/CustomSnackbar"
import PokerboardDetails from "@components/PokerboardDetails"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { pokerboardActions } from "@state/redux/pokerboardSlice"

function Dashboard() {
  const navigate = useNavigate()
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
      {listPokerboards.data?.length == 0 ? (
        <CustomModal
          open={listPokerboards.data?.length == 0}
          message={TEXT.pleaseCreateAPokerboard}
          handleOnClick={() => navigate(ROUTES.createPokerboard)}
          buttonText={TEXT.goToCreatePokerboard}
          showButton={true}
        />
      ) : (
        <>
          <Typography align="center" component="h1" variant="h4">
            {TEXT.pokerboards}
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
      )}
    </>
  )
}

export default Dashboard
