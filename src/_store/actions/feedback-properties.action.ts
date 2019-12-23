import { createActions } from 'redux-actions';
import { ICompetence, IIndicator } from '../reducers/users-history.reducer';
import { IProvideFeedbackBody, IRequestFeedbackBody } from '../reducers/feedback-properties.reducer';

/** Экшн получения списка всех компетенций */
export enum GetAllCompetences {
  Pending = '[Pending] Получение списка всех компетенций',
  Success = '[Success] Получение списка всех компетенций'
}

/** Экшн получения списка рекомендуемых атрибутов  */
export enum GetRecommendedAttributes {
  Pending = '[Pending] Получение списка рекомендуемых атрибутов',
  Success = '[Success] Получение списка рекомендуемых атрибутов'
}

/** Экшн получения списка всех навыков */
export enum GetAllSkills {
  Pending = '[Pending] Получение списка всех навыков',
  Success = '[Success] Получение списка всех атрибутов навыков'
}

/** Экшн получения списка рекомендуемых навыков  */
export enum GetRecommendedSkills {
  Pending = '[Pending] Получение списка рекомендуемых навыков',
  Success = '[Success] Получение списка рекомендуемых навыков'
}

/** Экшн фильтров */
export enum ChangePropertyFilter {
  Set = '[Set] Фильтр значений по названию'
}

/** Экшн выбранных элементов */
export enum SelectProperty {
  Set = '[Set] Выбор атрибута/навыка'
}

/** Запросить обратную связь  */
export enum RequestFeedback {
  Pending = '[Pending] Запросить обратную связь',
  Success = '[Success] Запросить обратную связь'
}

/** Дать обратную связь  */
export enum ProvideFeedback {
  Pending = '[Pending] Дать обратную связь',
  Success = '[Success] Дать обратную связь'
}

createActions({
  [GetAllCompetences.Pending]: undefined,
  [GetAllCompetences.Success]: (payload: { competences: ICompetence[] }) => payload,

  [GetRecommendedAttributes.Pending]: (payload: string) => ({ payload }),
  [GetRecommendedAttributes.Success]: (payload: { properties: ICompetence[]; }) => payload,

  [GetAllSkills.Pending]: undefined,
  [GetAllSkills.Success]: (payload: { properties: IIndicator[] }) => payload,

  [GetRecommendedSkills.Pending]: (payload: string) => ({ payload }),
  [GetRecommendedSkills.Success]: (payload: { properties: IIndicator[] }) => payload,

  [ChangePropertyFilter.Set]: (payload: {
    filter: { searchString: string; type: string };
  }) => payload,

  [SelectProperty.Set]: (payload: {
    selectedProperties: {
      property: IIndicator;
      isProvideFeedback: boolean;
      clear?: boolean;
    };
  }) => payload,

  [RequestFeedback.Pending]: (payload: IRequestFeedbackBody) => payload,
  [RequestFeedback.Success]: undefined,

  [ProvideFeedback.Pending]: (payload: IProvideFeedbackBody) => payload,
  [ProvideFeedback.Success]: undefined
});
