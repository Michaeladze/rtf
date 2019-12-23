import React from 'react';
import StatisticsHeader from '../StatisticsHeader';
import StatisticsSkillsList from './StatisticsSkillsList/StatisticsSkillsList';
import { IAttributesSkills } from '../../../../_store/reducers/statisticsAll.reducer';
import { useSelector } from 'react-redux';
import { selectSkills } from '../../../../_store/selectors/statistics.selectors';
import { IStore } from '../../../../_store/store.interface';
import { customEqual } from '../../../../_helpers/helpers';
import { filterStatSkills } from '../../../FeedbackActions/filter-property';

const StatisticsSkills = () => {
  /** Подписываемся на данные */
  const skills: IAttributesSkills[] = useSelector(selectSkills);

  /** Получение фильтра */
  const propertyFilter: string = useSelector((store: IStore) => store.statisticsAll.propertyFilter, customEqual);

  /** Применение фильтра для значений */
  const fltSkills = filterStatSkills(skills, propertyFilter);

  return (
    <div className='statistics-skills'>
      <StatisticsHeader title={'skills'}/>
      <StatisticsSkillsList statisticsSkills={fltSkills}/>
    </div>
  );
};
export default StatisticsSkills;
