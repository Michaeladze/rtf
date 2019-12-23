import { Action, handleActions } from 'redux-actions';
import {
  AnswerUserRequest,
  ClearAssessmentsLoadedFlag,
  GetIncomeAssessmentsFromPerson,
  GetItemIncomeAssessment,
  GetUserEstimate,
  GetUsersWithRequest,
  SendEstimateResponse,
  SendInterviewResponse,
  SetActiveRequest,
  SetIncomeRequestsUsersFilter
} from '../actions/users-request.action';
import { IAssessmentItemBody } from './feedback-properties.reducer';
import { IUser } from './users-all.reducer';
import { IPagination, IPaginationRequest } from '../store.interface';
import { SetActiveUser } from '../actions/users.action';
import { IIndicator } from './users-history.reducer';
import { IInterviewQuestion, IInterviewRequestResponse, ISPRequestResponse } from '../interfaces/sberprofi.interface';

export interface IIncomeAssessmentDetails {
  sId: string;
  sPersonRelationId: string;
  sRequesterId: string;
  sRespondentId: string;
  lCreationTime: number;
  lResponseTime?: number;
  lLastModifiedTime?: number;
  sRequesterComment: string;
  sRespondentComment?: string;
  sStatus: string;
  bIsSetThanks: boolean;
  aPersonAssessmentItem: IIncomeAssessmentItem[];
  aPersonAssessmentSkillItem: IIncomeAssessmentItem[];
  oProject: IProject;
  iGrade?: number;
  sCanNotAnswerType?: string;
}

/** Общий интерфейс для навыков и атрибутов */
export interface IIncomeAssessmentItem {
  sId: string;
  bActive: boolean;
  sPersonAssessmentId: string;
  oSkill?: IAssessmentSkill;
  oAttributeToCategory?: IAssessmentAttribute;
  sRespondentComment?: string;
  sRequesterComment?: string;
  iGrade?: number;
  sCanNotAnswerType?: string;
  sCanNotAnswerText?: string;
  sType?: string;

  sDescription?: string; // проекты
  sName?: string; // проекты
}

/** Интерфейс для объекта атрибутов внутри IIncomeAssessmentItem */
export interface IAssessmentAttribute {
  sAttributeId: string;
  sCategoryId: string;
  sName?: string;
}

/** Интерфейс для объекта навыков внутри IIncomeAssessmentItem */
export interface IAssessmentSkill {
  sId: string;
  sName?: string;
}

export interface IProject {
  /** ID проекта */
  sId: string;
  /** ID создателя проекта */
  sRequesterId: string;
  /** Дата создания проекта */
  lCreationTime: number;
  /** Описание проекта */
  sDescription: string;
  /** Название проекта*/
  sName: string;
  /** Статус проекта */
  sStatus?: string;
  /** Средняя оценка */
  fAverageGrade?: number;
  /** количество оценивших пользователей (кроме 3 указанных выше) */
  iCountUser?: number;
  sPersonAssessmentId: string;
  bActive: boolean;
}

/** Массив оценок проекта */
export interface IAssessment {
  /** ID оценки проекта*/
  sId: string;
  /** ID проекта */
  sProjectId: string;
  /** Имя оценщика */
  sFirstName: string;
  /** Отчество оценщика */
  sMiddleName: string;
  /** Фамилия оценщика */
  sLastName: string;
  /** ФИО оценщика */
  sFullName: string;
  /** Должность оценщика */
  sTitle: string;
  /** Величина оценки */
  iGrade: number;
  /** Статус активности оценки */
  bActive: boolean;
  /** Комментарий оценщика */
  sRespondentComment: string;
  /** ID оценщика */
  oRespondent: IProjectRespondent;
  /** Роль оценщика [СOLLEAGUE, BOSS, ME] */
  sRole: string;
  /** Дата обновления оценки */
  lLastModifiedTime: number;
  /** Статус */
  sStatus: string;
  /** Комментарий к причине невозможности ответа на оценку */
  sCanNotAnswerType: string;
  /** Причина невозможности ответа на оценку */
  sCanNotAnswerText: string;
}

export interface IProjectRespondent {
  sUserId: string;
  sFirstName: string;
  sMiddleName?: string;
  sLastName: string;
  sFullName: string;
  sPhoto?: string;
  sTabnum?: string;
  sGender?: string;
  sTitle?: string;
}

export interface IAssessmentResponseBody {
  sId: string;
  sRespondentComment: string;
  aPersonAssessmentItem: IAssessmentItemBody[];
  aPersonAssessmentSkillItem: IAssessmentItemBody[];
}

export interface IUserRequestsPayload {
  details?: IPagination<IRequestMeta>;
  assessment?: IRequest;
  assessmentToRemove?: string;
  addAssessment?: AddUserRequestBody;

  users?: IPagination<IIncomeAssessmentsUser>; // Список юзеров сбоку
  activeAssessmentMeta: IRequestMeta; // Мета данные текущего запроса
  sUserId?: string;

  clearAssessments?: boolean;
  questions?: IInterviewQuestion[]
}

export interface AddUserRequestBody {
  assessment: IIncomeAssessmentDetails;
  userId: string;
}

/** [NEW] getIncomeAssessments  */
export interface IIncomeAssessmentsUser {
  oRequester: IUser;
  iRequestCount: number;
}

/** [NEW] getIncomeAssessmentsFromPerson  */
export interface IRequestsListPayload extends IPaginationRequest {
  sUserId: string;
}

/** [NEW] Список запросов  */
export interface IRequestMeta {
  sId: string;
  sActivityType: string;
  lDate: number;
}

/** [NEW] Запрос  */
export interface IRequest {
  sActivityType: string;
  oPayload: IIncomeAssessmentDetails;
}

/** Тело запроса оценки проекта*/
export interface IAssessmentBody {
  sId: string;
  sRespondentComment: string;
  iGrade: number;
}

export interface IUserRequestState {
  users: IPagination<IUser>;
  usersLoaded: boolean;

  collection: IPagination<IRequestMeta>;
  assessmentsLoaded: boolean;
  selection: IRequest | ISPRequestResponse | IInterviewRequestResponse | null;

  attributes: IIndicator[] | [];
  skills: IIndicator[] | [];
  projects: IIndicator[] | [];
  activeAssessmentMeta: IRequestMeta | null;

  questions: IInterviewQuestion[];
}

const initialState: IUserRequestState = {
  users: {
    aObjects: [],
    bHasNext: false
  },
  usersLoaded: false,
  collection: {
    aObjects: [],
    bHasNext: false
  },
  assessmentsLoaded: false,
  selection: null,
  attributes: [],
  skills: [],
  projects: [],
  activeAssessmentMeta: null,
  questions: []
};

export const userRequestReducer = handleActions(
  {
    // USERS **********************************************************************************************************

    [GetUsersWithRequest.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      state.usersLoaded = true;
      if (action.payload.users) {
        return {
          ...state,
          users: {
            aObjects: [...state.users.aObjects,
              ...action.payload.users.aObjects.map((u) => ({
                ...u.oRequester,
                iIncomeRequests: u.iRequestCount
              }))],
            bHasNext: action.payload.users.bHasNext
          }
        };
      }

      return state;
    },

    // Set Filter *****************************************************************************************************

    [SetIncomeRequestsUsersFilter.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      state.usersLoaded = true;
      if (action.payload.users) {
        return {
          ...state,
          users: {
            aObjects: [...action.payload.users.aObjects.map((u) => ({
              ...u.oRequester,
              iIncomeRequests: u.iRequestCount
            }))],
            bHasNext: action.payload.users.bHasNext
          }
        };
      }

      return state;
    },

    // Запросы ********************************************************************************************************

    // [GetIncomeAssessmentsFromPerson.Pending]: (state: IUserRequestState) => ({
    //   ...state,
    //   collection: {
    //     aObjects: [],
    //     bHasNext: false
    //   }
    // }),

    [GetIncomeAssessmentsFromPerson.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      state.assessmentsLoaded = true;
      // debugger
      if (action.payload.details) {
        return {
          ...state,
          collection: {
            aObjects: [...state.collection.aObjects, ...action.payload.details.aObjects],
            bHasNext: action.payload.details.bHasNext
          }
        };
      }

      return state;
    },

    [GetItemIncomeAssessment.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      let attributesCopy = [...state.attributes];
      let skillsCopy = [...state.skills];
      let projectsCopy = [...state.projects];

      if (action.payload.assessment) {
        // Компетенции
        if (action.payload.assessment.oPayload.aPersonAssessmentItem) {
          attributesCopy = action.payload.assessment.oPayload.aPersonAssessmentItem.map((e) => {
            const attribute = e.oAttributeToCategory as IAssessmentAttribute;
            return {
              sAssessmentId: e.sId,
              sId: attribute.sAttributeId,
              sCategoryId: attribute.sCategoryId,
              sName: '',
              iGrade: undefined
            };
          });
        }

        // Навыки
        if (action.payload.assessment.oPayload.aPersonAssessmentSkillItem) {
          skillsCopy = action.payload.assessment.oPayload.aPersonAssessmentSkillItem.map((e) => {
            const skill = e.oSkill as IAssessmentSkill;

            return {
              sAssessmentId: e.sId,
              sId: skill.sId,
              sName: '',
              iGrade: undefined
            };
          });
        }

        // Проект
        if (action.payload.assessment.oPayload.oProject && state.activeAssessmentMeta) {
          projectsCopy = [{
            sAssessmentId: state.activeAssessmentMeta.sId,
            sId: action.payload.assessment.oPayload.oProject.sId,
            sName: action.payload.assessment.oPayload.oProject.sName,
            sDescription: action.payload.assessment.oPayload.oProject.sDescription,
            iGrade: undefined
          }];
        }

        return {
          ...state,
          selection: action.payload.assessment,
          attributes: attributesCopy,
          skills: skillsCopy,
          projects: projectsCopy
        };
      }

      return state;
    },

    [SetActiveRequest.Set]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      if (action.payload.activeAssessmentMeta) {
        return {
          ...state,
          activeAssessmentMeta: action.payload.activeAssessmentMeta
        };
      }

      return state;
    },

    [AnswerUserRequest.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      const colObj = { ...state.collection };
      if (action.payload.assessmentToRemove) {
        colObj.aObjects = colObj.aObjects.filter((e) => e.sId !== action.payload.assessmentToRemove);

        return {
          ...state,
          collection: colObj,
          selection: colObj.aObjects.length !== 0 ? state.selection : null
        };
      }

      return state;
    },

    /** Изменяем количество ОС у пользователя в списке */
    [SetActiveUser.Success]: (state: IUserRequestState, action: Action<any>) => {
      if (action.payload.previousUser) {
        const user = action.payload.previousUser;
        const index = state.users.aObjects.map((u) => u.sUserId).indexOf(user.sUserId);
        if (index >= 0) {
          const tmp = { ...state.users.aObjects[index] };
          if (tmp.iIncomeRequests) {
            tmp.iIncomeRequests = user.iIncomeRequests as number;
            state.users.aObjects[index] = tmp;

            /** Убираем участника, если кол-во запросов 0 */
            if (tmp.iIncomeRequests <= 0) {
              state.users.aObjects = [...state.users.aObjects].filter((u) => !!u.iIncomeRequests);
            }
          }
        }
      }

      return state;
    },
    [ClearAssessmentsLoadedFlag.Set]: (state: IUserRequestState, action: Action<any>) => {
      if (action.payload.clearAssessments) {
        return {
          ...state,
          collection: {
            aObjects: [],
            bHasNext: false
          },
          assessmentsLoaded: false
        };
      }

      return state;
    },

    [GetUserEstimate.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
      if (action.payload.questions) {
        return {
          ...state,
          questions: action.payload.questions
        };
      }

      return state;
    },

    [SendEstimateResponse.Success]: (state: IUserRequestState) => ({
      ...state,
      questions: []
    }),
    [SendInterviewResponse.Success]: (state: IUserRequestState) => ({
      ...state,
      questions: []
    })
    //
    // [AddUserRequest.Success]: (state: IUserRequestState, action: Action<IUserRequestsPayload>) => {
    //   if (action.payload.addAssessment && state.collection.length > 0 &&
    //     action.payload.addAssessment.userId === state.collection[0].sRequesterId) {
    //     /** Если запрос пришел от текущего юзера, добавляем его ему */
    //     return {
    //       ...state,
    //       collection: [action.payload.addAssessment.assessment, ...state.collection]
    //     }
    //   }
    //
    //   return state;
    // }
  },
  initialState
);
