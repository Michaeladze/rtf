import React from 'react';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';
import CustomSwiper from '../../_shared/CustomSwiper/CustomSwiper';
import FeedbackPropertySlide from '../FeedbackPropertySlide/FeedbackPropertySlide';
import { ReactComponent as Icon } from '../../../_assets/svg/feedback-property-icon.svg';

interface IFeedbackRecommendedListProps {
  list: IIndicator[];
  onPropertyClick: (property: IIndicator) => void;
  type: string;
}

export const FeedbackRecommendedList: React.FC<IFeedbackRecommendedListProps> = ({ list, onPropertyClick, type }) => {
  const items = list.map((item: IIndicator) => (
    <div
      key={item.sId}
      className='property-box__item'
      onClick={() => onPropertyClick(item)}>
      <FeedbackPropertySlide
        feedbackProperty={item}
        icon={<Icon />}
        isRecommended={true}
      />
    </div>
  ));

  /** ID для стрелок свайпера */
  const arrowPrev = type === 'attributes' ? 'attributes-prev' : 'skills-prev';
  const arrowNext = type === 'attributes' ? 'attributes-next' : 'skills-next';

  return (
    <CustomSwiper
      children={items}
      spaceBetween={25}
      mobileSpaceBetween={10}
      slidesPerView={4}
      arrowPrevId={arrowPrev}
      arrowNextId={arrowNext}/>
  );
};
