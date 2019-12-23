import React, { useEffect } from 'react';
import './CompareStatistics.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../../_store/store.interface';
import { IComparisonUser } from '../../../../_store/reducers/comparison.reducer';
import CompareRow from './CompareRow';
import UserTitle from '../../../../components/UserTitle';
import CompareAccordionItem from './CompareAccordionItem';
import { customEqual } from '../../../../_helpers/helpers';
import { ClearComparisonTable } from '../../../../_store/actions/comparison.action';

const CompareStatistics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: ClearComparisonTable.Set, payload: { clear: true } });
    }
  }, []);

  /** Список пользователей в сравнении */
  const users: IComparisonUser[] = useSelector((store: IStore) => store.comparison.collection, customEqual);

  // ========================================================================================================
  /** Ряд с юзерпиком и ФИО пользователя */
  const userData = users.map((user) =>
    <div key={user.user.sUserId} className='compare-cell'>
      <UserTitle key={user.user.sUserId} user={user.user}/>
    </div>);


  // ========================================================================================================
  /** Ряд Оставил ОС */
  const provideFBData = users.map((user) =>
    <div key={user.user.sUserId} className='compare-cell'>
      <span className='compare-cell__count'>{user.info.iOutCount}</span>
    </div>);

  // ========================================================================================================
  /** Ряд Получил ОС */
  const requestFBData = users.map((user) =>
    <div key={user.user.sUserId} className='compare-cell'>
      <span className='compare-cell__count'>{user.info.iInCount}</span>
    </div>);

  // ========================================================================================================
  /** Ряд компетенций */
  const competenciesData = users.map((user) =>
    <div key={user.user.sUserId} className='compare-cell'>
      {user.competences.map((competence) =>
        <CompareAccordionItem key={competence.sId} competence={competence}/>
      )}
    </div>);

  // ========================================================================================================
  /** Таблица с данными сравнения */
  const comparisonDataTable = [
    {
      sName: 'Оставил ОС',
      children: provideFBData
    },
    {
      sName: 'Получил ОС',
      children: requestFBData
    },
    {
      sName: 'Оценки компетенций',
      children: competenciesData
    }
  ];

  const header = <CompareRow children={userData}/>;

  const comparisonData = comparisonDataTable.map((d, i) =>
    <CompareRow key={i} rowName={d.sName} children={d.children}/>);

  const compareStatistics = users && users.length > 0 &&
    <>
      <div className='compare__header'>{header}</div>
      <div className='compare__statistics'>{comparisonData}</div>
    </>;

  // ========================================================================================================

  return (
    <div className='compare__table'>{compareStatistics}</div>
  );
};

export default CompareStatistics;
