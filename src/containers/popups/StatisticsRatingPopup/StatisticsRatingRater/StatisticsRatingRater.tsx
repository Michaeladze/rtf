import React from 'react';
import './StatisticsRatingRater.scss';
import UserTitle from '../../../../components/UserTitle/UserTitle';
import Rating from '../../../../components/Rating/Rating';
import { IAttributesItem } from "../../../../_store/reducers/statisticsAll.reducer";

interface IStatisticsRatingRaterProps {
  rater: IAttributesItem;
}

const StatisticsRatingRater: React.FC<IStatisticsRatingRaterProps> = ({
  rater
}) => {
  return (
    <li className='statistic-rating__item'>
      <div className='statistic-rating__content'>
        <UserTitle user={rater.oUser} />
        <Rating rating={rater.iGrade} />
      </div>
      {
        rater.sComment &&
        <p className='statistic-rating__comment'>{rater.sComment}</p>
      }

    </li>
  );
};
export default StatisticsRatingRater;
