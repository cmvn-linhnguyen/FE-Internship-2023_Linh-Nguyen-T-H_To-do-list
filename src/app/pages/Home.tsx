import { useEffect, useRef, useState } from 'react';
import Task from '../shared/components/Task';
import { TaskProps } from '../shared/task-interface';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../shared/utils';
import '../../stylesheet/style.scss';
import { v4 as renderId } from 'uuid';
import { STATUS } from '../shared/constants';
import { TaskService } from '../shared/services/task-service';

const Home = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TaskProps[]>(
    getDataFromLocalStorage('to-do-list')
  );
  const taskService = new TaskService();

  useEffect(() => {
    saveDataToLocalStorage('to-do-list', data);
  }, [data]);

  const handleAdd = () => {
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      const newTask: TaskProps = {
        id: renderId(),
        content: inputValue,
        status: STATUS.Active,
      };

      setData(taskService.addTask(data, newTask));

      inputRef.current.value = '';
    }
  };

  const filteredData: TaskProps[] = taskService.getTasks(data, filterStatus);

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  const handleDelete = (id: string) => {
    setData(taskService.deleteTask(data, id));
  };

  const handleUpdate = (id: string, updatedTask: TaskProps) => {
    setData(taskService.updateTask(data, id, updatedTask));
  };

  const handleClearCompleted = () => {
    setData(taskService.clearCompletedTasks(data));
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="home">
      <div className="board-wrap">
        <h1 className="title">To-do List</h1>
        <div className="board-input-wrap">
          <input
            className="board-input"
            ref={inputRef}
            type="text"
            id="task"
            placeholder="Add new ..."
            onKeyUp={handleInputKeyPress}
          />
          <button onClick={handleAdd} className="btn">
            Add
          </button>
        </div>
        <div className="line"></div>
        {data.length ? (
          <>
            <div className="filter-wrap">
              <ul className="filter-list d-flex">
                <li className="filter-item">
                  <span
                    className={`filter ${
                      filterStatus === null && 'filter-active'
                    }`}
                    onClick={() => handleFilterChange(null)}
                  >
                    All
                  </span>
                </li>
                <li className="filter-item">
                  <span
                    className={`filter ${
                      filterStatus === STATUS.Active && 'filter-active'
                    }`}
                    onClick={() => handleFilterChange(STATUS.Active)}
                  >
                    Active
                  </span>
                </li>
                <li className="filter-item">
                  <span
                    className={`filter ${
                      filterStatus === STATUS.Completed && 'filter-active'
                    }`}
                    onClick={() => handleFilterChange(STATUS.Completed)}
                  >
                    Completed
                  </span>
                </li>
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
            <div className="quantity-wrap d-flex">
              <p className="quantity">{filteredData.length} Tasks</p>
              {taskService.getTasks(data, STATUS.Completed).length ? (
                <button
                  className="btn btn-outline"
                  onClick={handleClearCompleted}
                >
                  Clear Completed
                </button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
