import { Action, handleActions } from 'redux-actions';
import { IUser } from './users-all.reducer';
import {
  ClearComparisonTable,
  SetComparisonFilter,
  SetComparisonPeriodFilter,
  SetUserForComparison
} from '../actions/comparison.action';
import { IAttributes } from './statisticsAll.reducer';
import { ISubordinate } from './team-info.reducer';

export interface IComparisonUser {
  user: IUser;
  info: ISubordinate;
  competences: IAttributes[];
}

export interface IComparisonState {
  collection: IComparisonUser[];
  activePeriod: string;
}

const initialState: IComparisonState = {
  collection: [],
  activePeriod: 'YEAR'
};

export interface IComparisonPayload {
  user?: IUser;
  comparisonUser: IComparisonUser;
  users?: IComparisonUser[];
  sDatePeriod?: string;
  clear?: boolean;
}

export const comparisonReducer = handleActions(
  {
    [ClearComparisonTable.Set]: (state: IComparisonState, action: Action<IComparisonPayload>) => {
      if (action.payload.clear) {
        return initialState
      }

      return state;
    },
    [SetComparisonPeriodFilter.Set]: (state: IComparisonState, action: Action<IComparisonPayload>) => {
      if (action.payload.sDatePeriod) {
        return {
          ...state,
          activePeriod: action.payload.sDatePeriod
        }
      }

      return state;
    },
    [SetUserForComparison.Success]: (state: IComparisonState, action: Action<IComparisonPayload>) => {
      if (action.payload.comparisonUser) {
        const data = action.payload.comparisonUser;
        let col = [...state.collection];
        const index = col.map(({ user }) => user.sUserId).indexOf(data.user.sUserId);

        if (index >= 0) {
          col = col.filter(({ user }) => user.sUserId !== data.user.sUserId);
        } else {
          col = [...col, data];
        }

        return {
          ...state,
          collection: col
        }
      }

      return state;
    },
    [SetComparisonFilter.Success]: (state: IComparisonState, action: Action<IComparisonPayload>) => {
      if (action.payload.users) {

        return {
          ...state,
          collection: action.payload.users,
          activePeriod: action.payload.sDatePeriod ? action.payload.sDatePeriod : state.activePeriod
        }
      }

      return state;
    }
  },
  initialState
);
