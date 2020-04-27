module.exports = `const INITIAL_STATE = {
  isLoading: true,
  list: [],
  selected: {},
  lastUpdatedAt: new Date(),
};
  
export default -COMPONENT_NAME-Reducers = (state = INITIAL_STATE, action) => {
  let currentState = state;
  let payload = action.payload;

  switch (action.type) {
    case 'FETCH_-COMPONENT_NAME-':
        // write logic here
        return currentState;      
    case 'LIST_-COMPONENT_NAME-':
      // write logic here
      currentState.list = payload;
      return currentState;
    case 'CREATE_-COMPONENT_NAME-':
      // write logic here
      return currentState;
    case 'UPDATE_-COMPONENT_NAME-':
      // write logic here
      return currentState;
    case 'DELETE_-COMPONENT_NAME-':
      // write logic here
      return currentState;
    default:
      return currentState;
  }
};
`;
