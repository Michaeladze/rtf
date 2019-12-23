import React, { useState } from 'react';
import './TeamStatisticsMain.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { breakpoints, customEqual, getNoun, useLazyLoad } from '../../../_helpers/helpers';
import TeamList from '../TeamList';
import TeamFilter from '../TeamFilter';
import { GetTeamInfo } from '../../../_store/actions/team-info.action';
import { ISubordinate } from '../../../_store/reducers/team-info.reducer';

const TeamStatisticsMain: React.FC = () => {
  const dispatch = useDispatch();
  /** Количество подгружаемых элементов */
  const [iSize] = useState(40);
  /** Номер страницы */
  const [page, setPage] = useState(1);

  // ==================================================================================================================

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.teamInfo.collection.bHasNext, customEqual);

  /** Активный период */
  const activePeriod: string = useSelector((store: IStore) => store.teamInfo.activePeriod, customEqual);

  /** Ленивая догрузка страницы */
  useLazyLoad(document.querySelector<HTMLDivElement>('.rtf__common-body--overflow'), () => {
    if (bHasNext) {
      dispatch({
        type: GetTeamInfo.Pending,
        payload: { iPage: page, iSize, sDatePeriod: activePeriod, sUserFIO: '' }
      });
      setPage(page + 1);
    }
  });

  /** Получение подчиненных */
  const subordinates: ISubordinate[] = useSelector((store: IStore) => store.teamInfo.collection.aObjects, customEqual);
  const subordinatesJSX = subordinates.length > 0 ?
    <TeamList users={subordinates}/> :
    <p className='info-tip team'>Пользователи не найдены.</p>;

  // ==================================================================================================================

  /** Подзаголовок с количеством подчиненных для мобильной версии */
  const usersCount: number = useSelector((store: IStore) => store.teamInfo.collection.iTotalCount, customEqual);
  const subTitle = window.innerWidth <= breakpoints.medium ?
    `${usersCount} ${getNoun(usersCount, 'сотрудник', 'сотрудника', 'сотрудников')}` : '';

  return (
    <>
      <TeamFilter/>
      <p className='team-statistics__count'>{subTitle}</p>
      {subordinatesJSX}
    </>
  );
};

export default TeamStatisticsMain;
