import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

import { meQuery } from '../../graphql/user';
import MultiSelectUsers from '../../components/MultiSelectUsers';

const GET_DM_CHANNEL = gql`
  mutation($teamId: ID!, $members: [ID!]!) {
    getDMChannel(teamId: $teamId, members: $members) {
      id
      name
    }
  }
`;

export default withRouter(function DirectMessageModal({
  isOpened,
  handleClose,
  teamId,
  currentUserId,
  history,
}) {
  return (
    <Mutation mutation={GET_DM_CHANNEL}>
      {(getDMChannel, { data }) => (
        <Formik
          initialValues={{ members: [] }}
          onSubmit={async ({ members }, { resetForm }) => {
            await getDMChannel({
              variables: { teamId, members },
              update: (proxy, { data: { getDMChannel } }) => {
                const { id, name } = getDMChannel;
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: meQuery });
                const teamIdx = data.me.teams.findIndex(
                  team => team.id === teamId,
                );
                const notInChannelList = data.me.teams[teamIdx].channels.every(
                  channel => channel.id !== id,
                );
                if (notInChannelList) {
                  data.me.teams[teamIdx].channels.push({
                    __typename: 'Channel',
                    id,
                    name,
                    dm: true,
                  });
                  proxy.writeQuery({ query: meQuery, data });
                }
                history.push(`/view-team/${teamId}/${id}`);
              },
            });
            handleClose();
            resetForm();
          }}
        >
          {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
            <Modal open={isOpened} onClose={handleClose}>
              <Modal.Header>Direct Messaging</Modal.Header>
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
