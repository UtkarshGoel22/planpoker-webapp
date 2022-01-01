import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import 'date-fns';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CONSTANT, LABEL, UserTicketAction } from '../../constants/constant';
import { RootState } from '../../redux/store';
import { listGroupStyle } from '../../styles/listGroupStyle';
import { dashboardStyles } from '../../styles/style';
import BackDropLoader from '../BackDropLoader';
import TicketDetail from './TicketDetail';
import { listTickets } from '../../redux/actions/listTicketsActions';

const ListTicketForUser = () => {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const { tickets } = useSelector((state: RootState) => state.userTickets);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [filter, setFilter] = useState('');
  const history = useHistory();
  const classes = listGroupStyle();
  const dashboardClasses = dashboardStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date?.toLocaleDateString());
  };

  function listTicketForUserCallback(success: boolean, data: any) {
    setLoading(false);
    if (success) {
      if (data.ticketDetails.length == 0) {
        if (!sortBy && !filter && !selectedDate) {
          setError('You have not estimated any ticket');
        } else {
          setError('No tickets found');
        }
      } else {
        setError('');
      }
      dispatch({
        type: UserTicketAction.SET_TICKETS_FOR_USER,
        payload: data.ticketDetails,
      });
    } else {
      setError(data.id || data.auth || data.api);
    }
  }

  useEffect(() => {
    dispatch(listTickets(token, userId, listTicketForUserCallback));
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    dispatch(
      listTickets(
        token,
        userId,
        listTicketForUserCallback,
        sortBy,
        filter,
        selectedDate
      )
    );
  }

  return (
    <>
      <h1 className={classes.listHeader}>List of Tickets</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ alignItems: 'center' }}>
          <Grid item xs={3}>
            <FormControl
              variant="outlined"
              className={dashboardClasses.item}
              fullWidth
            >
              <InputLabel id="deck-type">{LABEL.sortBy}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="sort-by"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as string)}
                label={LABEL.sortBy}
              >
                <MenuItem value="">{CONSTANT.none}</MenuItem>
                <MenuItem value={CONSTANT.ascending}>
                  {CONSTANT.oldestFirst}
                </MenuItem>
                <MenuItem value={CONSTANT.descending}>
                  {CONSTANT.newestFirst}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl
              variant="outlined"
              className={dashboardClasses.item}
              fullWidth
            >
              <InputLabel id="deck-type">{LABEL.filter}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="deck-type"
                value={filter}
                onChange={(event) => setFilter(event.target.value as string)}
                label={LABEL.filter}
              >
                <MenuItem value="">{CONSTANT.all}</MenuItem>
                <MenuItem value={CONSTANT.story}>{CONSTANT.story}</MenuItem>
                <MenuItem value={CONSTANT.task}>{CONSTANT.task}</MenuItem>
                <MenuItem value={CONSTANT.bug}>{CONSTANT.bug}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                placeholder="mm/dd/yyyy"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Filter by Estimate Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={dashboardClasses.btn}
              disabled={loading}
            >
              {CONSTANT.apply}
            </Button>
          </Grid>
        </Grid>
      </form>
      {error ? (
        <div className="container">
          <h3>{error}</h3>
        </div>
      ) : (
        <div className={classes.listContainer}>
          {tickets.map((ticket) => (
            <TicketDetail
              key={ticket.id}
              id={ticket.id}
              type={ticket.type}
              managerEstimate={ticket.managerEstimate}
              playerEstimate={ticket.playerEstimate}
              date={ticket.date}
            />
          ))}
        </div>
      )}
      <BackDropLoader open={loading} />
    </>
  );
};

export default ListTicketForUser;
