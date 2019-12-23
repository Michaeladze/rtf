import React, { useState } from 'react';
import './RequestAttributeCard.scss';
import CustomSlider from '../../../../_shared/CustomSlider/CustomSlider';
import Modal from 'antd/lib/modal';
import { AddCommentPopup } from '../../../../popups/AddCommentPopup/AddCommentPopup';
import { CanNotRatePopup, ICanNotAnswer } from '../../../../popups/CanNotRatePopup/CanNotRatePopup';
import Rating from '../../../../../components/Rating/Rating';
import StandardButton from '../../../../../components/StandardButton/StandardButton';
import RequestTooltip from './RequestTooltip';
import { IIndicator } from '../../../../../_store/reducers/users-history.reducer';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import { animateExit, customEqual } from '../../../../../_helpers/helpers';
import { IStringMap } from '../../../../../_helpers/socket';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../../_shared/PopupMobileWrapper/PopupMobileWrapper';

interface IRequestAttributeCardProps {
  item: IIndicator;
  type: string;
}

const RequestAttributeCard: React.FC<IRequestAttributeCardProps> = React.memo(
  ({ item, type }) => {
    /** Получение справочника */
    const assessmentsMap: IStringMap<IStringMap<IIndicator>> = useSelector(
      (store: IStore) => store.properties.dictionary,
      customEqual
    );

    const [change, setChange] = useState(false);

    /** ------------------------------------------------------------------------------------------------------------------
     * Отображение слайдера
     ------------------------------------------------------------------------------------------------------------------ */
    const [value, setValue] = React.useState(50);
    const min = 10;
    const max = 100;

    const [activeSlide, setActiveSlide] = useState('');

    const handleSliderChange = (
      event: React.ChangeEvent<{}>,
      newValue: number | number[]
    ) => {
      event.stopPropagation();
      setChange(true);
      setValue(newValue as number);
      setActiveSlide('active');
    };

    const handleChangeRating = () => {
      item.iGrade = Math.round(value / 10);
    };

    /** ------------------------------------------------------------------------------------------------------------------
     * Отображение рейтинга/ если нет рейтинга отображается иконка
     -------------------------------------------------------------------------------------------------------------------*/
    const rating = change ? Math.round(value / 10) : undefined;

    /** ------------------------------------------------------------------------------------------------------------------
     * Отображение попапа добавить комментарий
     ------------------------------------------------------------------------------------------------------------------ */
    const [showPopupComment, togglePopupComment] = useState(false);

    const openCommentDialog = () => {
      togglePopupComment(true);
    };

    const handleCommentOk = (comment: string) => {
      item.sRespondentComment = comment;
      animateExit(() => togglePopupComment(false));
    };

    const handleCommentCancel = () => {
      animateExit(() => togglePopupComment(false));
    };

    const addCommentPopupJSX = (
      <Modal
        closeIcon={<CloseIcon/>}
        visible={showPopupComment}
        footer={null}
        onCancel={handleCommentCancel}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleCommentCancel}>
          <AddCommentPopup onAdd={handleCommentOk} comment={item.sRespondentComment || ''}/>
        </PopupMobileWrapper>
      </Modal>
    );

    /** ------------------------------------------------------------------------------------------------------------------
     * Отображение попапа "Не могу оценить"
     ------------------------------------------------------------------------------------------------------------------ */
    const [showCanNotRatePopup, toggleCanNotRatePopup] = useState(false);

    const openCanNotRateDialog = () => {
      setActiveSlide('');
      setValue(50);
      toggleCanNotRatePopup(true);
    };

    const handleCanNotRateOk = (form: ICanNotAnswer) => {
      item.sCanNotAnswerText = form.sCanNotAnswerText || '';
      item.sCanNotAnswerType = form.sCanNotAnswerType;
      item.iGrade = null;
      toggleCanNotRatePopup(false);
    };

    const handleCanNotRateCancel = () => {
      animateExit(() => toggleCanNotRatePopup(false));
    };

    const canNotRateJSX = (
      <Modal
        closeIcon={<CloseIcon/>}
        visible={showCanNotRatePopup}
        footer={null}
        onCancel={handleCanNotRateCancel}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleCanNotRateCancel}>
          <CanNotRatePopup
            title={'С чем вызваны сложности в оценке?'}
            onOk={handleCanNotRateOk}
            onCancel={handleCanNotRateCancel}
          />
        </PopupMobileWrapper>
      </Modal>
    );

    /** ----------------------------------------------------------------------------------------------------------------------
     * Отображение emoji и tooltip
     ---------------------------------------------------------------------------------------------------------------------- */

    const valueLabelFormat = () => {
      return <RequestTooltip value={+(value / 10).toFixed()}/>;
    };

    return (
      <article className='request__attribute-wrapper'>
        <div className='request__attribute-card'>
          <header className='request__attribute-header'>
            <Rating rating={rating}/>
            <h3 className='request__attribute-title'>
              {' '}
              {item.sName ? item.sName : assessmentsMap && assessmentsMap[type][item.sId].sName}{' '}
            </h3>
          </header>

          <div className='request__attribute-footer'>
            <div className={`request__attribute-slider ${activeSlide}`}>
              <span className='slider-marks slider-marks--min'>1</span>
              <CustomSlider
                className='slider'
                value={value}
                onChangeCommitted={handleChangeRating}
                min={min}
                max={max}
                valueLabelFormat={valueLabelFormat}
                onChange={handleSliderChange}
                valueLabelDisplay='on'
              />
              <span className='slider-marks slider-marks--max'>10</span>
            </div>
            <div
              className={`request__attribute-button ${
                item.sRespondentComment ? 'active' : ''
              }`}>
              <StandardButton
                handler={openCommentDialog}
                type={'link'}
                value={item.sRespondentComment ? 'Комментарий добавлен' : 'Добавить комментарий'}
              />
            </div>

            <div className={`request__attribute-button ${item.sCanNotAnswerType ? 'active' : ''}`}>
              <StandardButton
                handler={openCanNotRateDialog}
                type={'link'}
                value={'Не могу оценить'}
              />
            </div>
          </div>
        </div>
        {canNotRateJSX}
        {addCommentPopupJSX}
      </article>
    );
  }
);
export default RequestAttributeCard;
