import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom"

import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"

import "@src/App.css"
import Navbar from "@components/Navbar"
import NotFound from "@components/NotFound"
import OpenRoute from "@components/OpenRoute"
import PrivateRoute from "@components/PrivateRoute"
import { ROUTES } from "@constants/routes.const"
import MyProfile from "@pages/MyProfile/index"
import Signup from "@pages/Signup/index"
import Signin from "@pages/Signin/index"
import UserVerification from "@pages/UserVerification/index"

function NavLayout() {
  const theme = useTheme()

  return (
    <Box component="div" sx={{ display: "flex", flexGrow: 1 }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: theme.spacing(3) }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            p: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<NavLayout />}>
          <Route index element={<OpenRoute component={<Signin />} />} />
          <Route
            path={ROUTES.signin}
            element={<OpenRoute component={<Signin />} />}
          />
          <Route
            path={ROUTES.signup}
            element={<OpenRoute component={<Signup />} />}
          />
          <Route
            path={ROUTES.userVerify}
            element={<OpenRoute component={<UserVerification />} />}
          />
          <Route
            path={ROUTES.myProfile}
            element={<PrivateRoute component={<MyProfile />} />}
          />
          <Route
            path={ROUTES.dashboard}
            element={<PrivateRoute component={<>Dashboard</>} />}
          />
          <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
        </Route>
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
