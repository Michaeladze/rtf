import React, { useEffect, useState } from 'react';
import './HistoryUsersMobile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserHistory } from '../../../_store/actions/users-history.action';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { customEqual, useLazyLoad } from '../../../_helpers/helpers';
import { IStore } from '../../../_store/store.interface';
import ViewContainer from '../../_shared/ViewContainer';
import { FeedbackUserCard } from '../../Feedback/FeedbackUserCard/FeedbackUserCard';
import useReactRouter from 'use-react-router';
import { selectHistoryList } from '../../../_store/selectors/users.selectors';

const HistoryUsersMobile = () => {
  /** Записываем в LocalStorage флаг для возвращения на эту страницу */
  localStorage.setItem('backToHistoryList', 'true');

  const dispatch = useDispatch();
  const { history } = useReactRouter();
  const [iSize] = useState(15);

  /** Флаг загрузки юзеров */
  const usersLoaded: boolean = useSelector(
    (store: IStore) => store.userHistory.usersLoaded,
    customEqual
  );

  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetUserHistory.Pending, payload: { iPage: 0, iSize } });
    }
  }, [dispatch, iSize]);

  /** Все пользователи */
  const users: IUser[] = useSelector(selectHistoryList, customEqual);

  /** Клик по юзеру запускает переход в историю */
  const handleClick = (sUserId: string) => {
    history.push(`/history/${sUserId}`);
  };

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.userHistory.users.bHasNext, customEqual);

  /** Номер страницы */
  const [page, setPage] = useState(1);

  /** Ленивая догрузка страницы */
  useLazyLoad(document.querySelector<HTMLDivElement>('.rtf__common-body--overflow'), () => {
    if (bHasNext) {
      dispatch({ type: GetUserHistory.Pending, payload: { iPage: page, iSize } });
      setPage(page + 1);
    }
  });

  /** Список юзеров */
  const usersJSX = users && users.map((u) =>
    <div className='history-mobile__user' key={u.sUserId} onClick={() => handleClick(u.sUserId)}>
      <FeedbackUserCard user={u}/>
    </div>);

  return (
    <ViewContainer goBackUrl='/'>
      <div className='rtf__common-body--overflow'>
        <div className='history-mobile__users'>{usersJSX}</div>
      </div>
    </ViewContainer>
  );
};

export default HistoryUsersMobile;
