import React, { useEffect } from 'react';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import HistoryAside from './HistoryAside';
import HistoryTabs from './HistoryTabs/HistoryTabs';
import ViewContainer from '../_shared/ViewContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../_store/store.interface';
import { customEqual } from '../../_helpers/helpers';
import { GetBoss } from '../../_store/actions/boss.action';
import { ClearHistoryFlag } from '../../_store/actions/users-history.action';

const History = () => {
  const dispatch = useDispatch();

  /** Подписываемся на флаг загрузки руководителя */
  const bossLoaded: boolean = useSelector((store: IStore) => store.boss.bossLoaded, customEqual);

  /** Запрашиваем руководителя текущего пользователя */
  useEffect(() => {
    if (!bossLoaded) {
      dispatch({ type: GetBoss.Pending });
    }
  }, [bossLoaded, dispatch]);

  const ls = localStorage.getItem('backToHistoryList');
  const backUrl = ls === 'true' ? '/history-users' : '/';

  useEffect(() => {
    return () => {
      dispatch({ type: ClearHistoryFlag.Set, payload: { clearHistory: true } });
    }
  }, []);

  return (
    <ViewContainer goBackUrl={backUrl}>
      <CommonContainer
        asideComponent={<HistoryAside/>}
        mainComponent={<HistoryTabs/>}
        mainTitle={`Обратная связь`}
      />
    </ViewContainer>
  );
};

export default History;
