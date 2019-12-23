import React from 'react';
import './FeedbackProperty.scss';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { customEqual } from '../../../_helpers/helpers';

interface IFeedbackPropertyProps {
  feedbackItem: IIndicator;
}

export const FeedbackProperty: React.FC<IFeedbackPropertyProps> = ({ feedbackItem }) => {
  /** Выбранные атрибуты/навыки */
  const selectedProperties: IIndicator[] = useSelector(
    (store: IStore) => store.properties.selectedProperties,
    customEqual
  );

  /** Класс для выбранного элемента */
  const selectedClass =
    selectedProperties.findIndex((e) => e.sId === feedbackItem.sId) >= 0 ? 'selected' : '';

  /** Отображение только тех элементов, которые есть в справочнике */
  const feedbackItemJSX = feedbackItem && feedbackItem.sName ?
    <div className={`feedback-item ${selectedClass}`}>
      <span className='feedback-item__name'>{feedbackItem.sName}</span>
    </div> : '';

  return (
    <>{feedbackItemJSX}</>
  );
};
