import React, { useEffect, useRef, useState } from 'react';
import './StatisticsHeader.scss';
import StandardButton from '../../../../components/StandardButton/StandardButton';
import { IStringMap } from '../../../../_helpers/socket';
import {
  GetStatisticsCompetencies,
  GetStatisticsSkills,
  SetActiveFilter
} from '../../../../_store/actions/statistics.action';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IStore } from '../../../../_store/store.interface';
import { ReactComponent as SearchIcon } from '../../../../_assets/svg/search.svg';
import { breakpoints } from '../../../../_helpers/helpers';
import Filter from '../Filter';
import { ChangePropertyFilter } from '../../../../_store/actions/feedback-properties.action';
import useReactRouter from 'use-react-router';

/** Фильтры по периоду */
interface IFilter {
  id: string;
  label: string;
  loadFlag: string;
}

interface IStatisticsHeaderProps {
  title: string;
}

const StatisticsHeader: React.FC<IStatisticsHeaderProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  /** Таблица экшенов, селекторов и заголовокв в зависимости от title */
  const table: IStringMap<{ title: string, action: string, selector: any }> = {
    competences: {
      title: 'компетенциям',
      action: GetStatisticsCompetencies.Pending,
      selector: createSelector((state: IStore) =>
        state.statisticsAll.competenceStatistics[activePeriod.loadFlag], (flag: boolean) => flag)
    },
    shapers: {
      title: 'Shaper',
      action: GetStatisticsCompetencies.Pending,
      selector: createSelector((state: IStore) =>
        state.statisticsAll.shapeStatistics[activePeriod.loadFlag], (flag: boolean) => flag)
    },
    skills: {
      title: 'проф. навыкам',
      action: GetStatisticsSkills.Pending,
      selector: createSelector((state: IStore) =>
        state.statisticsAll.skillsStatistics[activePeriod.loadFlag], (flag: boolean) => flag)
    }
  };

  /** Фильтр по периоду  */
  const periodFilter: IFilter[] = [
    {
      id: 'MONTH',
      label: 'Месяц',
      loadFlag: 'monthLoaded'
    },
    {
      id: 'QUARTER',
      label: 'Квартал',
      loadFlag: 'quarterLoaded'
    },
    {
      id: 'YEAR',
      label: 'Год',
      loadFlag: 'yearLoaded'
    }
  ];

  /** Активный фильтр */
  const [activePeriod, setActivePeriod] = useState<IFilter>(periodFilter[2]);

  /** Отображение строки поиска в мобильной версии */
  const [show, showFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  /** Устанавливаем активный фильтр */
  const handleClick = (btn: IFilter) => {
    setActivePeriod(btn);
    dispatch({ type: SetActiveFilter.Success, payload: btn.id.toLowerCase() });
  };

  /** Сбрасываем активный фильтр на значение year при переходах между разделами */
  useEffect(() => {
    dispatch({ type: SetActiveFilter.Success, payload: 'year' });
  }, [dispatch, title]);

  /** Кнопки фильтрации по периоду */
  const filterButtonJSX = periodFilter.map((btn) => {
    return (
      <div className={`statistics__button ${btn.id === activePeriod.id ? 'active' : ''}`} key={btn.id}>
        <StandardButton
          handler={() => handleClick(btn)}
          type={'outline'}
          value={btn.label}
        />
      </div>
    )
  });

  /** Подписываемся на активный селектор */
  const flag = useSelector(table[title].selector);

  /** Диспатчим экшены при перерисовке */
  useEffect(() => {
    if (!flag) {

      const sUserId = (match.params as { sUserId: string }).sUserId;

      const body = sUserId ?
        { sDatePeriod: activePeriod.id, sUserId: sUserId } : { sDatePeriod: activePeriod.id };

      dispatch({
        type: table[title].action,
        payload: {
          body: body
        }
      });
    }
  }, [dispatch, activePeriod, flag]);

  /** Показать/скрыть строку поиска в мобильной версии */
  const toggleFilter = () => {
    if (!show) {
      showFilter(true);
    } else {
      (filterRef.current as HTMLDivElement).classList.add('hide');
      dispatch({ type: ChangePropertyFilter.Set, payload: '' });
      setTimeout(() => showFilter(false), 300);
    }
  };

  /** Дополнительный CSS класс иконки при открытом фильтре */
  const activeIconClass = show ? 'statistics__icon--active' : '';

  /** Тоггл фильтра в мобильной версии */
  const mobileFilterJSX = window.innerWidth <= breakpoints.medium ?
    <>
      <div className='statistics__action'>
        <button className='statistics__toggle' onClick={toggleFilter}>
          <SearchIcon className={`statistics__icon ${activeIconClass}`}/>
        </button>
      </div>
      {show &&
      <div ref={filterRef} className='statistics__filter'><Filter/></div>
      }
    </> : '';

  return (
    <header className='statistics__header'>
      <div className='statistics__description'>
        <h5 className='statistics__title'>Обратная связь по {table[title].title}</h5>
        <h6 className='statistics__subtitle'>Динамика изменений</h6>
      </div>

      <div className='statistics__buttons'>{filterButtonJSX}</div>

      {mobileFilterJSX}
    </header>
  );
};
export default StatisticsHeader;
