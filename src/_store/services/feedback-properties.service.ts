import Axios from 'axios-observable';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IndexedDbLibService } from '../../_helpers/index-db';
import { IProvideFeedbackBody, IRequestFeedbackBody } from '../reducers/feedback-properties.reducer';

interface ICacheType {
  name: string;
  value: string;
}

/** Функция проверки данных в IndexedDb
 * @name - Название хранилища
 * @callback - Функция, которая вызывает сервис, если в хранилище нет данных
 * */
const findInDexie = (name: string, callback: Function) => {
  return new IndexedDbLibService('assessments').getFromDB([name]).pipe(
    switchMap((d: ICacheType[]) => {
      if (d && d[0] && d[0].value) {
        const result = JSON.parse(d[0].value);

        if (result && result.length > 0) {
          console.log(`Take data from Dexie [${name}]`);
          return of(result);
        }
      }
      console.log(`Take data from Service [${name}]`);
      return callback();
    })
  );
};

/** Сервис получения всех навыков */
export const getAllSkills = () => {
  return findInDexie('skills', () => {
    return Axios.post('skills/all', {}).pipe(
      map((data) => {
        new IndexedDbLibService('assessments').sendToDB([
          { name: 'skills', value: JSON.stringify(data.data) }
        ]);
        return data.data;
      })
    );
  });
};

/** Сервис получения рекомендованных навыков пользователя */
export const getRecommendedSkills = (userId: string) => {
  return Axios.post('skills/favorites', { sUserId: userId }).pipe(map((data) => data.data));
};

/** Сервис получения всех атрибутов компетенций */
export const getAllCompetences = () => {
  return findInDexie('competences', () => {
    return Axios.post(
      'attribute/getCompetencies',
      {}
    ).pipe(
      map((data) => {
        new IndexedDbLibService('assessments').sendToDB([
          { name: 'competences', value: JSON.stringify(data.data) }
        ]);

        return data.data;
      })
    );
  });
};

/** Сервис получения рекомендованных атрибутов компетенций */
export const getRecommendedCompetences = (userId: string) => {
  return Axios.post(
    'assessment/getRecommendedAttribute',
    { sUserId: userId }
  ).pipe(map((data) => {
    return data.data.map((item: any) => ({
      sId: item.sAttributeId,
      sName: item.sAttributeName,
      sCategoryId: item.sCategoryId
    }))
  }));
};

/** Сервис запроса на обратную связь */
export const requestFeedbackService = (body: IRequestFeedbackBody) => {
  return Axios.post('assessment/addRequest', body).pipe(
    map((data) => data.data)
  );
};

/** Сервис выдачи обратной связи */
export const provideFeedbackService = (body: IProvideFeedbackBody) => {
  return Axios.post('assessment/addAssessments', body).pipe(
    map((data) => data.data)
  );
};
