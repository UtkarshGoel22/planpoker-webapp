import makeStyles from '@material-ui/core/styles/makeStyles';

export const myProfileStyle = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
    margin: '20px auto',
  },
  card: {
    position: 'relative',
    padding: '20px',
  },
  userDetailContainer: {
    display: 'block',
    margin: 'auto',
  },
  heading: {
    fontWeight: 'bold',
  },
  content: {
    padding: '0 10px',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  snackbarStyle: {
    position: 'absolute',
  },
}));
