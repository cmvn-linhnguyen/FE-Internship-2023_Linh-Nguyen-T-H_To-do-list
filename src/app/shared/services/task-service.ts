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

  deleteTask = (tasks: TaskProps[], id: number): TaskProps[] => {
    return tasks.filter((task) => task.id !== id);
  };

  updateTask = (
    tasks: TaskProps[],
    id: number,
    updatedTask: TaskProps
  ): TaskProps[] => {
    return tasks.map((task) => {
      if (task.id === id) {
        return updatedTask;
      }
      return task;
    });
  };

  clearCompletedTasks = (tasks: TaskProps[]): TaskProps[] => {
    return tasks.filter((task) => task.status !== STATUS.Completed);
  };
}
