import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../../_store/store.interface';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import CustomSwiper from '../../../_shared/CustomSwiper/CustomSwiper';
import './Team.scss';
import Member from './Member/Member';
import { SetUserForComparison } from '../../../../_store/actions/comparison.action';
import { customEqual } from '../../../../_helpers/helpers';
import { ClearSubordinatesList, GetSubordinates } from '../../../../_store/actions/subordinates.action';

const Team = () => {
  const dispatch = useDispatch();

  /** Количество подгружаемых элементов */
  const [iSize] = useState(40);
  /** Номер страницы */
  const [page, setPage] = useState(1);

  /** Активный период в сравнении */
  const activePeriod: string = useSelector((store: IStore) => store.comparison.activePeriod, customEqual);

  /** Сбрасываем список юзеров, когда уходим со страницы */
  useEffect(() => {
    return () => {
      dispatch({
        type: ClearSubordinatesList.Set,
        payload: { clear: true }
      });
    }
  }, []);

  // ========================================================================================================
  /** Список подчиненных */
  const users: IUser[] = useSelector((store: IStore) => store.subordinates.collection.aObjects, customEqual);

  // ========================================================================================================

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.subordinates.collection.bHasNext, customEqual);

  const addItems = () => {
    if (bHasNext) {
      dispatch({ type: GetSubordinates.Pending, payload: { iPage: page, iSize, sUserFIO: '' } });
      setPage(page + 1);
    }
  };

  // ========================================================================================================

  /** Клик по юзеру */
  const handleClick = (user: IUser) => {
    dispatch({ type: SetUserForComparison.Pending, payload: { sDatePeriod: activePeriod, user } });
  };

  /** JSX списка сотрудников */
  const list = users.map((p: IUser) => (
    <div
      style={{ width: '90px' }}
      key={p.sUserId}>
      <Member user={p} handler={() => handleClick(p)}/>
    </div>
  ));

  // ========================================================================================================

  /** Свайпер */
  const swiper = <CustomSwiper
    spaceBetween={15}
    mobileSpaceBetween={0}
    slidesPerView={12}
    addItems={addItems}
    flag={bHasNext}>
    {list}
  </CustomSwiper>;

  // ========================================================================================================

  return (
    <>
      <div className='team__line'/>
      <div className='team'>
        <h3 className='team__title'> Все сотрудники </h3>
        <div className="team__members">
          {swiper}
        </div>
      </div>
      <div className='team__line'/>
    </>
  );
};

export default Team;
