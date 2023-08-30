import { StorageKeys } from '../constants';
import { TaskProps } from '../models/task';

export const getDataFromLocalStorage = (key: StorageKeys): TaskProps[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveDataToLocalStorage = (
  key: StorageKeys,
  data: TaskProps[]
): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
