import React, { useState } from 'react';
import './Navigation.scss';
import { ReactComponent as NavigationHomeIcon } from '../../../../_assets/svg/navigation/home__navigation.svg';
import { NavLink } from 'react-router-dom';
import Modal from 'antd/lib/modal';
import MessagePopup from '../../MessagePopup/MessagePopup';
import { ReactComponent as PopupBackground } from '../../../../_assets/svg/popup__bg.svg';
import { links } from '../../../../_helpers/helpers';

const Navigation: React.FC = () => {
  const nav = [
    {
      id: 1,
      url: 'feedback',
      disabled: false,
      handler: () => console.log(1)
    },
    {
      id: 3,
      url: 'meetings',
      disabled: false,
      handler: () => openMeetingsPopup()
    },
    {
      id: 2,
      url: 'projects',
      disabled: false,
      handler: () =>  window.open(links.projects, '_self')
    },
    {
      id: 4,
      url: 'sberprofi',
      disabled: true,
      handler: () => console.log(1)
    }
  ];

  const linksJSX = nav.map((link) => {
    return (
      <NavLink
        to={`/${link.url}`}
        key={link.id}
        className={`navigation__link ${link.disabled ? 'disabled' : ''}`}
        onClick={(link.disabled || link.id !== 1) ? (e) => {e.preventDefault(); link.handler()} : ()  => {}}
        activeClassName='active'>
        <div
          className={`navigation__icon navigation__icon--${link.url} ${
            link.disabled ? 'disabled' : ''
          }`}
        />
      </NavLink>
    );
  });

  // *******************************************************************************************************************

  /** Отображение попапа встреч*/
  const [showMeetingsPopup, toggleMeetingsPopup] = useState(false);

  const openMeetingsPopup = () => {
    toggleMeetingsPopup(true);
  };

  const handleMeetingsOk = () => {
    window.open(links.bwProd, '_blank');
    toggleMeetingsPopup(false);
  };

  const handleMeetingsCancel = () => {
    toggleMeetingsPopup(false);
  };

  // *******************************************************************************************************************

  /** JSX попапа встреч */
  const meetingsPopupJSX = (
    <Modal
      visible={showMeetingsPopup}
      closable={false}
      onOk={handleMeetingsOk}
      onCancel={handleMeetingsCancel}
      footer={null}
      width={430}
      className='custom-modal'>
      <MessagePopup
        image={<PopupBackground/>}
        title='Ваши встречи'
        text='Участвуйте во встречах и давайте обратную связь по компетенциям'
        okButtonValue='Перейти'
        okButtonHandler={handleMeetingsOk}
      />
    </Modal>
  );

  return (
    <div className='navigation'>
      <NavLink exact to={'/'} className='navigation__home'>
        <NavigationHomeIcon />
      </NavLink>

      {linksJSX}
      {meetingsPopupJSX}
    </div>
  );
};

export default Navigation;
