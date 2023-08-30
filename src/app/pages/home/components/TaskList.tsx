import { useState } from 'react';

import { Task } from './Task';

import { TaskService } from '../../../shared/services/task-service';
import { ComponentProps, TaskProps } from '../../../shared/models/task';
import { filterLabel } from '../../../shared/data';

export const TaskList = ({ data, updateData }: ComponentProps) => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const taskService = new TaskService();

  const filteredData: TaskProps[] = taskService
    .getTasks(data, filterStatus)
    .sort((a, b) => {
      return b.id - a.id;
    });

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  const handleDelete = (id: number) => {
    updateData(taskService.deleteTask(data, id));
  };

  const handleUpdate = (id: number, updatedTask: TaskProps) => {
    updateData(taskService.updateTask(data, id, updatedTask));
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
            <Task
              task={task}
              handleDelete={() => handleDelete(task.id)}
              handleUpdate={(updatedTask: TaskProps) =>
                handleUpdate(task.id, updatedTask)
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};
