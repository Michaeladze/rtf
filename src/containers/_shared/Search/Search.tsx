import * as React from 'react';
import './Search.scss';
import { ReactComponent as SearchIcon } from '../../../_assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../../../_assets/svg/plus.svg';

interface ISearchProps {
  refName: any;
  handleClick: () => void;
  placeholder?: string;
}

const Search: React.FC<ISearchProps> = ({ refName, handleClick, placeholder = 'Поиск' }) => {
  /** Имя иконки */
  const icon = (refName.current && refName.current.value.length !== 0) ?
    <CloseIcon className='search__icon search__icon--close'/> :
    <SearchIcon className='search__icon search__icon--search'/>;

  /** Автофокус в десктопной версии */
  const focus = window.innerWidth > 1024;

  return (
    <div className='search'>
      <input
        ref={refName}
        name='searchUser'
        type='text'
        className='search__input'
        placeholder={placeholder}
        autoComplete='off'
        autoFocus={focus}
      />
      <button className='search__action' onClick={handleClick}>{icon}</button>
    </div>
  );
};

export default Search;
