import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Input } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin-left: 20px;
`;

const ENTER_KEY = 13;

const CREATE_MESSAGE = gql`
  mutation($channelId: ID!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default function SendMessage({ channelName, channelId }) {
  return (
    <Mutation mutation={CREATE_MESSAGE}>
      {(createMessage, { data }) => (
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async ({ message }, { setSubmitting, resetForm }) => {
            if (!message || !message.trim()) {
              setSubmitting(false);
              return;
            }
            await createMessage({
              variables: { channelId, text: message },
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit,
          }) => (
            <Wrapper>
              <Input
                fluid
                name='message'
                placeholder={`Message #${channelName}`}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={e => {
                  if (e.keyCode === ENTER_KEY && !isSubmitting) handleSubmit();
                }}
              />
            </Wrapper>
          )}
        </Formik>
      )}
    </Mutation>
  );
}
