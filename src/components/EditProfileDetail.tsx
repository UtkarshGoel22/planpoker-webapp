import React, { FormEventHandler, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { LABEL } from '../constants/constant';
import { myProfileStyle } from '../styles/myProfileStyle';
import { RootState } from '../redux/store';
import { fetchUserActionCreator } from '../redux/actions/userActions';
import { loaderStyles } from '../styles/style';
import {
  updateUserDetails,
  validateEditDetails,
} from '../services/user.profile.services';

type propsType = {
  setIsEditable: Function;
  setIsEditSuccess: Function;
};

export type EditUserDetailType = {
  firstName: string;
  lastName: string;
  userName: string;
};

export type EditDetailErrors = {
  firstName: string;
  lastName: string;
  username: string;
  somethingWentWrong?: string;
};

const EditProfileDetail = ({ setIsEditable, setIsEditSuccess }: propsType) => {
  const [editDetails, setEditDetails] = useState<EditUserDetailType>(
    {} as EditUserDetailType
  );
  const dispatch = useDispatch();
  const profileDetails = useSelector(
    (store: RootState) => store.profileDetails
  );
  const loaderClasses = loaderStyles();
  let { token } = useSelector((store: RootState) => store.auth);
  const classes = myProfileStyle();
  const [error, setError] = useState<EditDetailErrors>({
    firstName: '',
    lastName: '',
    username: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileDetails.data) {
      setEditDetails({
        firstName: profileDetails.data?.firstName,
        lastName: profileDetails.data?.lastName,
        userName: profileDetails.data?.userName,
      });
    }
  }, []);

  const sendEditRequest = () => {
    if (!token) {
      return;
    }
    setIsLoading(true);
    let { firstName, lastName, userName } = editDetails;
    updateUserDetails({ firstName, lastName, userName }, token)
      .then((data) => {
        dispatch(fetchUserActionCreator());
        setIsEditSuccess(true);
        setIsEditable((state: boolean) => !state);
      })
      .catch((e) => {
        if (e.somethingWentWrong) {
          setIsEditSuccess(false);
        }
        setError({ ...error, ...e });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let validationError = validateEditDetails(editDetails);
    if (!validationError) {
      sendEditRequest();
    } else setError({ ...validationError });
  };

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <TextField
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label={LABEL.firstName}
          autoFocus
          defaultValue={profileDetails.data?.firstName}
          onChange={(event) => {
            setEditDetails({
              ...editDetails,
              firstName: event.currentTarget.value,
            } as EditUserDetailType);
          }}
          error={Boolean(error?.firstName)}
          helperText={error?.firstName}
        />
        <TextField
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label={LABEL.lastName}
          autoFocus
          defaultValue={profileDetails.data?.lastName}
          onChange={(event) => {
            setEditDetails({
              ...editDetails,
              lastName: event.currentTarget.value,
            } as EditUserDetailType);
          }}
          error={Boolean(error?.lastName)}
          helperText={error?.lastName}
        />
        <TextField
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label={LABEL.username}
          autoFocus
          defaultValue={profileDetails.data?.userName}
          onChange={(event) => {
            setEditDetails({
              ...editDetails,
              userName: event.currentTarget.value,
            } as EditUserDetailType);
          }}
          error={Boolean(error?.username)}
          helperText={error?.username}
        />
        <Fab
          disabled={isLoading}
          type="submit"
          color="secondary"
          className={classes.fab}
          aria-label="save"
        >
          {isLoading && (
            <CircularProgress
              size={24}
              className={loaderClasses.buttonProgress}
            />
          )}
          <SaveIcon />
        </Fab>
      </form>
    </>
  );
};

export default EditProfileDetail;
