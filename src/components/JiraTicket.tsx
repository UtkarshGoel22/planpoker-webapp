import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { RootState } from '../redux/store';
import { dashboardStyles } from '../styles/style';
import { Ticket } from '../utils/utils.import.tickets';
import { CONSTANT, TicketAction } from '../constants/constant';

export type TicketPropType = {
  key: string;
  data: Ticket;
};

function JiraTicket(props: TicketPropType) {
  const { selectedTickets } = useSelector((state: RootState) => state.tickets);
  const dispatch = useDispatch();
  const classes = dashboardStyles();

  function handleClick(button: string) {
    if (button == CONSTANT.select) {
      let newSelectedTickets: Ticket[] = [...selectedTickets, props.data];
      dispatch({
        type: TicketAction.SET_SELECTED_TICKETS,
        payload: newSelectedTickets,
      });
    } else {
      let newSelectedTickets: Ticket[] = selectedTickets.filter(
        (ele) => ele.id !== props.data.id
      );
      dispatch({
        type: TicketAction.SET_SELECTED_TICKETS,
        payload: newSelectedTickets,
      });
    }
  }

  return (
    <div className="ticket">
      <div>
        <p>
          {CONSTANT.ticketId}
          {props.data.id}
        </p>
        <p>
          {CONSTANT.ticketType}
          {props.data.type}
        </p>
        <p>
          {CONSTANT.ticketSummary}
          {props.data.summary}
        </p>
        <p>
          {CONSTANT.ticketDescription}
          {props.data.description}
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        disabled={
          selectedTickets.find((ele) => ele.id == props.data.id) ? true : false
        }
        onClick={() => handleClick(CONSTANT.select)}
      >
        {CONSTANT.select}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        disabled={
          selectedTickets.find((ele) => ele.id == props.data.id) ? false : true
        }
        onClick={() => handleClick(CONSTANT.remove)}
      >
        {CONSTANT.remove}
      </Button>
    </div>
  );
}

export default JiraTicket;
