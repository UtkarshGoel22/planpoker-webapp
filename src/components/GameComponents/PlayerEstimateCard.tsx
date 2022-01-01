import React from 'react';
import { ListItem } from '@material-ui/core';
import { gameStyle } from '../../styles/game.style';

type PlayerEstimateCardPropType = {
  playerName: string;
  playerEstimate: number;
  isEstimateVisible: boolean;
};

const PlayerEstimateCard = ({
  playerName,
  playerEstimate,
  isEstimateVisible,
}: PlayerEstimateCardPropType) => {
  const classes = gameStyle();
  return (
    <ListItem className={`${classes.playerEstimateContainer}`}>
      <div>{playerName}</div>
      {isEstimateVisible && <div>{playerEstimate}</div>}
    </ListItem>
  );
};

export default PlayerEstimateCard;
