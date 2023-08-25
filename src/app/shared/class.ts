import { STATUS, TaskProps } from './interface';
import { saveDataToLocalStorage } from './utils';

export class TaskList {
  tasks: TaskProps[];

  constructor(initialTasks: TaskProps[] = []) {
    this.tasks = initialTasks;
  }

  getTasks(filterStatus: string | null = null): TaskProps[] {
    if (filterStatus === null) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.status === filterStatus);
  }

  addTask = (task: TaskProps) => {
    this.tasks.push(task);
    this.updateData();
  };

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateData();
  }

  updateTask(index: number, updatedTask: TaskProps) {
    this.tasks[index] = updatedTask;
    this.updateData();
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter((task) => task.status === STATUS.Active);
    this.updateData();
  }

  updateData() {
    saveDataToLocalStorage(this.tasks);
  }
}
