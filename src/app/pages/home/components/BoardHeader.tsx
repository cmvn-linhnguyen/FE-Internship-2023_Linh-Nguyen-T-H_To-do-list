import { useRef } from 'react';
import { TaskService } from '../../../shared/services/task-service';
import { ComponentProps, TaskProps } from '../../../shared/models/task';
import { STATUS } from '../../../shared/constants';

export const BoardHeader = ({ data, updateData }: ComponentProps) => {
  const taskService = new TaskService();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      const newTask: TaskProps = {
        id: Date.now(),
        content: inputValue,
        status: STATUS.Active,
      };

      updateData(taskService.addTask(data, newTask));
      inputRef.current.value = '';
    }
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
        <button onClick={handleAdd} className="btn">
          Add
        </button>
      </div>
    </>
  );
};
