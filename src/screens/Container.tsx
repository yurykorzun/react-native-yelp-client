import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from './Search';
import DetailsScreen from './Details';

const Stack = createStackNavigator();

export const Container: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          options={{headerShown: false}}
          component={SearchScreen}
        />
        <Stack.Screen
          name="Details"
          options={{title: ''}}
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
