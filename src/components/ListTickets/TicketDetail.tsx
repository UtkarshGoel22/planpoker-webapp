import React from 'react';
import { groupStyle } from '../../styles/listGroupStyle';

type prop = {
  id: string;
  type: string;
  managerEstimate: number;
  playerEstimate: number;
  date: Date;
};

const TicketDetail = ({
  id,
  type,
  managerEstimate,
  playerEstimate,
  date,
}: prop) => {
  const classes = groupStyle();
  const newDate = new Date(date);
  const onlyDate =
    newDate.getDate() +
    '/' +
    (newDate.getMonth() + 1) +
    '/' +
    newDate.getFullYear();
  return (
    <>
      <div className={classes.container}>
        <h3>Id: {id}</h3>
        <div className={`${classes.body}`}>
          <div>Type: {type}</div>
          <div>Manager Estimates: {managerEstimate}</div>
          <div>Your Estimates: {playerEstimate}</div>
          <div>Estimate Date: {onlyDate}</div>
        </div>
      </div>
    </>
  );
};

export default TicketDetail;
