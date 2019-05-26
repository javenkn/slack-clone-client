import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import AutoComplete from '../AutoComplete';

const GET_TEAM_MEMBERS = gql`
  query($teamId: ID!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;

export default withRouter(function DirectMessageModal({
  isOpened,
  handleClose,
  teamId,
  history,
}) {
  return (
    <Query query={GET_TEAM_MEMBERS} variables={{ teamId }}>
      {({ loading, error, data: { getTeamMembers } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <Modal open={isOpened} onClose={handleClose}>
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  {!loading && (
                    <AutoComplete
                      teamId={teamId}
                      teamMembers={getTeamMembers}
                      history={history}
                      handleClose={handleClose}
                    />
                  )}
                </Form.Field>
                <Button fluid onClick={handleClose}>
                  Cancel
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        );
      }}
    </Query>
  );
});
