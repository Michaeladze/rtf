import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RateItem.scss';
import { NavLink } from 'react-router-dom';
import { IIncomeAssessmentDetails, IIncomeAssessmentItem } from '../../../../_store/reducers/users-request.reducer';
import { IStore } from '../../../../_store/store.interface';
import AttributeItem from '../AttributeItem/AttributeItem';
import Modal from 'antd/lib/modal';
import { animateExit, customEqual, formatDate } from '../../../../_helpers/helpers';
import { ThankfulCommentPopup } from '../../../popups/ThankfulCommentPopup/ThankfulCommentPopup';
import StandardButton from '../../../../components/StandardButton';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import UserTitle from '../../../../components/UserTitle';
import { useDispatch, useSelector } from 'react-redux';
import { AddThank, AddThanksForProjectAssessment } from '../../../../_store/actions/thanks.action';
import { UpdateAssessmentStatus, UpdateProjectAssessmentStatus } from '../../../../_store/actions/users-history.action';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IStringMap } from '../../../../_helpers/socket';
import { ReactComponent as CloseIconRound } from '../../../../_assets/svg/close_round.svg';
import { ReactComponent as CloseIcon } from '../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import DeletePopup from '../../../popups/DeletePopup';
import { IHistoryItem } from '../../../../_store/reducers/users-history.reducer';
import ProjectItem from '../ProjectItem/ProjectItem';
import Comment from '../../../../components/Comment';

interface IRateItemProps {
  item: IHistoryItem;
  activeUser: IUser | null;
  sLoadOption: string;
}

const RateItem: React.FC<IRateItemProps> = ({ item, activeUser, sLoadOption }) => {
  const dispatch = useDispatch();

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);

  /** Подписываемся на руководителя */
  const boss: IUser | null = useSelector((store: IStore) => store.boss.boss, customEqual);

  /** Из-за невозможности бэкенда присылать одинаковые структуры для проектов и ОС
   *  записываем sRequesterId в отдельную переменную */
  let sRequesterId = item.oPayload.sRequesterId;
  if (item) {
    if (item.sActivityType === 'ASSESSMENT') {
      sRequesterId = item.oPayload.sRequesterId;
    } else if (item.sActivityType === 'PROJECT') {
      sRequesterId = item.oPayload.oProject.sRequesterId;
    }
  }

  const dispatchType = item.sActivityType === 'ASSESSMENT' ?
    UpdateAssessmentStatus.Pending : UpdateProjectAssessmentStatus.Pending;

  // ******************************************************************************************************************

  /** Тип запроса */
  let type = '';
  if (item) {
    if (item.oPayload.aPersonAssessmentItem) {
      type = 'attribute';
    } else if (item.oPayload.aPersonAssessmentSkillItem) {
      type = 'skill';
    } else if (item.oPayload.oProject) {
      type = 'project';
    }
  }

  // ******************************************************************************************************************

  /** Форматирование даты */
  let tmpDate = 0;
  if (type === 'attribute' || type === 'skill') {
    tmpDate = item && item.oPayload.lResponseTime ? item.oPayload.lResponseTime : item.oPayload.lCreationTime;
  } else if (type === 'project') {
    tmpDate = item && item.oPayload.lLastModifiedTime ? item.oPayload.lLastModifiedTime : 0;
  }

  const date = `${formatDate(tmpDate).iDayOfMonth} ${formatDate(tmpDate).sMonthShort} ${formatDate(tmpDate).sYear}`;
  const time = `${formatDate(tmpDate).sHour}:${formatDate(tmpDate).sMinutes}`;

  // ******************************************************************************************************************
  /** Компетенции и навыки */
  const competences = item.sActivityType === 'ASSESSMENT' ?
    [...item.oPayload.aPersonAssessmentItem.map((e) => ({ ...e, sType: type }))] : [];
  const skills = item.sActivityType === 'ASSESSMENT' ?
    [...item.oPayload.aPersonAssessmentSkillItem.map((e) => ({ ...e, sType: type }))] : [];

  // ******************************************************************************************************************
  /** Общий комментарий, если в оценке больше 1 атрибута */
  let singleComment = '';

  if (skills.length > 1 && item.oPayload.aPersonAssessmentSkillItem[0].sRespondentComment) {
    singleComment = item.oPayload.aPersonAssessmentSkillItem[0].sRespondentComment;
  } else if (competences.length > 1 && item.oPayload.aPersonAssessmentItem[0].sRespondentComment) {
    singleComment = item.oPayload.aPersonAssessmentItem[0].sRespondentComment;
  }

  const singleCommentJSX =
    (loggedUser && (loggedUser.sUserId === sRequesterId || loggedUser.sUserId === item.oPayload.sRespondentId)) &&
    (skills.length > 1 || competences.length > 1) && singleComment
      ?
      <Comment comment={singleComment} textLength={100}/> : '';

  // ******************************************************************************************************************
  /** Компетенции и навыки JSX */
  const competencesJSX = competences.map((c: IIncomeAssessmentItem) => (
    <AttributeItem key={c.sId} attribute={c} showComment={singleComment.length === 0}/>
  ));

  const skillsJSX = skills.map((c: IIncomeAssessmentItem) => (
    <AttributeItem key={c.sId} attribute={c} showComment={singleComment.length === 0}/>
  ));

  // ******************************************************************************************************************
  /** Проекты */
  const project = item.sActivityType === 'PROJECT' ? [{ ...item.oPayload, sType: type }] : [];
  const projectJSX = project.map((c: IIncomeAssessmentDetails) => (
    <ProjectItem key={c.sId} project={c}/>
  ));

  // ******************************************************************************************************************

  /** Отображение попапа */
  const [showPopup, togglePopup] = useState(false);
  const openDialog = () => {
    togglePopup(true);
  };
  const handleOk = () => {
    animateExit(() => togglePopup(false));
  };

  /** Закрываем окно без отправления отзыва */
  const handleCancel = () => {
    animateExit(() => togglePopup(false));
  };

  /** Флаг отправки благодарности для изменения внешнего вида кнопки */
  const [hasThanks, setThanks] = useState(false);
  const isThanksSent = hasThanks || item.oPayload.bIsSetThanks;

  /** Отправляем отзыв и закрываем окно */
  const handleSubmit = (comment: string) => {
    item.sActivityType === 'ASSESSMENT' ?
      dispatch({
        type: AddThank.Pending,
        payload: { sPersonAssessmentId: item.oPayload.sId, sText: comment }
      }) :
      dispatch({
        type: AddThanksForProjectAssessment.Pending,
        payload: { sProjectAssessmentId: item.oPayload.sId, sText: comment }
      });

    togglePopup(false);
    setThanks(true);
  };

  /** Окно с отзывом */
  const modalPopupJSX = (
    <Modal
      closeIcon={<CloseIconRound className='close-icon--round'/>}
      visible={showPopup}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      width={470}
      className='custom-modal'>
      <PopupMobileWrapper handleClose={handleCancel}>
        <ThankfulCommentPopup onAdd={handleSubmit}/>
      </PopupMobileWrapper>
    </Modal>
  );

  const userTable: IStringMap<IUser | null> = {
    ALL: (() => {
      const id = (item.oPayload.sStatus === 'CREATED' || item.oPayload.sStatus === 'READ')
        ? sRequesterId : item.oPayload.sRespondentId;
      return (loggedUser as IUser).sUserId === id ? loggedUser : activeUser
    })(),
    INBOX: activeUser,
    OUTBOX: loggedUser
  };

  const user = userTable[sLoadOption];

  // *******************************************************************************************************************

  /** Кнопка Поблагодарить */
  const thankButton =
    (item.oPayload.sStatus === 'ANSWERED' || item.oPayload.sStatus === 'READ_ANSWER') && !item.oPayload.bIsSetThanks &&
    (loggedUser && sRequesterId === loggedUser.sUserId) ? (
        <div className='rating__button'>
          <StandardButton type={isThanksSent ? 'secondary' : 'primary'} handler={openDialog}
            value={isThanksSent ? 'Благодарность отправлена' : 'Поблагодарить'}/>
        </div>
      ) : (
        ''
      );

  // *******************************************************************************************************************

  /** Кнопка Перехода в запросы */
  const goToRequestButton =
    (item.oPayload.sStatus === 'CREATED' || item.oPayload.sStatus === 'READ') &&
    (loggedUser && sRequesterId !== loggedUser.sUserId) ? (
        <NavLink to={`/income-requests/${sRequesterId}`} className='rating__button'>
          <StandardButton type='secondary' handler={openDialog}
            value='Перейти к оценке'/>
        </NavLink>
      ) : (
        ''
      );

  /** Ссылка на .rating__item */
  const ref = useRef<HTMLDivElement | null>(null);

  /** Если ОС запросил не я, то синий кружок можно показывать */
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (loggedUser && (
      (loggedUser.sUserId === item.oPayload.sRespondentId && item.oPayload.sStatus === 'CREATED') ||
      (loggedUser.sUserId === sRequesterId && item.oPayload.sStatus === 'ANSWERED')
    )) {
      setStatus('message');
    } else {
      setStatus('');
    }
  }, [item.oPayload.sRespondentId,
    item.oPayload.sStatus,
    loggedUser,
    sRequesterId]);

  /** Функция смены статуса */
  const changeStatus = useCallback(() => {
    let newStatus = '';

    if (loggedUser) {
      if (loggedUser.sUserId === item.oPayload.sRespondentId && item.oPayload.sStatus === 'CREATED') {
        newStatus = 'READ';
      }

      if ((loggedUser.sUserId === sRequesterId) && item.oPayload.sStatus === 'ANSWERED') {
        newStatus = 'READ_ANSWER';
      }
    }

    if (item.oPayload.sStatus !== 'READ' && item.oPayload.sStatus !== 'READ_ANSWER' && newStatus) {
      dispatch({
        type: dispatchType, payload: {
          sId: item.oPayload.sId,
          sStatus: newStatus,
          sUserId: sRequesterId
        }
      });

      setStatus('');
    }
  }, [dispatch,
    dispatchType,
    item.oPayload.sId,
    item.oPayload.sRespondentId,
    item.oPayload.sStatus,
    loggedUser,
    sRequesterId]);

  /** Обновить статус оценки */
  useEffect(() => {
    if (ref.current) {
      const sub = fromEvent(ref.current as HTMLInputElement, 'mouseover')
        .pipe(
          map((a: Event) => (a.currentTarget as HTMLDivElement)),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe((div: HTMLDivElement) => {
          changeStatus();
        });
      return () => sub.unsubscribe();
    }
  }, [changeStatus]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Попап подтверждения удаления оценки
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Отображение попапа */
  const [showDeletePopup, toggleDeletePopup] = useState(false);

  /** Закрытие попапа */
  const closeDeletePopup = () => {
    animateExit(() => toggleDeletePopup(false));
  };

  /** Удаление оценки */
  const [confirmDelete, setConfirmDelete] = useState<() => void>(() => {
  });

  const withdrawEstimates = (request: IIncomeAssessmentDetails) => {
    toggleDeletePopup(true);

    setConfirmDelete(() => {
      return () => {
        dispatch({
          type: dispatchType, payload: {
            sId: request.sId,
            sStatus: 'DELETED'
          }
        });
        closeDeletePopup();
      }
    })
  };

  /** Кнопка отзыва всех оценок */
  const withdrawEstimatesButtonJSX = (loggedUser && (
    (loggedUser.sUserId === item.oPayload.sRespondentId && (item.oPayload.sStatus === 'ANSWERED' || item.oPayload.sStatus === 'READ_ANSWER')) ||
    (loggedUser.sUserId === sRequesterId && (item.oPayload.sStatus === 'CREATED' || item.oPayload.sStatus === 'READ')))) &&
  (boss && item.oPayload.sRespondentId !== boss.sUserId) ?
    <StandardButton type='link' handler={() => withdrawEstimates(item.oPayload)} value={'Удалить'}/>
    : '';

  /** Текст попапа удаления оценки/запроса */
  const subtitleText = loggedUser && (loggedUser.sUserId === item.oPayload.sRespondentId &&
    (item.oPayload.sStatus === 'ANSWERED' || item.oPayload.sStatus === 'READ_ANSWER')) ?
    'Вы уверены, что хотите удалить оценку?' : 'Вы уверены, что хотите удалить запрос на оценку?';

  /** Список запросов */
  const rateItemJSX =
    <div className='rating__item'
      onTouchStartCapture={changeStatus}
      ref={ref}>
      <div className="rating__top-wrapper">
        <div className='rating__date-wrapper'><span className='rating__date'>{`${date} в ${time}`}</span></div>

        <div className={`rating__top ${status} ${item.oPayload.sStatus.toLowerCase()}`}>
          <UserTitle user={user}/>
          {window.innerWidth >= 660 && withdrawEstimatesButtonJSX}
        </div>
      </div>

      {singleComment.length > 0 ? <div className='rating__single-comment'>{singleCommentJSX}</div> : ''}
      {item.oPayload.sRequesterComment ?
        <div className='rating__single-comment'>
          <Comment comment={item.oPayload.sRequesterComment} textLength={100}/>
        </div> : ''}

      <div className='rating__columns'>
        {competences.length > 0 ?
          <div className="rating__column">
            <div className='rating__attributes'>
              <h4 className="rating__title">Компетенции</h4>
              {competencesJSX}</div>
          </div> : ''
        }

        {skills.length > 0 ?
          <div className="rating__column">
            <div className='rating__attributes'>
              <h4 className="rating__title">Проф. навыки</h4>
              {skillsJSX}</div>
          </div> : ''
        }

        {project.length > 0 ?
          <div className="rating__column rating__column--wide">
            <div className='rating__project'>{projectJSX}</div>
          </div> : ''
        }
      </div>
      {thankButton}
      {goToRequestButton}
      {window.innerWidth < 660 && <div className='rating__cancel-action'>{withdrawEstimatesButtonJSX}</div>}
    </div>;

  return (
    <>
      {rateItemJSX}
      {modalPopupJSX}

      <Modal
        closeIcon={<CloseIcon/>}
        centered={true}
        visible={showDeletePopup}
        footer={null}
        onCancel={closeDeletePopup}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={closeDeletePopup}>
          <DeletePopup
            title='Удаление'
            subtitle={subtitleText}
            onOk={confirmDelete} onCancel={closeDeletePopup}
          />
        </PopupMobileWrapper>
      </Modal>
    </>
  );
};

export default RateItem;
