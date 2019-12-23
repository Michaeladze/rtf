import React, { useState } from 'react';
import './SendFeedbackPopup.scss';
import StandardButton from '../../../components/StandardButton';
import CustomSlider from '../../_shared/CustomSlider/CustomSlider';
import RequestTooltip
  from '../../IncomeRequests/IncomeRequestsMain/RequestFeedback/RequestAttributeCard/RequestTooltip';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';
import { ReactComponent as CloseIcon } from '../../../_assets/svg/close.svg';
import { ReactComponent as ArrowIcon } from '../../../_assets/svg/arrow_back.svg';
import { breakpoints } from '../../../_helpers/helpers';

interface ISendFeedbackPopupProps {
  /** Тип обратной связи */
  type: string;
  /** Заголовок */
  // title: string;
  /** Открытие попапа добавить комментарий */
  openCommentPopup: () => void;
  /** Отправка данных */
  sendFeedback: () => void;
  /** Отправка данных в мобильной версии */
  sendMobileFeedback: (comment: string) => void;
  /** Закрытие попапа обратной связи */
  onClose: () => void;
  /** Обработчик выставления рейтинга */
  setRating: (n: number) => void;
  /** Комментарий */
  comment: string;
  /** Массив выбранных атрибутов/навыков */
  properties?: IIndicator[];
}

const SendFeedbackPopup: React.FC<ISendFeedbackPopupProps> = ({
  // title,
  openCommentPopup,
  sendFeedback,
  sendMobileFeedback,
  type,
  onClose,
  properties,
  setRating,
  comment
}) => {
  /** ------------------------------------------------------------------------------------------------------------------
   * Отображение слайдера
   ------------------------------------------------------------------------------------------------------------------ */
  const [value, setValue] = React.useState(50);
  const min = 10;
  const max = 100;

  const [activeSlide, setActiveSlide] = useState('');

  const handleSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    event.stopPropagation();
    setValue(newValue as number);
    setRating(value);
    setActiveSlide('active');
  };

  /** ------------------------------------------------------------------------------------------------------------------
   * Добавление комменатрия и отправка ОС
   ------------------------------------------------------------------------------------------------------------------ */
  const addComment = () => {
    openCommentPopup();
  };

  const handleSend = () => {
    sendFeedback();
  };

  /** ------------------------------------------------------------------------------------------------------------------
   * Комментарий в мобильной версии
   ------------------------------------------------------------------------------------------------------------------ */
  const [mobileComment, setMobileComment] = useState('');

  const handleMobileSend = () => {
    sendMobileFeedback(mobileComment);
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Отображение emoji и tooltip
   ---------------------------------------------------------------------------------------------------------------------- */
  const valueLabelFormat = () => {
    return <RequestTooltip value={+(value / 10).toFixed()}/>;
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Меняем контент в зависимости от типа ОС
   ---------------------------------------------------------------------------------------------------------------------- */
  const contentJSX = type === 'provide' ?
    <>
      <div className='send-feedback-popup__slider'>
        <span className='send-feedback-popup__value'>1</span>
        <div className={`send-feedback-popup__slider-wrapper ${activeSlide}`}>
          <CustomSlider
            value={value}
            min={min}
            max={max}
            valueLabelFormat={valueLabelFormat}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderChange}
            valueLabelDisplay='on'
          />
        </div>
        <span className='send-feedback-popup__value'>10</span>
      </div>
    </>
    : '';

  /** ----------------------------------------------------------------------------------------------------------------------
   * Кнопка Отправить на разных разрешениях
   ---------------------------------------------------------------------------------------------------------------------- */
  const sendButtonJSX = window.innerWidth > breakpoints.medium ?
    <StandardButton
      value='Отправить'
      type='primary'
      handler={handleSend}
    />
    :
    <button className='send-feedback-popup__send' type='button' onClick={handleMobileSend}>
      <ArrowIcon className='send-feedback-popup__send-icon'/>
    </button>;

  /** ----------------------------------------------------------------------------------------------------------------------
   * Кнопка Закрыть попап
   ---------------------------------------------------------------------------------------------------------------------- */
  const closeButtonJSX =
    <button type='button' className='send-feedback-popup__close' onClick={onClose}>
      <CloseIcon className='send-icon__close'/>
    </button>;

  /** ----------------------------------------------------------------------------------------------------------------------
   * Кнопка Добавить комментарий.
   * Превращается в поле ввода в мобильной версии
   ---------------------------------------------------------------------------------------------------------------------- */
  const addCommentJSX = window.innerWidth > breakpoints.medium ?
    <>
      <StandardButton value={comment.length === 0 ? 'Добавить комментарий' : 'Комментарий добавлен'}
        type='link'  handler={addComment}
      />
    </> :
    <textarea
      className='send-feedback-popup__textarea'
      placeholder='Добавить комментарий'
      value={mobileComment}
      onTouchMove={(e) => e.preventDefault()}
      onChange={(e) => setMobileComment(e.currentTarget.value)}
    />
  ;

  return (
    <div className='send-feedback-popup'>
      <div className='send-feedback-popup__inner'>
        <div className='send-feedback-popup__block'>

          <div className='send-feedback-popup__title'>
            <h6 className='send-feedback-popup__title-text'>Выбрано:
            </h6>
            <span className='send-feedback-popup__counter'>{properties && properties.length}</span>
          </div>

          {contentJSX}
        </div>

        <div className='send-feedback-popup__block sb'>
          {addCommentJSX}

          <div className='send-feedback-popup__btn-container'>
            {sendButtonJSX}
          </div>

          {closeButtonJSX}
        </div>
      </div>
    </div>
  );
};

export default SendFeedbackPopup;
