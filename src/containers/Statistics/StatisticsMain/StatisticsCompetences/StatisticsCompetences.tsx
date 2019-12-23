import React from 'react';
import './StatisticsCompetences.scss';
import Diagram from './Diagram/Diagram';
import Competences from './Competences/Competences';
import Filter from '../Filter/Filter';
import StatisticsHeader from '../StatisticsHeader/StatisticsHeader';
import { useSelector } from 'react-redux';
import { selectStatistics } from '../../../../_store/selectors/statistics.selectors';
import { IStore } from '../../../../_store/store.interface';
import { breakpoints, customEqual } from '../../../../_helpers/helpers';
import { IAttributes } from '../../../../_store/reducers/statisticsAll.reducer';
import { competenceFilter } from '../../../FeedbackActions/filter-property';

const StatisticsCompetences: React.FC = () => {
  /** Подписываемся на данные */
  const competence: IAttributes[] = useSelector(selectStatistics);

  /** Получение фильтра */
  const propertyFilter: string = useSelector((store: IStore) => store.statisticsAll.propertyFilter, customEqual);

  /** Применение фильтра для значений */
  const filterAttributes = competenceFilter(competence, propertyFilter);

  /** Фильтр в десктопе */
  const filter = window.innerWidth > breakpoints.medium && <Filter/>;

  return (
    <div className='statistics-competences'>
      <div className="statistics-competences__top">
        <StatisticsHeader title={'competences'}/>
        <Diagram statistics={competence}/>
        {filter}
      </div>
      <Competences statistics={filterAttributes}/>
    </div>
  );
};

export default StatisticsCompetences;
