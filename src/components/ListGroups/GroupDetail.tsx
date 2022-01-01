import React from 'react';
import { ListItem } from '@material-ui/core';
import { groupStyle } from '../../styles/listGroupStyle';
import CustomToolTip from '../CustomTooltip';

type prop = {
  groupName: string;
  admin: string;
  membersCount: number;
  users?: string[];
};

const GroupDetail = ({ groupName, admin, membersCount, users = [] }: prop) => {
  const classes = groupStyle();

  const renderUsersOfGroup = () => {
    if (!users || users.length === 0) {
      return false;
    }

    return (
      <>
        <div className={`${classes.usersContainer}`}>
          {users.map((user, index) => (
            <div className={`${classes.userItem}`} key={index}>
              {user}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <ListItem className={`${classes.item}`}>
        <div className={classes.container}>
          <h3>Name: {groupName}</h3>
          <div className={`${classes.body}`}>
            <div>Admin: {admin}</div>
            <CustomToolTip title={renderUsersOfGroup()}>
              <span>Members: {membersCount}</span>
            </CustomToolTip>
          </div>
        </div>
      </ListItem>
    </>
  );
};

export default GroupDetail;
