import { useNavigate } from "react-router-dom"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useTheme } from "@mui/material/styles"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"

import CustomModal from "@components/CustomModal"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import SignupForm from "@pages/Signup/SignupForm"
import { SignupFormValues } from "@pages/Signup/types"
import { authActions } from "@state/redux/authSlice"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"

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
      {auth.registration.success && (
        <CustomModal
          open={true}
          message={auth.registration.message || ""}
          handleOnClick={handleOnClick}
          buttonText={TEXT.signin}
          showButton={true}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: theme.spacing(1), bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {TEXT.signup}
          </Typography>
          <SignupForm
            errors={auth.registration.errors}
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
