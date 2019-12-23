import { handleActions } from 'redux-actions';
import { IUser } from './users-all.reducer';
import {
  FilterActiveList,
  GetMe,
  SetActiveUser,
  SetCurrentUser,
  UpdateAssessmentsCount
} from '../actions/users.action';

/** Интерфейс стейта для текущего пользователя */
export interface IUsersState {
  me: IUser | null;
  meLoaded: boolean;
  currentUser: IUser | null;
  activeUser: IUser | null;
  searchInput: string;
}

export interface IUsersPayload {
  payload: {
    currentUser?: IUser;
    meUser?: IUser;
    searchInput?: string;
  };
}

const initialState: IUsersState = {
  me: null,
  meLoaded: false,
  currentUser: null,
  activeUser: null,
  searchInput: ''
};

/** Редьюсер получения текущего пользователя */
const usersReducer = handleActions(
  {
    [GetMe.Success]: (state: IUsersState, action: IUsersPayload) => {
      if (action.payload.meUser) {
        return {
          ...state,
          me: action.payload.meUser,
          meLoaded: true
        };
      }
      return state;
    },

    [SetCurrentUser.Success]: (state: IUsersState, action: IUsersPayload) => {
      if (action.payload.currentUser) {
        return {
          ...state,
          currentUser: action.payload.currentUser
        };
      }
      return state;
    },

    [UpdateAssessmentsCount.Success]: (state: IUsersState, action: IUsersPayload) => {
      if (state.activeUser) {
        let { iIncomeRequests } = state.activeUser;
        if (state.activeUser.iIncomeRequests && state.activeUser.iIncomeRequests > 0) {
          iIncomeRequests = iIncomeRequests && iIncomeRequests - 1;
        }

        return {
          ...state,
          activeUser: {
            ...state.activeUser,
            iIncomeRequests
          }
        };
      }

      return state;
    },

    [SetActiveUser.Success]: (state: IUsersState, action: IUsersPayload) => {
      if (action.payload.currentUser || action.payload.currentUser === null) {
        return {
          ...state,
          activeUser: action.payload.currentUser
        };
      }
      return state;
    },

    [FilterActiveList.Success]: (state: IUsersState, action: IUsersPayload) => {
      if (action.payload.searchInput !== undefined) {
        return {
          ...state,
          searchInput: action.payload.searchInput
        }
      }

      return state;
    }
  },
  initialState
);

export default usersReducer;
