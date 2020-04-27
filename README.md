# rn-create
react-native cli to create react-native boilerplate component, stateless component, screens, react-navigation boiler plate , integrate redux in component, integrate redux-saga for api call just by using cli.

# installation
npm i -g rn-create

# usage

You have to be in react native project directory to run these commands.

To create component

  `rn-create -g component CoolComponent`
  
To create stateless component

  `rn-create -g component CoolComponent --stateless`
 
To create screen

  `rn-create -g screen CoolScreen`
  
To create stateless screen

  `rn-create -g screen CoolScreen --stateless`
  
To integrate react-navigation library in your project.

  `rn-create -g navigation`
  
To generate stack navigation boilerplate.

  `rn-create -g navigation --type="stack" CoolStackNavigator`

To generate drawer navigation boilerplate.

  `rn-create -g navigation --type="drawer" CoolDrawerNavigator`

To generate bottom-tabs navigation boilerplate.

  `rn-create -g navigation --type="bottomTabs" CoolBottomTabsNavigator`

To generate material-bottom-tabs navigation boilerplate.

  `rn-create -g navigation --type="materialBottomTabs" CoolMaterialBottomTabsNavigator`

To generate material-top-tabs navigation boilerplate.

  `rn-create -g navigation --type="materialTopTabs" CoolMaterialTopTabsNavigator`

To generate navigation component with redux append `--redux` with the command


To integrate redux in your app

  `rn-create -g redux`
  
To integrate redux in your component boilerplate

  `rn-create -g screen CoolScreen --stateless --redux`
  
  `rn-create -g screen CoolScreen --redux`
  
  `rn-create -g component CoolScreen --stateless --redux`
  
  `rn-create -g component CoolScreen --redux`
  
To add redux action for app

  `rn-create -g redux-action CoolAction`
  

To add redux reducer for app

  `rn-create -g redux-reducer CoolReducer`


To add redux reducer and action both for app

  `rn-create -g redux-action-reducer FooReducer`


To integrate api call in your app follow these examples and need to set base url only once.

  #GET https://example.com/api/users

  `rn-create -g api users --base-url https://example.com/api/user`

  #POST https://example.com/api/users

  `rn-create -g api users --post`

  #PUT https://example.com/api/users

  `rn-create -g api users --put`

  #DELETE https://example.com/api/users

  `rn-create -g api users --delete`

Above commands will create neccessary files and folder in `src/api` folder.

To add saga to handle this created api , you can integrate using just by specifying some params like
  `--saga --watch --resolve`

For example
  #GET https://example.com/api/users

  `rn-create -g api users --base-url https://example.com/api/user --saga --watch="FETCH_USERS" --resolve="LIST_USERS"`

  By this command, in your have api endpoints created as usual just like above command but in addition you have one saga created in `src/redux/sagaList/{User}.js`.
  This saga will take every action given in watch i.e. `FETCH_USERS` params and call api to fetch user and after calling api result will be saved by dispatching action given in resolve i.e `LIST_USERS`

