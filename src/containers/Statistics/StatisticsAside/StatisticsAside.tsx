import React, { useEffect } from 'react';
import './StatisticsAside.scss';
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../_store/store.interface";
import { customEqual, links } from "../../../_helpers/helpers";
import IndicatorGroup from './IndicatorGroup/IndicatorGroup';
import StandardButton from "../../../components/StandardButton/StandardButton";

import { IStatisticsSummary } from "../../../_store/reducers/statisticsAll.reducer";
import { GetStatisticsSummary } from "../../../_store/actions/statistics.action";

export interface ITotal {
  sName: string;
  count: number| undefined;
}

const StatisticsAside = () => {
  /** Получение компетенций при переходе на вкладку компетенций*/
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GetStatisticsSummary.Pending });
  }, [dispatch]);

  const statisticSummary: IStatisticsSummary =  useSelector((store: IStore) =>
    store.statisticsAll.statisticsSummary,
  customEqual
  );

  const strongAttribute = statisticSummary.aStrongAttribute ? statisticSummary.aStrongAttribute : [];
  const strongSkills = statisticSummary.aStrongSkill ? statisticSummary.aStrongSkill : [];

  const weakAttribute = statisticSummary.aWeakAttribute ? statisticSummary.aWeakAttribute : [];
  const weakSkills = statisticSummary.aWeakSkill ? statisticSummary.aWeakSkill : [];

  const ratingTotal: ITotal[] = [
    {
      sName: 'Исходящих оценок',
      count: statisticSummary.iCountOutcome
    },
    {
      sName: 'Входящие оценки',
      count: statisticSummary.iCountIncome
    }
  ];
  const thanksTotal: ITotal[]  = [
    {
      sName: statisticSummary.iCountIncomeThank === 0 ? 'Вас пока никто не поблагодарил' : 'Вас поблагодарили',
      count: statisticSummary.iCountIncomeThank
    },
    {
      sName: 'Выданных благодарностей',
      count: statisticSummary.iCountOutcomeThank
    }
  ];

  const linkSmart =()=> {
    window.open(links.smartIPR, '_blank');
  };

  return (
    <div className='statistics-aside'>
      <IndicatorGroup groupAttributes={strongAttribute} groupSkills={strongSkills} title={'Сильные стороны'}/>
      <IndicatorGroup groupAttributes={weakAttribute} groupSkills={weakSkills}title={'Зоны развития'}/>
      <StandardButton type='link' value={'Перейти в SMART-ИПР'} handler={linkSmart}/>
      <IndicatorGroup groupTotalRating={ratingTotal} groupThanks={thanksTotal} title={'За последние 7 дней:'}/>
    </div>

  );
};
export default StatisticsAside;
