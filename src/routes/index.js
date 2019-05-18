import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  try {
    decode(token);
  } catch (error) {
    return false;
  }
  return true;
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
}

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
      <PrivateRoute path='/create-team' exact component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);
