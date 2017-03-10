import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {logMiddleware}   from '../lib/logMiddleWare';
import websocketMiddleware from '../lib/websocketMiddleware';
import * as reducers  from '../reducers';


// Middleware you want to use in production:
const enhancer = applyMiddleware(websocketMiddleware,logMiddleware);
const rootReducer  = combineReducers(reducers);

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
   return enhancer(createStore)(rootReducer);
  //return createStore(rootReducer, initialState, enhancer);
};