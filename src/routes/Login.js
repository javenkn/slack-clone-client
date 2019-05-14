import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Header as='h2'>Login</Header>
      <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
        fluid
      />
      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        fluid
      />
      <Button onClick={() => console.log(email, password)}>Submit</Button>
    </Container>
  );
}
