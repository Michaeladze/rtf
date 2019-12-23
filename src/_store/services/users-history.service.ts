import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { IHistoryBody, IUpdateProjectStatusBody, IUpdateStatusBody } from '../reducers/users-history.reducer';
import { IPaginationRequest } from '../store.interface';

/** Сервис получения пользователей в истории */
export const getHistoryUsers = (body: IPaginationRequest) => {
  return Axios.post('assessment/historyList', body).pipe(
    map((data) => data.data)
  );
};

/** Сервис получения истории */
export const getHistory = (body: IHistoryBody) => {
  return Axios.post('assessment/history', body).pipe(map((data) => data.data));
};

/** Изменение статуса оценки */
export const updateAssessmentStatus = (body: IUpdateStatusBody) => {
  return Axios.post('assessment/updateStatus', {
    sId: body.sId,
    sStatus: body.sStatus
  }).pipe(map((data) => data.data));
};

export const updateProjectAssessmentStatus = (body: IUpdateProjectStatusBody) => {
  return Axios.post('project/assessment/updateStatus', body).pipe(
    map((data) => {
      return data.data;
    })
  );
};
