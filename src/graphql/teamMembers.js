import { gql } from 'apollo-boost';

export const GET_TEAM_MEMBERS = gql`
  query($teamId: ID!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;
