import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';

// Create a placeholder for the ReviewScreen that will be implemented later
const ReviewScreen = () => null;

export type RootStackParamList = {
  Review: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.chalkWhite },
      }}
    >
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
