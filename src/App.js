import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// const logoutLink = onError(({ response: { headers } }) => {
//   const token = headers.get('x-token');
//   const refreshToken = headers.get('x-refresh-token');
//   if (token) {
//     localStorage.setItem('token', token);
//   }
//   if (refreshToken) {
//     localStorage.setItem('refreshToken', refreshToken);
//   }
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
