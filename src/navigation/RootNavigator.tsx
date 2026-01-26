/**
 * Root Navigator
 * Main navigation configuration
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {
  HomeScreen,
  SplashScreen,
  FaithSelectionScreen,
} from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="FaithSelection"
              component={FaithSelectionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
