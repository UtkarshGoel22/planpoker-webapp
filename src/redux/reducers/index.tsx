import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { gameReducer } from './gameReducer';
import { graphDataReducer } from './graphDataReducer';
import { groupReducer } from './groupsReducer';
import pokerboardDetailReducer from './pokerboardDetailReducer';
import searchGroupReducer from './searchGroupReducer';
import searchUserReducer from './searchUserReducer';
import ticketsReducer from './ticketsReducer';
import { userDataReducer } from './userReducers';
import { userTicketReducer } from './userTicketReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profileDetails: userDataReducer,
  searchUser: searchUserReducer,
  searchGroup: searchGroupReducer,
  pokerboardDetail: pokerboardDetailReducer,
  tickets: ticketsReducer,
  currentGame: gameReducer,
  userGroups: groupReducer,
  userTickets: userTicketReducer,
  graph: graphDataReducer,
});

export default rootReducer;
