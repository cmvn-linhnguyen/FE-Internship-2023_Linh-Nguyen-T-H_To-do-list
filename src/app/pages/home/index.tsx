import { useEffect, useState } from 'react';

import { BoardFooter, BoardHeader, TaskList } from './components';

import { TaskProps } from '../../shared/models/task';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../../shared/utils';
import '../../../stylesheet/style.scss';
import { LOCAL_STORAGE_KEY } from '../../shared/constants';

const Home = () => {
  const [data, setData] = useState<TaskProps[]>(
    getDataFromLocalStorage(LOCAL_STORAGE_KEY.TodoList)
  );

  useEffect(() => {
    saveDataToLocalStorage(LOCAL_STORAGE_KEY.TodoList, data);
  }, [data]);

  const updateData = (newData: TaskProps[]): void => {
    setData(newData);
  };

  return (
    <div className="home">
      <div className="board-wrap">
        <BoardHeader data={data} updateData={updateData} />
        <div className="line"></div>
        {data.length ? (
          <>
            <TaskList data={data} updateData={updateData} />
            <BoardFooter data={data} updateData={updateData} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
