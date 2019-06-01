import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Input, Button, Icon } from 'semantic-ui-react';
import FileUpload from './FileUpload';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto 5fr;
`;

const ENTER_KEY = 13;

export default function SendMessage({ placeholder, onSend }) {
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
          <FileUpload>
            <Button icon>
              <Icon name='plus' />
            </Button>
          </FileUpload>
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
