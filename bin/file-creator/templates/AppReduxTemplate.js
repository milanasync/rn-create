module.exports = `import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

// redux 
import { Provider } from 'react-redux';
import store from './src/redux/store';

import AppNavigator from './src/navigations';

const App = () => {
  return (
    <>
      <Provider store={store} >
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
`;