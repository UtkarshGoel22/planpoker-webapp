import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PokerBoardStatus } from '../../constants/pokerboardTypes';
import { SOCKET_EVENTS } from '../../constants/socketEvents';
import { SocketContext } from '../../context/socket';
import {
  addCommentToCurrentTicketActionCreator,
  endGameTimerActionCreator,
  resetGameTimerActionCreator,
  setAllPlayersEstimateActionCreator,
  setCurrentTicketCommentsActionCreator,
  setCurrentTicketDetailsActionCreator,
  setCurrentTicketEstimateActionCreator,
  setManagerPresetActionCreator,
  setPlayerEstimateActionCreator,
  setTimerActionCreator,
  startGameTimerActionCreator,
} from '../../redux/actions/game.actions';
import {
  addEstimateToTicket,
  changeBoardStatusActionCreator,
  setPokerboardTicketsActionCreator,
} from '../../redux/actions/pokerboardActions';
import { PlayerEstimationType } from '../../redux/interfacesAndTypes';
import { RootState } from '../../redux/store';

type props = {
  children: JSX.Element[];
  onJoinCallBack: Function;
};

const SocketWrapper = ({ children, onJoinCallBack }: props) => {
  const history = useHistory();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);

  useEffect(() => {
    if (!token || !data) {
      return;
    }

    socket.auth = {
      ...socket.auth,
      token: token,
    };
    socket.connect();
    socket.on('connect', () => {
      socket.emit(SOCKET_EVENTS.joinGame, data.id, onJoinCallBack);

      socket.on(SOCKET_EVENTS.timerStarted, () => {
        dispatch(startGameTimerActionCreator());
      });

      socket.on(SOCKET_EVENTS.timerEnded, () => {
        dispatch(endGameTimerActionCreator());
      });

      socket.on(SOCKET_EVENTS.timer, (value) => {
        dispatch(setTimerActionCreator(value));
      });

      socket.on(SOCKET_EVENTS.managerJoined, () => {
        dispatch(setManagerPresetActionCreator(true));
      });

      socket.on(SOCKET_EVENTS.managerLeft, () => {
        dispatch(setManagerPresetActionCreator(false));
        // end the game if manager has left
        socket.emit(SOCKET_EVENTS.endGame);
      });

      socket.on(
        SOCKET_EVENTS.playerEstimate,
        (playerEstimate: PlayerEstimationType) => {
          dispatch(setPlayerEstimateActionCreator(playerEstimate));
        }
      );

      socket.on(SOCKET_EVENTS.managerEstimate, (managerEstimate) => {
        dispatch(setCurrentTicketEstimateActionCreator(managerEstimate));
      });

      socket.on(SOCKET_EVENTS.currentTicket, (details) => {
        dispatch(setCurrentTicketDetailsActionCreator(details.currentTicket));
        dispatch(setCurrentTicketCommentsActionCreator(details.comments));
        dispatch(resetGameTimerActionCreator());
        dispatch(setTimerActionCreator(details.timerDuration));
        dispatch(setAllPlayersEstimateActionCreator([]));
      });

      socket.on(SOCKET_EVENTS.skipTicket, (details) => {
        dispatch(setCurrentTicketDetailsActionCreator(details.currentTicket));
        dispatch(setCurrentTicketCommentsActionCreator(details.comments));
        dispatch(setAllPlayersEstimateActionCreator([]));
        dispatch(setPokerboardTicketsActionCreator(details.tickets));
      });

      socket.on(SOCKET_EVENTS.commentAdded, (comment) => {
        dispatch(addCommentToCurrentTicketActionCreator(comment));
      });

      socket.on(SOCKET_EVENTS.endGame, () => {
        dispatch(changeBoardStatusActionCreator(PokerBoardStatus.ENDED));
      });

      socket.on('disconnect', () => {
        socket.off(SOCKET_EVENTS.commentAdded);
        socket.off(SOCKET_EVENTS.skipTicket);
        socket.off(SOCKET_EVENTS.currentTicket);
        socket.off(SOCKET_EVENTS.playerEstimate);
        socket.off(SOCKET_EVENTS.managerEstimate);
        socket.off(SOCKET_EVENTS.managerLeft);
        socket.off(SOCKET_EVENTS.managerJoined);
        socket.off(SOCKET_EVENTS.timer);
        socket.off(SOCKET_EVENTS.timerEnded);
        socket.off(SOCKET_EVENTS.timerStarted);
        socket.off(SOCKET_EVENTS.gameError);
      });
    });

    return () => {
      socket.off('connect');
      socket.disconnect();
    };
  }, [token, data?.id, history]);

  useEffect(() => {
    if (gameDetail && gameDetail.currentTicket.estimate) {
      let currentTicket = gameDetail.currentTicket;
      dispatch(
        addEstimateToTicket(gameDetail.currentTicket.estimate, currentTicket.id)
      );
    }
  }, [gameDetail?.currentTicket]);

  return <>{children}</>;
};

export default SocketWrapper;
