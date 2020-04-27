module.exports = `import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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

const -BOTTOM_TAB_NAME- = () => {
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
export default connect(mapStateToProps, mapDispatchToProps)(-BOTTOM_TAB_NAME-);
`;