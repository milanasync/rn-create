module.exports = `import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

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

export default -DRAWER_NAME-;

`;
