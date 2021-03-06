import { gql } from 'apollo-boost';

export const meQuery = gql`
  {
    me {
      id
      username
      teams {
        id
        name
        channels {
          id
          name
          dm
          public
        }
        admin
        directMessageMembers {
          id
          username
        }
      }
    }
  }
`;
