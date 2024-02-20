import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp"
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { TEXT } from "@constants/text.const"

interface PaginationProps {
  data: { maxResults: number; startAt: number; total: number }
  loading: boolean
  handleNext: (queryParams: any) => void
  handlePrev: (queryParams: any) => void
  queryParams: any
}

function Pagination({
  data,
  loading,
  handleNext,
  handlePrev,
  queryParams,
}: PaginationProps) {
  const theme = useTheme()
  const isFirstPage: boolean = data.startAt == 0 ? true : false
  const isLastPage: boolean =
    data.startAt + data.maxResults >= data.total ? true : false
  const pageNumber: number =
    data.total === 0 ? 0 : Math.floor(data.startAt / data.maxResults) + 1
  const totalPages: number =
    Math.floor(data.total / data.maxResults) +
    (data.total % data.maxResults ? 1 : 0)

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: theme.spacing(1) }}
    >
      <Grid item xs={12} sm={3} md={2}>
        <Button
          color="secondary"
          disabled={isFirstPage || loading}
          fullWidth
          onClick={() => handlePrev(queryParams)}
          startIcon={<ArrowBackSharpIcon />}
          variant="outlined"
        >
          {TEXT.prev}
        </Button>
      </Grid>
      <Grid item xs={12} sm={3} md={2} textAlign="center">
        <Typography>{`${pageNumber} of ${totalPages}`}</Typography>
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <Button
          color="secondary"
          disabled={isLastPage || loading}
          fullWidth
          onClick={() => handleNext(queryParams)}
          endIcon={<ArrowForwardSharpIcon />}
          variant="outlined"
        >
          {TEXT.next}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Pagination
