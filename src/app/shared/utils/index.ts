import { TaskProps } from '../interface';

export const getDataFromLocalStorage = (): TaskProps[] => {
  return JSON.parse(localStorage.getItem('to-do-list') || '[]');
};

export const saveDataToLocalStorage = (data: TaskProps[]) => {
  localStorage.setItem('to-do-list', JSON.stringify(data));
};
