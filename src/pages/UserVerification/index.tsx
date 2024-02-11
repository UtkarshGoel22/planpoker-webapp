import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import { useTheme } from "@mui/material/styles"
import Alert from "@mui/material/Alert"
import Avatar from "@mui/material/Avatar"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"

import CustomModal from "@components/CustomModal"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { QUERY_PARAMS } from "@constants/query.const"
import useQuery from "@hooks/useQuery.hook"
import { UserVerificationFormValues } from "@pages/UserVerification/types"
import UserVerificationForm from "@pages/UserVerification/userVerificationForm"
import { authActions } from "@state/redux/authSlice"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"

function UserVerification() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const query = useQuery()
  const auth = useAppSelector(state => state.auth)

  const token = query.get(QUERY_PARAMS.token)
  const initialValues: UserVerificationFormValues = { email: "" }

  useEffect(() => {
    if (token) {
      dispatch(authActions.verifyEmail(token))
    } else {
      navigate(ROUTES.notFound)
    }
  }, [])

  function handleClick() {
    dispatch(authActions.reset())
    navigate(ROUTES.signin)
  }

  function handleSubmit(values: UserVerificationFormValues) {
    dispatch(authActions.reSendVerificationLink(values))
  }

  return (
    <div>
      {auth.userVerification?.success || auth.errors?.alreadyVerified ? (
        <CustomModal
          open={true}
          message={
            auth.userVerification?.message || auth.errors?.alreadyVerified || ""
          }
          handleOnClick={handleClick}
          buttonText={TEXT.signin}
          showButton={true}
        />
      ) : (
        ""
      )}

      {auth.loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={auth.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {auth.errors?.token ? (
            <Alert severity="error" sx={{ m: theme.spacing(5, 0) }}>
              {auth.errors?.token}
            </Alert>
          ) : (
            <Box
              sx={{
                marginTop: theme.spacing(5),
                marginBotton: theme.spacing(5),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: theme.spacing(1), bgcolor: "secondary.main" }}>
                <EmailOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" textAlign="center">
                {TEXT.sendEmailVerificationLink}
              </Typography>
              <UserVerificationForm
                errors={auth.errors}
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                loading={auth.loading}
              />
            </Box>
          )}
        </Container>
      )}
    </div>
  )
}

export default UserVerification
