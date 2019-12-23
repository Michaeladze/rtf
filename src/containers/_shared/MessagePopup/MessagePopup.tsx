import React from 'react';
import './MessagePopup.scss';
import StandardButton from '../../../components/StandardButton';

interface IMessagePopupProps {
  image?: React.ReactNode;
  title?: string;
  text?: string;
  okButtonValue?: string;
  okButtonHandler?: () => void;
  cancelButtonValue?: string;
  cancelButtonHandler?: () => void;
}

const MessagePopup: React.FC<IMessagePopupProps> = ({
  image,
  title,
  text,
  okButtonValue,
  okButtonHandler,
  cancelButtonValue,
  cancelButtonHandler
}) => {
  return (
    <div className='rtf__popup'>
      {image && image}

      <div className='rtf__popup-body'>
        {title && <h3 className='rtf__popup-title'> {title} </h3>}

        {text && <p className='rtf__popup-text'> {text} </p>}

        {okButtonValue && okButtonHandler && (
          <div className='rtf__popup-button-wrapper'>
            <StandardButton
              type='primary'
              value={okButtonValue}
              handler={okButtonHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePopup;
