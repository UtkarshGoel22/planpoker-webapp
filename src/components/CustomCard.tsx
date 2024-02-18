import { useTheme } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface CustomCardProps {
  header: string
  content: JSX.Element
}

function CustomCard({ header, content }: CustomCardProps) {
  const theme = useTheme()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card raised>
        <CardHeader
          sx={{ pb: theme.spacing(0) }}
          title={<Typography variant="h6">{header}</Typography>}
        />
        <CardContent>{content}</CardContent>
      </Card>
    </Grid>
  )
}

export default CustomCard
