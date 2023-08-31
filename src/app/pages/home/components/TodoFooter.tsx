import { useDispatch, useSelector } from 'react-redux';

import { Status } from '../../../shared/constants';
import { TaskState } from '../../../../redux/reducer';
import { TaskService } from '../../../shared/services/task-service';
import { clearCompleted } from '../../../../redux/action';

export const TodoFooter = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);
  const dispatch = useDispatch();

  const taskService = new TaskService();
  const tasksLeft = taskService.getTasks(tasks, Status.ACTIVE).length;

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="quantity-wrap d-flex">
      <p className="quantity">
        {tasksLeft + ` Task${tasksLeft > 1 ? 's' : ''} Left`}
      </p>
      {taskService.getTasks(tasks, Status.COMPLETED).length ? (
        <button className="btn btn-outline" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      ) : null}
    </div>
  );
};
