import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core';
import { LABEL } from '../../constants/constant';
import { PokerboardTicketType } from '../../redux/interfacesAndTypes';
import { ticketItemGameStyling } from '../../styles/game.style';

type TicketPropType = {
  ticket: PokerboardTicketType;
  isCurrentTicket: boolean;
};

const TicketItemGame = ({
  ticket,
  isCurrentTicket: isCurrent,
}: TicketPropType) => {
  const classes = ticketItemGameStyling();

  return (
    <>
      <Grid
        container
        className={`${classes.item}  ${isCurrent ? classes.selected : ''}`}
      >
        <Grid item xs={8}>
          <ListItem className={``}>
            <ListItemText
              primary={`${LABEL.id}: ${ticket.id}`}
              secondary={`${ticket.summary}`}
            />
          </ListItem>
        </Grid>
        <Grid
          item
          className={`${classes.textCenter} ${
            !ticket.estimate ? classes.colorRed : ''
          }`}
        >
          {ticket.estimate
            ? `${LABEL.estimate}: ${ticket.estimate}`
            : `${LABEL.notEstimated}`}
        </Grid>
      </Grid>
    </>
  );
};

export default TicketItemGame;
