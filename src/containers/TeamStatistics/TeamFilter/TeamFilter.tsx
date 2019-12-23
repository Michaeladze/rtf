import React, { useRef, useState } from 'react';
import './TeamFilter.scss';
import StandardButton from '../../../components/StandardButton';
import useReactRouter from 'use-react-router';
import TeamSearch from './TeamSearch';
import { breakpoints, customEqual } from '../../../_helpers/helpers';
import { ReactComponent as FilterIcon } from '../../../_assets/svg/filter-icon.svg';
import Dropdown from '../../_shared/Dropdown';
import { IDropdownValue } from '../../_shared/Dropdown/Dropdown';
import { GetTeamInfo } from '../../../_store/actions/team-info.action';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';

const TeamFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  /** Отображение строки поиска в мобильной версии */
  const [show, showFilter] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  /** Имя в запросе поиска */
  const sUserFIO: string = useSelector((store: IStore) => store.teamInfo.sUserFIO, customEqual);

  /** Активный период */
  const activePeriod: string = useSelector((store: IStore) => store.teamInfo.activePeriod, customEqual);

  /** Переход в сравнение */
  const handleClick = () => {
    history.push('/team-comparison');
  };

  /** Кнопка сравнения только для десктопа */
  const comparisonButton = window.innerWidth > breakpoints.medium && (
    <div className='team-filter__compare'>
      <StandardButton value='Сравнить сотрудников' handler={handleClick}/>
    </div>
  );

  /** -------------------------------------------------------------------------------------------------------------- */
  /* Тоггл селекта в мобильной версии
  /* --------------------------------------------------------------------------------------------------------------- */
  /** Показать/скрыть фильтр в мобильной версии */
  const toggleFilter = () => {
    if (!show) {
      showFilter(true);
    } else {
      (selectRef.current as HTMLDivElement).classList.add('hide');
      setTimeout(() => showFilter(false), 300);
    }
  };

  /** Дополнительный CSS класс иконки при открытом фильтре */
  const activeIconClass = show ? 'team-filter__icon--active' : '';

  /** Кнопка для тоггла */
  const toggleFilterButton = window.innerWidth <= breakpoints.medium &&
    <div className='team-filter__toggle'>
      <button className='team-filter__toggle-button' onClick={toggleFilter}>
        <FilterIcon className={`team-filter__icon ${activeIconClass}`}/>
      </button>
    </div>;

  /** -------------------------------------------------------------------------------------------------------------- */
  /* Селект
  /* --------------------------------------------------------------------------------------------------------------- */
  const aValues: IDropdownValue[] = [
    {
      iId: 1,
      sLabel: 'По месяцу',
      sValue: 'MONTH'
    },
    {
      iId: 2,
      sLabel: 'По кварталу',
      sValue: 'QUARTER'
    },
    {
      iId: 3,
      sLabel: 'По году',
      sValue: 'YEAR'
    }
  ];

  /** Установка фильтра по периоду */
  const setValue = (value: IDropdownValue) => {
    if (activePeriod !== value.sValue) {
      dispatch({
        type: GetTeamInfo.Pending,
        payload: { iPage: 0, iSize: 40, sDatePeriod: value.sValue, sUserFIO }
      });
    }
  };

  const select = (window.innerWidth > breakpoints.medium || show) &&
    <div className='team-filter__select' ref={selectRef}>
      <Dropdown aValues={aValues} setValue={setValue} defaultLabel={aValues[2].sLabel}/>
    </div>;

  return (
    <div className='team-filter'>
      <div className='team-filter__inner'>
        <div className='team-filter__options'>
          {select}
          {comparisonButton}
        </div>

        <div className='team-filter__search'><TeamSearch/></div>
        {toggleFilterButton}
      </div>
    </div>
  );
};

export default TeamFilter;
