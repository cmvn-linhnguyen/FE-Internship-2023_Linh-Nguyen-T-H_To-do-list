import { Status } from '../constants';

export const filterLabel = [
  {
    label: 'All',
    status: null,
  },
  {
    label: 'Active',
    status: Status.ACTIVE,
  },
  {
    label: 'Completed',
    status: Status.COMPLETED,
  },
];
