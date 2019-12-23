import React from 'react';
import './StatisticsShaper.scss';
import StatisticsHeader from '../StatisticsHeader/StatisticsHeader';
import Filter from '../Filter/Filter';
import Competences from '../StatisticsCompetences/Competences/Competences';
import DiagramShaper from './DiagramShaper/DiagramShaper';
import { IAttributes } from '../../../../_store/reducers/statisticsAll.reducer';
import { useSelector } from 'react-redux';
import { selectShapers } from '../../../../_store/selectors/statistics.selectors';
import { IStore } from '../../../../_store/store.interface';
import { breakpoints, customEqual } from '../../../../_helpers/helpers';
import { competenceFilter } from '../../../FeedbackActions/filter-property';

const StatisticsShaper = () => {
  /** Подписываемся на данные */
  const shapers: IAttributes[] = useSelector(selectShapers);

  /** Получение фильтра */
  const propertyFilter: string = useSelector((store: IStore) => store.statisticsAll.propertyFilter, customEqual);

  /** Применение фильтра для значений */
  const fltProperties = competenceFilter(shapers, propertyFilter);

  /** Фильтр в десктопе */
  const filter = window.innerWidth > breakpoints.medium && <Filter/>;

  return (
    <div className='shaper'>
      <StatisticsHeader title={'shapers'}/>
      <DiagramShaper statistics={shapers}/>
      {filter}
      <Competences statistics={fltProperties}/>
    </div>
  );
};
export default StatisticsShaper;
