import { useNavigate } from "react-router-dom"

import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CustomCard from "@components/CustomCard"
import Typography from "@mui/material/Typography"

import { TEXT } from "@constants/text.const"
import { PokerboardCardData } from "@src/types/shared/pokerboard"
import { ROUTES } from "@constants/routes.const"

interface PokerboardDetailsProps {
  key: string
  data: PokerboardCardData
}

function PokerboardDetails({ data }: PokerboardDetailsProps) {
  const navigate = useNavigate()
  const theme = useTheme()

  const content = (
    <>
      <Typography>Manger: {data.createdBy}</Typography>
      <Typography>Deck Type: {data.deckType}</Typography>
      <Typography>Status: {data.status}</Typography>
      <Button
        color="primary"
        fullWidth
        onClick={() => {
          navigate(`${ROUTES.pokerboard}/${data.id}`)
        }}
        size="small"
        sx={{ mt: theme.spacing(2) }}
        variant="contained"
      >
        {TEXT.viewDetails}
      </Button>
    </>
  )
  return <CustomCard header={data.name} content={content} />
}

export default PokerboardDetails
