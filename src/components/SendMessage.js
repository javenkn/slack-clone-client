import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Input } from 'semantic-ui-react';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin-left: 20px;
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
          <Input
            fluid
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
