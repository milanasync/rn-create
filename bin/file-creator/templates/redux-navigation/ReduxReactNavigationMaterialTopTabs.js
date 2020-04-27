module.exports = `import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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

const -TOP_TAB_NAME- = () => {
  return (
    <Tab.Navigator>
      {screens.map(screen => (
        <Tab.Screen {...screen} />
      ))}
    </Tab.Navigator>
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
export default connect(mapStateToProps, mapDispatchToProps)(-TOP_TAB_NAME-);
`;
