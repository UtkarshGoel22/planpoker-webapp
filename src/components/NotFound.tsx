import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

import { TEXT } from "@constants/text.const"

function NotFound() {
  const theme = useTheme()
  return (
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        marginTop: theme.spacing(5),
      }}
    >
      {TEXT.pageNotFound}
    </Typography>
  )
}

export default NotFound
