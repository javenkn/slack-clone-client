import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  Container,
  Header,
  Form,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';

import { wsLink } from '../apollo';

const USER_LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      errors {
        path
        message
      }
    }
  }
`;

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validatedErrors, setValidatedErrors] = useState({
    emailError: '',
    passwordError: '',
  });
  const { emailError, passwordError } = validatedErrors;

  const onSubmit = async (e, login) => {
    e.preventDefault();
    const response = await login({
      variables: { email, password },
    });
    const { ok, token, errors } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      wsLink.subscriptionClient.tryReconnect();
      props.history.push('/view-team');
    } else {
      const sortedErrors = errors.reduce(
        (errObj, { path, message }) => ({
          ...errObj,
          [`${path}Error`]: message,
        }),
        {},
      );
      setValidatedErrors(sortedErrors);
    }
  };

  return (
    <Mutation
      mutation={USER_LOGIN}
      update={cache => {
        cache.writeData({
          data: {
            isLoggedIn: true,
          },
        });
      }}
    >
      {(login, { data }) => (
        <Container>
          <Header as='h2'>Login</Header>
          <Form>
            <Form.Field error={!!emailError}>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                fluid
              />
            </Form.Field>
            <Form.Field error={!!passwordError}>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                fluid
              />
            </Form.Field>
            <Button onClick={e => onSubmit(e, login)}>Submit</Button>
          </Form>
          {emailError || passwordError ? (
            <Message
              error
              header='There were some errors with your submission.'
              list={Object.values(validatedErrors)}
            />
          ) : null}
        </Container>
      )}
    </Mutation>
  );
}
