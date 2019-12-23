import React, { useRef, useState } from 'react';
import './Dropdown.scss';
import { ReactComponent as ArrowIcon } from '../../../_assets/svg/dropdown-arrow.svg';
import { useOnClickOutside } from '../../../_helpers/helpers';

/** Интерфейс элемента выпадающего списка */
export interface IDropdownValue {
  iId: number;
  sValue: string;
  sLabel: string;
}

interface IProps {
  /** Список опций */
  aValues: IDropdownValue[];
  /** Клик по элементу списка */
  setValue: (value: IDropdownValue) => void;
  /** Дефолтное активное значение (плейсхолдер) */
  defaultLabel?: string;
}

const Dropdown: React.FC<IProps> = ({ aValues, defaultLabel, setValue }) => {
  /** Ссылка на весь блок для обработки клика в outside */
  const dropdownRef = useRef<HTMLDivElement>(null);

  /** Устанавливаем активный лейбл */
  const [activeLabel, setActiveLabel] = useState(defaultLabel ? defaultLabel : aValues[0].sLabel);

  /** Тоггл списка */
  const [showList, toggleDropdown] = useState(false);

  const toggleList = () => {
    toggleDropdown(!showList);
  };

  /** Обработка клика в аутсайд */
  const handleClickOutside = () => {
    toggleDropdown(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  /** Клик по элементу из раскрывающегося списка */
  const onValueClick = (value: IDropdownValue) => {
    setValue(value);
    setActiveLabel(value.sLabel);
    toggleDropdown(false);
  };

  /** Элементы раскрывающегося списка */
  const values = aValues.map((value) =>
    <li
      title={value.sLabel}
      key={value.iId}
      className='dropdown__list-item'
      onClick={() => onValueClick(value)}>{value.sLabel}
    </li>);

  /** Список */
  const listOfValues = showList && <ul className='dropdown__list'>{values}</ul>;

  /** Класс для активного состояния */
  const visible = showList ? 'visible' : '';

  return (
    <div className={`dropdown ${visible}`} ref={dropdownRef}>
      <button className='dropdown__button' title={activeLabel} onClick={toggleList}>
        <span className='dropdown__label'>{activeLabel}</span>
        <ArrowIcon className='dropdown__arrow'/>
      </button>

      {listOfValues}
    </div>
  );
};

export default Dropdown;
