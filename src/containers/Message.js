import React, { useState, useRef, useEffect } from 'react';
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
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '0 20px 20px',
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
  const scroller = useRef(null);
  const [receivedNewMessage, setReceivedNewMessage] = useState(false);
  const handleScroll = () => {
    if (
      scroller.current &&
      scroller.current.scrollTop === 0 &&
      hasMoreMessages &&
      messages.length >= 35
    ) {
      fetchMore({
        variables: {
          channelId,
          cursor: messages.slice(-1)[0].createdAt,
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
            messages: [...previousResult.messages, ...fetchMoreResult.messages],
          };
        },
      });
    }
  };
  useEffect(() => {
    // subscribeToMore returns an unsubsribe function
    const unsubscribe = subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // received a new message
        setReceivedNewMessage(true);
        return {
          ...prev,
          messages: [subscriptionData.data.messageCreated, ...prev.messages],
        };
      },
    });
    return () => unsubscribe();
  }, [channelId]);

  useEffect(() => {
    if (receivedNewMessage) {
      // scroll to the bottom
      scroller.current.scrollTop = scroller.current.scrollHeight;
      // reset new message state
      setReceivedNewMessage(false);
    }
  }, [messages]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Mutation mutation={CREATE_FILE_MESSAGE}>
      {(createMessage, { data }) => (
        <div style={fileUploadStyles} ref={scroller} onScroll={handleScroll}>
          <FileUpload
            noClick
            createMessage={createMessage}
            channelId={channelId}
          >
            <Comment.Group>
              {[...messages].reverse().map(message => (
                <Message
                  key={`message-${message.id}`}
                  username={message.user.username}
                  {...message}
                />
              ))}
            </Comment.Group>
          </FileUpload>
        </div>
      )}
    </Mutation>
  );
}
