import React from 'react';
import { Form, Modal, Input, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const CREATE_CHANNEL = gql`
  mutation($teamId: ID!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default function AddChannelModal({ isOpened, handleClose, teamId }) {
  return (
    <Mutation mutation={CREATE_CHANNEL}>
      {(createChannel, { data }) => (
        <Modal open={isOpened} onClose={handleClose}>
          <Modal.Header>Add Channel</Modal.Header>
          <Modal.Content>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={async ({ name }, { setSubmitting }) => {
                await createChannel({
                  variables: { name, teamId },
                });
                handleClose();
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
                <Form>
                  <Form.Field>
                    <Input
                      fluid
                      placeholder='Channel Name'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field>
                  <Form.Group>
                    <Button
                      type='button'
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      fluid
                    >
                      Create Channel
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
