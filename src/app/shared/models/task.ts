import { STATUS } from '../constants';

export interface TaskProps {
  id: string;
  content: string;
  status: STATUS;
}
