import { useEffect } from "react"

import Grid from "@mui/material/Grid"

import BackDropLoader from "@components/BackDropLoader"
import PokerboardDetails from "@components/PokerboardDetails"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { pokerboardActions } from "@state/redux/pokerboardSlice"

function Dashboard() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { listPokerboards, loading } = useAppSelector(state => state.pokerboard)

  useEffect(() => {
    dispatch(pokerboardActions.listPokerboards(token))
  }, [])

  return (
    <>
      <BackDropLoader open={loading} />
      <Grid container spacing={2} justifyContent="center">
        {listPokerboards.data?.map(pokerboard => (
          <PokerboardDetails key={pokerboard.id} data={pokerboard} />
        ))}
      </Grid>
    </>
  )
}

export default Dashboard
