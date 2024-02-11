import { Navigate } from "react-router-dom"

import { ROUTES } from "@constants/routes.const"
import { useAppSelector } from "@state/redux/hooks"

const PrivateRoute = ({ component: Component }: any) => {
  const { token } = useAppSelector(state => state.auth)
  if (token) {
    return Component
  } else {
    return <Navigate to={ROUTES.signin} replace />
  }
}

export default PrivateRoute
