module.exports = `import { createStore, applyMiddleware } from 'redux';

import AppReducers from './reducers';
//SAGA_IMPORT_FACTORY_CLASS

//IMPORT_APPLICATION_SAGA

// create the saga middleware
//CREATE_MIDDLEWARE

const store = createStore(
    AppReducers,
    //APPLY_MIDDLEWARE
);

// then run the saga
//RUN_SAGA

export default store;

`;