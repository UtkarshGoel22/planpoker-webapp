import { useNavigate } from "react-router-dom"

import { LockOutlined } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Typography,
  useTheme,
} from "@mui/material"

import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import SignupForm from "@pages/Signup/SignupForm"
import { SignupFormValues } from "@pages/Signup/types"
import CustomModal from "@src/components/CustomModal"
import { authActions } from "@src/state/redux/authSlice"
import { useAppDispatch, useAppSelector } from "@src/state/redux/hooks"

function Signup() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const auth = useAppSelector(state => state.auth)

  const initialValues: SignupFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  function handleOnClick() {
    dispatch(authActions.reset())
    navigate(ROUTES.signin)
  }

  function handleSubmit(values: SignupFormValues) {
    dispatch(authActions.signupUser(values))
  }

  return (
    <>
      {auth.registration?.success ? (
        <CustomModal
          open={true}
          message={auth.registration.message}
          handleOnClick={handleOnClick}
          buttonText={TEXT.signin}
          showButton={true}
        />
      ) : (
        ""
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {TEXT.signup}
          </Typography>
          <SignupForm
            errors={auth.errors}
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            loading={auth.loading}
          />
        </Box>
      </Container>
    </>
  )
}

export default Signup
