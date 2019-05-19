import React from 'react';
import styled from 'styled-components';
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
const Channel = ({ name }) => <ListItemWrapper>#{name}</ListItemWrapper>;

export default function ChannelList({ teamName, username, channels, users }) {
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
          <li>Channels</li>
          {channels.map((channel, i) => (
            <Channel key={`channel-${i}`} name={channel.name} />
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
    </Wrapper>
  );
}
