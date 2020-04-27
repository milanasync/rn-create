module.exports = {
  srcDir: "src/",
  componentDir: "src/components/",
  screenDir: "src/screens/",
  navDir: "src/navigations/",
  apiDir: "src/api/",
  reduxDir: "src/redux/",
  reduxSagaList: "src/redux/sagaList",
  reduxReducersDir: "src/redux/reducers",
  reduxActionsDir: "src/redux/actions",
  generator: ["component", "screen", "navigation", "redux", "api", "redux-action", "redux-reducer", "redux-action-reducer"],
  errors: {
    nameRequired: "Name is required.",
    componentExist: "Component allready exists.",
    screenExist: "Screen allready exists.",
    invalidName: "Name should be string and should not contain hyphen (-)."
  },
  reactNavigationLib: {
    main: "@react-navigation/native",
    reactNativeReAnimated: "react-native-reanimated",
    gestureHandle: "react-native-gesture-handler",
    reactNativeScreens: "react-native-screens",
    reactNativeSafeAreaContext: "react-native-safe-area-context",
    reactNativeMaskedView: "@react-native-community/masked-view",
    // types of drawers
    stack: "@react-navigation/stack",
    drawer: "@react-navigation/drawer",
    bottomTabs: "@react-navigation/bottom-tabs",
    materialBottomTabs: "@react-navigation/material-bottom-tabs",
    materialBottomTabsReactNativePaper: "react-native-paper",
    materialTopTabs: "@react-navigation/material-top-tabs",
    materialTopTabsReactNativeTabView: "react-native-tab-view"
  },
  reactNavigationCmd: {
    main: "npm install @react-navigation/native",
    stack: "npm install @react-navigation/stack",
    drawer: "npm install @react-navigation/drawer",
    bottomTabs: "npm install @react-navigation/bottom-tabs",
    materialBottomTabs:
      "npm install @react-navigation/material-bottom-tabs react-native-paper",
    materialTopTabs:
      "npm install @react-navigation/material-top-tabs react-native-tab-view",
    mainYarn: "yarn add @react-navigation/native",
    dependency:
      "npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view",
    yarnDependency:
      "yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view"
  },
  reduxLib: {
    redux: "redux",
    reactRedux: "react-redux",
    reduxSaga: "redux-saga"
  },
  apiLib: {
    fetch: "fetch",
    axios: "axios"
  },
  apiLibCmd: {
    axios: "npm install axios"
  },
  reduxCmd: {
    redux: "npm install redux react-redux",
    reduxWithSaga: "npm install redux react-redux redux-saga --save"
  }
};
