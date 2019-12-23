import React from 'react';
import './HomeMain.scss';
import HomeHeader from './HomeHeader/HomeHeader';
import HomeParticipants from './HomeParticipants/HomeParticipants';
import HomeFooter from './HomeFooter/HomeFooter';
import HomeNavigation from './HomeNavigation/HomeNavigation';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { customEqual } from '../../../_helpers/helpers';
import HomeLinks from './HomeLinks';

const HomeMain = () => {

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);

  const participants = loggedUser && loggedUser.sUserId ? <HomeParticipants/> : '';

  return (
    <div className='home__main'>
      <HomeHeader/>
      {participants}
      <HomeLinks/>
      <HomeNavigation/>
      <HomeFooter/>
    </div>
  );
};

export default HomeMain;
