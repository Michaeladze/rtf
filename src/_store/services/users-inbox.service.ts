import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { IAllInboxBody } from '../reducers/users-inbox.reducer';
import { IPaginationRequest } from '../store.interface';

/** Получение списка входящих */
export const getIncomeAll = (body: IAllInboxBody) => {
  return Axios.post('relation/allIncome', body).pipe(
    map((data) => data.data)
  );
};

/** Получение списка пользователей с входящими запросами на оценку */
export const getIncomeAssessments = (body: IPaginationRequest) => {
  return Axios.post('assessment/getIncomeAssessments', body).pipe(
    map((data) => data.data)
  );
};

/** Получение количества всех запросов и оценок */
export const getAssessmentsCount = () => {
  return Axios.post('assessment/getCount', {}).pipe(map((data) => data.data));
};

/** Получение количества всех запросов и оценок по пользователю */
export const getAssessmentsByIdCount = (sUserId: string) => {
  return Axios.post('assessment/getCountByUser', [{ sUserId }]).pipe(
    map((data) => data.data)
  );
};
