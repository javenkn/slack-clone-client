import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import Bubble from './Bubble';

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: rgba(193, 197, 202, 0.64);
`;

const paddingStyle = `padding: 4px 12px 4px 15px;`;

const HeaderArea = styled.div`
  ${paddingStyle};
  h1 {
    font-size: 20px;
    color: #fff;
  }
`;

const SectionWrapper = styled.section`
  ul {
    width: 100%;
    list-style: none;
    padding: 0;

    li {
      ${paddingStyle};
    }
  }
`;

const ListItemWrapper = styled.li`
  &:hover {
    background: #3e313c;
  }
`;

const DirectMessage = ({ name }) => (
  <ListItemWrapper>
    <Bubble /> {name}
  </ListItemWrapper>
);
const Channel = ({ teamId, id, name }) => (
  <Link to={`/view-team/${teamId}/${id}`}>
    <ListItemWrapper>#{name}</ListItemWrapper>
  </Link>
);

export default function ChannelList({
  teamId,
  teamName,
  username,
  channels,
  users,
  handleAddChannel,
  handleInvitePeople,
}) {
  return (
    <Wrapper>
      <SectionWrapper>
        <HeaderArea>
          <h1>{teamName}</h1>
          {username}
        </HeaderArea>
      </SectionWrapper>
      <SectionWrapper>
        <ul>
          <li>
            Channels <Icon name='add circle' onClick={handleAddChannel} />
          </li>
          {channels.map((channel, i) => (
            <Channel key={`channel-${i}`} {...channel} teamId={teamId} />
          ))}
        </ul>
      </SectionWrapper>
      <SectionWrapper>
        <ul>
          <li>Direct Messages</li>
          {users.map((user, i) => (
            <DirectMessage key={`channel-${i}`} name={user.name} />
          ))}
        </ul>
      </SectionWrapper>
      <SectionWrapper>
        <a href='#invite-people' onClick={handleInvitePeople}>
          + Invite People
        </a>
      </SectionWrapper>
    </Wrapper>
  );
}
