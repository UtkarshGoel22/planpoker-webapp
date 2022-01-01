import React from 'react';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';
import PlayerEstimateCard from './PlayerEstimateCard';
import { RootState } from '../../redux/store';
import { isManager } from '../../utils/gamepage.helper';
import { TimerStatus } from '../../redux/interfacesAndTypes';
import { CONSTANT } from '../../constants/constant';

const PlayersEstimateList = () => {
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);

  return (
    <>
      <List>
        {!gameDetail || gameDetail.currentTickPlayerEstimation.length === 0 ? (
          <div>{CONSTANT.noOneHasEstimatedYet}</div>
        ) : (
          gameDetail.currentTickPlayerEstimation.map((player, i) => {
            return (
              <PlayerEstimateCard
                key={i}
                playerName={player.userName}
                playerEstimate={player.estimate}
                isEstimateVisible={
                  gameDetail?.timerStatus === TimerStatus.ended ||
                  isManager(gameDetail)
                }
              />
            );
          })
        )}
      </List>
    </>
  );
};

export default PlayersEstimateList;
