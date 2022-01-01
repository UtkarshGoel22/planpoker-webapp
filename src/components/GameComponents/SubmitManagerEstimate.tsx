import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Paper, TextField } from '@material-ui/core';
import { gameStyle } from '../../styles/game.style';
import { setCurrentTicketEstimateActionCreator } from '../../redux/actions/game.actions';
import { RootState } from '../../redux/store';
import { SocketContext } from '../../context/socket';
import { SOCKET_EVENTS } from '../../constants/socketEvents';
import { loaderStyles } from '../../styles/style';
import { CONSTANT } from '../../constants/constant';

const SubmitManagerEstimate = () => {
  const [estimate, setEstimate] = useState<number | null>(null);
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const classes = gameStyle();
  const socket = useContext(SocketContext);
  const loaderClass = loaderStyles();
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(SOCKET_EVENTS.managerEstimate, (managerEstimate) => {
      dispatch(setCurrentTicketEstimateActionCreator(managerEstimate));
      setIsLoading(false);
    });

    return () => {
      socket.off(SOCKET_EVENTS.managerEstimate);
    };
  }, [data?.id]);

  const submitEstimate: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!estimate) return;
    socket.emit(SOCKET_EVENTS.setEstimate, estimate);
    setIsLoading(true);
    setEstimate(null);
  };
  return (
    <>
      <Paper>
        <form className={classes.formEstimateTicket} onSubmit={submitEstimate}>
          <TextField
            variant="outlined"
            required
            fullWidth
            value={estimate ? estimate : ''}
            onChange={(event) =>
              event.target.value
                ? setEstimate(Number(event.target.value))
                : setEstimate(null)
            }
            type="number"
            label="Estimate Current Ticket"
          />
          <div className={loaderClass.wrapper}>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
            >
              {CONSTANT.submitYourEstimate}
              {loading && (
                <CircularProgress
                  size={24}
                  className={loaderClass.buttonProgress}
                />
              )}
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default SubmitManagerEstimate;
