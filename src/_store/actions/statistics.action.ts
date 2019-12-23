import { createActions } from 'redux-actions';
import { IAttributesStatistics, IAttributesStatisticsBody, IStatisticsBody } from '../reducers/statisticsAll.reducer';

export enum GetStatisticsSkills {
  Pending = '[Pending] Получение  Статистики по навыкам',
  Success = '[Success] Получение Статистики по навыкам'
}

export enum GetStatisticsSummary {
  Pending = '[Pending] Получение  Статистики боковой панели текущего пользователя',
  Success = '[Success] Получение Статистики боковой панели текущего пользователя'
}

export enum GetStatisticsCompetencies {
  Pending = '[Pending] Получение  Статистики по компетенциям',
  Success = '[Success] Получение Статистики по компетенциям'
}

export enum GetStatisticsAttributes {
  Pending = '[Pending] Получение атрибутов Статистики ',
  Success = '[Success] Получение атрибутов Статистики '
}

export enum SetActiveFilter {
  Success = '[Set] Устанавливаем активный фильтр по периоду'
}

export enum SetPropertyFilter {
  Success = '[Set] Фильтр значений по названию'
}

/** Экшн сброса флага загрузки */
export enum ClearLoadingFlag {
  Set = '[Set] Сброс флага загрузки'
}

/** Экшн для Статистики текущего пользователя */
createActions({

  [GetStatisticsCompetencies.Pending]: (payload: IStatisticsBody) => payload,
  [GetStatisticsCompetencies.Success]: (payload: any) => payload,

  [GetStatisticsSkills.Pending]: (payload: IStatisticsBody) => payload,
  [GetStatisticsSkills.Success]: (payload: any) => payload,

  [GetStatisticsSummary.Pending]: undefined,
  [GetStatisticsSummary.Success]: (payload: any) => payload,

  [GetStatisticsAttributes.Pending]: (payload: IAttributesStatisticsBody) => payload,
  [GetStatisticsAttributes.Success]: (payload: { attributes: IAttributesStatistics, id: string }) => payload,

  [SetActiveFilter.Success]: (payload: string) => payload,

  [SetPropertyFilter.Success]: (payload: string) => payload,

  [ClearLoadingFlag.Set]: (payload: { flag: boolean }) => payload
});
