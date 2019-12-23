import React from 'react';
import './StandardButton.scss';

interface IStandardButtonProps {
  value: string;
  handler: () => void;
  customClass?: string;
  type?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
}

const StandardButton: React.FC<IStandardButtonProps> = ({
  value,
  handler,
  type,
  customClass,
  buttonType = 'button'
}) => {
  let className = '';

  switch (type) {
    case 'primary':
      className = 'rtf__standard-button--primary';
      break;
    case 'link':
      className = 'rtf__standard-button--link';
      break;
    case 'outline':
      className = 'rtf__standard-button--outline';
      break;
    case 'secondary':
      className = 'rtf__standard-button--secondary';
      break;
    default:
      className = '';
  }

  return (
    <button
      type={buttonType}
      className={`rtf__standard-button ${className} ${customClass}`}
      onClick={handler}>
      {value}
    </button>
  );
};

export default StandardButton;
