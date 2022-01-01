import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { dashboardStyles } from '../styles/style';
import {
  getStatusMessageOfPokerboard,
  PokerboardData,
} from '../utils/utils.pokerboard';
import { CONSTANT, ROUTE } from '../constants/constant';

export type PokerboardPropType = {
  key: string;
  data: PokerboardData;
};

function PokerboardInfo(props: PokerboardPropType) {
  const history = useHistory();
  const classes = dashboardStyles();
  return (
    <div className="ticket center">
      <div>
        <p>
          {CONSTANT.pokerboardName}
          {props.data.name}
        </p>
        <p>
          {CONSTANT.manager}
          {props.data.createdBy}
        </p>
        <p>
          {CONSTANT.deckType}
          {props.data.deckType}
        </p>
        <p>
          {CONSTANT.status}
          {getStatusMessageOfPokerboard(props.data.status)}
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        onClick={() => {
          history.push(`${ROUTE.pokerboardOnly}${props.data.id}`);
        }}
      >
        {CONSTANT.viewDetails}
      </Button>
    </div>
  );
}

export default PokerboardInfo;
