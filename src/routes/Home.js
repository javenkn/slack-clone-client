import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

export default () => (
  <Query
    query={gql`
      {
        allUsers {
          id
          email
        }
      }
    `}
  >
    {({ loading, error, data: { allUsers = [] } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return allUsers.map(user => <h1 key={user}>{user.email}</h1>);
    }}
  </Query>
);
