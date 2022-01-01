import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CONSTANT } from '../../constants/constant';
import { RoleTypes } from '../../constants/pokerboardTypes';
import { TimerStatus } from '../../redux/interfacesAndTypes';
import { RootState } from '../../redux/store';
import { gameStyle } from '../../styles/game.style';

const TimerForOtherPlayer = () => {
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);
  const classes = gameStyle();

  let timerStatus = gameDetail
    ? gameDetail.timerStatus
    : TimerStatus.notStarted;
  let text = '';
  if (timerStatus === TimerStatus.notStarted) {
    text = CONSTANT.waitingToStart;
  } else if (timerStatus === TimerStatus.onGoing) {
    text =
      gameDetail?.userRole === RoleTypes.PLAYER
        ? CONSTANT.estimateTheTicket
        : CONSTANT.playersAreEstimating;
  } else if (timerStatus === TimerStatus.ended) {
    text = !Boolean(gameDetail?.currentTicket.estimate)
      ? CONSTANT.managerIsEstimating
      : CONSTANT.managerIsUpdating;
  }
  return <Button className={classes.timerButton}>{text}</Button>;
};

export default TimerForOtherPlayer;
