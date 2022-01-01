import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import { CONSTANT, LABEL, ROUTE } from '../../constants/constant';
import { GameObject } from '../../redux/interfacesAndTypes';
import { RootState } from '../../redux/store';
import { gameStyle } from '../../styles/game.style';
import {
  getGameDetails,
  isGameEnded,
  isManager,
} from '../../utils/gamepage.helper';
import BackDropLoader from '../BackDropLoader';
import GameBody from './GameBody';
import { SocketContext } from '../../context/socket';
import { setGameInfoActionCreator } from '../../redux/actions/game.actions';
import AllTicketsContainer from './AllTicketsContainer';
import GameEstimateCards from './GameEstimateCards';
import CustomModal from '../CustomModal';
import { SOCKET_EVENTS } from '../../constants/socketEvents';
import TimerForOtherPlayer from './TimerForOtherPlayer';
import TimerForManager from './TimerForManager';
import SocketWrapper from './SocketWrapper';
import { PokerBoardStatus } from '../../constants/pokerboardTypes';

const GamePage = () => {
  const classes = gameStyle();
  const history = useHistory();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);

  const [numberOfEstimatedTicket, setNumberOfEstimatedTicket] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || !data) {
      return;
    }
    setIsLoading(true);
  }, [data?.id, history, token]);

  useEffect(() => {
    if (data) {
      setNumberOfEstimatedTicket(data.tickets.filter((t) => t.estimate).length);
    }
  }, [data?.tickets]);

  const onJoinGameCallback = (gameDetailsFromBackend: any) => {
    if (!data || !token) {
      return;
    }

    let gameInfo: GameObject = getGameDetails(gameDetailsFromBackend, data.id);
    dispatch(setGameInfoActionCreator(gameInfo));
    setIsLoading(false);
  };

  const handleOnStartClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    socket.emit(SOCKET_EVENTS.startTimer);
  };

  return (
    <>
      <SocketWrapper onJoinCallBack={onJoinGameCallback}>
        <div>
          <Grid container spacing={2} className="">
            <Grid
              item
              xs={9}
              className={`${classes.border} ${classes.tickets} `}
            >
              {!isGameEnded(data?.status) && (
                <div className={`${classes.timerContainer}`}>
                  <div className={`${classes.timer}`}>
                    Time Remaining: {`${gameDetail?.timerValue} sec`}
                  </div>
                  {isManager(gameDetail) ? (
                    <TimerForManager onStartClick={handleOnStartClick} />
                  ) : (
                    <TimerForOtherPlayer />
                  )}
                </div>
              )}
              <GameBody />
            </Grid>
            <Grid
              item
              xs={3}
              className={`${classes.border} ${classes.tickets}`}
            >
              <div className={`${classes.ticketHeader}`}>
                <h3 className={``}>{LABEL.tickets}</h3>
                <p>Estimated: {numberOfEstimatedTicket}</p>
              </div>
              <AllTicketsContainer />
            </Grid>
            <Grid container>
              {!isManager(gameDetail) && <GameEstimateCards />}
            </Grid>
          </Grid>
          <BackDropLoader
            open={Boolean(!data) || isLoading || Boolean(!gameDetail)}
          />
        </div>
        <CustomModal
          open={Boolean(
            gameDetail &&
              !gameDetail.isManagerPresent &&
              !isGameEnded(data?.status)
          )}
          message={CONSTANT.waitingForManagerToJoin}
          isButton={false}
        />
        <CustomModal
          open={data != undefined && data.status === PokerBoardStatus.ENDED}
          message={`${CONSTANT.gameHasBeenEndedMyByManager}`}
          isButton={true}
          isCenter={true}
          buttonText={CONSTANT.gotoPokerboardDetailPage}
          handleOnClick={() => {
            history.replace(`${ROUTE.pokerboardOnly}${data?.id}`);
          }}
        />
      </SocketWrapper>
    </>
  );
};

export default GamePage;
