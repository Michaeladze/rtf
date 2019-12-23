import React, { useState } from 'react';
import './RequestAttributeList.scss';
import StandardButton from '../../../../../components/StandardButton';
import Modal from 'antd/lib/modal';
import AddAttributesPopup from '../../../../popups/AddAttributesPopup/AddAttributesPopup';
import { ReactComponent as PlusIcon } from '../../../../../_assets/svg/plus.svg';
import { IIndicator } from '../../../../../_store/reducers/users-history.reducer';
import { animateExit } from '../../../../../_helpers/helpers';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import RequestAttributeCard from '../RequestAttributeCard';

interface IRequestAttributeListProps {
  groupTitle: string;
  items: IIndicator[];
  type: string;
}

const RequestAttributeList: React.FC<IRequestAttributeListProps> = ({ groupTitle, items, type }) => {
  /** Отображение попапа для добавления/удаления из Избранного */
  const [showAddAttributePopup, toggleAddAttribute] = useState(false);

  /** Открытие попапа  */
  const openDialog = () => {
    toggleAddAttribute(true);
  };

  /** Закрытие попапа */
  const handleClose = () => {
    animateExit(() => toggleAddAttribute(false));
  };

  /** Карточки */
  const JSX = items && items.map((a) => <RequestAttributeCard key={a.sId} item={a} type={type}/>);

  /** Описание в зависимости от типа атрибута */
  const descriptionText = type === 'attributes' ? 'Оцени компетенции коллеги от 1 до 10' :
    'Оцени профессиональные навыки коллеги от 1 до 10';

  return (
    <>
      <header className='request__attributes-header'>
        <div className='request__attributes-info'>
          <h2 className='request__attributes-title'>{groupTitle}</h2>
          <p className='request__attributes-description'>{descriptionText}</p>
        </div>

        <div className='request__attributes-add request__attributes-add--desktop'>
          <StandardButton value='Добавить' handler={openDialog}/>
        </div>

        <div className='request__attributes-add request__attributes-add--mobile'>
          <button
            type='button'
            className='request__attributes-btn--mobile'
            onClick={openDialog}>
            <PlusIcon className='request__attributes-icon--plus'/>
          </button>
        </div>
      </header>

      <div className='request__attributes-list'>{JSX}</div>


      <Modal
        closeIcon={<CloseIcon/>}
        bodyStyle={{ height: '80vh' }}
        centered={true}
        visible={showAddAttributePopup}
        footer={null}
        onCancel={handleClose}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleClose}>
          <AddAttributesPopup
            type={type}
            activeIndicators={items}
          />
        </PopupMobileWrapper>
      </Modal>


    </>
  );
};

export default RequestAttributeList;
