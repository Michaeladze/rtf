import React from 'react';
import './HomeLinks.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../_store/store.interface';
import { breakpoints } from '../../../../_helpers/helpers';

const HomeLinks: React.FC = () => {
  /** Подписываемся на подчиненных */
  const isBoss: boolean = useSelector((store: IStore) => store.subordinates.isBoss);

  /** Ссылки */
  const links = [
    {
      id: 1,
      url: 'team-statistics',
      label: 'Командный отчёт',
      bIsVisible: isBoss
    },
    {
      id: 2,
      url: window.innerWidth > breakpoints.medium ? '/history' : '/history-users',
      label: 'История',
      bIsVisible: true
    },
    {
      id: 3,
      url: 'statistics/competence',
      label: 'Статистика',
      bIsVisible: true
    }
  ];

  /** Отображение ссылок */
  const linksJSX = links.map((link) => (
    link.bIsVisible && (
      <div className='home-links__item-wrapper' key={link.id}>
        <NavLink className='home-links__item' to={link.url}>
          <span className='home-links__item-text'>{link.label}</span>
        </NavLink>
      </div>
    )
  ));

  return (
    <div className='home-links'>
      <div className='home-links__inner'>
        {linksJSX}
      </div>
    </div>
  );
};

export default HomeLinks;
