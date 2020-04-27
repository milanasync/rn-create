module.exports = `import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import AppNavigator from './src/navigations';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
`;