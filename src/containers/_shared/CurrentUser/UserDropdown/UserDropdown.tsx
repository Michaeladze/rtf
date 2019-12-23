import React from 'react';
import './UserDropdown.scss';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import UserImage from '../../UserImage/UserImage';
import { NavLink } from 'react-router-dom';
import { breakpoints, links } from '../../../../_helpers/helpers';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../_store/store.interface';

interface IProps {
  user: IUser | null;
}

const UserDropdown: React.FC<IProps> = ({ user }) => {
  /** Подписываемся на подчиненных */
  const isBoss: boolean = useSelector((store: IStore) => store.subordinates.isBoss);

  const menu = [
    {
      id: 2,
      label: 'Командный отчёт',
      url: 'team-statistics',
      bIsVisible: isBoss
    },
    {
      id: 3,
      label: 'Статистика',
      url: '/statistics/competence',
      bIsVisible: true
    },
    {
      id: 4,
      label: 'История',
      url: window.innerWidth > breakpoints.medium ? '/history' : '/history-users',
      bIsVisible: true
    }
  ];

  /** Навигация */
  const menuJSX = menu.map((m) => (
    m.bIsVisible && (
      <li className='header__menu-element' key={m.id}>
        <NavLink className='header__menu-link' to={m.url}>{m.label}</NavLink>
      </li>
    )
  ));

  return (
    <div className='header__menu'>
      <div className='header__menu-user'>
        <div className='header__menu-image'>
          <UserImage userId={user ? user.sUserId : undefined}/>
        </div>
        <h3 className='header__menu-name'>
          {user ? (
            user.sFirstName
          ) : (
            <span className='header__menu-name--placeholder'/>
          )}
        </h3>
      </div>

      <ul className='header__menu-list'>
        <li className='header__menu-element'>
          <a
            className='header__menu-link'
            href={links.profileProd}
            target='_blank'
            rel='noopener noreferrer'>
            Мой профиль
          </a>
        </li>
        {menuJSX}
      </ul>
    </div>
  );
};

export default UserDropdown;
