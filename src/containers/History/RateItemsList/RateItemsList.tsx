import React, { useEffect, useState } from 'react';
import './RateItemsList.scss';
import { IHistoryItem } from '../../../_store/reducers/users-history.reducer';
import RateItem from './RateItem/RateItem';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { GetHistory } from '../../../_store/actions/users-history.action';
import { IStore } from '../../../_store/store.interface';
import { customEqual, useLazyLoad } from '../../../_helpers/helpers';
import useReactRouter from 'use-react-router';

interface IProps {
  sLoadOption: string;
}

const RateItemsList: React.FC<IProps> = ({ sLoadOption }) => {

  const dispatch = useDispatch();
  const { location } = useReactRouter();
  const locationArray = location.pathname.split('/');
  const routerUser = locationArray[2];
  console.log(routerUser);

  const [iSize] = useState(5);

  /** Активный пользователь */
  const activeUser: IUser | null = useSelector(
    (store: IStore) => store.users.activeUser
  );

  /** Получение списка с историей */
  useEffect(() => {
    dispatch({
      type: GetHistory.Pending,
      payload: {
        body: {
          iPage: 0, iSize, sLoadOption, sUserId: routerUser
        },
        userChanged: routerUser !== ((activeUser as IUser).sUserId)
      }
    });
  }, [dispatch,
    iSize,
    sLoadOption,
    routerUser]);

  /** История */
  const history: { oData: IHistoryItem[]; bHasNext: boolean; sLoadOption: string; } = useSelector(
    (store: IStore) => store.userHistory.collection,
    customEqual
  );

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.userHistory.collection.bHasNext, customEqual);

  /** Номер страницы */
  const [page, setPage] = useState(1);

  /** Ленивая догрузка страницы */
  useLazyLoad(document.querySelector<HTMLDivElement>('.rtf__common-body--overflow'), () => {
    if (bHasNext) {
      dispatch({
        type: GetHistory.Pending,
        payload: { body: { iPage: page, iSize, sLoadOption, sUserId: routerUser }, userChanged: false }
      });
      setPage(page + 1);
    }
  });

  /** Отображение оценок */
  const ratings =
    history && history.oData.length > 0 ?
      history.oData.map((rater, i) => (
        <RateItem activeUser={activeUser} item={rater} sLoadOption={sLoadOption} key={i}/>
      )) : 'Здесь пока ничего нет';

  // /** Отображение прелоудера */
  // const preloader = activeUser && history && !history.dataLoaded &&
  //     <div className='ratings-preloader'> Загружаю больше данных... </div>;

  // *******************************************************************************************************************

  return (
    <>
      {/*TODO вернуть позже*/}
      {/*<HistoryFilters />*/}
      <div className='rating__items'> {ratings} </div>
      {/*{preloader}*/}
    </>
  );
};

export default RateItemsList;
