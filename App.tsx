import React from 'react';
import 'react-native-gesture-handler';

import {createClient} from './src/services/yelp';
import {Container} from './src/screens/Container';
import {ApolloProvider} from '@apollo/client';

const apolloClient = createClient();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Container />
    </ApolloProvider>
  );
};

export default App;
