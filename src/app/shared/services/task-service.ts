import { STATUS } from '../constants';
import { TaskProps } from '../models/task';

export class TaskService {
  getTasks = (
    tasks: TaskProps[],
    filterStatus: string | null = null
  ): TaskProps[] => {
    if (filterStatus === null) return tasks;
    return tasks.filter((tasks) => tasks.status === filterStatus);
  };

  addTask = (tasks: TaskProps[], task: TaskProps): TaskProps[] => {
    return [...tasks, task];
  };

  deleteTask = (tasks: TaskProps[], id: string): TaskProps[] => {
    return tasks.filter((task) => task.id !== id);
  };

  updateTask = (
    tasks: TaskProps[],
    id: string,
    updatedTask: TaskProps
  ): TaskProps[] => {
    const updatedTasks = [...tasks];

    for (let i = 0; i < updatedTasks.length; i++) {
      if (updatedTasks[i].id === id) {
        updatedTasks[i] = { ...updatedTasks[i], ...updatedTask };
        break;
      }
    }

    return updatedTasks;
  };

  clearCompletedTasks = (tasks: TaskProps[]): TaskProps[] => {
    return tasks.filter((task) => task.status !== STATUS.Completed);
  };
}
