import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  useParams,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { CONSTANT, ROUTE } from '../constants/constant';
import { fetchPokerboardDetails } from '../redux/actions/pokerboardActions';
import { RootState } from '../redux/store';
import ImportTicket from './ImportTickets';
import PokerboardDetail from './PokerboardDetail';
import GamePage from './GameComponents/GamePage';
import { socket, SocketContext } from '../context/socket';
import LineGraph from './LineGraph';
import CustomModal from './CustomModal';

export type PokerboardParams = {
  id: string;
};

const PokerBoardComponent = () => {
  let { id } = useParams<PokerboardParams>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { err, loading, data } = useSelector(
    (state: RootState) => state.pokerboardDetail
  );

  const [errMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchPokerboardDetails(id));
  }, [id]);

  useEffect(() => {
    if (err) {
      for (let obj in err) {
        setErrorMessage(err[obj]);
      }
    }
  }, [err]);

  return (
    <>
      {err && (
        <>
          <CustomModal
            open={true}
            message={errMessage ? errMessage : ''}
            buttonText={CONSTANT.goToHome}
            isButton={true}
            handleOnClick={() => {
              history.push(ROUTE.dashboard);
            }}
          />
        </>
      )}
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Switch>
            <Route component={PokerboardDetail} exact path={ROUTE.pokerboard} />
            <Route component={ImportTicket} exact path={ROUTE.importTicket} />
            <Route component={GamePage} exact path={ROUTE.gamePage} />
            <Route component={LineGraph} exact path={ROUTE.report} />
          </Switch>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
};

export default PokerBoardComponent;
