import { useEffect, useState } from "react"

import EditIcon from "@mui/icons-material/Edit"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Fab from "@mui/material/Fab"
import Grid from "@mui/material/Grid"

import BackDropLoader from "@components/BackDropLoader"
import CustomModal from "@components/CustomModal"
import CustomSnackbar from "@components/CustomSnackbar"
import UserDetail from "@components/UserDetail"
import { ERROR_MESSAGES } from "@constants/messages.const"
import { TEXT } from "@constants/text.const"
import EditProfileForm from "@pages/MyProfile/EditProfileForm"
import { EditProfileFormValues } from "@pages/MyProfile/types"
import { authActions } from "@state/redux/authSlice"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { userActions } from "@state/redux/userSlice"

function MyProfile() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const user = useAppSelector(state => state.user)
  const [isEditable, setIsEditable] = useState(false)

  const theme = useTheme()

  const initialValues: EditProfileFormValues = {
    firstName: user.userData?.firstName || "",
    lastName: user.userData?.lastName || "",
    username: user.userData?.username || "",
  }

  function handleClick() {
    dispatch(authActions.logoutUser(auth.token))
  }

  function handleClose() {
    dispatch(userActions.resetUpdateUserState())
  }

  function handleSubmit(values: EditProfileFormValues) {
    dispatch(
      userActions.updateUser({
        requestData: values,
        token: auth.token,
        setIsEditable,
      }),
    )
  }

  useEffect(() => {
    if (!user.userData) {
      dispatch(userActions.fetchUser(auth.token))
    }
  }, [])

  return (
    <Box sx={{ maxHeight: "100vh", m: "20px auto" }}>
      <Grid container spacing={2}>
        {user.fetchUser.errors?.auth || user.updateUser.errors?.auth ? (
          <CustomModal
            open={true}
            message={ERROR_MESSAGES.sessionExpired}
            handleOnClick={handleClick}
            buttonText={TEXT.signin}
            showButton={true}
          />
        ) : (
          <Grid item xs={12} md={6} margin="auto">
            <Card sx={{ position: "relative" }}>
              <CardHeader
                title={`${user.userData?.firstName} ${user.userData?.lastName}`}
                subheader={`@${user.userData?.username}`}
              />
              <CardContent>
                <Grid spacing={3} container direction="column">
                  {!isEditable && (
                    <>
                      <UserDetail
                        heading={TEXT.name}
                        subheading={`${user.userData?.firstName} ${user.userData?.lastName}`}
                      />
                      <UserDetail
                        heading={TEXT.email}
                        subheading={`${user.userData?.email}`}
                      />
                      <UserDetail
                        heading={TEXT.username}
                        subheading={`${user.userData?.username}`}
                      />
                      {/* <UserDetail
                      heading={TEXT.cardsEstimated}
                      subheading={`${user.userData?.ticketsEstimated}`}
                    /> */}
                      <Fab
                        aria-label="edit"
                        color="primary"
                        onClick={() => setIsEditable(isEditable => !isEditable)}
                        sx={{
                          position: "absolute",
                          bottom: theme.spacing(2),
                          right: theme.spacing(2),
                        }}
                      >
                        <EditIcon />
                      </Fab>
                    </>
                  )}
                  {isEditable && (
                    <>
                      <EditProfileForm
                        initialValues={initialValues}
                        handleSubmit={handleSubmit}
                        errors={user.updateUser.errors}
                        loading={user.loading}
                      />
                    </>
                  )}
                  {user.updateUser.success && (
                    <CustomSnackbar
                      open={user.updateUser.success}
                      message={user.updateUser.message}
                      severity="success"
                      handleClose={handleClose}
                    />
                  )}
                  {user.updateUser.success === false && (
                    <CustomSnackbar
                      open={user.updateUser.success === false}
                      message={user.updateUser.message}
                      severity="error"
                      handleClose={handleClose}
                    />
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
        <BackDropLoader open={user.loading} />
      </Grid>
    </Box>
  )
}

export default MyProfile
