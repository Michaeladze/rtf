import { handleActions } from 'redux-actions';
import {
  AddUserToInbox,
  AddUserToRequests,
  GetAssessmentsCount,
  GetInboxAll,
  GetInboxUsers
} from '../actions/users-inbox.action';
import { IUser } from './users-all.reducer';
import { GetThanksCount } from '../actions/thanks.action';

/** Интерефейс роли пользовтеля */
export interface IHomeLikes {
  /** Количество полученных Спасибо */
  aLikes: string[];
  /** Количество сказанных Спасибо */
  aLiked: string[];
}

/** Интерфейс количества отправленных и полученных "Спасибо" */
export interface IThanksOverview {
  oInputThanks: IThank;
  oOutputThanks: IThank;
}

/** Интерфейс объекта Спасибо */
export interface IThank {
  aUsers: string[];
  iCount: number;
}

/** Интерфейс тела запроса на получение всех Спасибо */
export interface IAllThanks {
  iPage: number;
  iSize: number;
  lId: number;
  sLoadOption: string;
}

/** Интерфейс тела запроса на добавление Спасибо за ОС */
export interface IAddThankBody {
  iPage?: number;
  iSize?: number;
  lCreationTime?: number;
  sId?: string;
  sPersonAssessmentId: string;
  sText: string;
}

/** Интерфейс тела запроса на добавление Спасибо за оценку достижения*/
export interface IAddThankForProjectBody {
  sProjectAssessmentId: string;
  sText: string;
}

/** Интерфейс входящих запросов и оценок */
export interface IIncomeAssessments {
  /** Количество запросов */
  iRequestCount: number;
  /** Юзер, от кого пришел запрос */
  oRequester: IUser;
}

/** Интерфейс количества входящих запросов и оценок */
export interface IAssessmentsCount {
  lInboxCount: number;
  lOutboxCount: number;
  sUserId?: string;
}

/** Тело запроса на получение всех входящих */
export interface IAllInboxBody {
  iPage: number;
  iSize: number;
  lId: number;
  sLoadOption: string;
}

/** Ответ запроса на получение всех входящих */
export interface IAllInboxResponse {
  aObjects: IUser[];
  iPage: number;
  iCount: number;
}

export interface IHomeState {
  collection: IThanksOverview;
  assessmentsCount: IAssessmentsCount;
  inboxParticipants: IUser[];
  inboxParticipantsLoaded: boolean;
  inbox: IAllInboxResponse;
  inboxLoaded: boolean;
  requests: IAllInboxResponse;
  requestsLoaded: boolean;
}

export interface IInboxReducerPayload {
  payload: {
    likes?: IThanksOverview;
    users?: IIncomeAssessments[];
    assessmentsCount?: IAssessmentsCount;
    addThanks?: IAddThankBody;
    inboxAll?: {
      list: IAllInboxResponse,
      type: string
    };
    addSocketUser?: IUser,
    addInboxUser: {
      user: IUser,
      type: string
    }
  };
}

const initialState: IHomeState = {
  collection: {
    oInputThanks: {
      aUsers: [],
      iCount: 0
    },
    oOutputThanks: {
      aUsers: [],
      iCount: 0
    }
  },
  assessmentsCount: {
    lInboxCount: 0,
    lOutboxCount: 0
  },
  inboxParticipants: [],
  inboxParticipantsLoaded: false,
  inbox: {
    aObjects: [],
    iCount: 0,
    iPage: 0
  },
  inboxLoaded: false,
  requests: {
    aObjects: [],
    iCount: 0,
    iPage: 0
  },
  requestsLoaded: false
};

const inboxReducer = handleActions(
  {
    [GetThanksCount.Success]: (
      state: IHomeState,
      action: IInboxReducerPayload
    ) => {
      return action.payload.likes
        ? {
          ...state,
          collection: action.payload.likes
        }
        : state;
    },

    [GetInboxUsers.Success]: (
      state: IHomeState,
      action: IInboxReducerPayload
    ) => {
      state.inboxParticipantsLoaded = true;

      return action.payload.users
        ? {
          ...state,
          inboxParticipants: action.payload.users.map((u) => ({
            ...u.oRequester,
            iIncomeRequests: u.iRequestCount
          }))
        }
        : state;
    },

    [GetInboxAll.Success]: (state: IHomeState, action: IInboxReducerPayload) => {
      if (action.payload.inboxAll) {
        if (action.payload.inboxAll.type === 'INBOX') {
          return {
            ...state,
            inbox: action.payload.inboxAll.list,
            inboxLoaded: true
          };
        } else {
          return {
            ...state,
            requests: action.payload.inboxAll.list,
            requestsLoaded: true
          };
        }
      }

      return { ...state };
    },

    [GetAssessmentsCount.Success]: (
      state: IHomeState,
      action: IInboxReducerPayload
    ) => {
      return action.payload.assessmentsCount
        ? {
          ...state,
          assessmentsCount: action.payload.assessmentsCount
        }
        : state;
    },
    /** Получаем юзера по сокетам. Добавляем на главный экран в Входящие */
    [AddUserToInbox.Success]: (state: IHomeState, action: IInboxReducerPayload) => {
      const _state = JSON.parse(JSON.stringify(state)) as IHomeState;

      if (action.payload.addInboxUser) {
        const flag = action.payload.addInboxUser.type === 'INBOX' ? state.inboxLoaded : state.requestsLoaded;

        if (flag) {
          const list = action.payload.addInboxUser.type === 'INBOX' ? _state.inbox.aObjects : _state.requests.aObjects;
          let index = -1;

          if (action.payload.addInboxUser.user && action.payload.addInboxUser.user.sUserId) {
            index = list.map((u) => u.sUserId).indexOf(action.payload.addInboxUser.user.sUserId);
          } else {
            return state;
          }


          if (index >= 0) {
            list.splice(index, 1);
            list.unshift(action.payload.addInboxUser.user);
            return _state;
          }

          if (action.payload.addInboxUser.type === 'INBOX') {
            return {
              ...state,
              inbox: {
                ...state.inbox,
                aObjects: [action.payload.addInboxUser.user, ...state.inbox.aObjects]
              }
            }
          }

          if (action.payload.addInboxUser.type === 'UNPROCESSED_REQUESTS') {
            return {
              ...state,
              requests: {
                ...state.requests,
                aObjects: [action.payload.addInboxUser.user, ...state.requests.aObjects]
              }
            }
          }
        }
      }


      return state;
    },

    /** Получаем юзера по сокетам. Добавляем на экран Входящие Запросы. Ставим количество запросов на 1 */
    [AddUserToRequests.Success]: (state: IHomeState, action: IInboxReducerPayload) => {
      const _state = JSON.parse(JSON.stringify(state)) as IHomeState;
      if (_state.inboxParticipantsLoaded && action.payload.addSocketUser) {

        const index = _state.inboxParticipants.map((u) => u.sUserId).indexOf(action.payload.addSocketUser.sUserId);

        if (index >= 0) {
          (_state.inboxParticipants[index].iIncomeRequests as number)++;
          return _state;
        }

        action.payload.addSocketUser.iIncomeRequests = 1;

        return {
          ...state,
          inboxParticipants: [action.payload.addSocketUser, ...state.inboxParticipants]
        }
      }

      return state;
    }
  },
  initialState
);

export default inboxReducer;
