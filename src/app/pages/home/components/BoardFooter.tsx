import { useDispatch, useSelector } from 'react-redux';

import { STATUS } from '../../../shared/constants';
import { TaskState } from '../../../shared/redux/reducer';
import { TaskService } from '../../../shared/services/task-service';
import { clearCompleted } from '../../../shared/redux/action';

export const BoardFooter = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);
  const dispatch = useDispatch();

  const taskService = new TaskService();
  const tasksLeft = taskService.getTasks(tasks, STATUS.Active).length;

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="quantity-wrap d-flex">
      <p className="quantity">
        {tasksLeft + ` Task${tasksLeft > 1 ? 's' : ''} Left`}
      </p>
      {taskService.getTasks(tasks, STATUS.Completed).length ? (
        <button className="btn btn-outline" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      ) : null}
    </div>
  );
};
