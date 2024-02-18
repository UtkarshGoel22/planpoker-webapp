import { useTheme } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import CustomSnackbar from "@components/CustomSnackbar"
import { TEXT } from "@constants/text.const"
import { CreateGroupFormValues } from "@pages/CreateGroup/types"
import CreateGroupForm from "@pages/CreateGroup/CreateGroupForm"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { groupActions } from "@state/redux/groupSlice"

function CreateGroup() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const group = useAppSelector(state => state.group)
  const { userData } = useAppSelector(state => state.user)
  const theme = useTheme()

  const initialValues: CreateGroupFormValues = {
    groupName: "",
    members: [],
  }

  function handleClose() {
    dispatch(groupActions.resetCreateGroupState())
  }

  function handleSubmit(values: CreateGroupFormValues) {
    if (userData?.id) {
      const admin = userData.id
      const groupName = values.groupName
      const members = values.members.map(member => member.id)
      members.push(admin)
      dispatch(
        groupActions.createGroup({
          requestData: { admin, groupName, members },
          token,
        }),
      )
    }
  }

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        {TEXT.createGroup}
      </Typography>
      <Grid container spacing={2} sx={{ mt: theme.spacing(1) }}>
        <Grid item xs={12} md={6} margin="auto">
          <Card>
            <CardContent>
              <Grid spacing={3} container direction="column">
                <CreateGroupForm
                  initialValues={initialValues}
                  handleSubmit={handleSubmit}
                  loading={group.loading}
                  errors={group.createGroup.errors}
                />
              </Grid>
              {group.createGroup.success && (
                <CustomSnackbar
                  open={group.createGroup.success}
                  message={group.createGroup.message}
                  severity="success"
                  handleClose={handleClose}
                />
              )}
              {group.createGroup.success === false && (
                <CustomSnackbar
                  open={group.createGroup.success === false}
                  message={group.createGroup.message}
                  severity="error"
                  handleClose={handleClose}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateGroup
