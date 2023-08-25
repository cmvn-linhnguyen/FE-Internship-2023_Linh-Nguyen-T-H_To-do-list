export enum STATUS {
  'Active' = 'active',
  'Completed' = 'completed',
}

export interface TaskProps {
  content: string;
  status: STATUS.Active | STATUS.Completed;
}
