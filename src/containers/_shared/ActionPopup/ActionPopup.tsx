import React from 'react';
import './ActionPopup.scss';

interface IActionPopupProps {
  children?: JSX.Element[] | JSX.Element;
  titleText?: string;
  subtitleText?: string;
}

const ActionPopup: React.FC<IActionPopupProps> = ({ children, titleText, subtitleText }) => {

  return (
    <div className='dialog-container'>
      <div className='dialog-wrapper'>

        <div className='dialog__header'>
          {titleText && <h3 className='dialog__title'> {titleText} </h3>}
          {subtitleText && <p className='dialog__subtitle'>{subtitleText}</p>}
        </div>

        <div className='dialog__body'>{children}</div>
      </div>
    </div>
  );
};

export default ActionPopup;
