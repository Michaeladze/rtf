import React, { useEffect, useState } from 'react';
import './StatisticsRatingPopup.scss';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';
import { IAttributes, IAttributesStatistics } from '../../../_store/reducers/statisticsAll.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { GetStatisticsAttributes } from '../../../_store/actions/statistics.action';
import { IStore } from '../../../_store/store.interface';
import { customEqual, useLazyLoad } from '../../../_helpers/helpers';
import StatisticsRatingRater from './StatisticsRatingRater/StatisticsRatingRater';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';

interface IProps {
  item: IAttributes & IIndicator;
  type: string;
}

const StatisticsRatingPopup: React.FC<IProps> = ({ item, type }) => {
  const dispatch = useDispatch();

  /** Оценки */
  const items: IAttributesStatistics = useSelector((store: IStore) =>
    store.statisticsAll.statisticsAttributes,
  customEqual
  );

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean | undefined = useSelector((store: IStore) =>
    store.statisticsAll.statisticsAttributes.bHasNext, customEqual);

  /** Количество подгружаемых элементов */
  const [iSize] = useState(10);
  /** Номер страницы */
  const [page, setPage] = useState(1);

  /** При старте запрашиваем список оценок */
  useEffect(() => {
    /** Ключ с ID для сервиса */
    const key = type === 'skill' ? 'sSkillId' : 'sAttributeId';

    if (items.id !== item.sId) {
      dispatch({
        type: GetStatisticsAttributes.Pending,
        payload: {
          iSize,
          iPage: 0,
          [key]: item.sId
        }
      })
    }
  }, [dispatch,
    item,
    item.sId,
    type]);

  /** Ленивая догрузка элементов */
  useLazyLoad(document.querySelector<HTMLDivElement>('.ant-modal-body .dialog-container'), () => {
    if (bHasNext && items.id === item.sId) {
      /** Ключ с ID для сервиса */
      const key = type === 'skill' ? 'sSkillId' : 'sAttributeId';
      dispatch({
        type: GetStatisticsAttributes.Pending,
        payload: {
          iSize,
          iPage: page,
          [key]: item.sId
        }
      });
      setPage(page + 1);
    }
  });

  /** Список оценок JSX */
  const listOfRatersAttributes =
    items && items.aObjects.map((rater, i) => (
      <StatisticsRatingRater rater={rater} key={rater.lDate + i}/>
    ));

  /** Заголовок */
  const title = item && item.sName || item && item.sName;

  /** Обработка тач скролла */
  const onTouchMove = (e: React.TouchEvent) => {
    /** В этом попапе скролл происходит в этом контейнере */
    const scrollView = (e.currentTarget.parentNode as HTMLDivElement).parentNode as HTMLDivElement;
    if (scrollView.scrollTop > 0) {
      e.stopPropagation();
    }
  };

  return (
    <div style={{ height: '100%' }} onTouchMove={onTouchMove}>
      <ActionPopup titleText={title}>
        <ul className='statistics-rating__list'>{listOfRatersAttributes}</ul>
      </ActionPopup>
    </div>
  );
};
export default StatisticsRatingPopup;
