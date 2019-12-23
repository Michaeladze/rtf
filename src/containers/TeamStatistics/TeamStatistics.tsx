import React, { useEffect } from 'react';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import ViewContainer from '../_shared/ViewContainer';
import TeamStatisticsMain from './TeamStatisticsMain';
import { useDispatch, useSelector } from 'react-redux';
import { breakpoints, customEqual, getNoun } from '../../_helpers/helpers';
import { IStore } from '../../_store/store.interface';
import useReactRouter from 'use-react-router';
import { ClearTeamList, GetTeamInfo } from '../../_store/actions/team-info.action';

const TeamStatistics = () => {
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  // ==================================================================================================================

  /** Подписываемся на подчиненных */
  const isBoss: boolean = useSelector((store: IStore) => store.subordinates.isBoss, customEqual);

  useEffect(() => {
    if (!isBoss) {
      history.push('/');
    }
  }, [isBoss]);

  // ==================================================================================================================

  /** Флаг загрузки юзеров */
  const usersLoaded: boolean = useSelector((store: IStore) => store.teamInfo.usersLoaded, customEqual);

  /** Активный период */
  const activePeriod: string = useSelector((store: IStore) => store.teamInfo.activePeriod, customEqual);

  /** Строка запроса */
  const sUserFIO: string = useSelector((store: IStore) => store.teamInfo.sUserFIO, customEqual);

  /** Диспатчим получение информации по подчиненным (если первый заход на страницу) */
  useEffect(() => {
    if (!usersLoaded) {
      dispatch({
        type: GetTeamInfo.Pending,
        payload: { iPage: 0, iSize: 40, sDatePeriod: activePeriod, sUserFIO }
      });
    }
  }, [dispatch,
    activePeriod,
    sUserFIO,
    usersLoaded]);

  /** Чистим список, когда уходим со страницы */
  useEffect(() => {
    return () => {
      dispatch({ type: ClearTeamList.Set, payload: { clear: true } });
    }
  }, []);

  // ==================================================================================================================

  /** Количество сотрудников */
  const usersCount: number = useSelector((store: IStore) => store.teamInfo.collection.iTotalCount, customEqual);

  /** Подзаголовок с количеством подчиненных */
  const subTitle = window.innerWidth > breakpoints.medium ?
    `${usersCount} ${getNoun(usersCount, 'сотрудник', 'сотрудника', 'сотрудников')}` : '';

  // ==================================================================================================================

  return (
    <ViewContainer goBackUrl='/'>
      <CommonContainer
        mainComponent={<TeamStatisticsMain/>}
        mainTitle={'Командный отчёт'}
        subtitle={subTitle}
        isOneLineHeader={true}
      />
    </ViewContainer>
  );
};
export default TeamStatistics;
