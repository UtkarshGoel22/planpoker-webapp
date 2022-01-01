import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { backdropStyles } from '../styles/style';

type BackDropProps = {
  open: boolean;
};
const BackDropLoader = (props: BackDropProps) => {
  const backdropClasses = backdropStyles();
  return (
    <>
      <Backdrop className={backdropClasses.backdrop} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BackDropLoader;
