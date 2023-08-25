import { useRef, useState } from 'react';
import Task from '../shared/components/Task';
import { STATUS, TaskProps } from '../shared/interface';
import { getDataFromLocalStorage } from '../shared/utils';
import '../../stylesheet/style.scss';
import { TaskList } from '../shared/class';

const Home = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TaskList>(
    new TaskList(getDataFromLocalStorage())
  );

  const handleAdd = () => {
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      const newTask: TaskProps = {
        content: inputValue,
        status: STATUS.Active,
      };

      data.addTask(newTask);
      inputRef.current.value = '';
    }

    setData(new TaskList(getDataFromLocalStorage()));
  };

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  const filteredData: TaskProps[] = data.getTasks(filterStatus);

  const handleDelete = (index: number) => {
    data.deleteTask(index);
    setData(new TaskList(getDataFromLocalStorage()));
  };

  const handleUpdate = (index: number, updatedTask: TaskProps) => {
    data.updateTask(index, updatedTask);
    setData(new TaskList(getDataFromLocalStorage()));
  };

  const handleClearCompleted = () => {
    data.clearCompletedTasks();
    setData(new TaskList(getDataFromLocalStorage()));
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
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
            onKeyDown={handleInputKeyPress}
          />
          <button onClick={handleAdd} className="btn">
            Add
          </button>
        </div>
        <div className="line"></div>
        {data.getQuantity() ? (
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
              {filteredData.map((task, index) => (
                <li key={index} className="task-item">
                  <Task
                    task={task}
                    handleDelete={() => handleDelete(index)}
                    handleUpdate={(updatedTask: TaskProps) =>
                      handleUpdate(index, updatedTask)
                    }
                  />
                </li>
              ))}
            </ul>
            <div className="quantity-wrap d-flex">
              <p className="quantity">{filteredData.length} Tasks</p>
              {data.getTasks(STATUS.Completed).length ? (
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
