import { useSelector } from 'react-redux';

import { TodoFooter, TodoHeader, TaskList } from './components';

import '../../../stylesheet/style.scss';
import { TaskState } from '../../../redux/reducer';
import { useEffect } from 'react';
import { saveDataToLocalStorage } from '../../shared/utils';
import { StorageKeys } from '../../shared/constants';

const Home = () => {
  const tasks = useSelector((state: TaskState) => state.tasks);

  useEffect(() => {
    saveDataToLocalStorage(StorageKeys.TO_DO_LIST, tasks);
  }, [tasks]);

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
