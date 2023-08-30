import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import deleteIcon from '../../../../assets/delete.svg';
import { TaskProps } from '../../../shared/models/task';
import { Status } from '../../../shared/constants';
import { deleteTask, updateTask } from '../../../shared/redux/action';

export const Task = ({ task }: { task: TaskProps }) => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleFocus = () => {
    setIsEditable(true);
  };

  const handleChangeContent = () => {
    setIsEditable(false);
    if (inputRef.current?.value)
      dispatch(updateTask({ ...task, content: inputRef.current?.value }));
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleChangeContent();
    }
  };

  const handleCheckboxChange = () => {
    dispatch(
      updateTask({
        ...task,
        status:
          task.status === Status.ACTIVE ? Status.COMPLETED : Status.ACTIVE,
      })
    );
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="task d-flex">
      <div className="task-wrap d-flex">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.status === Status.COMPLETED}
          onChange={handleCheckboxChange}
        />
        {isEditable ? (
          <input
            type="text"
            id="task-content"
            className="task-content"
            autoFocus={true}
            onBlur={handleChangeContent}
            onKeyDown={handleInputKeyPress}
            ref={inputRef}
            defaultValue={task.content}
          />
        ) : (
          <span
            className={`task-label ${
              task.status === Status.COMPLETED && 'completed'
            }`}
            onDoubleClick={handleFocus}
          >
            {task.content}
          </span>
        )}
      </div>
      <button className="delete-button" onClick={handleDeleteTask}>
        <img src={deleteIcon} alt="Delete Icon" />
      </button>
    </div>
  );
};
