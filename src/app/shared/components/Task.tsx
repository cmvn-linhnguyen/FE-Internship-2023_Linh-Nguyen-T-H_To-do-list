import { useState } from 'react';
import deleteIcon from '../../../assets/delete.svg';
import { STATUS, TaskProps } from '../interface';

interface Props {
  task: TaskProps;
  handleDelete: () => void;
  handleUpdate: (updatedTask: TaskProps) => void;
}

const Task = (props: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editedContent, setEditedContent] = useState(props.task.content);

  const handleLabelDoubleClick = () => {
    setIsEditable(true);
  };

  const handleContentBlur = () => {
    setIsEditable(false);
    props.handleUpdate({ ...props.task, content: editedContent });
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      setIsEditable(false);
      props.handleUpdate({ ...props.task, content: editedContent });
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
            onBlur={handleContentBlur}
            onKeyDown={handleInputKeyPress}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <span
            className={`task-label ${
              props.task.status === STATUS.Completed && 'completed'
            }`}
            onDoubleClick={handleLabelDoubleClick}
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
