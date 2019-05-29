import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Comment } from 'semantic-ui-react';
import { gql } from 'apollo-boost';

import Message from '../components/Message';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

const DIRECT_MESSAGES_SUBSCRIPTION = gql`
  subscription($teamId: ID!, $userId: ID!) {
    directMessageCreated(teamId: $teamId, userId: $userId) {
      id
      text
      sender {
        username
      }
      createdAt
    }
  }
`;

export default function DirectMessageContainer({
  teamId,
  userId,
  subscribeToMore,
  loading,
  error,
  data: { directMessages = [] },
}) {
  useEffect(() => {
    console.log('we are subscribed');
    // subscribeToMore returns an unsubsribe function
    const unsubscribe = subscribeToMore({
      document: DIRECT_MESSAGES_SUBSCRIPTION,
      variables: { teamId, userId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          directMessages: [
            ...prev.directMessages,
            subscriptionData.data.directMessageCreated,
          ],
        };
      },
    });

    return () => unsubscribe();
  }, [teamId, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Wrapper>
      <Comment.Group>
        {directMessages.map(message => (
          <Message
            key={`message-${message.id}`}
            username={message.sender.username}
            createdAt={message.createdAt}
            text={message.text}
          />
        ))}
      </Comment.Group>
    </Wrapper>
  );
}
