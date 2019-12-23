import React, { useCallback, useEffect, useRef, useState } from 'react';
import './SearchBlock.scss';
import { useDispatch } from 'react-redux';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { GetAllUsers } from '../../../_store/actions/users-all.action';
import Search from '../../_shared/Search/Search';
import UserImage from '../../_shared/UserImage/UserImage';
import { useOnClickOutside } from '../../../_helpers/helpers';

interface ISearchBlockProps {
  result: IUser[];
  onUserClick: (user: IUser) => void;
}

export const SearchBlock: React.FC<ISearchBlockProps> = React.memo(
  ({ result, onUserClick }) => {
    const dispatch = useDispatch();

    /** Ссылка на input с поиском */
    const searchInput = useRef<HTMLInputElement>(null);
    /** Ссылка на блок для обработки клика в outside */
    const searchBlock = useRef<HTMLDivElement>(null);
    const [isVisibleResult, showResult] = useState(false);

    /** (Возможно) костыль для того, чтоб на мобиле при скроллле не менять роутер */
    localStorage.setItem('isSearchToggled', `${isVisibleResult}`);

    /** Поиск пользователей по ФИО */
    useEffect(() => {
      const sub = fromEvent(searchInput.current as HTMLInputElement, 'keyup')
        .pipe(
          map((a: Event) => (a.target as HTMLInputElement).value),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe((inputString: string) => {
          if (inputString) {
            dispatch({ type: GetAllUsers.Pending, payload: inputString });
            showResult(true);
          }
        });
      return () => sub.unsubscribe();
    }, [dispatch]);

    /** Очистка поля ввода и сброс результатов поиска */
    const handleClearTextInput = useCallback(() => {
      if (searchInput.current && searchInput.current.value.length) {
        searchInput.current.value = '';
        showResult(false);
        dispatch({ type: GetAllUsers.Success, payload: { users: [] } });
      }
    }, [dispatch]);

    /** Обработка клика в аутсайд */
    useOnClickOutside(searchBlock, handleClearTextInput);

    /** Клик по пользователю */
    const handleUserClick = (e: React.MouseEvent, user: IUser) => {
      e.stopPropagation();
      onUserClick(user);
      handleClearTextInput();
    };

    /** Массив с результатами поиска */
    let searchResult = result.map((item: IUser) => (
      <li
        className='search-block__item'
        key={item.sUserId}
        onClick={(e: React.MouseEvent) => handleUserClick(e, item)}>
        <div className='search-block__image'>
          <UserImage userId={item.sUserId}/>
        </div>
        <div className='search__info'>
          <div className='search-block__name'>{item.sFullName}</div>
          <div className='search-block__position'>{item.sTitle}</div>
        </div>
      </li>
    ));

    return (
      <div className='search-block' ref={searchBlock}>
        <Search
          refName={searchInput}
          handleClick={handleClearTextInput}
          placeholder='Поиск по ФИО'
        />

        {isVisibleResult &&
        searchResult.length > 0 &&
        (searchInput.current && searchInput.current.value.length > 0) && (
          <ul className='search-block__results'>{searchResult}</ul>
        )}
      </div>
    );
  }
);
