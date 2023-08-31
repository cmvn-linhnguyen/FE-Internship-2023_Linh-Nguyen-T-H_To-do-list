import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from './Task';

import { TaskService } from '../../../shared/services/task-service';
import { TaskProps } from '../../../shared/models/task';
import { filterLabel } from '../../../shared/data/filter-labels';
import { TaskState } from '../../../redux/reducer';
import CheckAll from '../../../../assets/check-all.svg';
import { selectAll } from '../../../redux/action';

export const TaskList = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredData: TaskProps[] = new TaskService().getTasks(
    tasks,
    filterStatus
  );

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  const handleSelectAll = () => {
    dispatch(selectAll());
  };

  return (
    <>
      <div className="filter-wrap d-flex">
        <button onClick={handleSelectAll} className="check-all-button">
          <img src={CheckAll} alt="" />
        </button>
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
