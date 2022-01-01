import makeStyles from '@material-ui/core/styles/makeStyles';

export const createGroupStyles = makeStyles(() => ({
  root: {
    maxHeight: '100vh',
    margin: '20px auto',
  },
  groupContainer: {
    display: 'block',
    margin: 'auto',
  },
  card: {
    position: 'relative',
    padding: '1px',
  },
}));
