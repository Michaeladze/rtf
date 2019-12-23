import React, { useEffect, useState } from 'react';
import './FeedbackSkills.scss';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';
import { FeedbackProperty } from '../FeedbackProperty/FeedbackProperty';
import StandardButton from '../../../components/StandardButton';
import { customEqual } from '../../../_helpers/helpers';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';

interface IPropertiesListProps {
  list: IIndicator[];
  onPropertyClick: (property: IIndicator) => void;
}

const FeedbackSkills: React.FC<IPropertiesListProps> = ({ list, onPropertyClick }) => {
  const [show, setShow] = useState(false);

  /* Показать/Скрыть больше навыков **/
  const toggleList = () => {
    setShow(!show);
  };
  /** Получение фильтра значений */
  const filter: { searchString: string; type: string } | undefined = useSelector(
    (store: IStore) => store.properties.filter, customEqual);

  /** Раскрытие списка во время поиска */
  useEffect(() => {
    setShow(filter !== undefined && filter.searchString.length > 0)
  }, [filter]);

  /** Текст для кнопки */
  const btnLabel = show ? `Скрыть все проф. навыки` : `Показать все проф. навыки`;

  /** Список навыков */
  const itemsList = list
    .sort((a, b) => (a.sName > b.sName ? 1 : -1))
    .map((item: IIndicator) => (
      <li className='feedback-skills__item' key={item.sId} onClick={() => onPropertyClick(item)}>
        <FeedbackProperty feedbackItem={item}/>
      </li>
    ));

  const itemsListJSX = show && (
    <>
      {list && list.length > 0 ? <ul className='feedback-skills__items'>{itemsList}</ul> :
        <p className='info-tip'>Ничего не найдено</p>
      }
    </>
  );

  return (
    <>
      <div className='feedback-skills__show-more'>
        <StandardButton value={btnLabel} type='link' handler={toggleList}/>
      </div>
      {itemsListJSX}
    </>
  );
};

export default FeedbackSkills;
