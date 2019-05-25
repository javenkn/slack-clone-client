import React, { useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { Comment } from 'semantic-ui-react';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription($channelId: ID!) {
    messageCreated(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export default function MessageList({ messages, channelId, subscribeToMore }) {
  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.messageCreated],
        };
      },
    });
  }, []);
  return (
    <Wrapper>
      <Comment.Group>
        {messages.map((message, i) => (
          <Comment key={`message-${i}`}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{message.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>Today at {message.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{message.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Wrapper>
  );
}
