import { Navigate } from "react-router-dom"

import { ROUTES } from "@constants/routes.const"
import { useAppSelector } from "@state/redux/hooks"

function OpenRoute({ component: Component }: any) {
  const { token } = useAppSelector(state => state.auth)
  if (token) {
    return <Navigate to={ROUTES.dashboard} replace />
  } else {
    return Component
  }
}

export default OpenRoute
