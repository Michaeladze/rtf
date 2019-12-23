import React, { useEffect } from 'react';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import StatisticsAside from './StatisticsAside/StatisticsAside';
import StatisticsMain from './StatisticsMain/StatisticsMain';
import ViewContainer from '../_shared/ViewContainer';
import useReactRouter from 'use-react-router';
import SubordinatesAside from './SubordinatesAside';
import { useDispatch } from 'react-redux';
import { ClearSubordinatesList } from '../../_store/actions/subordinates.action';

const Statistics = () => {
  const dispatch = useDispatch();

  /** ID подчиненного из роута */
  const { location } = useReactRouter();
  const arr = location.pathname.split('/');
  const sSubordinateId = arr.length >= 4 && arr[3];

  /** Сбрасываем список юзеров, когда уходим со страницы */
  useEffect(() => {
    return () => {
      if (sSubordinateId) {
        dispatch({ type: ClearSubordinatesList.Set, payload: { clear: true } });
      }
    }
  }, []);

  /** Aside блок в зависимости от пользователя */
  const asideComponent = sSubordinateId ? <SubordinatesAside /> : <StatisticsAside/>;

  return (
    <ViewContainer goBackUrl='/'>
      <CommonContainer
        asideComponent={asideComponent}
        mainComponent={<StatisticsMain/>}
        mainTitle={'Статистика'}
      />
    </ViewContainer>
  );
};
export default Statistics;
