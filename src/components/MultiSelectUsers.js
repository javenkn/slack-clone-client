import React from 'react';
import { Query } from 'react-apollo';
import { GET_TEAM_MEMBERS } from '../graphql/teamMembers';
import { Dropdown } from 'semantic-ui-react';

export default function MultiSelectUsers({
  value,
  handleChange,
  placeholder,
  currentUserId,
  teamId,
}) {
  return (
    <Query query={GET_TEAM_MEMBERS} variables={{ teamId }}>
      {({ loading, error, data: { getTeamMembers = [] } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <Dropdown
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            fluid
            multiple
            search
            selection
            options={getTeamMembers
              .filter(member => member.id !== currentUserId)
              .map(member => ({
                key: member.id,
                value: member.id,
                text: member.username,
              }))}
          />
        );
      }}
    </Query>
  );
}
