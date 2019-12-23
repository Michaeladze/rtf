import { createActions } from 'redux-actions';
import { IIndicator } from '../reducers/users-history.reducer';

/** Экшн получения рейтинга текущего пользователя */
export enum AddRequestsRating {
  Pending = '[Pending] Добавление оценки в входящих запросах',
  Success = '[Success] Добавление оценки в входящих запросах'
}

/** Экшн Редактирования рейтинга текущего пользователя */
export enum EditRequestsRating {
  Pending = '[Pending] Редактирование оценки в входящих запросах',
  Success = '[Success] Редактирование оценки в входящих запросах'
}

createActions({
  [EditRequestsRating.Pending]: undefined,
  [EditRequestsRating.Success]: (payload: IIndicator[]) => payload
});
