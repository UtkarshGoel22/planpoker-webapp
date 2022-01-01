import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Backdrop,
  Button,
  CardContent,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { LABEL, ROUTE } from '../constants/constant';
import { PokerboardUserType } from '../redux/interfacesAndTypes';
import { RootState } from '../redux/store';
import { pokerboardMain } from '../styles/pokerboardStyle';
import ListPokerboardGroup from './ListPokerboardGroup';
import ListPokerboardUser from './ListPokerboardUsers';
import PokerboardTickets from './PokerboardTickets';
import UserDetail from './UserDetailComponent';
import { useHistory, useParams } from 'react-router';
import { PokerBoardStatus } from '../constants/pokerboardTypes';
import { fetchPokerboardDetails } from '../redux/actions/pokerboardActions';
import { PokerboardParams } from './PokerBoardComponent';
import { getStatusMessageOfPokerboard } from '../utils/utils.pokerboard';

const PokerboardDetail = () => {
  const classes = pokerboardMain();
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams<PokerboardParams>();
  const { err, loading, data } = useSelector(
    (state: RootState) => state.pokerboardDetail
  );

  useEffect(() => {
    dispatch(fetchPokerboardDetails(id));
  }, [history]);

  return (
    <>
      <Grid container className={classes.root}>
        {data && (
          <>
            <div className={classes.center}>
              <h1>Welcome to {data.name} game</h1>
            </div>
            <Grid container>
              <Grid className={classes.item} item xs={3}>
                <CardContent>
                  <Grid spacing={3} container direction="column">
                    <UserDetail
                      heading={LABEL.boardName}
                      subheading={data.name}
                    />
                    <UserDetail
                      heading={LABEL.deckType}
                      subheading={data.deckType}
                    />
                    <UserDetail
                      heading={LABEL.status}
                      subheading={getStatusMessageOfPokerboard(data.status)}
                    />

                    <UserDetail
                      heading={LABEL.createdBy}
                      subheading={getManagerName(data.manager, data.users)}
                    />

                    <UserDetail
                      heading={LABEL.totalGroups}
                      subheading={`${data.groups.length}`}
                    />
                    <UserDetail
                      heading={LABEL.totalMember}
                      subheading={`${data.users.length}`}
                    />
                  </Grid>
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <PokerboardTickets />
                <Button
                  className={classes.center}
                  disabled={data?.status != PokerBoardStatus.ENDED}
                  color="secondary"
                  onClick={() => {
                    history.push(`${ROUTE.report}?pokerboardId=${data?.id}`);
                  }}
                >
                  Show Reports
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Grid className={classes.item} item>
                  <div className={classes.itemContainer}>
                    <ListPokerboardUser
                      users={data.users}
                      managerId={data.manager}
                    />
                  </div>
                </Grid>
                <Grid className={classes.item} item>
                  <div className={classes.itemContainer}>
                    <ListPokerboardGroup
                      groups={data.groups}
                      managerId={data.manager}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.center}>
              <Button
                disabled={
                  data.tickets.length === 0 ||
                  data.status === PokerBoardStatus.ENDED
                }
                onClick={() => {
                  history.push(
                    `${ROUTE.pokerboardOnly}${data?.id}${ROUTE.gamePageOnly}`
                  );
                }}
                color="secondary"
              >
                {data.status === PokerBoardStatus.CREATED && LABEL.gotoGame}
                {data.status === PokerBoardStatus.STARTED && LABEL.resumeGame}
                {data.status === PokerBoardStatus.ENDED && LABEL.gameEnded}
              </Button>
            </div>
          </>
        )}
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </>
  );
};

const getManagerName = (managerId: string, users: PokerboardUserType[]) => {
  return users.filter((user) => user.userId === managerId)[0].name;
};

export default PokerboardDetail;
