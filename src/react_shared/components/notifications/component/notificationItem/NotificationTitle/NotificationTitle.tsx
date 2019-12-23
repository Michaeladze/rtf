import './NotificationTitle.scss';
import React from 'react';

interface INotificationTitle {
  // Статус уведомления - Ошибка, Успех, Информация и т.п.
  iStatus?: number;
  /** текст и цвет уведомления*/
  object: { sTitle: string; sNotificationColor: string };
}

export const NotificationTitle: React.FC<INotificationTitle> = ({
  iStatus,
  object
}) => {
  return (
    <>
      {object.sTitle !== '' && (
        <span
          className='notification__title'
          style={{ color: object.sNotificationColor }}>
          {object.sTitle}
        </span>
      )}
    </>
  );
};
