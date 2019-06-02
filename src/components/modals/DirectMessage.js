import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

import MultiSelectUsers from '../../components/MultiSelectUsers';

const GET_DM_CHANNEL = gql`
  mutation($teamId: ID!, $members: [ID!]!) {
    getDMChannel(teamId: $teamId, members: $members)
  }
`;

export default withRouter(function DirectMessageModal({
  isOpened,
  handleClose,
  teamId,
  currentUserId,
}) {
  return (
    <Mutation mutation={GET_DM_CHANNEL}>
      {(getDMChannel, { data }) => (
        <Formik
          initialValues={{ members: [] }}
          onSubmit={async ({ members }, { setSubmitting }) => {
            const response = await getDMChannel({
              variables: { teamId, members },
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
            setFieldValue,
          }) => (
            <Modal open={isOpened} onClose={handleClose}>
              <Modal.Header>Message a user</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <MultiSelectUsers
                      value={values.members}
                      placeholder='Select users to message'
                      currentUserId={currentUserId}
                      teamId={teamId}
                      handleChange={(e, { value }) =>
                        setFieldValue('members', value)
                      }
                    />
                  </Form.Field>
                  <Form.Group>
                    <Button
                      fluid
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Create
                    </Button>
                    <Button fluid disabled={isSubmitting} onClick={handleClose}>
                      Cancel
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Content>
            </Modal>
          )}
        </Formik>
      )}
    </Mutation>
  );
});
