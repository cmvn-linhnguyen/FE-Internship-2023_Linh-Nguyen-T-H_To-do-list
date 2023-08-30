import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { TaskProps } from '../../../shared/models/task';
import { STATUS } from '../../../shared/constants';
import { addTask } from '../../../shared/redux/action';

export const BoardHeader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      const newTask: TaskProps = {
        id: Date.now(),
        content: inputValue,
        status: STATUS.Active,
      };

      dispatch(addTask(newTask));
      inputRef.current.value = '';
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <>
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
        <button onClick={handleAddTask} className="btn">
          Add
        </button>
      </div>
    </>
  );
};
