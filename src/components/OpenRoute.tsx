import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE } from '../constants/constant';
import { RootState } from '../redux/store';

const OpenRoute = ({ component: Component, ...rest }: any) => {
  const { token } = useSelector((store: RootState) => store.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to={ROUTE.dashboard} /> : <Component {...props} />
      }
    />
  );
};

export default OpenRoute;
