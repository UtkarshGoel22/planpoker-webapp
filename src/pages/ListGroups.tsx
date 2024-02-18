import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import BackDropLoader from "@components/BackDropLoader"
import CustomModal from "@components/CustomModal"
import CustomSnackbar from "@components/CustomSnackbar"
import GroupDetails from "@components/GroupDetails"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import { groupActions } from "@state/redux/groupSlice"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"

function ListGroups() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { listGroups, loading } = useAppSelector(state => state.group)
  const [showSnackbar, setShowSnackbar] = useState(true)
  const theme = useTheme()

  function handleClose() {
    setShowSnackbar(false)
  }

  useEffect(() => {
    dispatch(groupActions.listGroups(token))
  }, [])

  return (
    <>
      <BackDropLoader open={loading} />
      {listGroups.data?.length == 0 ? (
        <CustomModal
          open={listGroups.data?.length == 0}
          message={TEXT.pleaseCreateAGroup}
          handleOnClick={() => navigate(ROUTES.createGroup)}
          buttonText={TEXT.goToCreateGroup}
          showButton={true}
        />
      ) : (
        <>
          <Typography align="center" component="h1" variant="h4">
            {TEXT.groups}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ mt: theme.spacing(1) }}
          >
            {listGroups.data?.map(group => (
              <GroupDetails key={group.id} data={group} />
            ))}
            {showSnackbar && listGroups.success && (
              <CustomSnackbar
                open={listGroups.success}
                message={listGroups.message}
                severity="success"
                handleClose={handleClose}
              />
            )}
            {showSnackbar && listGroups.success === false && (
              <CustomSnackbar
                open={listGroups.success === false}
                message={listGroups.message}
                severity="error"
                handleClose={handleClose}
              />
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default ListGroups
