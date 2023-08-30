import { createStore } from 'redux';
import { taskReducer } from './reducer';

export default createStore(taskReducer);
