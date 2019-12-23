import React, { useState } from 'react';
import './HomeNavigation.scss';
import { NavLink } from 'react-router-dom';
import Modal from 'antd/lib/modal';
import MessagePopup from '../../../_shared/MessagePopup/MessagePopup';
import { ReactComponent as PopupBackground } from '../../../../_assets/svg/popup__bg.svg';
import { ReactComponent as SberProfiIco } from '../../../../_assets/svg/home/home__sberprofi.svg';
import { ReactComponent as SberProfiHoverIco } from '../../../../_assets/svg/home/home__sberprofi-hover.svg';
import { ReactComponent as SberProfiDisabledIco } from '../../../../_assets/svg/home/home__sberprofi-disabled.svg';
import { ReactComponent as FeedBackIco } from '../../../../_assets/svg/home/home__feedback.svg';
import { ReactComponent as FeedBackHoverIco } from '../../../../_assets/svg/home/home__feedback-hover.svg';
import { ReactComponent as FeedBackDisabledIco } from '../../../../_assets/svg/home/home__feedback-disabled.svg';
import { ReactComponent as MeetingsIco } from '../../../../_assets/svg/home/home__meetings.svg';
import { ReactComponent as MeetingsHoverIco } from '../../../../_assets/svg/home/home__meetings-hover.svg';
import { ReactComponent as MeetingsDisabledIco } from '../../../../_assets/svg/home/home__meetings-disabled.svg';
import { ReactComponent as ProjectsIco } from '../../../../_assets/svg/home/home__projects.svg';
import { ReactComponent as ProjectsHoverIco } from '../../../../_assets/svg/home/home__projects-hover.svg';
import { ReactComponent as ProjectsDisabledIco } from '../../../../_assets/svg/home/home__projects-disabled.svg';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import { useSelector } from 'react-redux';
import { animateExit, customEqual, links } from '../../../../_helpers/helpers';
import { IStore } from '../../../../_store/store.interface';
import { ReactComponent as CloseIcon } from '../../../../_assets/svg/close.svg';
import { ReactComponent as CloseIconRound } from '../../../../_assets/svg/close_round.svg';
import PopupMobileWrapper from '../../../_shared/PopupMobileWrapper/PopupMobileWrapper';

const HomeNavigation = () => {
  // *******************************************************************************************************************

  /** Стейт наведения для иконок*/
  const [hovered, setHovered] = useState('');

  // *******************************************************************************************************************

  /** Отображение попапа интервью*/
  const [showInterviewPopup, toggleInterviewPopup] = useState(false);

  // const openInterviewPopup = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   toggleInterviewPopup(true);
  // };
  const handleOk = () => {
    toggleInterviewPopup(false);
  };

  const handleCancel = () => {
    toggleInterviewPopup(false);
  };

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
    animateExit(() => toggleMeetingsPopup(false));
  };

  // *******************************************************************************************************************

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector(
    (store: IStore) => store.users.me,
    customEqual
  );

  // *******************************************************************************************************************

  /** Данные для карточек навигации */
  const cards = [
    {
      id: 1,
      title: 'Коллеги',
      text: `Обратная связь по${'\u00A0'}компетенциям и проф. навыкам`,
      url: 'feedback',
      handler: () => {},
      icon: <FeedBackIco className='home__card-ico'/>,
      iconHover: window.innerWidth >= 660 ? <FeedBackHoverIco className='home__card-ico'/> :
        <FeedBackIco className='home__card-ico'/>,
      iconDisabled: <FeedBackDisabledIco className='home__card-ico'/>,
      disabled: !loggedUser
    },
    {
      id: 3,
      title: 'Встречи',
      text: 'Обратная связь по компетенциям на встречах',
      url: 'meetings',
      handler: () => openMeetingsPopup(),
      icon: <MeetingsIco className='home__card-ico'/>,
      iconHover: window.innerWidth >= 660 ? <MeetingsHoverIco className='home__card-ico'/> :
        <MeetingsIco className='home__card-ico'/>,
      iconDisabled: <MeetingsDisabledIco className='home__card-ico'/>,
      disabled: false
    },
    {
      id: 2,
      title: 'Достижения',
      text: 'Обратная связь по достижениям и проектам',
      url: 'projects',
      handler: () =>  window.open(links.projects, '_self'),
      iconDisabled: <ProjectsDisabledIco className='home__card-ico'/>,
      iconHover: window.innerWidth >= 660 ? <ProjectsHoverIco className='home__card-ico'/> :
        <ProjectsIco className='home__card-ico'/>,
      icon: <ProjectsIco className='home__card-ico'/>,
      disabled: false
    },
    {
      id: 4,
      title: 'Профоценка SberProfi',
      text: 'Оценка уровня профессионального мастерства',
      url: 'sberprofi',
      handler: () => console.log(3),
      iconDisabled: <SberProfiIco className='home__card-ico'/>, // TODO !!!
      iconHover: window.innerWidth >= 660 ? <SberProfiHoverIco className='home__card-ico'/> :
        <SberProfiIco className='home__card-ico'/>,
      icon: <SberProfiDisabledIco className='home__card-ico'/>, //todo поменять местами с iconDisabled
      disabled: true
    }
  ];

  /** JSX карточек навигации */
  const cardsJSX = cards.map((c) => (
    <NavLink
      to={c.url}
      className={`home__card-wrapper ${c.disabled ? 'disabled' : ''}`}
      key={c.id}
      onClick={
        c.url !== 'feedback'
          ? (e) => {
            e.preventDefault();
            c.handler();
          }
          : () => {}
      }>
      <div
        className={`home__card ${c.disabled ? 'disabled' : ''}`}
        onMouseEnter={() => setHovered(c.url)}
        onMouseLeave={() => setHovered('')}>

        <div className='home__card-content'>
          <div className='home__card-icons'>
            {hovered === c.url ? c.iconHover : c.icon}
            {/*{c.url === 'sberprofi' && (*/}
            {/*  <button*/}
            {/*    className='home__sberprofi-notification'*/}
            {/*    onClick={openInterviewPopup}*/}
            {/*  />*/}
            {/*)}*/}
          </div>

          <div className='home__card-description'>
            <h3 className='home__card-title'>{c.title}</h3>
            <p className='home__card-text'>{c.text}</p>
          </div>
        </div>
      </div>
    </NavLink>
  ));

  // *******************************************************************************************************************

  /** JSX попапа интервью */
  const interviewPopupJSX = (
    <Modal
      closeIcon={<CloseIcon/>}
      visible={showInterviewPopup}
      closable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={430}
      className='custom-modal'>
      <MessagePopup
        image={<PopupBackground/>}
        title='Вам назначили интервью'
        okButtonValue='Перейти'
        okButtonHandler={handleOk}
      />
    </Modal>
  );

  // *******************************************************************************************************************

  /** JSX попапа встреч */
  const meetingsPopupJSX = (
    <Modal
      closeIcon={<CloseIconRound/>}
      visible={showMeetingsPopup}
      closable={false}
      onOk={handleMeetingsOk}
      onCancel={handleMeetingsCancel}
      footer={null}
      width={430}
      className='custom-modal'>
      <PopupMobileWrapper handleClose={handleMeetingsCancel}>
        <MessagePopup
          image={<PopupBackground/>}
          title='Ваши встречи'
          text='Участвуйте во встречах и давайте обратную связь по компетенциям'
          okButtonValue='Перейти'
          okButtonHandler={handleMeetingsOk}
        />
      </PopupMobileWrapper>
    </Modal>
  );

  // *******************************************************************************************************************

  return (
    <>
      <div className='home__cards'>{cardsJSX}</div>

      {interviewPopupJSX}
      {meetingsPopupJSX}
    </>
  );
};

export default HomeNavigation;
