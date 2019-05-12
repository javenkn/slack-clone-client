import React, { useState } from 'react';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validatedErrors, setValidatedErrors] = useState({
    usernameError: '',
    emailError: '',
    passwordError: '',
  });
  const { usernameError, emailError, passwordError } = validatedErrors;

  const onSubmit = async (e, register) => {
    e.preventDefault();
    const response = await register({
      variables: { username, email, password },
    });
    const { ok, errors } = response.data.register;
    if (ok) {
      props.history.push('/');
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
    <Mutation mutation={REGISTER_USER}>
      {(register, { data }) => (
        <Container>
          <Header as='h2'>Register</Header>
          <Input
            error={!!usernameError}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Username'
            fluid
          />
          <Input
            error={!!emailError}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            fluid
          />
          <Input
            error={!!passwordError}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            fluid
          />
          <Button onClick={e => onSubmit(e, register)}>Submit</Button>
          {usernameError || emailError || passwordError ? (
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
