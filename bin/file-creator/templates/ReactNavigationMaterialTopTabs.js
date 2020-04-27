module.exports = `import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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

export default -TOP_TAB_NAME-;

`;
