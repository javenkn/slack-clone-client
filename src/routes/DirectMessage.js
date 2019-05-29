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

const directMessageMeQuery = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      username
    }
    me {
      id
      username
      teams {
        id
        name
        channels {
          id
          name
        }
        admin
        directMessageMembers {
          id
          username
        }
      }
    }
  }
`;

export default function DirectMessage({
  match: {
    params: { teamId, userId },
  },
}) {
  return (
    <Query
      query={directMessageMeQuery}
      variables={{ userId }}
      fetchPolicy='network-only'
    >
      {({ loading, error, data: { me, getUser } }) => {
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
            <Header channelName={getUser.username} />
            <Query
              query={GET_DIRECT_MESSAGES}
              variables={{ teamId, otherUserId: userId }}
              fetchPolicy='network-only'
            >
              {queryProps => (
                <DirectMessageContainer
                  {...queryProps}
                  teamId={currentTeam.id}
                  userId={userId}
                />
              )}
            </Query>
            <Mutation mutation={CREATE_DIRECT_MESSAGE}>
              {(createDirectMessage, { data }) => (
                <SendMessage
                  onSend={async text =>
                    await createDirectMessage({
                      variables: { text, receiverId: userId, teamId },
                      optimisticResponse: {
                        createDirectMessage: true,
                      },
                      update: proxy => {
                        // Read the data from our cache for this query.
                        const data = proxy.readQuery({ query: meQuery });
                        const teamIdx = data.me.teams.findIndex(
                          team => team.id === currentTeam.id,
                        );
                        const userDoesNotExist = data.me.teams[
                          teamIdx
                        ].directMessageMembers.every(
                          member => member.id !== userId,
                        );
                        if (userDoesNotExist) {
                          data.me.teams[teamIdx].directMessageMembers.push({
                            __typename: 'User',
                            id: userId,
                            username: getUser.username,
                          });
                          // Write our data back to the cache with the new comment in it
                          proxy.writeQuery({
                            query: meQuery,
                            data,
                          });
                        }
                      },
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
