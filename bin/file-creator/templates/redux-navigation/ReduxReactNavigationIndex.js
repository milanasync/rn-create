module.exports = `import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

// import actions here

const App = () => {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}

const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // add action here
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(App);
`;
