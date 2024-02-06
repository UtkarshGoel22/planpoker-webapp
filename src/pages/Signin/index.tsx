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
import SigninForm from "@pages/Signin/SigninForm"
import { SigninFormValues } from "@pages/Signin/types"
import { authActions } from "@src/state/redux/authSlice"
import { useAppDispatch, useAppSelector } from "@src/state/redux/hooks"

function Signin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const auth = useAppSelector(state => state.auth)

  const initialValues: SigninFormValues = {
    email: "",
    password: "",
  }

  function handleSubmit(values: SigninFormValues) {
    dispatch(authActions.signinUser(values))
  }

  if (auth.token && auth.userData) {
    navigate(ROUTES.dashboard)
  }

  return (
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
          {TEXT.signin}
        </Typography>
        <SigninForm
          errors={auth.errors}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          loading={auth.loading}
        />
      </Box>
    </Container>
  )
}

export default Signin