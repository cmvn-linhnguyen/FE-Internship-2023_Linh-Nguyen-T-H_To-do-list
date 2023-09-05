import { Status } from '../constants';

export interface TaskProps {
  id: number;
  content: string;
  status: Status;
}
