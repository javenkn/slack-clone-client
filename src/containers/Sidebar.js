import React, { useState } from 'react';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';

import { allTeamsQuery } from '../graphql/team';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';
import AddChannelModal from '../components/AddChannelModal';

export default function Sidebar({ currentTeamId }) {
  const [isAddChannelModalOpened, setIsAddChannelModalOpened] = useState(false);
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
              handleAddChannel={setIsAddChannelModalOpened}
            />
            <AddChannelModal
              teamId={currentTeam.id}
              isOpened={isAddChannelModalOpened}
              handleClose={() => setIsAddChannelModalOpened(false)}
            />
          </>
        );
      }}
    </Query>
  );
}
