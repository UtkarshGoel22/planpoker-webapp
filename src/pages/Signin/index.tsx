import { useNavigate } from "react-router-dom"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useTheme } from "@mui/material/styles"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"

import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import SigninForm from "@pages/Signin/SigninForm"
import { SigninFormValues } from "@pages/Signin/types"
import { authActions } from "@state/redux/authSlice"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"

function Signin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const auth = useAppSelector(state => state.auth)
  const user = useAppSelector(state => state.user)

  const initialValues: SigninFormValues = {
    email: "",
    password: "",
  }

  function handleSubmit(values: SigninFormValues) {
    dispatch(authActions.signinUser(values))
  }

  if (auth.token && user.userData) {
    navigate(ROUTES.dashboard)
  }

  return (
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
          {TEXT.signin}
        </Typography>
        <SigninForm
          errors={auth.login.errors}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          loading={auth.loading}
        />
      </Box>
    </Container>
  )
}

export default Signin
