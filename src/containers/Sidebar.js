import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import decode from 'jwt-decode';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default function Sidebar({ currentTeamId }) {
  return (
    <Query query={allTeamsQuery}>
      {({ loading, error, data: { allTeams = [] } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // default to first team if no teamId is passed through props
        const currentTeam = currentTeamId
          ? allTeams.find(team => team.id === currentTeamId)
          : allTeams[0];
        let loggedInUser = '';
        try {
          const token = localStorage.getItem('token');
          const { username } = decode(token);
          loggedInUser = username;
        } catch (error) {}

        return (
          <>
            <TeamList
              teams={allTeams.map(team => ({
                id: team.id,
                letter: team.name.charAt(0).toUpperCase(),
              }))}
            />
            <ChannelList
              teamId={currentTeam.id}
              teamName={currentTeam.name}
              username={loggedInUser}
              channels={currentTeam.channels}
              users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
            />
          </>
        );
      }}
    </Query>
  );
}
