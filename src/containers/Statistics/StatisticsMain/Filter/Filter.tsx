import React, { useEffect, useRef } from 'react';
import './Filter.scss';
import Search from '../../../_shared/Search/Search';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ChangePropertyFilter } from '../../../../_store/actions/feedback-properties.action';
import { useDispatch } from 'react-redux';

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  /** Ссылка на input с поиском */
  const filterInput = useRef<HTMLInputElement>(null);

  /** Поиск по атрибуту/навыку */
  useEffect(() => {
    const sub = fromEvent(filterInput.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((inputString: string) => {
        dispatch({ type: ChangePropertyFilter.Set, payload: inputString });
      });
    return () => sub.unsubscribe();
  }, [dispatch]);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = () => {
    if (filterInput.current && filterInput.current.value.length) {
      filterInput.current.value = '';
      dispatch({ type: ChangePropertyFilter.Set, payload: '' });
    }
  };

  return (
    <div className='filter-search'>
      <Search refName={filterInput} placeholder={'Поиск атрибута'} handleClick={handleClearTextInput}/>
    </div>
  );
};

export default Filter;
