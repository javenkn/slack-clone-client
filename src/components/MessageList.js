import React from 'react';
import styled from 'styled-components';
import { Comment } from 'semantic-ui-react';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
`;

export default function MessageList({ messages }) {
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
