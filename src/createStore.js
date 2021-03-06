// src/createStore.js
import {
  // 名前が被ってしまうので別名でimportする
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';

// historyはsrc/index.jsから渡すようにする
const createStore = history => {
  return reduxCreateStore(
    combineReducers({
      ...reducers,
      // react-router-reduxのReducer
      router: routerReducer,
    }),
    applyMiddleware(
      logger,
      thunk,
      // react-router-reduxのRedux Middleware
      routerMiddleware(history)
    )
  );
}
export default createStore
