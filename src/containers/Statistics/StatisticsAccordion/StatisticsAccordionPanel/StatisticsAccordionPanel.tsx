import React, { useState } from 'react';
import './StatisticsAccordionPanel.scss';
import IndicatorProgress from '../IndicatorProgress/IndicatorProgress';
import StatisticsRatingPopup from '../../../popups/StatisticsRatingPopup/StatisticsRatingPopup';
import Modal from 'antd/lib/modal';
import { IAttributes } from '../../../../_store/reducers/statisticsAll.reducer';
import { animateExit } from '../../../../_helpers/helpers';
import { ReactComponent as CloseIcon } from '../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import useReactRouter from 'use-react-router';

interface IProps {
  item: IAttributes;
}

const StatisticsAccordionPanel: React.FC<IProps> = ({ item }) => {
  /** ID подчиненного из роута */
  const { location } = useReactRouter();
  const arr = location.pathname.split('/');
  const sSubordinateId = arr.length >= 4 && arr[3];

  /** Отображение попапа */
  const [showStatisticsPopup, togglePopup] = useState(false);

  /** Комментарий из попапа */
  const [activeItem, setActiveItem] = useState();

  /** ----------------------------------------------------------------------------------------------------------------------
   * Попап открыть/закрыть методы
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Открытие попапа  */
  const openDialog = (item: IAttributes) => {
    if (item.fAverageGrade) {
      setActiveItem(item);
      togglePopup(true);
    }
  };

  /** Закрытие попапа */
  const handleClose = () => {
    animateExit(() => togglePopup(false));
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Контент
   ---------------------------------------------------------------------------------------------------------------------- */
  const itemsAccordionJSX = item.aAttributes ? (
    item.aAttributes.map((item) => {
      return (
        <div className={`statistic-accordion__content-item ${(item.fAverageGrade && !sSubordinateId) ? '' : 'no-popup'}`}
          key={item.sId} onClick={() => openDialog(item)}>
          <IndicatorProgress item={item}/>
        </div>
      );
    })
  ) : (
    <span>Нет данных</span>
  );

  // *******************************************************************************************************************

  return <>
    {itemsAccordionJSX}
    <Modal
      closeIcon={<CloseIcon/>}
      bodyStyle={{ height: '80vh' }}
      centered={true}
      visible={showStatisticsPopup}
      footer={null}
      destroyOnClose={true}//
      onCancel={handleClose}
      width={470}
      className='custom-modal'>
      <PopupMobileWrapper handleClose={handleClose}>
        <StatisticsRatingPopup item={activeItem} type='attribute'/>
      </PopupMobileWrapper>
    </Modal>
  </>;
};
export default StatisticsAccordionPanel;
