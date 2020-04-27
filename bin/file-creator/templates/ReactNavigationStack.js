module.exports = `import * as React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

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

export default -STACK_NAME-;

`;
