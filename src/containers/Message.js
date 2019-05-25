import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import MessageList from '../components/MessageList';

const GET_MESSAGES = gql`
  query($channelId: ID!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export default function MessageContainer({ channelId }) {
  return (
    <Query query={GET_MESSAGES} variables={{ channelId }}>
      {({ loading, error, data: { messages = [] } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <div>
            MESSAGE CONTAINER
            <MessageList channelId={channelId} />
          </div>
        );
      }}
    </Query>
  );
}