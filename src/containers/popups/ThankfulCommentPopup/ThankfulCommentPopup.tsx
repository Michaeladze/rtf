import React, { useRef } from 'react';
import './ThankfulCommentPopup.scss';
import StandardButton from '../../../components/StandardButton';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';

interface IThankfulCommentPopupProps {
  onAdd: (comment: string) => void;
}

export const ThankfulCommentPopup: React.FC<IThankfulCommentPopupProps> = ({ onAdd }) => {
  const input = useRef<HTMLTextAreaElement>(null);

  const onSubmit = () => {
    onAdd((input.current as HTMLTextAreaElement).value);
  };

  return (
    <ActionPopup>
      <div className='thankful-popup'>
        <div className='thankful__top'>
          <div className='thankful__img' />
          <div className='thankful__title'>Коллега будет очень рад твоим теплым словам!
          </div>
        </div>

        <form action=''>
          <textarea
            className='thankful__input'
            ref={input}
            onTouchMove={(e) => e.stopPropagation()}
            placeholder='Добавить комментарий'
          />
          <div className='thankful__action'>
            <StandardButton
              type='primary'
              handler={onSubmit}
              value={'Поблагодарить'}
            />
          </div>
        </form>
      </div>
    </ActionPopup>
  );
};
