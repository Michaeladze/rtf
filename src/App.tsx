import React, { useEffect } from 'react';
import './App.scss';
import 'antd/lib/modal/style/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { customEqual } from './_helpers/helpers';
import { SocketsService } from './_helpers/socket';
import { GetAllCompetences, GetAllSkills } from './_store/actions/feedback-properties.action';
import { GetMe } from './_store/actions/users.action';
import { IUser } from './_store/reducers/users-all.reducer';
import { IStore } from './_store/store.interface';
import Router from './Router';
import Home from './containers/Home';
import { HashRouter } from 'react-router-dom';
import { NotificationList } from './react_shared/components/notifications/component/NotificationList';
import { GetSubordinates } from './_store/actions/subordinates.action';

/** При старте приложения запускаем сокеты */
export const _socket = new SocketsService();

const App: React.FC = () => {
  console.log(`Версия приложения: ${process.env.REACT_APP_VERSION}`);

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const dispatch = useDispatch();

  /** Запрашиваем вошедшего пользователя */
  useEffect(() => {
    dispatch({ type: GetMe.Pending });
  }, [dispatch]);

  /** Запрашиваем справочники навыков и атрибутов.
   * Если они лежат в IndexedDB, то запрос к бэку не будет выполнен */
  useEffect(() => {
    dispatch({ type: GetAllCompetences.Pending });
    dispatch({ type: GetAllSkills.Pending });
  }, [dispatch]);

  // ==================================================================================================================
  /** Проверка на подчиненных */
  /** Флаг загрузки подчиненных */
  const usersLoaded: boolean = useSelector((store: IStore) => store.subordinates.usersLoaded);

  /** Диспатчим получение команды текущего пользователя */
  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetSubordinates.Pending, payload: { iPage: 0, iSize: 40 } });
    }
  }, [dispatch, usersLoaded]);

  // ==================================================================================================================

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);
  const loggedUserLoaded: boolean = useSelector((store: IStore) => store.users.meLoaded, customEqual);

  /** Рисуем интерфейс только когда есть вошедший пользователь. Иначе - главную страницу */
  return loggedUser && loggedUser.sUserId ? (
    <div className='rtf__root'>
      <Router/>
      <NotificationList/>
    </div>
  ) : (
    loggedUserLoaded ? <HashRouter>
      <Home/>
    </HashRouter> : <></>
  );
};

export default App;
