import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { snackbarStyle } from '../styles/style';

type SnackbarProp = {
  onClose: Function;
  message: string;
  open: boolean;
  success: boolean;
};

const SnackbarComponent = (props: SnackbarProp) => {
  const classes = snackbarStyle();
  return (
    <>
      <Snackbar
        className={classes.snackbarStyle}
        open={props.open}
        autoHideDuration={6000}
        onClose={() => props.onClose()}
      >
        <Alert
          onClose={() => props.onClose()}
          severity={props.success ? 'success' : 'error'}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarComponent;
