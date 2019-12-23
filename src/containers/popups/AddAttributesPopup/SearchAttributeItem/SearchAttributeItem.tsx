import React, { useState } from 'react';
import './SearchAttributeItem.scss';
import 'antd/lib/button/style/index.css';
import Button from 'antd/lib/button';
import { IIndicator } from '../../../../_store/reducers/users-history.reducer';
import { ReactComponent as CheckIcon } from '../../../../_assets/svg/check.svg';
import { ReactComponent as PlusIcon } from '../../../../_assets/svg/plus.svg';
import { IStringMap } from '../../../../_helpers/socket';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../_store/store.interface';
import { customEqual } from '../../../../_helpers/helpers';
import { sendNotification } from '../../../../react_shared/components/notifications/notification';

interface ISearchItemProps {
  item: IIndicator;
  selectedProperties: IIndicator[] | undefined;
  type: string;
}

export const SearchAttributeItem: React.FC<ISearchItemProps> = ({ item, selectedProperties, type }) => {
  /** Получение справочника */
  const assessmentsMap: IStringMap<IStringMap<IIndicator>> = useSelector(
    (store: IStore) => store.properties.dictionary,
    customEqual
  );

  /** Текст попапа */
  let [showText, toggleText] = useState('');

  /** Текст Атрибут/Навык в попапе */
  const typeText = type === 'attributes' ? 'Атрибут' : 'Проф. навык';

  /** ----------------------------------------------------------------------------------------------------------------------
   * Выбор атрибута/навыка
   ---------------------------------------------------------------------------------------------------------------------- */
  // TODO поправить позже
  const selectItem = (item: IIndicator) => {
    if (selectedProperties) {
      const index = selectedProperties.findIndex((e: any) => e.sId === item.sId);
      if (index >= 0) {
        showText = `${typeText} удален`;
        toggleText(showText);
        selectedProperties.splice(index, 1);
        sendNotification({ sMessage: showText })

      } else {
        if (selectedProperties.length < 6) {
          selectedProperties.push(item);
          showText = `${typeText} добавлен`;
          toggleText(showText);
          sendNotification({ sMessage: showText })

        } else if (selectedProperties.length === 6) {
          showText = 'Вы выбрали максимальное количество профессиональных навыков/атрибутов';
          toggleText(showText);
          sendNotification({ sMessage: showText })
        }
      }
    }
  };

  /** Иконка для выбранного элемента */
  const selected = selectedProperties && selectedProperties.findIndex((e) => e.sId === item.sId) >= 0 ?
    <CheckIcon className='search-attribute__icon'/> :
    <PlusIcon className='search-attribute__icon'/>;

  /** Класс для выбранного элемента */
  const selectedClass = selectedProperties && selectedProperties.findIndex((e) => e.sId === item.sId) >= 0 ?
    'check' : '';

  /** Проверка на наличие имени */
  const name = item.sName ? item.sName : assessmentsMap.skills[item.sId] ? assessmentsMap.skills[item.sId].sName : '';

  const searchAttributeItemJSX = name &&
    <div className={`search__attribute ${selectedClass}`}>
      <div className='search-attribute'>
        <div className='search-attribute__details'>
          <p className='search-attribute__name'>
            {name}
          </p>
        </div>

        <div className='search-attribute__mark'>
          <Button className='search-attribute__action' shape='round' onClick={() => selectItem(item)}>
            {selected}
          </Button>
        </div>
      </div>
    </div>;

  return (
    <>{searchAttributeItemJSX}</>
  );
};
