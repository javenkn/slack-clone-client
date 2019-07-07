import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';

const fileLink = createUploadLink({
  uri: `http://${process.env.REACT_APP_SERVER_URL}/graphql`,
});

// Create a WebSocket link:
export const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_SERVER_URL}/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      token: localStorage.getItem('token'),
    },
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
export default split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  fileLink,
);
