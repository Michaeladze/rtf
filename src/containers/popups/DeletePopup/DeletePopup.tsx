import React from 'react';
import './DeletePopup.scss';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';
import StandardButton from '../../../components/StandardButton';

interface IconProps {
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle: string;
  /** Подтверждение удаления */
  onOk: () => void;
  /** Отмена удаления */
  onCancel: () => void;
}

const DeletePopup: React.FC<IconProps> = ({ title, subtitle, onOk, onCancel }) => {

  return (
    <ActionPopup titleText={title} subtitleText={subtitle}>
      <div className='delete-popup'>
        <StandardButton value='Удалить' type='primary' handler={onOk}/>
        <StandardButton value='Отмена' type='secondary' handler={onCancel}/>
      </div>
    </ActionPopup>
  );
};

export default DeletePopup;
