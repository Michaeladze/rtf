import React from 'react';
import './SearchCompetence.scss'
import { ICompetence, IIndicator } from '../../../../_store/reducers/users-history.reducer';
import { SearchAttributeItem } from '../SearchAttributeItem/SearchAttributeItem';

interface IProps {
  competence: ICompetence;
  activeIndicators: IIndicator[] | undefined;
}

const SearchCompetence: React.FC<IProps> = ({ competence, activeIndicators }) => {
  /** Список индикаторов */
  const indicatorsJSX = competence.aAttributes.map((item: IIndicator) => (
    <li className='search-competence__list-item' key={item.sId}>
      <SearchAttributeItem type='attributes' item={item} selectedProperties={activeIndicators}/>
    </li>
  ));

  return (
    <div className='search-competence'>
      <div className='search-competence__head'>
        <h6 className='search-competence__title'>{competence.sName}</h6>
      </div>

      <div className='search-competence__body'>
        <ul className='search-competence__list'>{indicatorsJSX}</ul>
      </div>
    </div>
  );
};

export default SearchCompetence;
