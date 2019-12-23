import React from 'react';
import { ReactComponent as ArrowIcon } from '../../../../_assets/svg/arrow_back.svg';

interface IProps {
  type: string;
  icon: string;
  label: string;
  color: string;
  count?: number;
}

const FeedbackMenuButton: React.FC<IProps> = ({
  type,
  icon,
  label,
  color,
  count
}) => {
  const dropdownView =
    type === 'dropdown' ? 'feedback-menu__button--dropdown' : '';

  return (
    <button
      className={`feedback-menu__button feedback-menu__button--${color} ${dropdownView}`}
      disabled={type !== 'default' && !count}>
      <div
        className={`feedback-menu__button-icon__wrapper feedback-menu__button-icon__wrapper--${color}`}>
        {type === 'default' ? (
          <ArrowIcon className={`feedback-menu__button-icon ${icon}`}/>
        ) : (
          count
        )}
      </div>
      <span className='feedback-menu__button-text'>{label}</span>
    </button>
  );
};

export default FeedbackMenuButton;
