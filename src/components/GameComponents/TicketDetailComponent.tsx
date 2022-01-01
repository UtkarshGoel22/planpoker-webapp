import React from 'react';
import Typography from '@material-ui/core/Typography';

type TicketDetailProps = {
  title: string;
  description: string | number;
};

const TicketDetailComponent = ({ title, description }: TicketDetailProps) => {
  return (
    <>
      <Typography variant="h5">{title}: </Typography>
      <Typography variant="body1" color="textSecondary">
        {description}{' '}
      </Typography>
    </>
  );
};

export default TicketDetailComponent;
