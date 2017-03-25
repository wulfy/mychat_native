import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {logMiddleware}   from '../lib/logMiddleWare';
import socketIOMiddleware from '../lib/socketIOMiddleware';
import * as reducers  from '../reducers';


// Middleware you want to use in production:
const enhancer = applyMiddleware(socketIOMiddleware,logMiddleware);
const rootReducer  = combineReducers(reducers);

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
   return enhancer(createStore)(rootReducer);
  //return createStore(rootReducer, initialState, enhancer);
};