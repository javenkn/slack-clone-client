import { gql } from 'apollo-boost';

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
    memberOfTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
