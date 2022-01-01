import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CONSTANT } from '../../constants/constant';
import { TimerStatus } from '../../redux/interfacesAndTypes';
import { RootState } from '../../redux/store';
import { gameStyle } from '../../styles/game.style';

type props = {
  onStartClick: React.MouseEventHandler<HTMLButtonElement>;
};

const TimerForManager = ({ onStartClick }: props) => {
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);
  const classes = gameStyle();

  return (
    <>
      {gameDetail?.timerStatus === TimerStatus.notStarted && (
        <Button className={classes.timerButton} onClick={onStartClick}>
          {CONSTANT.startAGame}
        </Button>
      )}
      {gameDetail?.timerStatus === TimerStatus.onGoing && (
        <Button disabled={true} className={classes.timerButton}>
          {CONSTANT.ongoing}
        </Button>
      )}

      {gameDetail?.timerStatus === TimerStatus.ended && (
        <Button className={classes.timerButton}>{CONSTANT.timerEnded}</Button>
      )}
    </>
  );
};

export default TimerForManager;
