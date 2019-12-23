import React, { useCallback, useEffect, useRef } from 'react';
import Search from '../../../_shared/Search/Search';
import { useDispatch } from 'react-redux';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

interface IAsideUsersSearchProps {
  setFilter?: (requestString: string) => void;
}

const AsideUsersSearch: React.FC<IAsideUsersSearchProps> = ({ setFilter }) => {
  const dispatch = useDispatch();

  /** Ссылка на input с поиском */
  const searchInput = useRef<HTMLInputElement>(null);

  // *******************************************************************************************************************

  /** Поиск пользователей по ФИО */
  useEffect(() => {
    const sub = fromEvent(searchInput.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(900),
        distinctUntilChanged()
      )
      .subscribe((inputString: string) => {
        if (setFilter) setFilter(inputString);
      });
    return () => sub.unsubscribe();
  }, [dispatch, setFilter]);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = useCallback(() => {
    if (searchInput.current && searchInput.current.value.length) {
      searchInput.current.value = '';
      if (setFilter) setFilter('');
    }
  }, [setFilter]);

  // *******************************************************************************************************************

  return (
    <div className='aside__user-search search-block'>
      <Search
        refName={searchInput}
        handleClick={handleClearTextInput}
        placeholder='Поиск по ФИО'
      />
    </div>
  );
};
export default AsideUsersSearch;
