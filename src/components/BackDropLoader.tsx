import { useTheme } from "@mui/material/styles"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

interface BackDropLoaderProps {
  open: boolean
}

function BackDropLoader({ open }: BackDropLoaderProps) {
  const theme = useTheme()

  return (
    <Backdrop
      open={open}
      sx={{ zIndex: theme.zIndex.drawer + 1, color: "#fff" }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackDropLoader
