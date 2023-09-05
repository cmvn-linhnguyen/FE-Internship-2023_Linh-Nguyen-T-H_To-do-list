import { TaskProps } from '../shared/models/task';
import {
  ADD_TASK,
  CLEAR_COMPLETED_TASKS,
  SELECT_ALL,
  DELETE_TASK,
  UPDATE_TASK,
} from './type';

export const addTask = (newTask: TaskProps) => {
  return { type: ADD_TASK, payload: newTask };
};

export const deleteTask = (id: number) => {
  return { type: DELETE_TASK, payload: id };
};

export const updateTask = (updatedTask: TaskProps) => {
  return { type: UPDATE_TASK, payload: updatedTask };
};

export const clearCompleted = () => {
  return { type: CLEAR_COMPLETED_TASKS };
};

export const selectAll = () => {
  return { type: SELECT_ALL };
};
