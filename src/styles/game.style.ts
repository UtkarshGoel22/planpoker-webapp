import makeStyles from '@material-ui/core/styles/makeStyles';

export const gameStyle = makeStyles(() => ({
  border: {
    // border: '1px solid black',
  },
  colorRed: {
    color: 'red',
  },
  m10: {
    margin: '15px 0',
  },
  tickets: {
    maxHeight: '67vh',
    overflow: 'auto',
    position: 'relative',
  },
  center: {
    textAlign: 'center',
  },
  ticketHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '10px',
  },
  centerComponent: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
  currentTicket: {
    maxWidth: '90%',
    minWidth: '60%',
    maxHeight: '300px',
    padding: '10px',
    overflow: 'auto',
  },
  commentsSection: {
    maxHeight: '150px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  commentsContainer: {
    padding: '5px',
  },
  comment: {
    marginBottom: '5px',
    width: '100%',
  },
  playerEstimateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playersEstimateContainer: {
    maxHeight: '230px',
    overflow: 'auto',
  },
  timerContainer: {
    position: 'absolute',
    top: '100px',
    right: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  timer: {},
  timerButton: {
    margin: '10px auto',
    background: '#7efff5',
    color: 'black',
  },
  btnPurple: {
    margin: '10px auto',
    background: '#273c75',
    color: '#f2f2f2',
    '&:hover': {
      background: '#40739e',
    },
  },
  formEstimateTicket: {
    margin: 'auto 20%',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const estimateCardStyle = makeStyles(() => ({
  cardItem: {
    backgroundColor: '#7efff5',
    color: '#f2f2f2',
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '2px 4px #f2f2f2',
    margin: '10px',
  },
  small: {
    height: '75px',
    fontSize: '2.5rem',
  },
  large: {
    height: '150px',
    fontSize: '4rem',
  },
  selected: {
    position: 'relative',
    fontSize: '6rem',
    border: '1px solid gray',
    transform: 'translateY(-50px) rotate(-20deg)',
  },
  disabled: {
    opacity: '0.4',
  },
}));

export const ticketItemGameStyling = makeStyles(() => ({
  item: {
    boxShadow: '2px 5px #f2f2f2',
    padding: '10px 0',
  },
  textCenter: {
    margin: 'auto',
  },
  colorRed: {
    color: '#833471',
  },
  selected: {
    border: '1px solid #80a1ff',
    color: '#80a1ff',
  },
}));
