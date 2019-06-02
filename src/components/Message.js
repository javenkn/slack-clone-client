import React from 'react';
import { Comment } from 'semantic-ui-react';
import RenderText from './TextFile';

const MessageType = ({ url, text, fileType }) => {
  if (url) {
    if (fileType.startsWith('image/')) {
      return <img src={url} alt='' />;
    } else if (fileType === 'text/plain') {
      return <RenderText url={url} />;
    } else if (fileType.startsWith('audio/')) {
      return (
        <div>
          <audio controls>
            <source src={url} type={fileType} />
          </audio>
        </div>
      );
    }
  }
  return <Comment.Text>{text}</Comment.Text>;
};

export default function Message({ username, createdAt, ...message }) {
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{username}</Comment.Author>
        <Comment.Metadata>
          <div>Today at {createdAt}</div>
        </Comment.Metadata>
        <MessageType {...message} />
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}
