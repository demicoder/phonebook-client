import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { AuthContext } from '../../context/auth/authState';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !loading ? <Redirect to="/login" /> : <Component {...rest} />
      }
    />
  );
};

export default withRouter(PrivateRoute);
