import React from 'react';
import { Form, Modal, Input, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import normalizeErrors from '../../utils/normalizeErrors';

const ADD_TEAM_MEMBER = gql`
  mutation($email: String!, $teamId: ID!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default function InvitePeopleModal({ isOpened, handleClose, teamId }) {
  return (
    <Mutation mutation={ADD_TEAM_MEMBER}>
      {(addTeamMember, { data }) => (
        <Modal open={isOpened} onClose={handleClose}>
          <Modal.Header>Add Team Member</Modal.Header>
          <Modal.Content>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={async ({ email }, { setSubmitting, setErrors }) => {
                const response = await addTeamMember({
                  variables: { email, teamId },
                });
                const { ok, errors } = response.data.addTeamMember;
                if (ok) {
                  handleClose();
                  setSubmitting(false);
                } else {
                  setSubmitting(false);
                  setErrors(normalizeErrors(errors));
                }
              }}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                isSubmitting,
                handleSubmit,
              }) => (
                <Form>
                  <Form.Field>
                    <Input
                      fluid
                      placeholder={`User's Email`}
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field>
                  {touched.email && errors.email ? errors.email[0] : null}
                  <Form.Group>
                    <Button
                      type='button'
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      fluid
                    >
                      Add
                    </Button>
                    <Button disabled={isSubmitting} fluid onClick={handleClose}>
                      Cancel
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </Modal.Content>
        </Modal>
      )}
    </Mutation>
  );
}
