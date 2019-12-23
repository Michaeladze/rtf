import React from 'react';
import './GoBackButton.scss';
import { ReactComponent as ArrowBack } from '../../_assets/svg/arrow_back.svg';

interface IProps {
  /** Обработка клика */
  goBack: () => void;
  /** Текст кнопки */
  label?: string;
}

const GoBackButton: React.FC<IProps> = ({ goBack, label }) => {
  /** Текст кнопки */
  const labelText = label ? label : null;

  return (
    <div className='go-back'>
      <button className='go-back__action' onClick={goBack}>
        <span className='go-back__button'><ArrowBack className='go-back__icon'/></span>
        <span className='go-back__label'>{labelText}</span>
      </button>
    </div>
  );
};

export default GoBackButton;
