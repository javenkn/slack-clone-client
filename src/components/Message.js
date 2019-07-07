import React from 'react';
import { Comment } from 'semantic-ui-react';
import TextFile from './TextFile';

const MessageType = ({ url, text, fileType }) => {
  if (url) {
    if (fileType.startsWith('image/')) {
      return (
        <div>
          <img src={url} alt='' />
        </div>
      );
    } else if (fileType === 'text/plain') {
      return <TextFile url={url} />;
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
  const createdAtDay = new Date(createdAt).toLocaleDateString();
  const createdAtTime = new Date(createdAt).toLocaleTimeString();
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{username}</Comment.Author>
        <Comment.Metadata>
          <div>{`${createdAtDay} ${createdAtTime.slice(
            0,
            -6,
          )} ${createdAtTime.slice(-2)}`}</div>
        </Comment.Metadata>
        <MessageType {...message} />
      </Comment.Content>
    </Comment>
  );
}
