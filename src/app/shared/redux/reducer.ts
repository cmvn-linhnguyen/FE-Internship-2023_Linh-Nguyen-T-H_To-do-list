import { STATUS } from '../constants';
import { TaskProps } from '../models/task';
import { ADD_TASK, CLEAR_COMPLETED, DELETE_TASK, UPDATE_TASK } from './type';

export interface TaskState {
  tasks: TaskProps[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = (state = initialState, action: any): TaskState => {
  const objReducer: Record<string, TaskState> = {
    [ADD_TASK]: {
      ...state,
      tasks: [...state.tasks, action.payload],
    },
    [DELETE_TASK]: {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    },
    [UPDATE_TASK]: {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload };
        }
        return task;
      }),
    },
    [CLEAR_COMPLETED]: {
      ...state,
      tasks: state.tasks.filter((task) => task.status !== STATUS.Completed),
    },
  };
  return objReducer[action.type] || state;
};
