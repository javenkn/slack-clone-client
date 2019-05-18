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

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default function CreateTeam(props) {
  const [name, setName] = useState('');
  const [validatedErrors, setValidatedErrors] = useState({
    nameError: '',
  });
  const { nameError } = validatedErrors;

  const onSubmit = async (e, createTeam) => {
    e.preventDefault();
    let response = null;
    try {
      response = await createTeam({
        variables: { name },
      });
    } catch (error) {
      props.history.push('/login');
      return;
    }
    const { ok, errors } = response.data.createTeam;
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
    <Mutation mutation={CREATE_TEAM}>
      {(createTeam, { data }) => (
        <Container>
          <Header as='h2'>Create a Team</Header>
          <Form>
            <Form.Field error={!!nameError}>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Team Name'
                fluid
              />
            </Form.Field>
            <Button onClick={e => onSubmit(e, createTeam)}>Submit</Button>
          </Form>
          {nameError ? (
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
