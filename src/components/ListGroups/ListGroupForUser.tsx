import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ROUTE } from '../../constants/route';
import { fetchGroupsActionCreator } from '../../redux/actions/listGroupActions';
import { RootState } from '../../redux/store';
import { listGroupStyle } from '../../styles/listGroupStyle';
import BackDropLoader from '../BackDropLoader';
import CustomModal from '../CustomModal';
import GroupDetail from './GroupDetail';

const ListGroupForUser = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { error, loading, groups } = useSelector(
    (state: RootState) => state.userGroups
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchGroupsActionCreator());
  }, [history, userId]);

  const classes = listGroupStyle();
  return (
    <>
      <h1 className={classes.listHeader}>List of Groups</h1>
      <div className={classes.listContainer}>
        {groups.map((group) => (
          <GroupDetail
            key={group.id}
            admin={group.admin}
            membersCount={group.countOfMembers}
            groupName={group.name}
            users={group.members}
          />
        ))}
      </div>
      <CustomModal
        open={Boolean(error)}
        message={error ? error : ''}
        buttonText={'Goto Home'}
        isButton={true}
        handleOnClick={() => {
          history.push(ROUTE.dashboard);
        }}
      />
      <BackDropLoader open={loading} />
    </>
  );
};

export default ListGroupForUser;
