import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { CONSTANT, LABEL, ROUTE, SUCCESS_MESSAGE } from '../constants/constant';
import { RootState } from '../redux/store';
import { createGroupStyles } from '../styles/createGroupStyle';
import { loaderStyles } from '../styles/style';
import SearchUser from './SearchUser';
import { setSearchUserError } from '../redux/actions/searchUserActions';
import CustomModal from './CustomModal';
import {
  createGroupService,
  validateGroupService,
} from '../services/group.services';

export type GroupErrorType = {
  groupName?: string;
  somethingWentWrong?: string;
  members?: string;
};

const CreateGroup = () => {
  const classes = createGroupStyles();
  const loaderClasses = loaderStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const { userId, token } = useSelector((store: RootState) => store.auth);
  const { selectedOptions } = useSelector(
    (store: RootState) => store.searchUser
  );
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState<GroupErrorType>({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /**
   * This function makes a post request to create a new group and an error is displayed
   * it some error occurs
   */
  const createGroup = async () => {
    setError({});
    setLoading(true);
    try {
      if (!userId || !token) return;
      await createGroupService(userId, groupName, selectedOptions, token);
      setShowModal(true);
      setLoading(false);
    } catch (error) {
      setShowModal(false);
      setError({ ...(error as GroupErrorType) });
      setLoading(false);
    }
  };

  const handleOnGroupCreateSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    validateGroupService(
      groupName,
      selectedOptions,
      (errorMessage) => {
        dispatch(setSearchUserError(errorMessage));
      },
      (errorData) => {
        setError({ ...errorData });
      }
    )
      .then(() => {
        createGroup();
      })
      .catch(() => {});
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={9} className={classes.groupContainer}>
          <form onSubmit={handleOnGroupCreateSubmit}>
            <TextField
              variant="outlined"
              required
              type="text"
              margin="normal"
              fullWidth
              label={LABEL.groupName}
              autoFocus
              value={groupName}
              onChange={(event) => {
                let value = event.target.value;
                setGroupName(value ? value.trim() : '');
              }}
              error={Boolean(error?.groupName)}
              helperText={error?.groupName}
            />
            <Card className={classes.card}>
              <CardHeader title={CONSTANT.addMemberToGroupTitle} />
              <CardContent>
                <SearchUser customInput={false} widthInput={false} />
              </CardContent>
            </Card>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={<NavigateNext />}
            >
              {loading && (
                <CircularProgress
                  size={24}
                  className={loaderClasses.buttonProgress}
                />
              )}
              {CONSTANT.createGroup}
            </Button>
          </form>
          <div className="container">
            <h3>{error?.somethingWentWrong}</h3>
          </div>
        </Grid>
      </Grid>
      {showModal && (
        <CustomModal
          open={true}
          handleOnClick={() => {
            history.replace(ROUTE.dashboard);
          }}
          message={SUCCESS_MESSAGE.groupCreatedSuccessfully}
          buttonText={`Goto ${CONSTANT.dashboard}`}
        />
      )}
    </>
  );
};

export default CreateGroup;
