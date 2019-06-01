import gql from 'graphql-tag';

export const CREATE_FILE_MESSAGE = gql`
  mutation CreateMessage($channelId: ID!, $file: Upload) {
    createMessage(channelId: $channelId, file: $file)
  }
`;
