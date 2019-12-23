import React, { useEffect } from 'react';
import './StatisticsSwiperMobile.scss';
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../_store/store.interface";
import { customEqual } from "../../../_helpers/helpers";

import { IStatisticsSummary } from "../../../_store/reducers/statisticsAll.reducer";
import { GetStatisticsSummary } from "../../../_store/actions/statistics.action";
import CustomSwiper from "../../_shared/CustomSwiper/CustomSwiper";
import IndicatorGroup from "../StatisticsAside/IndicatorGroup/IndicatorGroup";

export interface ITotal {
  sName: string;
  count: number | undefined;
}

const StatisticsSwiperMobile = () => {
  /** Получение компетенций при переходе на вкладку компетенций*/
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GetStatisticsSummary.Pending });
  }, [dispatch]);

  const statisticSummary: IStatisticsSummary = useSelector((store: IStore) =>
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
  const thanksTotal: ITotal[] = [
    {
      sName: 'Вас пока никто не поблагодарил',
      count: statisticSummary.iCountIncomeThank
    },
    {
      sName: 'Выданных благодарности',
      count: statisticSummary.iCountOutcomeThank
    }
  ];

  return (
    <div className='statistics__swiper--mobile' >
      <CustomSwiper spaceBetween={8}
        mobileSpaceBetween={0}
        slidesPerView={7} >
        <div style={{ width: '290px' }}>
          <IndicatorGroup groupAttributes={strongAttribute} groupSkills={strongSkills} title={'Сильные стороны'}/>
        </div>
        <div style={{ width: '290px' }}>
          <IndicatorGroup groupAttributes={weakAttribute} groupSkills={weakSkills} title={'Зоны развития'}/>
        </div>
        <div style={{ width: '290px' }}>
          <IndicatorGroup groupTotalRating={ratingTotal} groupThanks={thanksTotal} title={'За последние 7 дней:'}/>
        </div>
      </CustomSwiper>
    </div>

  );
};
export default StatisticsSwiperMobile;
