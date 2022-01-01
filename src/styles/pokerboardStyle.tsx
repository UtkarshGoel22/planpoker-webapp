import makeStyles from '@material-ui/core/styles/makeStyles';

export const pokerboardItemHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

export const pokerboardMain = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    maxHeight: '100vh',
    margin: '20px auto',
  },
  item: {
    padding: '20px',
  },
  center: {
    display: 'block',
    margin: '20px auto',
    textAlign: 'center',
    padding: '20px',
  },
  itemContainer: {
    maxWidth: '400px',
  },
  padding10: {
    padding: '20px 0px 0px 20px',
  },
}));
