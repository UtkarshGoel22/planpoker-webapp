import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import CustomCard from "@components/CustomCard"
import { TEXT } from "@constants/text.const"
import { useAppDispatch, useAppSelector } from "@src/state/redux/hooks"
import { ticketActions } from "@src/state/redux/ticketSlice"
import { TicketData } from "@src/types/shared/ticket"

export type JiraTicketProps = {
  key: string
  data: TicketData
}

function JiraTicket({ data }: JiraTicketProps) {
  const dispatch = useAppDispatch()
  const { selectedOptions } = useAppSelector(
    state => state.ticket.importTickets,
  )

  function handleSelect() {
    let newSelectedTickets: TicketData[] = [...selectedOptions, data]
    dispatch(ticketActions.setSelectedOptions(newSelectedTickets))
  }

  function handleRemove() {
    let newSelectedTickets: TicketData[] = selectedOptions.filter(
      option => option.id !== data.id,
    )
    dispatch(ticketActions.setSelectedOptions(newSelectedTickets))
  }

  const content = (
    <>
      <Typography>Id: {data.id}</Typography>
      <Typography>Type: {data.type}</Typography>
      <Typography>Summary: {data.summary}</Typography>
      <Typography>Description: {data.description}</Typography>
      <Button
        color="secondary"
        disabled={
          selectedOptions?.find(option => option.id == data.id) ? true : false
        }
        onClick={handleSelect}
      >
        {TEXT.select}
      </Button>
      <Button
        color="secondary"
        disabled={
          selectedOptions?.find(option => option.id == data.id) ? false : true
        }
        onClick={handleRemove}
      >
        {TEXT.remove}
      </Button>
    </>
  )

  return <CustomCard header={data.id} content={content} />
}

export default JiraTicket
