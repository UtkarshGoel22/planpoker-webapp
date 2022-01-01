import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE } from '../constants/route';
import { RootState } from '../redux/store';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { token } = useSelector((store: RootState) => store.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to={ROUTE.signin} />
      }
    />
  );
};

export default PrivateRoute;
