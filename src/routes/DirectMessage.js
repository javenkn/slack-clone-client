import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { meQuery } from '../graphql/user';

import Sidebar from '../containers/Sidebar';
import DirectMessageContainer from '../containers/DirectMessage';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

const CREATE_DIRECT_MESSAGE = gql`
  mutation($receiverId: ID!, $teamId: ID!, $text: String!) {
    createDirectMessage(receiverId: $receiverId, teamId: $teamId, text: $text)
  }
`;

const GET_DIRECT_MESSAGES = gql`
  query($teamId: ID!, $otherUserId: ID!) {
    directMessages(teamId: $teamId, otherUserId: $otherUserId) {
      id
      text
      sender {
        username
      }
      createdAt
    }
  }
`;

export default function DirectMessage({
  match: {
    params: { teamId, userId },
  },
}) {
  return (
    <Query query={meQuery} fetchPolicy='network-only'>
      {({ loading, error, data: { me } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // all of the user's teams
        const { teams, username } = me;

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

        return (
          <Layout>
            <Sidebar
              team={currentTeam}
              teams={teams.map(team => ({
                id: team.id,
                letter: team.name.charAt(0).toUpperCase(),
              }))}
              username={username}
            />
            <Header channelName='Someone' />
            <Query
              query={GET_DIRECT_MESSAGES}
              variables={{ teamId, otherUserId: userId }}
              fetchPolicy='network-only'
            >
              {queryProps => (
                <DirectMessageContainer
                  {...queryProps}
                  teamId={teamId}
                  userId={userId}
                />
              )}
            </Query>
            <Mutation mutation={CREATE_DIRECT_MESSAGE}>
              {(createDirectMessage, { data }) => (
                <SendMessage
                  onSend={async text =>
                    createDirectMessage({
                      variables: { text, receiverId: userId, teamId },
                    })
                  }
                  placeholder={userId}
                />
              )}
            </Mutation>
          </Layout>
        );
      }}
    </Query>
  );
}
