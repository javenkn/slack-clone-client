import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Comment } from 'semantic-ui-react';

import Message from '../components/Message';
import FileUpload from '../components/FileUpload';
import { CREATE_FILE_MESSAGE } from '../graphql/fileMessage';

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

export default function MessageContainer({
  channelId,
  subscribeToMore,
  loading,
  error,
  data: { messages = [] },
}) {
  useEffect(() => {
    // subscribeToMore returns an unsubsribe function
    const unsubscribe = subscribeToMore({
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

    return () => unsubscribe();
  }, [channelId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Wrapper>
      <Mutation mutation={CREATE_FILE_MESSAGE}>
        {(createMessage, { data }) => (
          <FileUpload
            noClick
            createMessage={createMessage}
            channelId={channelId}
          >
            <Comment.Group>
              {messages.map(message => (
                <Message
                  key={`message-${message.id}`}
                  username={message.user.username}
                  createdAt={message.createdAt}
                  text={message.text}
                />
              ))}
            </Comment.Group>
          </FileUpload>
        )}
      </Mutation>
    </Wrapper>
  );
}
