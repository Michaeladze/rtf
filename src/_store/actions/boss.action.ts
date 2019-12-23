import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';

/** Получение руководителя текущего пользователя */
export enum GetBoss {
  Pending = '[Pending] Получение руководителя текущего пользователя',
  Success = '[Success] Получение руководителя текущего пользователя'
}

createActions({
  [GetBoss.Pending]: undefined,
  [GetBoss.Success]: (payload: { boss: IUser }) => payload
});
