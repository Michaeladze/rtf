import React, { useEffect, useState } from 'react';
import StandardButton from '../../../../components/StandardButton/StandardButton';
import './RequestFeedback.scss';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal';
import { IIndicator } from '../../../../_store/reducers/users-history.reducer';
import { ReactComponent as CloseIcon } from '../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import { animateExit, customEqual } from '../../../../_helpers/helpers';
import ActionPopup from '../../../_shared/ActionPopup/ActionPopup';
import { IStore, IStringMap } from '../../../../_store/store.interface';
import {
  AddProjectAssessment,
  AnswerUserRequest,
  GetItemIncomeAssessment
} from '../../../../_store/actions/users-request.action';
import { IRequest, IRequestMeta } from '../../../../_store/reducers/users-request.reducer';
import RequestAttributeList from './RequestAttributeList/RequestAttributeList';
import { UpdateAssessmentStatus, UpdateProjectAssessmentStatus } from '../../../../_store/actions/users-history.action';
import RequestFeedbackUser from './RequestFeedbackUser/RequestFeedbackUser';
import ProjectRequest from './ProjectRequest';
import useReactRouter from 'use-react-router';
import InterviewRequest from './InterviewRequest/InterviewRequest';
import ProfiRequest from './ProfiRequest/ProfiRequest';

const RequestFeedback = () => {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  /** Получение мета данных активного запроса*/
  const activeAssessmentMeta: IRequestMeta | null = useSelector(
    (store: IStore) => store.userRequest.activeAssessmentMeta);

  /** Получение активного запроса*/
  const activeAssessment = useSelector(
    (store: IStore) => store.userRequest.selection, customEqual) as (IRequest | null);

  /** Запрашиваем Запрос по id */
  useEffect(() => {
    if (activeAssessmentMeta) {
      dispatch({ type: GetItemIncomeAssessment.Pending, payload: activeAssessmentMeta })
    }
  }, [activeAssessmentMeta, dispatch]);

  /** Получение комптенеций */
  const attributes: IIndicator[] | [] = useSelector(
    (store: IStore) => store.userRequest.attributes, customEqual);

  /** Получение навыков */
  const skills: IIndicator[] | [] = useSelector(
    (store: IStore) => store.userRequest.skills, customEqual);

  /** Получение достижения */
  const projects: IIndicator[] | [] = useSelector(
    (store: IStore) => store.userRequest.projects, customEqual);

  /** Меняем статус запроса на READ */
  useEffect(() => {
    if (activeAssessmentMeta && activeAssessment && activeAssessment.oPayload.sStatus === 'CREATED') {
      dispatch({
        type: activeAssessmentMeta.sActivityType === 'ASSESSMENT' ?
          UpdateAssessmentStatus.Pending : UpdateProjectAssessmentStatus.Pending,
        payload: {
          sId: activeAssessmentMeta.sId,
          sStatus: 'READ',
          sUserId: activeAssessment.oPayload.sRequesterId
        }
      });
    }
  }, [dispatch, activeAssessmentMeta, activeAssessment]);


  useEffect(() => {
    return () => {
      // dispatch({ type: ClearAssessmentsLoadedFlag.Set, payload: { clearAssessments: true } });
    }
  }, []);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Popup Если не все оценили
   ---------------------------------------------------------------------------------------------------------------------- */
  const [showCanNotRatePopup, toggleCanNotRatePopup] = useState(false);

  const handleCanNotRateCancel = () => {
    animateExit(() => toggleCanNotRatePopup(false));
  };

  /** Текст в попапе в зависимости от типа запроса */
  const titleText = activeAssessmentMeta && activeAssessmentMeta.sActivityType === 'ASSESSMENT' ?
    'Вы оценили не все атрибуты' : 'Вы не оценили достижение';

  const canNotRateJSX = (
    <Modal
      closeIcon={<CloseIcon/>}
      visible={showCanNotRatePopup}
      footer={null}
      onCancel={handleCanNotRateCancel}
      width={470}
      className='custom-modal'>
      <PopupMobileWrapper handleClose={handleCanNotRateCancel}>
        <ActionPopup titleText={titleText}>
          <StandardButton value={'Продолжить'} type='primary' handler={handleCanNotRateCancel}/>
        </ActionPopup>
      </PopupMobileWrapper>
    </Modal>
  );

  const submitForm = () => {
    if (activeAssessment) {
      if (activeAssessment.sActivityType === 'ASSESSMENT') {
        if ([...attributes, ...skills].some((e) => !e.iGrade && e.iGrade !== null)) {
          toggleCanNotRatePopup(true);
        } else {
          const body = {
            sId: activeAssessment && activeAssessment.oPayload.sId,
            sRespondentComment: '',
            aPersonAssessmentItem: (attributes as IIndicator[]).map((e: IIndicator) => ({
              sId: e.sAssessmentId,
              oAttributeToCategory: {
                sAttributeId: e.sId,
                sCategoryId: e.sCategoryId
              },
              iGrade: e.iGrade === undefined ? null : e.iGrade,
              sRespondentComment: e.sRespondentComment || '',
              sCanNotAnswerType: e.sCanNotAnswerType || '',
              sCanNotAnswerText: e.sCanNotAnswerText || ''
            })),
            aPersonAssessmentSkillItem: (skills as IIndicator[]).map((e: IIndicator) => ({
              sId: e.sAssessmentId,
              oSkills: {
                sId: e.sId
              },
              iGrade: e.iGrade === undefined ? null : e.iGrade,
              sRespondentComment: e.sRespondentComment || '',
              sCanNotAnswerType: e.sCanNotAnswerType || '',
              sCanNotAnswerText: e.sCanNotAnswerText || ''
            }))
          };

          dispatch({ type: AnswerUserRequest.Pending, payload: { body, sUserId: match.url.split('/')[2] } });
        }

      } else if (activeAssessment.sActivityType === 'PROJECT') {
        if (projects.some((e) => !e.iGrade && e.iGrade !== null)) {
          toggleCanNotRatePopup(true);
        } else {
          const bodyProjectAssessment = {
            sId: activeAssessment && activeAssessment.oPayload.sId,
            sRespondentComment: projects[0].sRespondentComment || '',
            iGrade: projects[0].iGrade === undefined ? null : projects[0].iGrade,
            sCanNotAnswerType: projects[0].sCanNotAnswerType || '',
            sCanNotAnswerText: projects[0].sCanNotAnswerText || ''
          };

          dispatch({
            type: AddProjectAssessment.Pending, payload: {
              body: bodyProjectAssessment,
              sUserId: match.url.split('/')[2]
            }
          });
        }
      }
    }
  };

  /** Атрибуты/навыки для оценки */
  const assessmentItems = (
    <>
      {attributes && <RequestAttributeList groupTitle='Компетенции' type='attributes' items={attributes}/>}
      {skills && <RequestAttributeList groupTitle='Проф. навыки' type='skills' items={skills}/>}
    </>
  );

  /** Проект для оценки */
  const projectItem = projects && projects.length > 0 && <ProjectRequest project={projects[0]}/>;

  /** Атрибуты и навыки */
  const listsJSX = activeAssessment ?
    <div className='income-request-mobile'>
      <RequestFeedbackUser/>

      <form className='request-feedback__list'>
        {activeAssessment.sActivityType === 'ASSESSMENT' ? assessmentItems : projectItem}

        <div className='request-feedback__button'>
          <StandardButton type={'primary'} value={'Отправить'} handler={submitForm}/>
        </div>
      </form>

      {canNotRateJSX}
    </div> : <p className='info-tip'>Вы ответили на все запросы</p>;

  const components: IStringMap<any> = {
    'ASSESSMENT': listsJSX,
    'PROJECT': listsJSX,
    'INTERVIEW': <InterviewRequest/>,
    'SBERPROFI': <ProfiRequest/>
  };

  return <>{activeAssessment && components[activeAssessment.sActivityType]}</>;
};

export default RequestFeedback;
