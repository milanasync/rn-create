module.exports = `import * as React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

// import actions here

const screens = [
  // {
  //   name: "YourScreen",
  //   component: YourScreenComponent
  // }
];

const -STACK_NAME- = () => {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen {...screen} />
      ))}
    </Stack.Navigator>
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
export default connect(mapStateToProps, mapDispatchToProps)(-STACK_NAME-);
`;
