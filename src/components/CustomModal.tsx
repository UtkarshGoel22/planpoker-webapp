import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Fade from "@mui/material/Fade"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

interface CustomModalProps {
  open: boolean
  message: string
  handleOnClick?: () => void
  buttonText?: string
  showButton?: boolean
}

function CustomModal({
  open,
  message,
  handleOnClick,
  buttonText,
  showButton,
}: CustomModalProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box textAlign="center">
          <Box sx={boxStyle}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              {message}
            </Typography>
            {showButton && (
              <Button
                onClick={() => {
                  handleOnClick ? handleOnClick() : ""
                }}
                variant="contained"
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CustomModal
