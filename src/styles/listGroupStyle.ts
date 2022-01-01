import makeStyles from '@material-ui/core/styles/makeStyles';

export const listGroupStyle = makeStyles((theme) => ({
  listContainer: {
    maxHeight: '76vh',
    overflow: 'auto',
  },
  listHeader: {
    textAlign: 'center',
  },
}));

export const groupStyle = makeStyles((theme) => ({
  container: {
    margin: '5px 2px',
    padding: '3px 10px',
    border: '1px solid black',
    width: '100%',
  },
  body: {
    margin: '5px',
  },
  item: {
    display: 'block',
  },
  usersContainer: {
    padding: '2px',
    maxWidth: '200px',
    maxHeight: '100px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'left',
  },
  userItem: {
    fontSize: '1.4rem',
    padding: '3px',
    height: 'auto',
  },
}));
