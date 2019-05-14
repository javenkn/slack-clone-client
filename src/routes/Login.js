import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';

const REGISTER_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e, login) => {
    e.preventDefault();
    const response = await login({
      variables: { email, password },
    });
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
    //   props.history.push('/');
    // } else {
    //   const sortedErrors = errors.reduce(
    //     (errObj, { path, message }) => ({
    //       ...errObj,
    //       [`${path}Error`]: message,
    //     }),
    //     {},
    //   );
    //   setValidatedErrors(sortedErrors);
    // }
  };

  return (
    <Mutation mutation={REGISTER_USER}>
      {(login, { data }) => (
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
          <Button onClick={e => onSubmit(e, login)}>Submit</Button>
        </Container>
      )}
    </Mutation>
  );
}
