import React, { useCallback, useEffect, useState } from 'react';
import './FeedbackActionsMain.scss';
import { IIndicator } from '../../../_store/reducers/users-history.reducer';
import { FeedbackActionBody } from '../FeedbackActionBody/FeedbackActionBody';
import TabContainer, { ITab } from '../../_shared/TabContainer/TabContainer';
import SendFeedbackPopup from '../../popups/SendFeedbackPopup';
import Modal from 'antd/lib/modal';
import { AddCommentPopup } from '../../popups/AddCommentPopup/AddCommentPopup';
import useReactRouter from 'use-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ProvideFeedback, RequestFeedback, SelectProperty } from '../../../_store/actions/feedback-properties.action';
import { IStore } from '../../../_store/store.interface';
import { animateExit, customEqual } from '../../../_helpers/helpers';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { IProvideFeedbackBody, IRequestFeedbackBody } from '../../../_store/reducers/feedback-properties.reducer';
import { ReactComponent as CloseIcon } from '../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../_shared/PopupMobileWrapper/PopupMobileWrapper';

export const FeedbackActionsMain: React.FC = () => {
  const dispatch = useDispatch();
  const { location } = useReactRouter();

  /** ------------------------------------------------------------------------------------------------------------------
   * Реакт хуки
   * ------------------------------------------------------------------------------------------------------------------ */
  /** Тип обратной связи */
  const [type, setType] = useState('');
  /** Тип попапа при клике на карточку */
  // const [feedbackPopupTitle, setFeedbackPopupTitle] = useState('');
  /** Открытие/закрытие попапа обратной связи */
  const [modalOpen, setModalOpen] = useState(false);
  /** Открытие/закрытие попапа добавления комменатрия внтури попапа обратной связи */
  const [showPopupComment, togglePopupComment] = useState(false);
  /** Комментарий из попапа */
  const [comment, setComment] = useState('');
  /** Оценка из попапа */
  const [rating, setRating] = useState(0);

  /** Закрытие попапа обратной связи */
  const handleClose = useCallback(() => {
    dispatch({
      type: SelectProperty.Set,
      payload: {
        selectedProperties: {
          property: {},
          isProvideFeedback: type === 'provide',
          clear: true
        }
      }
    });
  }, [dispatch, type]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Определяем по роутеру тип обратной связи для открытия нужного попапа
   ---------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    setType(location.pathname.indexOf('feedback-provide') >= 0 ? 'provide' : 'request');
    // setFeedbackPopupTitle('Выбрано:');
    handleClose();
  }, [location.pathname, handleClose]);

  /** Активный юзер */
  const activeUser: IUser | null = useSelector((store: IStore) => store.users.activeUser, customEqual);

  /** Выбранные атрибуты/навыки */
  const selectedProperties: IIndicator[] = useSelector(
    (store: IStore) => store.properties.selectedProperties, customEqual);

  /** ------------------------------------------------------------------------------------------------------------------
   * Отображение попапа обратной связи и выбор атрибутов/навыков
   ------------------------------------------------------------------------------------------------------------------ */
  /** Выбор атрибута/навыка */
  const onCardClick = useCallback((item: IIndicator) => {
    if (!modalOpen) {
      setModalOpen(true);
    }

    dispatch({
      type: SelectProperty.Set,
      payload: {
        selectedProperties: {
          property: item,
          isProvideFeedback: location.pathname.indexOf('feedback-provide') >= 0
        }
      }
    });
  }, [dispatch, modalOpen, location.pathname]);


  useEffect(() => {
    if (selectedProperties && selectedProperties.length === 0) {
      setModalOpen(false);
    }
  }, [selectedProperties]);

  /** ------------------------------------------------------------------------------------------------------------------
   * Отображение попапа добавить комментарий
   ------------------------------------------------------------------------------------------------------------------ */
  const openCommentPopup = () => {
    togglePopupComment(true);
  };

  const handleCommentOk = (comment: string) => {
    setComment(comment);
    animateExit(() => togglePopupComment(false));
  };

  const handleCommentCancel = () => {
    animateExit(() => togglePopupComment(false));
  };

  /** Обработчик выставления рейтинга */
  const handleSetRating = (rating: number) => {
    setRating(rating);
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Отправка комментария
   ---------------------------------------------------------------------------------------------------------------------- */
  const sendFeedback = () => {
    if (activeUser) {
      if (type === 'request') {
        requestFeedback();
      }

      if (type === 'provide') {
        provideFeedback();
      }
    } else {
      console.log('Не выбран активный пользователь');
    }
  };

  /** Функция отправки запроса на обратную связь */
  const requestFeedback = () => {
    const body: IRequestFeedbackBody = {
      aRespondentsId: [(activeUser as IUser).sUserId],
      aAttributeToCategories: selectedProperties
        .filter((e) => e.sCategoryId)
        .map((e) => ({
          sAttributeId: e.sId,
          sCategoryId: e.sCategoryId as string
        })),
      aSkills: selectedProperties
        .filter((e) => !e.sCategoryId)
        .map((e) => ({
          sId: e.sId
        })),
      sRequesterComment: comment
    };

    dispatch({ type: RequestFeedback.Pending, payload: body });

    setComment(''); // чистим комментарий
    setModalOpen(false); // скрываем попап
  };

  /** Функция отправки обратной связи */
  const provideFeedback = () => {
    if (rating) {
      const body: IProvideFeedbackBody = {
        aRequestersId: [(activeUser as IUser).sUserId],
        aPersonAssessmentItem: selectedProperties
          .filter((e) => e.sCategoryId)
          .map((e) => ({
            oAttributeToCategory: {
              sAttributeId: e.sId,
              sCategoryId: e.sCategoryId as string
            },
            sRespondentComment: comment,
            iGrade: Math.round(rating / 10)
          })),
        aPersonAssessmentSkillItem: selectedProperties
          .filter((e) => !e.sCategoryId)
          .map((e) => ({
            oSkill: {
              sId: e.sId
            },
            sRespondentComment: comment,
            iGrade: Math.round(rating / 10)
          }))
      };

      dispatch({ type: ProvideFeedback.Pending, payload: body });

      setComment(''); // чистим комментарий
      setModalOpen(false); // скрываем попап
    } else {
      console.log('Нет оценки');
    }
  };

  /** Функция отправки обратной связи в мобильной версии */
  const provideMobileFeedback = (comment: string) => {
    setComment(comment);

    console.log(selectedProperties);

    if (rating) {
      const body: IProvideFeedbackBody = {
        aRequestersId: [(activeUser as IUser).sUserId],
        aPersonAssessmentItem: selectedProperties
          .filter((e) => e.sCategoryId)
          .map((e) => ({
            oAttributeToCategory: {
              sAttributeId: e.sId,
              sCategoryId: e.sCategoryId as string
            },
            sRespondentComment: comment,
            iGrade: Math.round(rating / 10)
          })),
        aPersonAssessmentSkillItem: selectedProperties
          .filter((e) => !e.sCategoryId)
          .map((e) => ({
            oSkill: {
              sId: e.sId
            },
            sRespondentComment: comment,
            iGrade: Math.round(rating / 10)
          }))
      };

      console.log(body);

      dispatch({ type: ProvideFeedback.Pending, payload: body });

      setComment(''); // чистим комментарий
      setModalOpen(false); // скрываем попап
    } else {
      console.log('Нет оценки');
    }
  };

  /** Функция отправки запроса на обратную связь */
  const requestMobileFeedback = (comment: string) => {
    setComment(comment);
    const body: IRequestFeedbackBody = {
      aRespondentsId: [(activeUser as IUser).sUserId],
      aAttributeToCategories: selectedProperties
        .filter((e) => e.sCategoryId)
        .map((e) => ({
          sAttributeId: e.sId,
          sCategoryId: e.sCategoryId as string
        })),
      aSkills: selectedProperties
        .filter((e) => !e.sCategoryId)
        .map((e) => ({
          sId: e.sId
        })),
      sRequesterComment: comment
    };

    dispatch({ type: RequestFeedback.Pending, payload: body });

    setComment(''); // чистим комментарий
    setModalOpen(false); // скрываем попап
  };

  const sendMobileFeedback = (comment: string) => {
    if (activeUser) {
      if (type === 'request') {
        requestMobileFeedback(comment);
      }

      if (type === 'provide') {
        provideMobileFeedback(comment);
      }
    } else {
      console.log('Не выбран активный пользователь');
    }
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Кнопки переключения табов
   ---------------------------------------------------------------------------------------------------------------------- */
  const tabs: ITab[] = [
    {
      id: 1,
      label: 'Компетенции',
      content: <FeedbackActionBody type='attributes' action={type} onClick={onCardClick}/>
    },
    {
      id: 2,
      label: 'Проф. навыки',
      content: <FeedbackActionBody type='skills' action={type} onClick={onCardClick}/>
    }
  ];

  return (
    <>
      <div className='feedback-actions'>
        <div className='feedback-actions__tabs'>
          <TabContainer tabs={tabs}/>
        </div>
      </div>

      {modalOpen && (
        <PopupMobileWrapper handleClose={handleClose}>
          <SendFeedbackPopup
            onClose={handleClose}
            type={type}
            comment={comment}
            // title={feedbackPopupTitle}
            properties={selectedProperties}
            setRating={handleSetRating}
            openCommentPopup={openCommentPopup}
            sendFeedback={sendFeedback}
            sendMobileFeedback={sendMobileFeedback}
          />
        </PopupMobileWrapper>
      )}

      <Modal
        closeIcon={<CloseIcon/>}
        visible={showPopupComment}
        footer={null}
        onCancel={handleCommentCancel}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleCommentCancel}>
          <AddCommentPopup onAdd={handleCommentOk} comment={comment}/>
        </PopupMobileWrapper>
      </Modal>
    </>
  );
};
