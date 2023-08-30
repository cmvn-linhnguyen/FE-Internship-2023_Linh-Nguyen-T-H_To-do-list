import { useEffect, useRef, useState } from 'react';
import Task from './components/Task';
import { TaskProps } from '../../shared/models/task';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../../shared/utils';
import '../../../stylesheet/style.scss';
import { LOCAL_STORAGE_KEY, STATUS } from '../../shared/constants';
import { TaskService } from '../../shared/services/task-service';
import { filterLabel } from '../../shared/data';

const Home = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TaskProps[]>(
    getDataFromLocalStorage(LOCAL_STORAGE_KEY.TodoList)
  );
  const taskService = new TaskService();

  useEffect(() => {
    saveDataToLocalStorage(LOCAL_STORAGE_KEY.TodoList, data);
  }, [data]);

  const handleAdd = () => {
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      const newTask: TaskProps = {
        id: Date.now(),
        content: inputValue,
        status: STATUS.Active,
      };

      setData(taskService.addTask(data, newTask));

      inputRef.current.value = '';
    }
  };

  const filteredData: TaskProps[] = taskService
    .getTasks(data, filterStatus)
    .sort((a, b) => {
      return b.id - a.id;
    });

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  const handleDelete = (id: number) => {
    setData(taskService.deleteTask(data, id));
  };

  const handleUpdate = (id: number, updatedTask: TaskProps) => {
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
