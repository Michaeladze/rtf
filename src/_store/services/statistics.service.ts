import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { IAttributesStatisticsBody, IStatisticsBody } from '../reducers/statisticsAll.reducer';

/** Сервис получения статистики компетенций*/
export const getStatisticsForCompetencies = (body: IStatisticsBody) => {
  return Axios.post('assessment/getStatisticsForCompetencies', body).pipe(
    map((data) => {
      return data.data
    })
  );
};

/** Сервис получения статистики навыков*/
export const getSkillStatistics = (body: IStatisticsBody) => {
  return Axios.post('assessment/getSkillStatistics', body).pipe(
    map((data) => {
      return data.data
    })
  );
};

/** Сервис получения статистики навыков*/
export const getStatisticsSummary = () => {
  return Axios.post('assessment/getStatisticsSummary', {}).pipe(
    map((data) => {
      return data.data
    })
  );
};

/** Сервис получения статистики атрибутов*/
export const getItemsForAttributeStatistic = (body: IAttributesStatisticsBody) => {
  return Axios.post('assessment/getItemsForAttributeStatistic', body).pipe(
    map((data) => {
      return data.data
    })
  );
};

/** Сервис получения статистики оценок навыков */
export const getItemsForSkillStatistic = (body: IAttributesStatisticsBody) => {
  return Axios.post('assessment/getItemsForSkillStatistics', body).pipe(
    map((data) => {
      return data.data
    })
  );
};
