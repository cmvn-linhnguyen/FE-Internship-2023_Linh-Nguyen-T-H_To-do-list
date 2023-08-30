import { useSelector } from 'react-redux';

import { TodoFooter, TodoHeader, TaskList } from './components';

import '../../../stylesheet/style.scss';
import { TaskState } from '../../shared/redux/reducer';

const Home = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);

  return (
    <div className="home">
      <div className="board-wrap">
        <TodoHeader />
        <div className="line"></div>
        {tasks.length ? (
          <>
            <TaskList />
            <TodoFooter />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
