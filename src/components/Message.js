import React from 'react';
import styled from 'styled-components';
import { Comment } from 'semantic-ui-react';
import TextFile from './TextFile';

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  float: left;
  margin: 0.2em 8px 0 0;
  border-radius: 3px;
  color: #fff;
  background: #${props => props.color};
`;

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

export default function Message({ username, color, createdAt, ...message }) {
  const createdAtDay = new Date(createdAt).toLocaleDateString();
  const createdAtTime = new Date(createdAt).toLocaleTimeString();
  return (
    <Comment>
      <Avatar color={color}>{username.charAt(0).toUpperCase()}</Avatar>
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
