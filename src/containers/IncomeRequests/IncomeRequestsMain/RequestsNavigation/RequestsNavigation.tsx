import React, { useEffect, useState } from 'react';
import './RequestsNavigation.scss';
import CustomSwiper from '../../../_shared/CustomSwiper/CustomSwiper';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { GetIncomeAssessmentsFromPerson, SetActiveRequest } from '../../../../_store/actions/users-request.action';
import { IPagination, IStore } from '../../../../_store/store.interface';
import { IRequestMeta } from '../../../../_store/reducers/users-request.reducer';
import { customEqual } from '../../../../_helpers/helpers';
import RequestsNavigationItem from '../RequestsNavigationItem/RequestsNavigationItem';

const RequestsNavigation = () => {
  /** Количество подгружаемых элементов */
  const [iSize] = useState(30);
  /** Номер страницы */
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { match, history, location } = useReactRouter();

  /** Подписываемся на флаг загрузки запросов */
  const assessmentsLoaded: boolean = useSelector((store: IStore) => store.userRequest.assessmentsLoaded, customEqual);

  useEffect(() => {
    const sUserId = (match.params as { userId: string }).userId;

    if (sUserId && sUserId !== 'income-requests' && !assessmentsLoaded) {
      dispatch({
        type: GetIncomeAssessmentsFromPerson.Pending, payload: {
          iSize,
          iPage: 0,
          sUserId: sUserId
        }
      });
    }
  }, [dispatch, match.url, assessmentsLoaded]);

  /** Получаем список запросов от пользователя sUserId  */
  const requestsList: IPagination<IRequestMeta> = useSelector(
    (store: IStore) => store.userRequest.collection,
    customEqual
  );

  /** Индекс активного запроса */
  const [index, setIndex] = useState(0);

  /** Делаем редирект на первый запрос */
  useEffect(() => {
    if (requestsList.aObjects.length) {
      const url = location.pathname.split('/');

      if (url.length === 3) {
        // Если в url нет id запроса, переходим на первый из списка и делаем его активным
        dispatch({ type: SetActiveRequest.Set, payload: { activeAssessmentMeta: requestsList.aObjects[0] } });
        history.push(`${match.url}/${requestsList.aObjects[0].sId}`);
      }

      if (url.length === 4) {
        // Если в url есть id запроса, делаем его активным
        const index = requestsList.aObjects.findIndex((r) => r.sId === url[3]);
        if (index >= 0) {
          setIndex(index);
          dispatch({ type: SetActiveRequest.Set, payload: { activeAssessmentMeta: requestsList.aObjects[index] } });
        } else {
          dispatch({ type: SetActiveRequest.Set, payload: { activeAssessmentMeta: requestsList.aObjects[0] } });
          history.push(`${match.url}/${requestsList.aObjects[0].sId}`);
        }
      }
    }
  }, [dispatch, requestsList]);

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.userRequest.collection.bHasNext, customEqual);

  const addItems = () => {
    const sUserId = (match.params as { userId: string }).userId;
    if (bHasNext) {
      dispatch({
        type: GetIncomeAssessmentsFromPerson.Pending, payload: {
          iSize,
          iPage: page,
          sUserId: sUserId
        }
      });
      setPage(page + 1);
    }
  };

  /** Карточки запросов */
  const items = requestsList && requestsList.aObjects.map((e) =>
    <div key={e.sId}>
      <RequestsNavigationItem item={e}/>
    </div>);

  return (
    <div className='requests__navigation'>
      <CustomSwiper
        spaceBetween={20}
        slidesPerView={3}
        mobileSpaceBetween={15}
        slideTo={index}
        addItems={addItems}
        flag={bHasNext}>
        {items}
      </CustomSwiper>
    </div>
  );
};

export default RequestsNavigation;
