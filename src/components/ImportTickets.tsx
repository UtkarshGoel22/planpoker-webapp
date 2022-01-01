import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { dashboardStyles, linerLoaderStyles } from '../styles/style';
import { RootState } from '../redux/store';
import {
  CONSTANT,
  ERROR,
  LABEL,
  ROUTE,
  TicketAction,
} from '../constants/constant';
import { addTickets, importTickets } from '../redux/actions/importTicketAction';
import JiraTicket from './JiraTicket';
import { useHistory, useParams } from 'react-router';
import { PokerboardParams } from './PokerBoardComponent';
import CustomModal from './CustomModal';
import { fetchPokerboardDetails } from '../redux/actions/pokerboardActions';

export type importTicketError = {
  ticketsInput?: string;
  importBy?: string;
  api?: string;
};

function ImportTicket() {
  const [ticketsInput, setTicketsInput] = useState('');
  const [importBy, setImportBy] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<importTicketError>({});
  const [message, setMessage] = useState('');
  const { userId } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const classes = dashboardStyles();
  const linerLoaderClasses = linerLoaderStyles();
  const { token } = useSelector((store: RootState) => store.auth);
  const { ticketOptions, selectedTickets } = useSelector(
    (state: RootState) => state.tickets
  );
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams<PokerboardParams>();

  useEffect(() => {
    dispatch({ type: TicketAction.SET_SELECTED_TICKETS, payload: [] });
    dispatch({ type: TicketAction.SET_TICKET_OPTIONS, payload: [] });
  }, [data?.id]);

  function importTicketCallback(success: boolean, result: any) {
    setIsLoading(false);
    if (success) {
      setErrors({});
      if (result.data) {
        if (result.data.pagination) {
          let calcPage =
            result.data.pagination.startAt + result.data.pagination.maxResults;
          if (calcPage >= result.data.pagination.total) {
            setIsLastPage(true);
          } else {
            setIsLastPage(false);
          }

          if (result.data.pagination.startAt == 0) {
            setIsFirstPage(true);
          } else {
            setIsFirstPage(false);
          }
        } else if (result.data.partialExist) {
          let arrayOfIds = result.data.partialExist;
          let listOfAlreadyExistingTickets = arrayOfIds.toString();
          listOfAlreadyExistingTickets += ' already exist';
          setMessage(result.message);
          setErrors({
            api: listOfAlreadyExistingTickets,
          });
        }
      } else {
        setMessage(result.message);
      }
    } else {
      setMessage('');
      setErrors({
        api: result.message,
      });
    }
  }

  function addTicketsToPokerboard() {
    setIsLoading(true);
    dispatch(
      addTickets(selectedTickets, importTicketCallback, data?.id, token)
    );
  }

  function handleClick(button: string) {
    setMessage('');
    setErrors({});
    if (ticketsInput == '' || importBy == '') {
      let temp: importTicketError = {
        ticketsInput: '',
        importBy: '',
      };
      if (ticketsInput == '') {
        temp.ticketsInput = ERROR.required;
      }
      if (importBy == '') {
        temp.importBy = ERROR.required;
      }
      setErrors(temp);
    } else {
      setErrors({});
      setIsLoading(true);
      if (button == CONSTANT.import) {
        dispatch(
          importTickets(ticketsInput, importBy, importTicketCallback, token)
        );
        setPageNo(1);
        setIsFirstPage(true);
        setIsLastPage(true);
      } else if (button == CONSTANT.prev) {
        dispatch(
          importTickets(
            ticketsInput,
            importBy,
            importTicketCallback,
            token,
            (pageNo - CONSTANT.one) * CONSTANT.limit - CONSTANT.limit
          )
        );
        setPageNo(pageNo - 1);
      } else if (button == CONSTANT.next) {
        dispatch(
          importTickets(
            ticketsInput,
            importBy,
            importTicketCallback,
            token,
            pageNo * CONSTANT.limit
          )
        );
        setPageNo(pageNo + 1);
      }
    }
  }

  return (
    <>
      {data && data.manager == userId ? (
        <div className={classes.root}>
          <Grid item>
            <Grid className={classes.topRightColumn}>
              <Grid item xs={12} sm={9} className={classes.importTickets}>
                <TextField
                  className={classes.item}
                  value={ticketsInput}
                  onChange={(event) => setTicketsInput(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  label={LABEL.importTickets}
                  error={Boolean(errors?.ticketsInput)}
                  helperText={errors?.ticketsInput}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} sm={3} className={classes.importTickets}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.item}
                  fullWidth
                >
                  <InputLabel id="import-by">{LABEL.importBy}</InputLabel>
                  <Select
                    labelId="import-by"
                    id="demo-simple-select-outlined"
                    value={importBy}
                    onChange={(event) =>
                      setImportBy(event.target.value as string)
                    }
                    label={LABEL.importBy}
                    error={Boolean(errors?.importBy)}
                    disabled={isLoading}
                  >
                    <MenuItem value={CONSTANT.id}>{CONSTANT.id}</MenuItem>
                    <MenuItem value={CONSTANT.jql}>{CONSTANT.jql}</MenuItem>
                    <MenuItem value={CONSTANT.sprint}>
                      {CONSTANT.sprint}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              disabled={isLoading}
              onClick={() => handleClick(CONSTANT.import)}
            >
              {CONSTANT.import}
            </Button>
            {isLoading && (
              <div className={linerLoaderClasses.root}>
                <LinearProgress />
              </div>
            )}

            <CustomModal
              open={Boolean(message)}
              message={`${message} \n ${errors.api ? errors.api : ''}`}
              isButton={true}
              buttonText={'Goto Pokerboard'}
              handleOnClick={() => {
                dispatch(fetchPokerboardDetails(id));
                history.replace(`${ROUTE.pokerboardOnly}${id}`);
              }}
            />
            {errors && errors.api ? (
              <div className="container">
                <h3>{errors.api}</h3>
              </div>
            ) : (
              <Card>
                <CardContent>
                  {ticketOptions.map((ele) => {
                    return <JiraTicket key={ele.id} data={ele} />;
                  })}
                </CardContent>
              </Card>
            )}

            <div className="pgn">
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                disabled={isFirstPage || isLoading}
                onClick={() => handleClick(CONSTANT.prev)}
              >
                {CONSTANT.prev}
              </Button>
              <Typography>{pageNo}</Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                disabled={isLastPage || isLoading}
                onClick={() => handleClick(CONSTANT.next)}
              >
                {CONSTANT.next}
              </Button>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              disabled={selectedTickets.length == 0 || isLoading}
              onClick={addTicketsToPokerboard}
            >
              {CONSTANT.save}
            </Button>
          </Grid>
        </div>
      ) : (
        <div className="container">
          <h3>{ERROR.accessDenied}</h3>
        </div>
      )}
    </>
  );
}

export default ImportTicket;
