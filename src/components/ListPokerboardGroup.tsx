import React from 'react';
import { List, Paper, Typography } from '@material-ui/core';
import { LABEL } from '../constants/constant';
import { PokerboardGroupType } from '../redux/interfacesAndTypes';
import { pokerboardListStyle } from '../styles/pokerboardListStyle';
import PokerboardGroupCard from './PokerboardGroupCard';

type ListPokerboardGroupType = {
  groups: PokerboardGroupType[];
  managerId: string;
};

const ListPokerboardGroup = (props: ListPokerboardGroupType) => {
  const classes = pokerboardListStyle();

  return (
    <>
      <Paper>
        <Typography className={classes.p20} variant="h6">
          {LABEL.groups}
        </Typography>
        <div className={classes.listContainer}>
          <List>
            {props.groups.map((group) => (
              <PokerboardGroupCard
                name={group.name}
                id={group.id}
                key={group.id}
                countOfMembers={group.countOfMembers}
              />
            ))}
          </List>
        </div>
      </Paper>
    </>
  );
};

export default ListPokerboardGroup;
