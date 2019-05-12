import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
