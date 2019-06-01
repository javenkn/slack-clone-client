import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import terminatingLink from './apollo';
import Routes from './routes';

const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  operation.setContext(({ headers = {} }) => ({
    // return the headers to the context so httpLink can read them
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const appCache = new InMemoryCache();

// default user authentication state
appCache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions, message }) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        // if token expired, invalid, or unauthenticated
        localStorage.removeItem('token');
        appCache.writeData({
          data: {
            isLoggedIn: false,
          },
        });
      }
    });
  }
});

const link = ApolloLink.from([authMiddleware, errorLink, terminatingLink]);

const client = new ApolloClient({
  link,
  cache: appCache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
