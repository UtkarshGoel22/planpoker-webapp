import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Backdrop from '@material-ui/core/Backdrop';
import {
  AUTH_ACTIONS,
  CONSTANT,
  ERROR,
  LABEL,
  ROUTE,
  SUCCESS_MESSAGE,
} from '../constants/constant';
import UserDetail from './UserDetailComponent';
import { RootState } from '../redux/store';
import { myProfileStyle } from '../styles/myProfileStyle';
import { fetchUserActionCreator } from '../redux/actions/userActions';
import { modalStyles } from '../styles/style';
import EditProfileDetail from './EditProfileDetail';

// type EditDetailErrors = {
//   password: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
// };

// type EditUserDetailType = {
//   email: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
// };

const MyProfile = () => {
  let classes = myProfileStyle();
  const modalClasses = modalStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const profileDetails = useSelector(
    (store: RootState) => store.profileDetails
  );
  const { token } = useSelector((store: RootState) => store.auth);
  const [isEditSuccess, setIsEditSuccess] = useState<boolean | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUserActionCreator());
  }, []);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid className={classes.userDetailContainer} item xs={6}>
          {profileDetails.err ? (
            <Modal
              open={true}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={modalClasses.paper}>
                <h2 className={modalClasses.gap}>
                  {ERROR.sessionExpired} {profileDetails.err}
                </h2>
                <button
                  className="btn"
                  type="button"
                  onClick={(e) => {
                    dispatch({ type: AUTH_ACTIONS.logoutUser });
                  }}
                >
                  {CONSTANT.signIn}
                </button>
              </div>
            </Modal>
          ) : (
            <div>
              <Card className={classes.card}>
                <CardHeader
                  title={`${profileDetails.data?.firstName} ${profileDetails.data?.lastName}`}
                  subheader={`@${profileDetails.data?.userName}`}
                />
                <CardContent>
                  <Grid spacing={3} container direction="column">
                    {!isEditable && (
                      <>
                        <UserDetail
                          heading={LABEL.name}
                          subheading={`${profileDetails.data?.firstName} ${profileDetails.data?.lastName}`}
                        />
                        <UserDetail
                          heading={LABEL.email}
                          subheading={`${profileDetails.data?.email}`}
                        />
                        <UserDetail
                          heading={LABEL.username}
                          subheading={`${profileDetails.data?.userName}`}
                        />
                        <UserDetail
                          heading={LABEL.cardsEstimate}
                          subheading={`${profileDetails.data?.ticketsEstimated}`}
                        />

                        <Fab
                          onClick={(e) => {
                            setIsEditable((state) => !state);
                          }}
                          color="primary"
                          className={classes.fab}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </Fab>
                      </>
                    )}
                    {isEditable && (
                      <>
                        <EditProfileDetail
                          setIsEditable={setIsEditable}
                          setIsEditSuccess={setIsEditSuccess}
                        />
                      </>
                    )}

                    {isEditSuccess && (
                      <SnackBar
                        className={classes.snackbarStyle}
                        open={isEditSuccess}
                        autoHideDuration={6000}
                        onClose={() => setIsEditSuccess(null)}
                      >
                        <Alert
                          onClose={() => setIsEditSuccess(null)}
                          severity="success"
                        >
                          {SUCCESS_MESSAGE.detailsUpdatedSuccessfully}
                        </Alert>
                      </SnackBar>
                    )}

                    {isEditSuccess === false && (
                      <SnackBar
                        className={classes.snackbarStyle}
                        open={isEditSuccess === false}
                        autoHideDuration={6000}
                        onClose={() => setIsEditSuccess(null)}
                      >
                        <Alert
                          onClose={() => setIsEditSuccess(null)}
                          severity="error"
                        >
                          {ERROR.somethingWentWrong}
                        </Alert>
                      </SnackBar>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </div>
          )}
        </Grid>
        <Backdrop className={classes.backdrop} open={profileDetails.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
      <div className="container">
        {profileDetails.data?.ticketsEstimated ? (
          profileDetails.data.ticketsEstimated > 0 ? (
            <Button
              className="center"
              color="secondary"
              onClick={() => {
                history.push(`${ROUTE.report}`);
              }}
            >
              Show Reports
            </Button>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default MyProfile;
