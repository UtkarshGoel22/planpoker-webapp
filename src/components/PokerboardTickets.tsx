import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ERROR, LABEL, ROUTE, SUCCESS_MESSAGE } from '../constants/constant';
import { RootState } from '../redux/store';
import { pokerboardListStyle } from '../styles/pokerboardListStyle';
import { PokerboardTicketType } from '../redux/interfacesAndTypes';
import { SaveOutlined } from '@material-ui/icons';
import { pokerboardItemHeaderStyle } from '../styles/pokerboardStyle';
import BackDropLoader from './BackDropLoader';
import SnackbarComponent from './SnackbarComponent';
import { updateTicketOrderHelper } from '../utils/fetchHelper';
import { useHistory } from 'react-router-dom';
import { PokerBoardStatus } from '../constants/pokerboardTypes';

const PokerboardTickets = () => {
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const classes = pokerboardListStyle();
  const { userId, token } = useSelector((state: RootState) => state.auth);
  const [tickets, setTickets] = useState<PokerboardTicketType[] | undefined>(
    data?.tickets
  );
  const [isItemChanged, setIsItemChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const [err, setError] = useState<any>(undefined);

  const history = useHistory();

  useEffect(() => {
    if (data) setTickets([...data.tickets]);
  }, [data?.tickets]);

  const renderTicketsWithoutDraggable = () => {
    return (
      <>
        {data &&
          data.tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                padding: '10px',
                boxShadow: '2px 4px #f2f2f2',
              }}
            >
              <ListItem>
                <ListItemText
                  primary={`${LABEL.id}: ${ticket.id}`}
                  secondary={`${LABEL.summary}: ${ticket.summary}`}
                />
                {ticket.estimate && (
                  <ListItemText primary={`Estimate: ${ticket.estimate}`} />
                )}
              </ListItem>
            </div>
          ))}
      </>
    );
  };

  const renderTicketsWithDraggable = () => {
    return (
      <>
        <div className="delete-ticket-options">
          {data?.status == PokerBoardStatus.CREATED ? (
            <Button variant="outlined" size="small" color="secondary">
              Delete Tickets
            </Button>
          ) : (
            ''
          )}
        </div>
        <DragDropContext
          onDragStart={(_) => {
            setIsItemChanged(true);
          }}
          onDragEnd={(result) => {
            if (!result.destination || !tickets) {
              return;
            }
            let sourceIndex = result.source.index;
            let destinationIndex = result.destination?.index;
            let ticketsCopy = [...tickets];
            const [removed] = ticketsCopy.splice(sourceIndex, 1);
            ticketsCopy.splice(destinationIndex, 0, removed);
            setTickets(ticketsCopy);
          }}
        >
          <Droppable droppableId="dropable-tickets">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tickets &&
                  tickets.map((ticket, index) => (
                    <Draggable
                      key={ticket.id}
                      draggableId={`draggable-${ticket.id}`}
                      index={index}
                    >
                      {(provided, _) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem
                            style={{
                              padding: '10px',
                              boxShadow: '2px 4px #f2f2f2',
                            }}
                          >
                            <ListItemText
                              primary={`${LABEL.id}: ${ticket.id}`}
                              secondary={`${LABEL.summary}: ${ticket.summary}`}
                            />
                            {ticket.estimate && (
                              <ListItemText
                                primary={`Estimate: ${ticket.estimate}`}
                              />
                            )}
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  };

  const handleTicketOrderSave: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    if (!tickets) {
      return;
    }
    setLoading(true);
    let ticketsToSend = [...tickets];
    for (let i = 0; i < ticketsToSend.length; i++) {
      ticketsToSend[i].order = i + 1;
      if (ticketsToSend[i].estimate === null) {
        ticketsToSend[i].estimate = undefined;
      }
    }

    updateTicketsInDb(ticketsToSend)
      .then(() => {
        setError(null);
        setIsOpenSnack(true);
        setIsItemChanged(false);
      })
      .catch((e) => {
        setIsOpenSnack(true);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateTicketsInDb = async (ticketsToSend: PokerboardTicketType[]) => {
    if (!data || !token) {
      return;
    }

    await updateTicketOrderHelper(data.id, ticketsToSend, token);
  };

  return (
    <>
      <Paper>
        <div style={pokerboardItemHeaderStyle}>
          <Typography className={classes.p20} variant="h6">
            {LABEL.tickets}
          </Typography>
          {isItemChanged && (
            <Button
              startIcon={<SaveOutlined />}
              title={'Save'}
              onClick={handleTicketOrderSave}
            >
              {LABEL.saveChanges}
            </Button>
          )}
        </div>
        <div className={classes.listContainer}>
          {userId !== data?.manager && (
            <List>{renderTicketsWithoutDraggable()}</List>
          )}

          {userId === data?.manager && (
            <>
              <List>{renderTicketsWithDraggable()}</List>
            </>
          )}
        </div>
      </Paper>
      <div>
        {data?.manager === userId && data?.status === PokerBoardStatus.CREATED && (
          <Button
            style={{
              backgroundColor: 'red',
              display: 'block',
              margin: '20px auto',
            }}
            onClick={(_) => {
              history.push(
                `${ROUTE.pokerboardOnly}${data?.id}${ROUTE.importTicketsOnly}`
              );
            }}
          >
            Upload More tickets
          </Button>
        )}
      </div>
      <SnackbarComponent
        message={
          err
            ? `${ERROR.somethingWentWrong}`
            : `${SUCCESS_MESSAGE.updatedSuccessfully}`
        }
        success={err ? false : true}
        open={isOpenSnack}
        onClose={() => setIsOpenSnack(false)}
      />
      <BackDropLoader open={loading} />
    </>
  );
};

export default PokerboardTickets;
