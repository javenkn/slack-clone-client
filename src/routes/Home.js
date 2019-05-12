import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

export default function Home() {
  return (
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

        return allUsers.map((user, i) => (
          <h1 key={`user-${i}`}>{user.email}</h1>
        ));
      }}
    </Query>
  );
}
