import { handleActions } from 'redux-actions';
import { IUser } from './users-all.reducer';
import { IPagination } from '../store.interface';
import { ClearTeamList, GetTeamInfo } from '../actions/team-info.action';

/** Интерфейс подчиненного */
export interface ISubordinate {
  aLastUsersId: string[];
  iCountUser: number;
  iInCount: number;
  iOutCount: number;
  oUser: IUser;
}

/** Интерефейс стейта */
export interface ITeamInfoState {
  collection: {
    aObjects: ISubordinate[];
    bHasNext: boolean;
    iTotalCount: number;
  };
  usersLoaded: boolean;
  activePeriod: string;
  sUserFIO: string;
}

/** Интерфейс запроса на получение информации */
export interface ITeamInfoBody {
  iPage?: number;
  iSize?: number;
  sDatePeriod: string;
  sUserFIO?: string;
  sUserId?: string;
}

export interface ITeamInfo extends IPagination<ISubordinate> {
  iTotalCount: number;
  activePeriod: string;
  sUserFIO: string;
}

interface ITeamInfoPayload {
  payload: {
    users?: ITeamInfo;
    activePeriod: string;
    clear?: boolean;
  };
}

const initialState: ITeamInfoState = {
  collection: {
    aObjects: [],
    bHasNext: false,
    iTotalCount: 0
  },
  usersLoaded: false,
  activePeriod: 'YEAR',
  sUserFIO: '',
};

export const teamInfoReducer = handleActions(
  {
    [GetTeamInfo.Success]: (state: ITeamInfoState, action: ITeamInfoPayload) => {
      state.usersLoaded = true;

      if (action.payload.users) {
        /** Копия общего колиества подчиненных */
        const totalCountCopy = action.payload.users.iTotalCount;

        /** Копия массива подчиненных */
        let aObjectsCopy = [...state.collection.aObjects];
        if (action.payload.users.aObjects) {

          if (action.payload.users.sUserFIO.length === 0 && state.sUserFIO.length === 0) {
            aObjectsCopy = (state.activePeriod === action.payload.users.activePeriod) ?
              [...state.collection.aObjects, ...action.payload.users.aObjects] : action.payload.users.aObjects;
          } else {
            aObjectsCopy = action.payload.users.aObjects;
          }

        } else {
          aObjectsCopy = [];
        }

        /** Копия активного периода */
        const activePeriodCopy = action.payload.users.activePeriod;

        /** Копия поля поиска */
        const sUserFIOCopy = action.payload.users.sUserFIO;

        return {
          ...state,
          collection: {
            aObjects: aObjectsCopy,
            bHasNext: action.payload.users.bHasNext,
            iTotalCount: totalCountCopy
          },
          activePeriod: activePeriodCopy,
          sUserFIO: sUserFIOCopy
        };
      }
      return state;
    },

    [ClearTeamList.Set]: (state: ITeamInfoState, action: ITeamInfoPayload) => {
      if (action.payload.clear) {
        return {
          ...state,
          collection: {
            aObjects: [],
            bHasNext: false,
            iTotalCount: 0
          },
          usersLoaded: false
        }
      }

      return state;
    }
  },
  initialState
);
