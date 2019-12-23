/** Экшн получения роли текущего пользователя */
import { createActions } from 'redux-actions';
import {
  IAddThankBody, IAddThankForProjectBody,
  IThanksOverview
} from '../reducers/users-inbox.reducer';

export enum GetThanksCount {
  Pending = '[Pending] Получение лайков',
  Success = '[Success] Получение лайков'
}

export enum AddThank {
  Pending = '[Pending] Поблагодарить',
  Success = '[Success] Поблагодарить'
}

export enum AddThanksForProjectAssessment {
  Pending = '[Pending] Поблагодарить за оценку проекта',
  Success = '[Pending] Поблагодарить за оценку проекта'
}

createActions({
  [GetThanksCount.Pending]: undefined,
  [GetThanksCount.Success]: (payload: { likes: IThanksOverview }) => payload,

  [AddThank.Pending]: (payload: {
    sPersonAssessmentId: string;
    sText: string;
  }) => payload,
  [AddThank.Success]: (payload: { addThanks: IAddThankBody }) => payload,

  [AddThanksForProjectAssessment.Pending]: (payload: { sProjectAssessmentId: string; sText: string; }) => payload,
  [AddThanksForProjectAssessment.Success]: (payload: { addThanks: IAddThankForProjectBody }) => payload
});
