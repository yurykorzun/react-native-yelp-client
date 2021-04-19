import React from 'react';
import 'react-native-gesture-handler';

import {createApolloClient} from './src/services/apollo';
import {Container} from './src/screens/Container';
import {ApolloProvider} from '@apollo/client';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Container />
    </ApolloProvider>
  );
};

export default App;
