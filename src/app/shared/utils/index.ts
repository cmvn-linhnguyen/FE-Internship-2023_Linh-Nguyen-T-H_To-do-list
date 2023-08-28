import { TaskProps } from '../models/task';

export const getDataFromLocalStorage = (key: string): TaskProps[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveDataToLocalStorage = (
  key: string,
  data: TaskProps[]
): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
