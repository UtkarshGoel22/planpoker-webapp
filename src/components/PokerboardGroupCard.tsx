import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type PokerboardGroupCardType = {
  name: string;
  id: string;
  countOfMembers: number;
};

const PokerboardGroupCard = (props: PokerboardGroupCardType) => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={props.name}
          secondary={`Members: ${props.countOfMembers}`}
        />
      </ListItem>
    </>
  );
};

export default PokerboardGroupCard;
