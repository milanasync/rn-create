module.exports = `import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

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

const -DRAWER_NAME- = () => {
  return (
    <Drawer.Navigator>
      {screens.map(screen => (
        <Drawer.Screen {...screen} />
      ))}
    </Drawer.Navigator>
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
export default connect(mapStateToProps, mapDispatchToProps)(-DRAWER_NAME-);
`;
