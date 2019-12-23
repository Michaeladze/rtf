import React, { useEffect, useState } from 'react';
import './HistoryTabs.scss';
import RateItemsList from '../RateItemsList/RateItemsList';
import { ITab } from '../../_shared/TabContainer/TabContainer';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { customEqual } from '../../../_helpers/helpers';
import useReactRouter from 'use-react-router';

const HistoryTabs: React.FC = () => {
  const { location } = useReactRouter();
  const locationArray = location.pathname.split('/');
  const routerUser = locationArray[2];

  /** Активный пользователь */
  const activeUser: IUser | null = useSelector(
    (store: IStore) => store.users.activeUser,
    customEqual
  );

  /** Кнопки */
  const tabs: ITab[] = [
    {
      id: 1,
      label: ' Все',
      content: <RateItemsList sLoadOption='ALL'/>
    },
    {
      id: 2,
      label: 'Входящие',
      content: <RateItemsList sLoadOption='INBOX'/>
    },
    {
      id: 3,
      label: 'Исходящие',
      content: <RateItemsList sLoadOption='OUTBOX'/>

    }
  ];

  /** Активный таб */
  const [activeTab, setActiveTab] = useState(tabs[0]);

  /** Устанавливаем первый таб активным */
  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [routerUser]);

  /** Переключатель табов */
  const handleTabSwitch = (e: ITab) => {
    setActiveTab(e)
  };

  /** Отображение кнопок */
  const tabsJSX = tabs.map((e) =>
    <div className={`tab__button ${e.id === activeTab.id ? 'active' : ''}`}
      key={e.id}
      onClick={() => handleTabSwitch(e)}>{e.label}</div>);

  return (
    <>
      <div className="tab__buttons">
        {tabsJSX}
      </div>
      <>
        { activeUser ? activeTab.content : ''}
      </>
    </>
  );
};
export default HistoryTabs;
