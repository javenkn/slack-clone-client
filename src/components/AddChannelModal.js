import React from 'react';
import { Form, Modal, Input, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { meQuery } from '../graphql/user';

const CREATE_CHANNEL = gql`
  mutation($teamId: ID!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
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
                  optimisticResponse: {
                    __typename: 'Mutation',
                    createChannel: {
                      __typename: 'ChannelResponse',
                      ok: true,
                      errors: null,
                      channel: {
                        __typename: 'Channel',
                        id: -1,
                        name,
                      },
                    },
                  },
                  update: (proxy, { data: { createChannel } }) => {
                    const { ok, channel } = createChannel;
                    if (!ok) return;
                    // Read the data from our cache for this query.
                    const data = proxy.readQuery({ query: meQuery });
                    // Write our data back to the cache with the new comment in it
                    proxy.writeQuery({
                      query: meQuery,
                      data: {
                        ...data,
                        me: {
                          ...data.me,
                          teams: data.me.teams.map(team => {
                            if (team.id === teamId) {
                              return {
                                ...team,
                                channels: [...team.channels, channel],
                              };
                            } else return team;
                          }),
                        },
                      },
                    });
                  },
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
