import React from 'react';
import './Rating.scss';
import { ReactComponent as Icon } from '../../_assets/svg/feedback-property-icon.svg';

interface IRatingProps {
  rating: number | undefined;
}

const Rating: React.FC<IRatingProps> = ({ rating }) => {
  /** Если нет рейтнга, показывается иконка */
  const isRateJSX = rating ? (
    <div className='rating__number'>{rating}</div>
  ) : (
    <Icon className='rating__icon' />
  );
  const ratingNumber = rating ? 'number' : '';

  return <div className={`rating-wrapper ${ratingNumber}`}>{isRateJSX}</div>;
};
export default Rating;
