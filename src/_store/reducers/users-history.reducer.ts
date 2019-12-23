import { handleActions } from 'redux-actions';
import {
  ClearHistoryFlag,
  GetHistory,
  GetUserHistory,
  SetHistoryUsersFilter,
  UpdateAssessmentStatus
} from '../actions/users-history.action';
import { IUser } from './users-all.reducer';
import { IIncomeAssessmentDetails, IIncomeAssessmentsUser } from './users-request.reducer';
import { IPagination } from '../store.interface';

export interface IIncomeRatings {
  /** ID Юзера */
  sUserId: string;
  /** Входящие уведомления */
  aNotifications: IIncomeRatingItem[];
}

export interface IIncomeRatingItem {
  sDateTime: string;
  aCompetences?: ICompetence[];
  aProject?: IProject[];
}

/** Интерфейс Атрибута */
export interface ICompetence {
  sId: string;
  sName: string;
  aAttributes: IIndicator[];
  sType?: string;
}

/** Интерфейс индикатора */
export interface IIndicator {
  sId: string;
  sName: string;
  sCategoryId?: string;
  iRating?: number; // todo remove
  iGrade?: number | undefined | null;
  sComment?: string; // todo remove
  sDescription?: string;
  sRespondentComment?: string;
  sTitle?: string;

  sAssessmentId?: string;
  sCanNotAnswerType?: string;
  sCanNotAnswerText?: string;
}

/** Интерфейс проекта */
export interface IProject {
  sId: string;
  sName: string;
  iRating: number;
  sComment?: string;
  sTitle: string;
  sText: string;
}

/** Интерфейс для запроса на получение истории */
export interface IHistoryBody {
  iPage: number;
  iSize: number;
  sLoadOption: string;
  sUserId: string;
}

/** Интерфейс с историей */
export interface IHistory {
  iPage: number;
  iPagesCount: number;
  lItemsCount: number;
  oData: IIncomeAssessmentDetails[];
  sLoadOption: string;
}

/** Интерфейс запроса на изменение статуса */
export interface IUpdateStatusBody {
  sId: string;
  sStatus: string;
  sUserId: string;
}

/** Тело запроса на обновление статуса оценки проекта*/
export interface IUpdateProjectStatusBody {
  sId: string;
  sStatus: string;
  sUserId: string;
}

/** [NEW] Объект с историей  */
export interface IHistoryItem {
  sActivityType: string;
  oPayload: IIncomeAssessmentDetails;
}

export interface IUserHistoryState {
  users: IPagination<IUser>;
  usersLoaded: boolean;
  collection: {
    oData: IHistoryItem[];
    bHasNext: boolean;
    sLoadOption: string;
  };
}

interface IHistoryPayload {
  payload: {
    users?: IPagination<IIncomeAssessmentsUser>;
    history?: {
      oData: IHistoryItem[];
      bHasNext: boolean;
      sLoadOption: string;
    }
    assessment?: IUpdateStatusBody;
    userChanged?: boolean;
    clearHistory: boolean;
  };
}

const initialState: IUserHistoryState = {
  users: {
    aObjects: [],
    bHasNext: false
  },
  usersLoaded: false,
  collection: {
    oData: [],
    bHasNext: false,
    sLoadOption: 'ALL'
  }
};

export const usersHistoryReducer = handleActions(
  {
    [GetUserHistory.Success]: (state: IUserHistoryState, action: IHistoryPayload) => {
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

    [SetHistoryUsersFilter.Success]: (state: IUserHistoryState, action: IHistoryPayload) => {
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


    [GetHistory.Pending]: (state: IUserHistoryState, action: IHistoryPayload) => {
      if (action.payload.userChanged) {
        return {
          ...state,
          collection: {
            oData: [],
            bHasNext: false,
            sLoadOption: 'ALL'
          }
        }
      }

      return state;
    },

    [GetHistory.Success]: (state: IUserHistoryState, action: IHistoryPayload) => {
      if (action.payload.history) {
        if (state.collection.sLoadOption === action.payload.history.sLoadOption) {
          action.payload.history.oData = [...state.collection.oData, ...action.payload.history.oData];
        }

        return {
          ...state,
          collection: {
            ...action.payload.history
          }
        };
      }

      return state;
    },

    [UpdateAssessmentStatus.Success]: (state: IUserHistoryState, action: IHistoryPayload) => {
      if (action.payload.assessment) {
        const col = [...state.collection.oData];

        const index = col.map((a: IHistoryItem) => a.oPayload.sId).indexOf(action.payload.assessment.sId);

        if (index >= 0) {
          const copy = { ...col[index] };

          if (action.payload.assessment.sStatus === 'DELETED') {
            col.splice(index, 1);
          } else {
            copy.oPayload.sStatus = action.payload.assessment.sStatus;
            col[index] = copy;
          }
        }

        return {
          ...state,
          collection: {
            ...state.collection,
            oData: col
          }
        }
      }

      return state;
    },

    [ClearHistoryFlag.Set]: (state: IUserHistoryState, action: IHistoryPayload) => {
      if (action.payload.clearHistory) {
        return initialState;
      }

      return state;
    }
  },
  initialState
);
