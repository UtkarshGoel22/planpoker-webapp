import { useEffect } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"

import CustomModal from "@components/CustomModal"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { PokerboardParamsType } from "@src/types/shared/pokerboard"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { pokerboardActions } from "@state/redux/pokerboardSlice"

function PokerboardLayout() {
  const { id } = useParams<PokerboardParamsType>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { fetchPokerboard } = useAppSelector(state => state.pokerboard)

  useEffect(() => {
    dispatch(pokerboardActions.fetchPokerboard({ token, id }))
  }, [id])

  return (
    <>
      {fetchPokerboard.success === false ? (
        <CustomModal
          open={true}
          message={fetchPokerboard.message || ""}
          handleOnClick={() => navigate(ROUTES.dashboard)}
          buttonText={TEXT.goToHome}
          showButton={true}
        />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default PokerboardLayout
