import React, { useState } from 'react';
import './ProjectRequest.scss';
import { animateExit } from '../../../../../_helpers/helpers';
import Modal from 'antd/lib/modal';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import { AddCommentPopup } from '../../../../popups/AddCommentPopup/AddCommentPopup';
import { CanNotRatePopup, ICanNotAnswer } from '../../../../popups/CanNotRatePopup/CanNotRatePopup';
import RequestTooltip from '../RequestAttributeCard/RequestTooltip';
import CustomSlider from '../../../../_shared/CustomSlider/CustomSlider';
import StandardButton from '../../../../../components/StandardButton';
import { IIndicator } from '../../../../../_store/reducers/users-history.reducer';

interface IProps {
  project: IIndicator;
}

const ProjectRequest: React.FC<IProps> = ({ project }) => {
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
    setValue(newValue as number);
    setActiveSlide('active');
  };

  const handleChangeRating = () => {
    project.iGrade = Math.round(value / 10);
  };

  /** -----------------------------------------------------------------------------------------------------------------
   * Отображение попапа добавить комментарий
   ----------------------------------------------------------------------------------------------------------------- */
  const [showPopupComment, togglePopupComment] = useState(false);

  const openCommentDialog = () => {
    togglePopupComment(true);
  };

  const handleCommentOk = (comment: string) => {
    project.sRespondentComment = comment;
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
        <AddCommentPopup onAdd={handleCommentOk} comment={project.sRespondentComment || ''}/>
      </PopupMobileWrapper>
    </Modal>
  );

  /** ------------------------------------------------------------------------------------------------------------------
   * Отображение попапа 'Не могу оценить'
   ------------------------------------------------------------------------------------------------------------------ */
  const [showCanNotRatePopup, toggleCanNotRatePopup] = useState(false);

  const openCanNotRateDialog = () => {
    setActiveSlide('');
    setValue(50);
    toggleCanNotRatePopup(true);
  };

  const handleCanNotRateOk = (form: ICanNotAnswer) => {
    project.sCanNotAnswerText = form.sCanNotAnswerText || '';
    project.sCanNotAnswerType = form.sCanNotAnswerType;
    project.iGrade = null;
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
    <>
      <div className='request-project'>
        <div className='request-project__top'>
          <h3 className='request-project__title'>
            {project.sName}
          </h3>
          <p className='request-project__description'>{project.sDescription}</p>
        </div>

        <div className='request-project__rate'>
          <div className='request-project__rate-inner'>
            <h6 className='request-project__rate-title'>Выберите уровень:</h6>

            <div className={`request-project__slider ${activeSlide}`}>
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

            <div className='request-project__actions'>
              <StandardButton
                handler={openCommentDialog}
                type={'link'}
                value={project.sRespondentComment ? 'Комментарий добавлен' : 'Добавить комментарий'}
              />

              <StandardButton
                handler={openCanNotRateDialog}
                type={'link'}
                value={'Не могу оценить'}
              />
            </div>

          </div>
        </div>
      </div>

      {canNotRateJSX}
      {addCommentPopupJSX}
    </>
  );
};

export default ProjectRequest;
