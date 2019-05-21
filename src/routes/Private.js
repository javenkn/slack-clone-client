import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Query query={IS_LOGGED_IN}>
      {({ data }) =>
        data.isLoggedIn ? (
          <Route {...rest} render={props => <Component {...props} />} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    </Query>
  );
}
