module.exports = `import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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

export default -BOTTOM_TAB_NAME-;

`;