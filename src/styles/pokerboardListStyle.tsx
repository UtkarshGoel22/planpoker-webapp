import makeStyles from '@material-ui/core/styles/makeStyles';

export const pokerboardListStyle = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: '200px',
    overflow: 'auto',
  },
  p20: {
    padding: '20px 0px 0px 20px',
  },
}));
