import React from 'react';
import { Grid } from '@material-ui/core';
import { estimateCardStyle } from '../../styles/game.style';

type EstimateCardPropType = {
  value: number;
  index: number;
  handleOnClick: (value: number, index: number) => void;
  isSelected?: boolean;
  isLarge?: boolean;
  disabled?: boolean;
};

const EstimateCard = ({
  value,
  index,
  handleOnClick,
  isSelected = false,
  isLarge = true,
  disabled = false,
}: EstimateCardPropType) => {
  const classes = estimateCardStyle();

  return (
    <>
      <Grid
        onClick={
          disabled
            ? undefined
            : () => {
                handleOnClick(value, index);
              }
        }
        className={`${classes.cardItem} ${
          isLarge ? classes.large : classes.small
        } ${isSelected ? classes.selected : ''} ${
          disabled ? classes.disabled : ''
        }`}
        item
        xs={1}
      >
        {value}
      </Grid>
    </>
  );
};

export default EstimateCard;
