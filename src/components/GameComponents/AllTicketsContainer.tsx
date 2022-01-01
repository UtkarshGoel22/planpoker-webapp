import React, { useSelector } from 'react-redux';
import { CONSTANT } from '../../constants/constant';
import { RootState } from '../../redux/store';
import TicketItemGame from './TicketItemGame';

const AllTicketsContainer = () => {
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);

  return (
    <>
      {data &&
        gameDetail &&
        (data.tickets.length === 0 ? (
          <div>{CONSTANT.noTicketToShow}</div>
        ) : (
          data.tickets.map((ticket, index) => {
            return (
              <div key={index}>
                <TicketItemGame
                  isCurrentTicket={
                    ticket.id === gameDetail.currentTicket.id ? true : false
                  }
                  key={index}
                  ticket={ticket}
                />
              </div>
            );
          })
        ))}
    </>
  );
};

export default AllTicketsContainer;
