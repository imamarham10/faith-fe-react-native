/**
 * Main Application Component
 * Entry point for the React Native application
 */

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from '@navigation';
import {Colors} from '@constants';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
        translucent={false}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
