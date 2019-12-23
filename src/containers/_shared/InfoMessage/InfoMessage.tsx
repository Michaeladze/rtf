import React from 'react';
import './InfoMessage.scss';

interface IInfoMessageProps {
  message: string;
  showMessage: boolean;
}

export const InfoMessage: React.FC<IInfoMessageProps> = ({ message, showMessage }) => {
  const showClass = showMessage ? 'show' : '';

  return (
    <div className={`info-message show ${showClass}`}>
      <div className='info-message__inner'>
        <p className='info-message__text'>{message}</p>
      </div>
    </div>
  );
};
