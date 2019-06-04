import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Comment, Button } from 'semantic-ui-react';

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
  fetchMore,
  loading,
  error,
  data: { messages = [] },
}) {
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
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
            {hasMoreMessages && (
              <Button
                onClick={() =>
                  fetchMore({
                    variables: {
                      channelId,
                      offset: messages.length,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return previousResult;
                      }

                      if (fetchMoreResult.messages.length < 35) {
                        setHasMoreMessages(false);
                      }

                      return {
                        ...previousResult,
                        messages: [
                          ...previousResult.messages,
                          ...fetchMoreResult.messages,
                        ],
                      };
                    },
                  })
                }
              >
                Load More
              </Button>
            )}
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
