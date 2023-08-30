import { STATUS } from '../../../shared/constants';
import { ComponentProps } from '../../../shared/models/task';
import { TaskService } from '../../../shared/services/task-service';

export const BoardFooter = ({ data, updateData }: ComponentProps) => {
  const taskService = new TaskService();
  const tasksLeft = taskService.getTasks(data, STATUS.Active).length;

  const handleClearCompleted = () => {
    updateData(taskService.clearCompletedTasks(data));
  };

  return (
    <div className="quantity-wrap d-flex">
      <p className="quantity">
        {tasksLeft + ` Task${tasksLeft > 1 ? 's' : ''} Left`}
      </p>
      {taskService.getTasks(data, STATUS.Completed).length ? (
        <button className="btn btn-outline" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      ) : null}
    </div>
  );
};
