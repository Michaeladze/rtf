import { handleActions } from 'redux-actions';
import { GetAllUsers } from '../actions/users-all.action';

/** Интерфейс пользователя */
export interface IUser {
  /** ID пользователя */
  sUserId: string;
  /** Имя */
  sFirstName: string;
  /** Отчество */
  sMiddleName?: string;
  /** Фамилия */
  sLastName: string;
  /** Полное имя */
  sFullName: string;
  /** Должность */
  sTitle?: string;
  /** Функциональный блок */
  sStructure?: string;
  /** Рейтинг */
  iRating?: number;
  /** Тип */
  bIsPinned?: boolean;
  /** я ли это?*/
  bIsMe?: boolean;
  /** Принадлежность к команде текущего пользователя */
  bIsMyTeam?: boolean;
  sIncomeComment?: string;
  /** Фото */
  sPhoto?: string;
  /** Статус (прочитано, просмотрено и тп) */
  sStatus?: string;
  /** Число входящих оценок */
  iIncomeRates?: number;
  /** Число входящих запросов */
  iIncomeRequests?: number;
  /** Входящие или исходящие оценки, true - входящие, false - исходящие */
  bTypeEstimate?: boolean;
  /** Функциональный блок */
  sExtidFblock?: string;
}

/** oSearchResult в поиске */
export interface ISearch {
  sScore: number;
  oUserData: {
    sPersonID: string;
    sTitleID: string;
    sOrgunitID: string;
    sPersonSFID: string;
    sPersonLastName: string;
    sPersonFirstName: string;
    sPersonMiddleName: string;
    sEmailSigma: string;
    sEmailAlpha: string;
    sPersonPhotoLink: string;
    sSberChatLink: string;
    bPersonSex: boolean;
    iPositionNormalizedGrade: number;
    sTitleFullGrade: string;
    sPositionName: string;
    sTitleFullName: string;
    sOrgunitCode: string;
    sOrgunitSubordination: string;
    sFunctionalBlock: string;
    bOrgunitIsRemote: boolean;
    sOrgunitCity: string;
  };
}

/** Результат поиска */
export interface ISearchResult {
  iSearchResultSize: number;
  oSearchResult: ISearch[];
  sStatus: string;
}

export interface IAllUsersState {
  collection: IUser[];
  selection: IUser | undefined;
  loaded: boolean;
}

export interface IUsersReducerPayload {
  payload: {
    users?: IUser[];
    currentUser?: IUser;
    userId?: string;
  };
}

const initialState: IAllUsersState = {
  collection: [],
  selection: undefined,
  loaded: false
};

/** Редьюсер получения списка всех существующих пользователей */
const usersAllReducer = handleActions(
  {
    [GetAllUsers.Success]: (
      state: IAllUsersState,
      action: IUsersReducerPayload
    ) => {
      if (action.payload.users) {
        return {
          ...state,
          collection: action.payload.users,
          loaded: true
        };
      }
      return state;
    }
  },
  initialState
);

export default usersAllReducer;
