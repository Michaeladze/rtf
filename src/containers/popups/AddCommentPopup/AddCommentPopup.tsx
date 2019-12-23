import React, { useEffect, useState } from 'react';
import './AddCommentPopup.scss';
import StandardButton from '../../../components/StandardButton/StandardButton';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';

interface IAddCommentPopupProps {
  onAdd: (comment: string) => void;
  comment: string;
}

export const AddCommentPopup: React.FC<IAddCommentPopupProps> = ({ onAdd, comment }) => {

  /** Локальный комментарий. Так родительский компонент не перерисовывается при вводе */
  const [cmt, setComment] = useState('');

  /** Отправляем локальный комментарий в родительский компонент */
  const onSubmit = () => {
    onAdd(cmt);
  };

  /** Пробрасываем сверху финальный комментарий. Если значение изменилось (При клире, например, то код сработает) */
  useEffect(() => {
    setComment(comment);
  }, [comment]);

  return (
    <ActionPopup titleText={'Добавить комментарий'}>
      <div className='add-comment__popup'>
        <form action=''>
          <textarea
            className='add-comment__input'
            placeholder='Напишите свой комментарий'
            value={cmt}
            onTouchMove={(e) => e.stopPropagation()}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
          <StandardButton
            type='primary'
            handler={onSubmit}
            value={'Добавить'}
          />
        </form>
      </div>
    </ActionPopup>
  );
};
