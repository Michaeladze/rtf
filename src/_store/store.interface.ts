import { IMessageState } from './reducers/message.reducer';
import { IHomeState } from './reducers/users-inbox.reducer';
import { IRecentUsersState } from './reducers/users-recent.reducer';
import { IMyTeamState } from './reducers/users-team.reducer';
import { IUserHistoryState } from './reducers/users-history.reducer';
import { IPropertiesState } from './reducers/feedback-properties.reducer';
import { IUsersState } from './reducers/users.reducer';
import { IFavouriteUsersState } from './reducers/users-favourite.reducer';
import { IUserRequestState } from './reducers/users-request.reducer';
import { IAllUsersState } from './reducers/users-all.reducer';
import { IRequestRatingState } from './reducers/requestRating.reducer';
import { IStatisticsState } from "./reducers/statisticsAll.reducer";
import { IBossState } from './reducers/boss.reducer';
import { IComparisonState } from './reducers/comparison.reducer';
import { ISubordinateState } from './reducers/subordinates.reducer';
import { ITeamInfoState } from './reducers/team-info.reducer';

export interface IStore {
  inboxReducer: IHomeState;
  allUsers: IAllUsersState;
  favouriteUsers: IFavouriteUsersState;
  userHistory: IUserHistoryState;
  myTeam: IMyTeamState;
  properties: IPropertiesState;
  recentUsers: IRecentUsersState;
  userRequest: IUserRequestState;
  users: IUsersState;
  userRequestRating: IRequestRatingState;
  message: IMessageState;
  statisticsAll: IStatisticsState;
  boss: IBossState;
  comparison: IComparisonState;
  subordinates: ISubordinateState;
  teamInfo: ITeamInfoState;
}

/** Common interfaces */

/** Хеш таблица */
export interface IStringMap<T> {
  [key: string]: T;
}

/** Пагинация */
export interface IPagination<T> {
  aObjects: T[];
  bHasNext: boolean;
}

/** Запрос для пагинации */
export interface IPaginationRequest {
  /** Количество запрашиваемых айтемов */
  iSize: number;
  /** Номер страницы */
  iPage: number;
  /** Запрос поиска по имени */
  sUserFIO?: string;
}
