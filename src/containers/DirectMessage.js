import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Comment } from 'semantic-ui-react';

import Message from '../components/Message';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

export default function DirectMessageContainer({
  teamId,
  userId,
  subscribeToMore,
  loading,
  error,
  data: { directMessages = [] },
}) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // useEffect(() => {
  //   // subscribeToMore returns an unsubsribe function
  //   const unsubscribe = subscribeToMore({
  //     document: MESSAGES_SUBSCRIPTION,
  //     variables: { channelId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       return {
  //         ...prev,
  //         messages: [...prev.messages, subscriptionData.data.messageCreated],
  //       };
  //     },
  //   });

  //   return () => unsubscribe();
  // }, [channelId]);

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
