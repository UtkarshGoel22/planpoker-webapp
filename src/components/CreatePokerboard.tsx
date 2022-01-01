import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { dashboardStyles, loaderStyles } from '../styles/style';
import {
  createPokerboardInputType,
  PokerboardErrorType,
  validatePokerboard,
} from '../utils/utils.pokerboard';
import SearchGroup from './SearchGroup';
import SearchUser from './SearchUser';
import {
  CONSTANT,
  ERROR,
  LABEL,
  ROUTE,
  SUCCESS_MESSAGE,
} from '../constants/constant';
import { RootState } from '../redux/store';
import { setSearchUserError } from '../redux/actions/searchUserActions';
import { setSearchGroupError } from '../redux/actions/searchGroupActions';
import { createPokerboard } from '../redux/actions/pokerboardActions';
import CustomModal from './CustomModal';

function CreatePokerboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState('');
  const [deck, setDeck] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<PokerboardErrorType>({});
  const [loading, setLoading] = useState(false);
  const classes = dashboardStyles();
  const loaderClasses = loaderStyles();
  const [pokerBoardId, setPokerboardId] = useState('');

  const { userId, token } = useSelector((store: RootState) => store.auth);
  const { options, selectedOptions } = useSelector(
    (store: RootState) => store.searchUser
  );
  const {
    options: groupOptions,
    selectedOptions: selectedGroupOptions,
  } = useSelector((store: RootState) => store.searchGroup);

  function createPokerboardCallback(success: boolean, data: any) {
    setLoading(false);

    if (success) {
      setShowModal(true);
      setPokerboardId(data.id);
    } else {
      setShowModal(false);
      if (data) {
        if (data.api) {
          setErrors({
            ...errors,
            somethingWentWrong: data.api,
          });
        }
        if (data.name) {
          setErrors({
            ...errors,
            name: data.name,
          });
        }
      }
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    const validatePokerboardResult = validatePokerboard({
      boardName,
      selectedOptions,
      selectedGroupOptions,
    });
    const { validationError, noError } = validatePokerboardResult;
    if (noError) {
      setErrors({});
      let requestBody: { [k: string]: any } = {
        name: boardName,
        manager: userId,
        deckType: deck,
        users: selectedOptions.map((user) => {
          return {
            id: user.id,
            email: user.email,
          };
        }),
        groups: selectedGroupOptions.map((group) => group.id),
      };
      let createPokerboardInput: createPokerboardInputType = {
        token,
        body: requestBody,
      };
      dispatch(setSearchUserError(undefined));
      dispatch(setSearchGroupError(undefined));
      dispatch(
        createPokerboard(createPokerboardInput, createPokerboardCallback)
      );
    } else {
      if (validationError.name) {
        setErrors({
          ...errors,
          name: ERROR.pokerboardNameCharactersError,
        });
      }
      if (validationError.users) {
        dispatch(setSearchUserError(ERROR.memberShouldAtLeastBeTwo));
      }
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={4} className={classes.root}>
          <Card className={classes.card}>
            <Typography component="h1" variant="h5" align="center">
              {CONSTANT.createPokerboard}
            </Typography>

            <CardContent>
              <Grid className={classes.item}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label={LABEL.boardName}
                  autoFocus
                  value={boardName}
                  onChange={(event) => {
                    let value = event.target.value;
                    setBoardName(value ? value.trim() : '');
                  }}
                  error={Boolean(errors?.name)}
                  helperText={errors?.name}
                />
              </Grid>
              <FormControl
                variant="outlined"
                className={classes.item}
                fullWidth
                required
              >
                <InputLabel id="deck-type">{LABEL.deckType}</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="deck-type"
                  value={deck}
                  onChange={(event) => setDeck(event.target.value as string)}
                  label={LABEL.deckType}
                >
                  <MenuItem value={CONSTANT.serial}>{CONSTANT.serial}</MenuItem>
                  <MenuItem value={CONSTANT.even}>{CONSTANT.even}</MenuItem>
                  <MenuItem value={CONSTANT.odd}>{CONSTANT.odd}</MenuItem>
                  <MenuItem value={CONSTANT.fibonacci}>
                    {CONSTANT.fibonacci}
                  </MenuItem>
                </Select>
              </FormControl>
              <SearchUser customInput={true} widthInput={true} />
              <SearchGroup />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={<AddCircle />}
              >
                {loading && (
                  <CircularProgress
                    size={24}
                    className={loaderClasses.buttonProgress}
                  />
                )}
                {CONSTANT.createPokerboard}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </form>
      <div className="container">
        <h3>{errors?.somethingWentWrong}</h3>
      </div>
      {showModal && (
        <CustomModal
          open={true}
          handleOnClick={() => {
            history.replace(`${ROUTE.pokerboardOnly}${pokerBoardId}`);
          }}
          message={SUCCESS_MESSAGE.pokerboardCreatedSuccessfully}
          buttonText={`${CONSTANT.goto} ${CONSTANT.gotoPokerboard}`}
        />
      )}
    </>
  );
}

export default CreatePokerboard;
