import { IUser } from './users-all.reducer';
import { Action, handleActions } from 'redux-actions';
import { IIndicator } from './users-history.reducer';
import {
  ClearLoadingFlag,
  GetStatisticsAttributes,
  GetStatisticsCompetencies,
  GetStatisticsSkills,
  GetStatisticsSummary,
  SetActiveFilter,
  SetPropertyFilter
} from '../actions/statistics.action';
import { IAssessmentSkill } from './users-request.reducer';
import { IStringMap } from '../../_helpers/socket';

export interface IAttributes {
  sId?: string;
  aAttributes?: IAttributes[];
  sName: string;
  /** Средняя оценка */
  fAverageGrade: number;
  /** Разница с предыдущим периодом */
  fDifference: number;
  /** id последних 3 пользователей */
  aLastUsersId: string[];
  /** количество оценивших пользователей (кроме 3 указанных выше) */
  iCountUser: number;
  /** количество оценок */
  iGradeCount: number;
}

/** Интерфейс карточек Сильные/слабые стороны (получение левой части статистики) */
export interface IStatisticsSummary {
  /** Сильные стороны*/
  aStrongAttribute?: IAttributes[];
  aStrongSkill?: IAttributes[];
  /** Зоны развития */
  aWeakAttribute?: IAttributes[];
  aWeakSkill?: IAttributes[];
  /** Обратная связь */
  iCountOutcome?: number;
  iCountIncome?: number;
  /** Благодарности */
  iCountOutcomeThank?: number;
  iCountIncomeThank?: number;
}

/** Тело запроса на получение компетенций/навыков/шейперов*/
export interface IStatisticsBody {
  sDatePeriod: string;
  sUserId?: string
}

/** Тело запроса на получение statistics attributes  */
export interface IAttributesStatisticsBody {
  sAttributeId?: string;
  sSkillId?: string;
  iPage: number;
  iSize: number;
}

/** Ответ запроса на получение statistics attributes  */
export interface IAttributesStatistics {
  bHasNext: boolean | undefined;
  aObjects: IAttributesItem[];
  /** id атрибута/навыка */
  id?: string;
}

export interface IAttributesSkills {
  aPersonAssessmentSkillItem: IAssessmentSkillItem[]
  fAverageGrade: number;
  fDifference: number;
  oSkill: IIndicator;
  aLastUsersId: string[];
}

export interface IAssessmentSkillItem {
  sId?: string;
  bActive: boolean;
  sPersonAssessmentId: string;
  oSkill?: IAssessmentSkill;
  sRespondentComment?: string;
  iGrade?: number;
  sCanNotAnswerType?: string;
  sCanNotAnswerText?: string;
  sType?: string;
  sRespondentId: string;
}

export interface IStatisticsSkills {
  /** ID Юзера */
  sUserId: string;
  /** Входящие уведомления */
  aSkillStatistics: IAttributes[];
}

export interface IAttributesItem {
  iGrade: number;
  lDate: number;
  sComment: string;
  oUser: IUser;
}

/** Типы для периодов */
export interface IPeriodStatistics extends IStringMap<any> {
  month: IAttributes[];
  monthLoaded: boolean;
  quarter: IAttributes[];
  quarterLoaded: boolean;
  year: IAttributes[];
  yearLoaded: boolean;
}

/** Интерфейс компетенций */
export interface IStatisticsState {
  shapeStatistics: IPeriodStatistics;
  competenceStatistics: IPeriodStatistics;
  skillsStatistics: IPeriodStatistics;
  statisticsSummary: IStatisticsSummary;
  statisticsAttributes: IAttributesStatistics;

  statisticsSummaryLoaded: boolean;
  statisticsAttributesLoaded: boolean;

  periodFilter: string;

  propertyFilter: string;
}

/** Начальный стейт для периода */
const initialPeriod = {
  month: [],
  monthLoaded: false,
  quarter: [],
  quarterLoaded: false,
  year: [],
  yearLoaded: false
};

const initialState: IStatisticsState = {
  /** shaper*/
  shapeStatistics: { ...initialPeriod },
  /** competence*/
  competenceStatistics: { ...initialPeriod },
  /** skills */
  skillsStatistics: { ...initialPeriod },

  /** statistics summary */
  statisticsSummary: {
    aStrongAttribute: [],
    aStrongSkill: [],
    aWeakAttribute: [],
    aWeakSkill: [],
    iCountOutcome: 0,
    iCountIncome: 0,
    iCountOutcomeThank: 0,
    iCountIncomeThank: 0
  },
  statisticsSummaryLoaded: false,

  /** statistics attributes */
  statisticsAttributes: {
    id: '',
    bHasNext: undefined,
    aObjects: []
  },
  statisticsAttributesLoaded: false,
  periodFilter: 'month',
  propertyFilter: ''
};


export const statisticsAllReducer = handleActions(
  {
    [GetStatisticsCompetencies.Success]: (
      state: IStatisticsState,
      action: Action<any>
    ) => {
      const _state = JSON.parse(JSON.stringify(state));
      const flag = (action.payload.flag as string).toLowerCase();
      const flagLoaded = (action.payload.flag as string).toLowerCase() + 'Loaded';

      /** Записываем компетенции */
      _state.competenceStatistics[flag] = action.payload.data.aCompetence;
      _state.competenceStatistics[flagLoaded] = true;

      /** Записываем шейпы */
      _state.shapeStatistics[flag] = action.payload.data.aShape;
      _state.shapeStatistics[flagLoaded] = true;

      return _state;
    },

    /** Skills */
    [GetStatisticsSkills.Success]: (
      state: IStatisticsState,
      action: Action<any>
    ) => {
      const _state = JSON.parse(JSON.stringify(state));
      const flag = (action.payload.flag as string).toLowerCase();
      const flagLoaded = (action.payload.flag as string).toLowerCase() + 'Loaded';

      /** Записываем навыки */
      _state.skillsStatistics[flag] = action.payload.data;
      _state.skillsStatistics[flagLoaded] = true;

      return _state;
    },

    [GetStatisticsSummary.Success]: (
      state: IStatisticsState,
      action: Action<any>
    ) => {
      if (action.payload.summary) {

        return {
          ...state,
          statisticsSummaryLoaded: true,
          statisticsSummary: action.payload.summary
        }
      }

      return state;
    },
    [GetStatisticsAttributes.Success]: (state: IStatisticsState, action: Action<any>
    ) => {
      const aObjects = action.payload.id === state.statisticsAttributes.id ?
        [...state.statisticsAttributes.aObjects, ...action.payload.attributes.aObjects] :
        action.payload.attributes.aObjects;

      if (action.payload.attributes) {
        return {
          ...state,
          statisticsAttributes: {
            id: action.payload.id,
            aObjects: aObjects,
            bHasNext: action.payload.attributes.bHasNext
          }
        }
      }

      return state;
    },
    [SetActiveFilter.Success]: (state: IStatisticsState, action: Action<any>) => {
      return {
        ...state,
        periodFilter: action.payload
      };
    },
    [SetPropertyFilter.Success]: (state: IStatisticsState, action: Action<any>) => {
      return {
        ...state,
        propertyFilter: action.payload
      };
    },
    [ClearLoadingFlag.Set]: (state: IStatisticsState, action: Action<any>) => {
      if (action.payload.flag) {

        return {
          ...state,
          shapeStatistics: { ...initialPeriod },
          competenceStatistics: { ...initialPeriod },
          skillsStatistics: { ...initialPeriod },
        }
      }

      return state;
    }
  },
  initialState
);
