import { Status, StorageKeys } from '../shared/constants';
import { TaskProps } from '../shared/models/task';
import { getDataFromLocalStorage } from '../shared/utils';
import {
  ADD_TASK,
  CLEAR_COMPLETED,
  SELECT_ALL,
  DELETE_TASK,
  UPDATE_TASK,
} from './type';

export interface TaskState {
  tasks: TaskProps[];
}

const initialState: TaskState = {
  tasks: getDataFromLocalStorage(StorageKeys.TO_DO_LIST),
};

export const taskReducer = (state = initialState, action: any): TaskState => {
  const objReducer: Record<string, () => TaskState> = {
    [ADD_TASK]: () => ({ ...state, tasks: [action.payload, ...state.tasks] }),

    [DELETE_TASK]: () => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    }),

    [UPDATE_TASK]: () => {
      const updatedTask = state.tasks.find(
        (task) => task.id === action.payload.id
      );
      if (!updatedTask) return state;
      Object.assign(updatedTask, action.payload);

      return { ...state, tasks: [...state.tasks] };
    },

    [CLEAR_COMPLETED]: () => ({
      ...state,
      tasks: state.tasks.filter((task) => task.status !== Status.COMPLETED),
    }),

    [SELECT_ALL]: () => {
      const allTasksCompleted = state.tasks.every(
        (task) => task.status === Status.COMPLETED
      );

      return {
        ...state,
        tasks: state.tasks.map((task) => ({
          ...task,
          status: allTasksCompleted ? Status.ACTIVE : Status.COMPLETED,
        })),
      };
    },
  };

  return typeof objReducer[action.type] === 'function'
    ? objReducer[action.type]()
    : state;
};
