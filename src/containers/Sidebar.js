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

export default function Sidebar() {
  return (
    <Query query={allTeamsQuery}>
      {({ loading, error, data: { allTeams = [] }, currentTeamId }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const currentTeam = allTeams.find(team => team.id !== currentTeamId);
        let username = '';
        try {
          const token = localStorage.getItem('token');
          const { user } = decode(token);
          username = user.username;
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
              teamName={currentTeam.name}
              username={username}
              channels={currentTeam.channels}
              users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
            />
          </>
        );
      }}
    </Query>
  );
}
