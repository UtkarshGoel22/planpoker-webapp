import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Verify from './components/Verify';
import { ROUTE } from './constants/route';
import OpenRoute from './components/OpenRoute';
import PrivateRoute from './components/PrivateRoute';
import MyProfile from './components/MyProfile';
import CreateGroup from './components/CreateGroup';
import CreatePokerboard from './components/CreatePokerboard';
import AcceptInvite from './components/AcceptInvite';
import PokerBoardComponent from './components/PokerBoardComponent';
import { navStyles, useStyles } from './styles/style';
import ListGroupForUser from './components/ListGroups/ListGroupForUser';
import ListTicketForUser from './components/ListTickets/ListTicketForUser';
import LineGraph from './components/LineGraph';

function App() {
  const navClasses = navStyles();
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTE.notFound} component={NotFound} />
        <Route>
          <div className={navClasses.root}>
            <Navbar />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <OpenRoute exact path={ROUTE.home} component={Home} />
                <OpenRoute exact path={ROUTE.signup} component={Signup} />
                <OpenRoute exact path={ROUTE.signin} component={Signin} />
                <OpenRoute exact path={ROUTE.verify} component={Verify} />
                <PrivateRoute
                  exact
                  path={ROUTE.dashboard}
                  component={Dashboard}
                />
                <PrivateRoute
                  exact
                  path={ROUTE.myProfile}
                  component={MyProfile}
                />
                <PrivateRoute
                  exact
                  path={ROUTE.createGroup}
                  component={CreateGroup}
                />
                <PrivateRoute
                  exact
                  path={ROUTE.createPokerboard}
                  component={CreatePokerboard}
                />
                <PrivateRoute
                  path={ROUTE.pokerboard}
                  component={PokerBoardComponent}
                />
                <PrivateRoute
                  exact
                  path={ROUTE.acceptInvite}
                  component={AcceptInvite}
                />
                <PrivateRoute
                  exact
                  path={ROUTE.groupPage}
                  component={ListGroupForUser}
                />
                <PrivateRoute
                  exact
                  path={ROUTE.tickets}
                  component={ListTicketForUser}
                />
                <PrivateRoute exact path={ROUTE.report} component={LineGraph} />
                <Redirect to={ROUTE.notFound} />
              </Switch>
            </main>
          </div>
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
