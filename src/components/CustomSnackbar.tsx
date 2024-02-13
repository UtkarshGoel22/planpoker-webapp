import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

interface CustomModalProps {
  open: boolean
  message: string | null
  severity: "success" | "info" | "warning" | "error"
  handleClose: () => void
}

function CustomSnackbar({
  open,
  message,
  severity,
  handleClose,
}: CustomModalProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      sx={{ postion: "absolute" }}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="outlined">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar
