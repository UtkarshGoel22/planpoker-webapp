import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import "@src/App.css"
import NotFound from "@components/NotFound"
import OpenRoute from "@components/OpenRoute"
import PrivateRoute from "@components/PrivateRoute"
import { ROUTES } from "@constants/routes.const"
import NavLayout from "@layouts/NavLayout"
import PokerboardLayout from "@layouts/PokerboardLayout"
import CreateGroup from "@pages/CreateGroup/index"
import CreatePokerboard from "@pages/CreatePokerboard/index"
import Dashboard from "@pages/Dashboard"
import ImportTickets from "@pages/ImportTickets/index"
import ListGroups from "@pages/ListGroups"
import MyProfile from "@pages/MyProfile/index"
import Signup from "@pages/Signup/index"
import Signin from "@pages/Signin/index"
import UserVerification from "@pages/UserVerification/index"

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
            path={ROUTES.createGroup}
            element={<PrivateRoute component={<CreateGroup />} />}
          />
          <Route
            path={ROUTES.createPokerboard}
            element={<PrivateRoute component={<CreatePokerboard />} />}
          />
          <Route
            path={ROUTES.dashboard}
            element={<PrivateRoute component={<Dashboard />} />}
          />
          <Route
            path={ROUTES.groups}
            element={<PrivateRoute component={<ListGroups />} />}
          />
          <Route path={ROUTES.pokerboardDetail} element={<PokerboardLayout />}>
            <Route
              index
              element={<PrivateRoute component={<>PokerboardData</>} />}
            />
            <Route
              path={ROUTES.importTickets}
              element={<PrivateRoute component={<ImportTickets />} />}
            />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
        </Route>
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
