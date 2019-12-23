import Axios from 'axios-observable';
import { map } from 'rxjs/operators';

/** Сервис получения количества благодарностей */
export const getThanksCount = () => {
  return Axios.post('assessment/thanks/getOverview', {}).pipe(
    map((data) => data.data)
  );
};

/** Сервис добавления благодарности для ОС*/
export const addThankForAssessment = (sPersonAssessmentId: string, sText: string) => {
  return Axios.post('assessment/thanks/add', {
    sPersonAssessmentId,
    sText
  }).pipe(map((data) => data.data));
};

/** Сервис добавления благодарности достижения */
export const addThankForProject = (sProjectAssessmentId: string, sText: string) => {
  return Axios.post('project/thanks/add', {
    sProjectAssessmentId,
    sText
  }).pipe(map((data) => data.data));
};
