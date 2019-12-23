import React from 'react';
import './FeedbackPropertySlide.scss';
import { useSelector } from 'react-redux';
import { customEqual } from '../../../_helpers/helpers';
import { IStringMap } from '../../../_helpers/socket';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';
import { IStore } from '../../../_store/store.interface';

interface IProps {
  feedbackProperty: IIndicator;
  icon: React.ReactNode;
  isRecommended?: boolean;
}

const FeedbackPropertySlide: React.FC<IProps> = ({ icon, feedbackProperty, isRecommended }) => {
  /** Выбранные атрибуты/навыки */
  const selectedProperties: IIndicator[] = useSelector(
    (store: IStore) => store.properties.selectedProperties,
    customEqual
  );

  /** Получение справочника */
  const assessmentsMap: IStringMap<IStringMap<IIndicator>> = useSelector(
    (store: IStore) => store.properties.dictionary,
    customEqual
  );

  /** Класс для выбранного элемента */
  const selectedClass = selectedProperties.findIndex((e) => e.sId === feedbackProperty.sId) >= 0 ? 'selected' : '';

  const type = feedbackProperty.sCategoryId ? 'attributes' : 'skills';
  const name = feedbackProperty.sName ? feedbackProperty.sName :
    assessmentsMap[type][feedbackProperty.sId] ?
      assessmentsMap[type][feedbackProperty.sId].sName : feedbackProperty.sId;

  return (
    <div className={`property-slide ${selectedClass}`}>
      <div className={`property-slide__icon ${isRecommended ? 'recommended' : ''}`}>{icon}</div>
      <p className='property-slide__name'>
        {name}
      </p>
    </div>
  );
};

export default FeedbackPropertySlide;
