import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import PrivateRoute from './Private';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
      <PrivateRoute
        path='/view-team/:teamId?/:channelId?'
        exact
        component={ViewTeam}
      />
      <PrivateRoute path='/create-team' exact component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);
