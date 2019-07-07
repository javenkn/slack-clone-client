import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Input, Button, Icon } from 'semantic-ui-react';

import FileUpload from './FileUpload';
import { CREATE_FILE_MESSAGE } from '../graphql/fileMessage';

const Wrapper = styled.div`
  margin: 0 20px 20px;
  display: grid;
  grid-template-columns: auto 5fr;
  border: 2px solid rgba(134, 134, 134, 0.7);
  border-radius: 6px;
`;

const StyledButton = styled(Button)`
  background: none !important;
  border-radius: 0 !important;
  border-right: 2px solid rgba(134, 134, 134, 0.7) !important;
`;

const StyledInput = styled(Input)`
  > input {
    border: 0 !important;
  }
`;

const ENTER_KEY = 13;

export default function SendMessage({ channelId, placeholder, onSend }) {
  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={async ({ message }, { setSubmitting, resetForm }) => {
        if (!message || !message.trim()) {
          setSubmitting(false);
          return;
        }

        await onSend(message);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
        <Wrapper>
          <Mutation mutation={CREATE_FILE_MESSAGE}>
            {(createMessage, { data }) => (
              <FileUpload channelId={channelId} createMessage={createMessage}>
                <StyledButton icon>
                  <Icon name='plus' />
                </StyledButton>
              </FileUpload>
            )}
          </Mutation>
          <StyledInput
            name='message'
            placeholder={`Message #${placeholder}`}
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
  );
}
