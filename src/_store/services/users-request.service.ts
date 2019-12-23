import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import {
  IAssessmentBody,
  IAssessmentResponseBody,
  IRequestMeta,
  IRequestsListPayload
} from '../reducers/users-request.reducer';
import { IInterviewResponse, ISPAssessment, ISPResponse } from '../interfaces/sberprofi.interface';

/** Получаем список запросов от пользователя */
export const getIncomeAssessmentsFromPerson = (body: IRequestsListPayload) => {
  return Axios.post('assessment/getIncomeAssessmentsFromPerson', body).pipe(map((data) => data.data));
};

/** Получаем запрос по id */
export const getItemIncomeAssessment = (body: IRequestMeta) => {
  return Axios.post('assessment/getItemIncomeAssessment', {
    sId: body.sId,
    sActivityType: body.sActivityType
  }).pipe(map((data) => data.data));
};

/** Сервис ответа на запрос обратной связи */
export const answerTheRequestService = (body: IAssessmentResponseBody) => {
  return Axios.post('assessment/addResponse', body).pipe(
    map((data) => data.data)
  );
};

/** Поставить оценку проекту */
export const addProjectAssessment = (body: IAssessmentBody) => {
  return Axios.post('project/assessment/add', body).pipe(
    map((data) => {
      return data.data;
    })
  );
};

// ====================================================================================================================
/** Сберпрофи и интервью */

/** Получить вопросы для коллег */
export const getUserEstimate = (sId: string) => {
  return Axios.post('profi/userEstimate/getUserEstimate', { sId }).pipe(map(({ data }) => data));
};

/** Сохранить ответ на запрос проф оценки */
export const saveEstimateResponse = (body: ISPResponse) => {
  return Axios.post('profi/userEstimate/saveEstimateResponse', body).pipe(map(({ data }) => data));
};

/** Ответить за запрос проф оценки */
export const sendEstimateResponse = (body: ISPResponse) => {
  return Axios.post('profi/userEstimate/sendEstimateResponse', body).pipe(map(({ data }) => data));
};

/** Сохранить ответ на запрос интервью */
export const saveInterviewResponse = (body: IInterviewResponse) => {
  return Axios.post('profi/interview/saveInterviewResponse', body).pipe(map(({ data }) => data));
};

/** Ответить за запрос интервью */
export const sendInterviewResponse = (body: IInterviewResponse) => {
  return Axios.post('profi/interview/sendInterviewResponse', body).pipe(map(({ data }) => data));
};

/** Не могу ответить за запрос профи */
export const canNotAnswerEstimate = (body: ISPAssessment) => {
  return Axios.post('profi/userEstimate/canNotAnswerEstimate', body).pipe(map(({ data }) => data));
};

/** Не могу ответить за запрос интервью */
export const canNotAnswerInterview = (body: ISPAssessment) => {
  return Axios.post('profi/interview/canNotAnswerInterview', body).pipe(map(({ data }) => data));
};

// ====================================================================================================================
