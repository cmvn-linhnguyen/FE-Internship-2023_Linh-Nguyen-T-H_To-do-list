import { applyMiddleware, createStore } from 'redux';
import { taskReducer } from './reducer';
import { loggerMiddleware } from './middleware';

export default createStore(taskReducer, applyMiddleware(loggerMiddleware));
