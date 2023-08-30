import { BoardFooter, BoardHeader, TaskList } from './components';

import '../../../stylesheet/style.scss';
import { useSelector } from 'react-redux';
import { TaskState } from '../../shared/redux/reducer';

const Home = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);

  return (
    <div className="home">
      <div className="board-wrap">
        <BoardHeader />
        <div className="line"></div>
        {tasks.length ? (
          <>
            <TaskList />
            <BoardFooter />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
