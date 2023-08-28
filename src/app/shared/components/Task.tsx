import { useRef, useState } from 'react';
import deleteIcon from '../../../assets/delete.svg';
import { TaskProps } from '../models/task';
import { STATUS } from '../constants';

interface Props {
  task: TaskProps;
  handleDelete: () => void;
  handleUpdate: (updatedTask: TaskProps) => void;
}

const Task = (props: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsEditable(true);
  };

  const handleChangeContent = () => {
    setIsEditable(false);
    if (inputRef.current?.value)
      props.handleUpdate({ ...props.task, content: inputRef.current?.value });
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleChangeContent();
    }
  };

  const handleCheckboxChange = () => {
    props.handleUpdate({
      ...props.task,
      status:
        props.task.status === STATUS.Active ? STATUS.Completed : STATUS.Active,
    });
  };

  return (
    <div className="task d-flex">
      <div className="task-wrap d-flex">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={props.task.status === STATUS.Completed}
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
            defaultValue={props.task.content}
          />
        ) : (
          <span
            className={`task-label ${
              props.task.status === STATUS.Completed && 'completed'
            }`}
            onDoubleClick={handleFocus}
          >
            {props.task.content}
          </span>
        )}
      </div>
      <button className="delete-button" onClick={props.handleDelete}>
        <img src={deleteIcon} alt="Delete Icon" />
      </button>
    </div>
  );
};

export default Task;
