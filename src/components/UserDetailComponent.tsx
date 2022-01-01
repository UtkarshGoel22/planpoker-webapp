import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { myProfileStyle } from '../styles/myProfileStyle';

export type UserDetailType = {
  heading: string;
  subheading: string;
};
const UserDetail = (props: UserDetailType) => {
  const classes = myProfileStyle();
  return (
    <Grid item sm>
      <Typography>
        <Typography component="span" className={classes.heading}>
          {`${props.heading}:`}
        </Typography>
        <Typography component="span" className={classes.content}>
          {`${props.subheading}`}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default UserDetail;
