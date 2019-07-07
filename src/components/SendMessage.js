import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Input, Button, Icon } from 'semantic-ui-react';

import FileUpload from './FileUpload';
import { CREATE_FILE_MESSAGE } from '../graphql/fileMessage';

const Wrapper = styled.div`
  margin: 0 20px;
  display: grid;
  grid-template-columns: auto 5fr;
  padding-bottom: 20px;
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
                <Button icon>
                  <Icon name='plus' />
                </Button>
              </FileUpload>
            )}
          </Mutation>
          <Input
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
