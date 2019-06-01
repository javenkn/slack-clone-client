import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background: #362234;
  color: rgba(193, 197, 202, 0.64);

  ul {
    width: 100%;
    padding-left: 0;
    list-style: none;
  }
`;

const TeamItem = styled.li`
  height: 50px;
  width: 50px;
  background: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  font-size: 24px;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const Team = ({ id, letter }) => (
  <Link to={`/view-team/${id}`}>
    <TeamItem>{letter}</TeamItem>
  </Link>
);

export default function TeamList({ teams }) {
  return (
    <Wrapper>
      <ul>
        {teams.map((team, i) => (
          <Team key={`team-${i}`} {...team} />
        ))}
        <Link to={`/create-team`}>
          <TeamItem>+</TeamItem>
        </Link>
      </ul>
    </Wrapper>
  );
}
