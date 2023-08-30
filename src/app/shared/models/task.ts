import { STATUS } from '../constants';

export interface TaskProps {
  id: number;
  content: string;
  status: STATUS;
}
