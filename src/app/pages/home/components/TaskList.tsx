import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Task } from './Task';

import { TaskService } from '../../../shared/services/task-service';
import { TaskProps } from '../../../shared/models/task';
import { filterLabel } from '../../../shared/data';
import { TaskState } from '../../../shared/redux/reducer';

export const TaskList = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredData: TaskProps[] = new TaskService()
    .getTasks(tasks, filterStatus)
    .sort((a, b) => {
      return b.id - a.id;
    });

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  return (
    <>
      <div className="filter-wrap">
        <ul className="filter-list d-flex">
          {filterLabel.map((item, index) => (
            <li key={index} className="filter-item">
              <span
                className={`filter ${
                  filterStatus === item.status && 'filter-active'
                }`}
                onClick={() => handleFilterChange(item.status)}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="task-list">
        {filteredData.map((task) => (
          <li key={task.id} className="task-item">
            <Task task={task} />
          </li>
        ))}
      </ul>
    </>
  );
};
