import React, { useEffect, useRef } from 'react';
import './SearchPopup.scss';
import Search from '../../../_shared/Search/Search';
import { useDispatch } from 'react-redux';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

interface ISearchPopupProps {
  setFilter: (requestString: string, type?: string) => void;
}
const SearchPopup: React.FC<ISearchPopupProps> = ({ setFilter }) => {
  const dispatch = useDispatch();

  /** Ссылка на input с поиском */
  const searchProperty = useRef<HTMLInputElement>(null);

  /** Поиск по атрибуту/навыку */
  useEffect(() => {
    const sub = fromEvent(searchProperty.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((inputString: string) => {
        setFilter(inputString);
      });
    return () => sub.unsubscribe();
  }, [dispatch, setFilter]);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = () => {
    if (searchProperty.current && searchProperty.current.value.length) {
      searchProperty.current.value = '';
      setFilter('');
    }
  };

  return (
    <div className='add-attribute__search'>
      <Search refName={searchProperty} handleClick={handleClearTextInput} />
    </div>
  );
};
export default SearchPopup;
