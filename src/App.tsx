import { BrowserRouter, Route, Routes } from "react-router-dom"

import "@src/App.css"
import { ROUTES } from "@constants/routes.const"
import Signup from "@pages/Signup/index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.signup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
