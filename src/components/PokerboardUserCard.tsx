import React from 'react';
import { Button, ListItemSecondaryAction } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RoleTypes, ROLE_TYPE } from '../constants/pokerboardTypes';

type PokerboardUserCardPropType = {
  name: string;
  inviteStatus: string;
  role: ROLE_TYPE;
  isManager: boolean;
  index: number;
  onRoleChange: (index: number, role: ROLE_TYPE) => void;
};
const PokerboardUserCard = (props: PokerboardUserCardPropType) => {
  const handleOnRoleChangeClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    // todo change role of the user
    let role =
      props.role === RoleTypes.SPECTATOR
        ? RoleTypes.PLAYER
        : RoleTypes.SPECTATOR;
    props.onRoleChange(props.index, role);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${props.name}`}
          secondary={
            <>
              <div>{`${props.inviteStatus}`}</div>
              <p>Role: {props.role}</p>
            </>
          }
        />

        {props.isManager && props.role != RoleTypes.MANAGER && (
          <ListItemSecondaryAction>
            <Button onClick={handleOnRoleChangeClick}>Change Role?</Button>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </>
  );
};

const isLoggedInUserManager = (userId: string, managerId: string): boolean => {
  return userId === managerId;
};
export default PokerboardUserCard;
