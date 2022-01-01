import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SOCKET_EVENTS } from '../../constants/socketEvents';
import { SocketContext } from '../../context/socket';
import { TimerStatus } from '../../redux/interfacesAndTypes';
import { RootState } from '../../redux/store';
import {
  generateEstimate,
  isEstimateCardClickable,
} from '../../utils/gamepage.helper';
import EstimateCard from './EstimateCard';

export type SelectedEstimate = {
  index: number;
  value: number;
};

const GameEstimateCards = () => {
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);
  const { userId } = useSelector((state: RootState) => state.auth);
  const socket = useContext(SocketContext);

  const [
    currentEstimate,
    setCurrentEstimate,
  ] = useState<SelectedEstimate | null>(null);

  useEffect(() => {
    if (!currentEstimate || !userId || !gameDetail) {
      return;
    }
    socket.emit(
      SOCKET_EVENTS.setEstimate,
      currentEstimate.value,
      gameDetail.timerValue
    );
  }, [currentEstimate]);

  useEffect(() => {
    if (gameDetail?.timerStatus === TimerStatus.ended) {
      setCurrentEstimate(null);
    }
  }, [gameDetail?.timerStatus]);

  /**
   *
   * @param value Value of the estimate card
   * @param index index of the estimate card
   */
  const handleOnEstimateCardClick = (value: number, index: number) => {
    // if index are different, then set the selectedEstimate to value passed else set it to null
    if (currentEstimate?.index !== index) {
      setCurrentEstimate({
        index: index,
        value: value,
      });
    } else {
      setCurrentEstimate(null);
    }
  };

  return (
    <>
      {data &&
        gameDetail &&
        generateEstimate(data.deckType, 10).map((estimateValue, index) => {
          return (
            <EstimateCard
              key={index}
              index={index}
              isSelected={currentEstimate?.index == index}
              value={estimateValue}
              disabled={!isEstimateCardClickable(gameDetail)}
              handleOnClick={handleOnEstimateCardClick}
            />
          );
        })}
    </>
  );
};

export default GameEstimateCards;
