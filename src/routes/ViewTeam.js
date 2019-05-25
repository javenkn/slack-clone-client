import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import { allTeamsQuery } from '../graphql/team';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
import SendMessage from '../components/SendMessage';
import Sidebar from '../containers/Sidebar';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

export default function ViewTeam({
  match: {
    params: { teamId, channelId },
  },
}) {
  return (
    <Query query={allTeamsQuery}>
      {({ loading, error, data: { allTeams = [] } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // default to first team if no teamId is passed through props
        const currentTeam = teamId
          ? allTeams.find(team => team.id === teamId)
          : allTeams[0];
        const currentChannel = channelId
          ? currentTeam.channels.find(channel => channel.id === channelId)
          : currentTeam.channels[0];

        return (
          <Layout>
            <Sidebar
              team={currentTeam}
              teams={allTeams.map(team => ({
                id: team.id,
                letter: team.name.charAt(0).toUpperCase(),
              }))}
            />
            <Header channelName={currentChannel.name} />
            <MessageList channelId={currentChannel.id} />
            <SendMessage channelName={currentChannel.name} />
          </Layout>
        );
      }}
    </Query>
  );
}
