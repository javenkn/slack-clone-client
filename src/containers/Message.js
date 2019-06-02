import React, { useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Comment } from 'semantic-ui-react';

import Message from '../components/Message';
import FileUpload from '../components/FileUpload';
import { CREATE_FILE_MESSAGE } from '../graphql/fileMessage';

const MESSAGES_SUBSCRIPTION = gql`
  subscription($channelId: ID!) {
    messageCreated(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
      url
      fileType
    }
  }
`;

const fileUploadStyles = {
  gridColumn: 3,
  gridRow: 2,
  paddingLeft: '20px',
  display: 'flex',
  flexDirection: 'column-reverse',
  overflowY: 'auto',
};

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
    <Mutation mutation={CREATE_FILE_MESSAGE}>
      {(createMessage, { data }) => (
        <FileUpload
          noClick
          createMessage={createMessage}
          channelId={channelId}
          style={fileUploadStyles}
        >
          <Comment.Group>
            {messages.map(message => (
              <Message
                key={`message-${message.id}`}
                username={message.user.username}
                {...message}
              />
            ))}
          </Comment.Group>
        </FileUpload>
      )}
    </Mutation>
  );
}
