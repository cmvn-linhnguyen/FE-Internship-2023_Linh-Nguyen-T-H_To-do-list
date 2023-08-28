import { LOCAL_STORAGE_KEY } from '../constants';
import { TaskProps } from '../models/task';

export const getDataFromLocalStorage = (
  key: LOCAL_STORAGE_KEY
): TaskProps[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveDataToLocalStorage = (
  key: LOCAL_STORAGE_KEY,
  data: TaskProps[]
): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
