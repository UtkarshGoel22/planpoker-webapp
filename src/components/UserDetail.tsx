import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

export interface UserDetailProps {
  heading: string
  subheading: string
}
const UserDetail = (props: UserDetailProps) => {
  const theme = useTheme()

  return (
    <Grid item xs={12}>
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          {`${props.heading}:`}
        </Typography>
        <Typography component="span" sx={{ p: theme.spacing(0, 1) }}>
          {`${props.subheading}`}
        </Typography>
      </Typography>
    </Grid>
  )
}

export default UserDetail
