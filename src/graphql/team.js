import { gql } from 'apollo-boost';

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    memberOfTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
  }
`;
