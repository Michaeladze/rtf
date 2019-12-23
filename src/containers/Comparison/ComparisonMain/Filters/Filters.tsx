import React, { useEffect, useRef } from 'react';
import './Filters.scss';
import Search from '../../../_shared/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { GetSubordinates } from '../../../../_store/actions/subordinates.action';
import { IDropdownValue } from '../../../_shared/Dropdown/Dropdown';
import Dropdown from '../../../_shared/Dropdown';
import { IStore } from '../../../../_store/store.interface';
import { customEqual } from '../../../../_helpers/helpers';
import { SetComparisonFilter, SetComparisonPeriodFilter } from '../../../../_store/actions/comparison.action';
import { IComparisonUser } from '../../../../_store/reducers/comparison.reducer';

const Filters = () => {
  const dispatch = useDispatch();

  // ========================================================================================================

  /** Ссылка на input с поиском */
  const searchProperty = useRef<HTMLInputElement>(null);

  /** Строка поиска */
  const sUserFIO: string = useSelector((store: IStore) => store.subordinates.sUserFIO, customEqual);

  /** Пользователи в сравнении */
  const comparisonUsers: IComparisonUser[] = useSelector((store: IStore) => store.comparison.collection, customEqual);

  /** Поиск по списку */
  useEffect(() => {
    const sub = fromEvent(searchProperty.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(900),
        distinctUntilChanged()
      )
      .subscribe((search: string) => {
        dispatch({
          type: GetSubordinates.Pending,
          payload: { iPage: 0, iSize: 40, sUserFIO: search }
        });
      });

    return () => sub.unsubscribe();
  }, [dispatch, sUserFIO]);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = () => {
    if (searchProperty.current && searchProperty.current.value.length) {
      searchProperty.current.value = '';
      dispatch({
        type: GetSubordinates.Pending,
        payload: { iPage: 0, iSize: 40, sUserFIO: '' }
      });
    }
  };

  // ========================================================================================================
  /* Селект */
  const aValues: IDropdownValue[] = [
    {
      iId: 1,
      sLabel: 'По месяцу',
      sValue: 'MONTH'
    },
    {
      iId: 2,
      sLabel: 'По кварталу',
      sValue: 'QUARTER'
    },
    {
      iId: 3,
      sLabel: 'По году',
      sValue: 'YEAR'
    }
  ];

  /** Установка фильтра по периоду */
  const setValue = (value: IDropdownValue) => {
    dispatch({ type: SetComparisonPeriodFilter.Set, payload: { sDatePeriod: value.sValue } });

    if (comparisonUsers.length > 0) {

      // Структура запроса
      const body = comparisonUsers.map((user) => {
        return {
          user: user.user
        }
      });

      dispatch({
        type: SetComparisonFilter.Pending,
        payload: { sDatePeriod: value.sValue, users: body }
      });
    }
  };

  // ========================================================================================================

  return (
    <div className='comparison__filters'>
      <div className='comparison__filters-select'>
        <Dropdown aValues={aValues} setValue={setValue} defaultLabel={aValues[2].sLabel}/>
      </div>

      <div className='comparison__filters-search'>
        <Search refName={searchProperty} handleClick={handleClearTextInput}/>
      </div>
    </div>
  );
};

export default Filters;
