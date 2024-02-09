import { BrowserRouter, Route, Routes } from "react-router-dom"

import "@src/App.css"
import { ROUTES } from "@constants/routes.const"
import Signup from "@pages/Signup/index"
import Signin from "@pages/Signin/index"
import UserVerification from "@pages/UserVerification/index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.signup} element={<Signup />} />
        <Route path={ROUTES.signin} element={<Signin />} />
        <Route path={ROUTES.userVerify} element={<UserVerification />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
