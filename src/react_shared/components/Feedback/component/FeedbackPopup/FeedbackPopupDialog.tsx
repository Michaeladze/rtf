import { Modal } from 'antd';
import '../../../../../containers/popups/SendFeedbackPopup/SendFeedbackPopup.scss';
import 'antd/lib/button/style/index.css';
import 'antd/lib/radio/style/index.css';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetFeedback, IFeedBackPost } from '../../redux/feedback.action';
import './FeedbackPopupDialog.scss';
import { animateExit, validateExtension, validateSize } from '../../../../../_helpers/helpers';
import StandardButton from '../../../../../components/StandardButton';
import CustomSlider from '../../../../../containers/_shared/CustomSlider/CustomSlider';
import RequestTooltip
  from '../../../../../containers/IncomeRequests/IncomeRequestsMain/RequestFeedback/RequestAttributeCard/RequestTooltip';
import PopupMobileWrapper from '../../../../../containers/_shared/PopupMobileWrapper/PopupMobileWrapper';
import ActionPopup from '../../../../../containers/_shared/ActionPopup/ActionPopup';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';

interface IImage {
  /** Айдишник вложения*/
  iKey: number;
  /** Название загруженного файла*/
  sName: string;
  /** Значение url для отображения превью*/
  sValue: string;
  /** Загруженный файл*/
  fFile: File;
}

interface IEnum {
  /** Ключ */
  iKey: number;
  /** Значение */
  sValue: string;
}

const FeedbackPopupDialog = React.memo(() => {
  const dispatch = useDispatch();
  /** флаг открыт\закрыт ли попап*/
  const [isOpen, setOpen] = useState(false);
  /** Оценка проставленная пользователем*/
  const [value, setValue] = useState<number>(50);
  /** объект с информацием по загруженным файлам*/
  const [images, setImages] = useState<IImage[]>([]);
  /**переменная с комментарием*/
  const [comment, setComment] = useState<string>('');
  /** Активный слайд */
  const [activeSlide, setActiveSlide] = useState('');

  /** Tooltip and emoji  */
  const valueLabelFormat = () => {
    return <RequestTooltip value={value ? +(value / 10).toFixed() : 1}/>;
  };

  /** кнопка для открытия попапа **/
  const button = (
    <span className='feedback__button' onClick={() => setOpen(true)}>
        Свяжитесь с нами
    </span>
  );

  /** Функция сохранения формы */
  const saveForm = () => {
    let files;
    if (comment && value) {
      // todo: пока по дефолту тип - сообщение об ошибке
      const data: IFeedBackPost = {
        oFeedbackApp: {
          sValue: 'rtf',
          sDescription: 'RealTime Feedback'
        },
        oFeedbackType: {
          sValue: 'info',
          sDescription: 'Сообщение об ошибке'
        },
        iRateValue: Math.round(+value / 10),
        sMessage: comment,
        iAttachmentExist: 0
      };

      const fd: FormData = new FormData();
      fd.append('oFeedback ', JSON.stringify(data));
      if (images.length) {
        files = images.map((elem) => elem.fFile);
        files.forEach((elem) => fd.append('uploadingFiles', elem));
      }

      dispatch({ type: GetFeedback.Post, payload: fd });
      setValue(50);
      setImages([]);
      setComment('');
      setOpen(false);
    }
  };

  /** Закрыть попап */
  const onCancel = () => {
    animateExit(() => setOpen(false));
  };

  /** Изменение слайдера */
  const handleSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    event.stopPropagation();
    setValue(newValue as number);
    setActiveSlide('active');
  };

  // -------------------------------------------------------------------------------------------------------------------
  /** удаление вложения */
  // -------------------------------------------------------------------------------------------------------------------
  const deleteImage = (index: number) => {
    let newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // -------------------------------------------------------------------------------------------------------------------
  /**Добавление вложения */
  // -------------------------------------------------------------------------------------------------------------------
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const name = event.target.files[0].name;
      let isValidExt = true;
      let isValidSize = true;
      if (event.target.files[0].name) isValidExt = validateExtension(name, ['jpg', 'jpeg', 'png']);
      if (event.target.files[0].name) isValidSize = validateSize(event.target.files[0].size, 2097152, '2 Мб');

      if (!isValidExt || !isValidSize) {
        return;
      }

      reader.addEventListener('load', () => {
        let newImages = [...images];
        newImages.push({
          iKey: images.length + 1,
          sName: name,
          sValue: String(reader.result),
          fFile: file
        });
        setImages(newImages);
      });
      reader.readAsDataURL(event.target.files[0]);
      event.target.value = '';
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  /** Генерация разметки списка вложений*/
    // -------------------------------------------------------------------------------------------------------------------
  const photos = images && !!images.length && (
    <div className='feedback__row feedback__row--attachments'>
      <div className='feedback__name-header'>Вложения:</div>
      <ul className='feedback__attachment-list'>
        {images.map((elem, index) => {
          return (
            <li className='feedback__item' key={elem.iKey}>
              <button className='feedback__close-button' onClick={() => deleteImage(index)}>
              </button>
              <img src={elem.sValue} alt='Превью загружаемой фотографии' className='feedback__img-miniature'/>
              <div className='feedback__img-name'>{elem.sName}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------
  /** Разметка формы оценки */
  // -------------------------------------------------------------------------------------------------------------------
  const formik = (
      <>
        <div className='feedback__warning_row'>
          <p className='feedback__message'>
            <span className='feedback__message-text'>
            Уважаемый коллега, если данные в <strong>Профиле</strong> указаны неправильно, и Вы не можете их изменить,
            пожалуйста, проверьте информацию в <strong>SAP HR портале (в альфе)</strong>, при необходимости создайте там
            заявку на изменение своих данных. Если же в <strong>SAP HR портале</strong> указано все правильно, а в{' '}
              <strong>Профиле</strong>
            допущена ошибка, то сообщите нам об этом в ДРУГе: Программное обеспечение - Системы
            SAP - Success Factors – Профиль.
            </span>
          </p>
        </div>
        <p className='feedback__text'>Пожалуйста, оцените приложение:</p>
        <form className='feedback__form-wrapper'>
          {/*<Radio.Group className='feedback__radio-group' onChange={onChange} value={value}>*/}
          {/*  {item()}*/}
          {/*</Radio.Group>*/}

          <div className='send-feedback-popup__slider rtf__feedback-slider'>
            <span className='send-feedback-popup__value'>1</span>
            <div className={`send-feedback-popup__slider-wrapper ${activeSlide}`}>
              <CustomSlider
                value={value}
                min={10}
                max={100}
                valueLabelFormat={valueLabelFormat}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChange}
                valueLabelDisplay='on'
              />
            </div>
            <span className='send-feedback-popup__value'>10</span>
          </div>

          <textarea
            value={comment}
            className='feedback__textarea'
            placeholder='Здесь Вы можете написать свои пожелания и замечания'
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
        <div className='feedback__row'>
          <label htmlFor='invest-img' className='feedback__label'>
            Прикрепить вложения
          </label>
          <input type='file' id='invest-img' hidden={true} onChange={(e) => onImageChange(e)}/>
        </div>
        {photos}

        <footer className="feedback__footer">
          <StandardButton value='Отмена' type='link' handler={onCancel}/>
          <StandardButton value='Отправить' type='primary' handler={saveForm}/>
        </footer>
      </>
  );

  return (
    <>
      {button}
      <Modal
        title='Обратная связь'
        visible={isOpen}
        onCancel={onCancel}
        closeIcon={<CloseIcon/>}
        footer={false}
        className='rtf__feedback-modal'
        width='100%'>
        <PopupMobileWrapper handleClose={onCancel}>
          <ActionPopup titleText='Обратная связь'>
            {formik}
          </ActionPopup>
        </PopupMobileWrapper>
      </Modal>
    </>
  );
});

export default FeedbackPopupDialog;
