import React from 'react';
import './NotificationBanner.scss';
import { ReactComponent as Image } from '../../../_assets/svg/home/notification-image.svg';
import { ReactComponent as ImageSm } from '../../../_assets/svg/home/notification-image--sm.svg';
import { breakpoints } from '../../../_helpers/helpers';

interface IProps {
  message?: string;
}

const NotificationBanner: React.FC<IProps> = ({ message = 'Новых уведомлений нет' }) => {
  const image = window.innerWidth > breakpoints.medium ?
    <Image/> : <ImageSm/>;

  return (
    <div className='notification-banner'>
      <div className='notification-banner__inner'>
        <p className='notification-banner__text'>{message}</p>
        <div className='notification-banner__image'>{image}</div>
      </div>
    </div>
  );
};

export default NotificationBanner;
