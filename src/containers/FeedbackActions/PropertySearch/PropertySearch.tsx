import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import Search from '../../_shared/Search/Search';

interface IPropertySearchProps {
  setFilter: (requestString: string) => void;
}

export const PropertySearch: React.FC<IPropertySearchProps> = ({ setFilter }) => {
  const dispatch = useDispatch();

  /** Ссылка на input с поиском */
  const searchProperty = useRef<HTMLInputElement>(null);

  /** Поиск по атрибуту/навыку */
  useEffect(() => {
    const sub = fromEvent(searchProperty.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(200),
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
    <Search refName={searchProperty} handleClick={handleClearTextInput}/>
  );
};
