import { Action, handleActions } from 'redux-actions';
import { EditRequestsRating } from '../actions/requestRating.action';
import { IIndicator } from './users-history.reducer';

export interface IRequestRatingState {
  collection: IIndicator[];
  loading: boolean;
}

const initialState: IRequestRatingState = {
  collection: [],
  loading: true
};

export const userRequestRatingReducer = handleActions(
  {
    [EditRequestsRating.Success]: (
      state: IRequestRatingState = initialState,
      action: Action<IIndicator[]>
    ) => {
      return {
        collection: action.payload,
        loading: true
      };
    }
  },
  initialState
);
