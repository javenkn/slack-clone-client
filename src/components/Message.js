import React from 'react';
import { Comment } from 'semantic-ui-react';

export default function Message({ username, createdAt, text }) {
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{username}</Comment.Author>
        <Comment.Metadata>
          <div>Today at {createdAt}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}
