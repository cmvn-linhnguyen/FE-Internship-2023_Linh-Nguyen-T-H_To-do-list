import { STATUS } from '../constants';

export interface TaskProps {
  id: number;
  content: string;
  status: STATUS;
}

export interface ComponentProps {
  data: TaskProps[];
  updateData: (newData: TaskProps[]) => void;
}
