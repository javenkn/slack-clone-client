import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { meQuery } from '../graphql/user';

import Sidebar from '../containers/Sidebar';
import MessageContainer from '../containers/Message';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

const GET_MESSAGES = gql`
  query($channelId: ID!, $cursor: String) {
    messages(channelId: $channelId, cursor: $cursor) {
      id
      text
      user {
        username
      }
      createdAt
      url
      fileType
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation($channelId: ID!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default function ViewTeam({
  match: {
    params: { teamId, channelId },
  },
}) {
  return (
    <Query query={meQuery} fetchPolicy='network-only'>
      {({ loading, error, data: { me } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // all of the user's teams
        const { id, teams, username } = me;

        if (!teams.length) {
          return <Redirect to='/create-team' />;
        }
        // default to first team if no teamId is passed through props
        const currentTeam = parseInt(teamId)
          ? teams.find(team => team.id === teamId)
          : teams[0];

        if (!currentTeam) {
          return <Redirect to={`/view-team/${teams[0].id}`} />;
        }

        const currentChannel = parseInt(channelId)
          ? currentTeam.channels.find(channel => channel.id === channelId)
          : currentTeam.channels[0];

        if (!currentChannel) {
          return (
            <Redirect
              to={`/view-team//${currentTeam.id}/${currentTeam.channels[0].id}`}
            />
          );
        }

        return (
          <Layout>
            <Sidebar
              team={currentTeam}
              teams={teams.map(team => ({
                id: team.id,
                letter: team.name.charAt(0).toUpperCase(),
              }))}
              username={username}
              currentUserId={id}
            />
            <Header channelName={currentChannel.name} />
            <Query
              query={GET_MESSAGES}
              variables={{ channelId: currentChannel.id }}
              fetchPolicy='network-only'
            >
              {queryProps => (
                <MessageContainer
                  {...queryProps}
                  channelId={currentChannel.id}
                />
              )}
            </Query>
            <Mutation mutation={CREATE_MESSAGE}>
              {(createMessage, { data }) => (
                <SendMessage
                  channelId={currentChannel.id}
                  placeholder={currentChannel.name}
                  onSend={async text =>
                    await createMessage({
                      variables: { text, channelId: currentChannel.id },
                    })
                  }
                />
              )}
            </Mutation>
          </Layout>
        );
      }}
    </Query>
  );
}
