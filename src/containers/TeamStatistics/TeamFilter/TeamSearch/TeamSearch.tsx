import React, { useEffect, useRef } from 'react';
import Search from '../../../_shared/Search/Search';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeamInfo } from '../../../../_store/actions/team-info.action';
import { IStore } from '../../../../_store/store.interface';
import { customEqual } from '../../../../_helpers/helpers';

const TeamSearch: React.FC = () => {
  const dispatch = useDispatch();

  /** Активный период */
  const activePeriod: string = useSelector((store: IStore) => store.teamInfo.activePeriod, customEqual);

  /** Ссылка на input с поиском */
  const searchInput = useRef<HTMLInputElement>(null);

  /** Поиск по ФИО */
  useEffect(() => {
    const sub = fromEvent(searchInput.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(900),
        distinctUntilChanged()
      )
      .subscribe((inputString: string) => {
        dispatch({
          type: GetTeamInfo.Pending,
          payload: { iPage: 0, iSize: 40, sDatePeriod: activePeriod, sUserFIO: inputString }
        });
      });
    return () => sub.unsubscribe();
  }, [dispatch, activePeriod]);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = () => {
    if (searchInput.current && searchInput.current.value.length) {
      searchInput.current.value = '';
      dispatch({
        type: GetTeamInfo.Pending,
        payload: { iPage: 0, iSize: 40, sDatePeriod: activePeriod, sUserFIO: '' }
      });
    }
  };

  return (
    <Search refName={searchInput} handleClick={handleClearTextInput}/>
  );
};

export default TeamSearch;
