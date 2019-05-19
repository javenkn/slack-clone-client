import React from 'react';
import styled from 'styled-components';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import SendMessage from '../components/SendMessage';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

export default function ViewTeam() {
  return (
    <Layout>
      <TeamList teams={[{ id: 1, name: 'T' }, { id: 2, name: 'H' }]} />
      <ChannelList
        teamName='Team Name'
        username='Username'
        channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
      />
      <Header channelName='general' />
      <MessageList />
      <SendMessage channelName='general' />
    </Layout>
  );
}
