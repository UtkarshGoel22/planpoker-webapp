import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, List } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SaveOutlined } from '@material-ui/icons';
import { PokerboardUserType } from '../redux/interfacesAndTypes';
import PokerboardUserCard from './PokerboardUserCard';
import { ERROR, LABEL, SUCCESS_MESSAGE } from '../constants/constant';
import { RootState } from '../redux/store';
import { pokerboardListStyle } from '../styles/pokerboardListStyle';
import { ROLE_TYPE } from '../constants/pokerboardTypes';
import { pokerboardItemHeaderStyle } from '../styles/pokerboardStyle';
import BackDropLoader from './BackDropLoader';
import SnackbarComponent from './SnackbarComponent';
import { updateRoleHelper } from '../utils/fetchHelper';

type ListUsersProp = {
  users: PokerboardUserType[];
  managerId: string;
};

const ListPokerboardUser = (props: ListUsersProp) => {
  const classes = pokerboardListStyle();
  const { userId, token } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState(props.users);
  const [isRoleChanged, setIsRoleChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState<any>(undefined);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  const handleRoleChange = (index: number, role: ROLE_TYPE) => {
    users[index].role = role;
    setIsRoleChanged(true);
    setUsers([...users]);
  };

  const handleOnSave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true);
    // todo update users
    updateRoleOFUser()
      .then(() => {
        setError(undefined);
        setIsRoleChanged(false);
        setIsOpenSnack(true);
      })
      .catch((e) => {
        console.log('e');
        setIsOpenSnack(true);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateRoleOFUser = async () => {
    if (!users || !token || !data) {
      return;
    }

    const userDetailsToSend = users.map((user) => {
      return {
        userId: user.userId,
        role: user.role,
      };
    });

    await updateRoleHelper(data.id, userDetailsToSend, token);
  };

  return (
    <>
      <Paper>
        <div style={pokerboardItemHeaderStyle}>
          <Typography className={classes.p20} variant="h6">
            {LABEL.users}
          </Typography>
          {isRoleChanged && (
            <Button
              startIcon={<SaveOutlined />}
              title={'Save'}
              onClick={handleOnSave}
            >
              {LABEL.saveChanges}
            </Button>
          )}
        </div>
        <div className={classes.listContainer}>
          <List>
            {users.map((user, index) => (
              <PokerboardUserCard
                index={index}
                onRoleChange={handleRoleChange}
                name={user.name}
                inviteStatus={user.inviteStatus}
                role={user.role}
                key={user.userId}
                isManager={userId === props.managerId}
              />
            ))}
          </List>
        </div>
      </Paper>

      <SnackbarComponent
        message={
          err
            ? `${ERROR.somethingWentWrong}`
            : `${SUCCESS_MESSAGE.updatedSuccessfully}`
        }
        success={err ? false : true}
        open={isOpenSnack}
        onClose={() => setIsOpenSnack(false)}
      />

      <BackDropLoader open={isLoading} />
    </>
  );
};

export default ListPokerboardUser;
