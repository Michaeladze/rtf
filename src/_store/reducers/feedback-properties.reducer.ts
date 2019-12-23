import { handleActions } from 'redux-actions';
import {
  ChangePropertyFilter,
  GetAllCompetences,
  GetAllSkills,
  GetRecommendedAttributes,
  GetRecommendedSkills,
  ProvideFeedback,
  RequestFeedback,
  SelectProperty
} from '../actions/feedback-properties.action';
import { ICompetence, IIndicator } from './users-history.reducer';
import { IStringMap } from '../../_helpers/socket';

export interface IPropertiesState {
  allSkills: IIndicator[];
  allCompetences: ICompetence[];
  dictionary: IStringMap<IStringMap<IIndicator>>;
  recommendedSkills: IIndicator[];
  recommendedAttributes: IIndicator[];
  filter?: { searchString: string; type: string };
  selectedProperties: IIndicator[];
  attributesLoaded: boolean;
  recommendedAttributesLoaded: boolean;
}

/** Интефрйес тела запроса на обратную связь */
export interface IRequestFeedbackBody {
  aRespondentsId: string[];
  aAttributeToCategories: { sAttributeId: string; sCategoryId: string }[];
  aSkills: { sId: string }[];
  sRequesterComment: string;
}

/** Интефрйес тела запроса на добавление обратной связи */
export interface IProvideFeedbackBody {
  aRequestersId: string[];
  aPersonAssessmentItem?: IAssessmentItemBody[];
  aPersonAssessmentSkillItem?: IAssessmentItemBody[];
}

/** Интефрйес тела запроса на добавление обратной связи: объект оценки */
export interface IAssessmentItemBody {
  sId?: string;
  oAttributeToCategory?: { sAttributeId: string; sCategoryId: string };
  oSkill?: { sId: string };
  iGrade: number;
  sRespondentComment?: string;
  sCanNotAnswerType?: string;
  sCanNotAnswerText?: string;
}

export interface IPropertiesPayload {
  payload: {
    properties?: IIndicator[];
    competences?: ICompetence[];
    filter?: { searchString: string; type: string };
    selectedProperties?: {
      property: IIndicator;
      isProvideFeedback: boolean;
      clear?: boolean;
    };
  };
}

const initialState: IPropertiesState = {
  allSkills: [],
  allCompetences: [],
  dictionary: {
    skills: {},
    attributes: {}
  },
  recommendedSkills: [],
  recommendedAttributes: [],
  selectedProperties: [],
  recommendedAttributesLoaded: false,
  attributesLoaded: false
};

export const propertiesReducer = handleActions(
  {
    [GetAllCompetences.Success]: (state: IPropertiesState, action: IPropertiesPayload) => {
      if (action.payload.competences) {

        const items = action.payload.competences.reduce(
          (s: IIndicator[], a: ICompetence) => {
            return [...s, ...a.aAttributes];
          },
          []
        );

        return {
          ...state,
          allCompetences: action.payload.competences,
          dictionary: {
            ...state.dictionary,
            attributes: items.reduce((s: IStringMap<IIndicator>, e: IIndicator) => ({
              ...s, [e.sId]: e
            }), {})
          },
          attributesLoaded: true
        };
      }

      return state;
    },
    [GetAllSkills.Success]: (state: IPropertiesState, action: IPropertiesPayload) => {
      let items = [...state.allSkills];
      if (action.payload.properties) {
        items = action.payload.properties;
      }

      const dictionary = { ...state.dictionary };

      return {
        ...state,
        allSkills: items,
        dictionary: {
          ...dictionary,
          skills: items.reduce(
            (s: IStringMap<IIndicator>, e: IIndicator) => ({
              ...s, [e.sId]: e
            }), {}
          )
        }
      };
    },
    [GetRecommendedAttributes.Success]: (state: IPropertiesState, action: IPropertiesPayload) => {
      let items = [...state.recommendedAttributes];
      if (action.payload.properties) {
        items = action.payload.properties;
        items.sort((a, b) => (a.sName > b.sName ? 1 : -1));
      }

      return {
        ...state,
        recommendedAttributes: items,
        recommendedAttributesLoaded: true
      };
    },
    [GetRecommendedSkills.Success]: (state: IPropertiesState, action: IPropertiesPayload) => {
      let items = [...state.recommendedSkills];
      if (action.payload.properties) {
        items = action.payload.properties;
        items.sort((a, b) => (a.sName > b.sName ? 1 : -1));
      }

      return {
        ...state,
        recommendedSkills: items
      };
    },
    [ChangePropertyFilter.Set]: (state: IPropertiesState, action: IPropertiesPayload) => {
      return {
        ...state,
        filter: action.payload.filter
      };
    },
    [SelectProperty.Set]: (state: IPropertiesState, action: IPropertiesPayload) => {
      if (action.payload.selectedProperties) {
        if (action.payload.selectedProperties.clear) {
          return {
            ...state,
            selectedProperties: []
          };
        }

        let selectedPropCopy = [...state.selectedProperties];

        const index = selectedPropCopy.findIndex((item) => {
          if (action.payload.selectedProperties) {
            return action.payload.selectedProperties.property.sId === item.sId;
          }
          return false;
        });

        if (index >= 0) {
          selectedPropCopy.splice(index, 1);
        } else {
          if (action.payload.selectedProperties.isProvideFeedback) {
            // для отправки ОС ограничение на 3 атрибута
            if (selectedPropCopy.length < 3) {
              selectedPropCopy.push(action.payload.selectedProperties.property);
            }
          } else {
            // для запроса ОС ограничение на 6 атрибутов
            if (selectedPropCopy.length < 6) {
              selectedPropCopy.push(action.payload.selectedProperties.property);
            }
          }
        }

        return {
          ...state,
          selectedProperties: selectedPropCopy
        };
      }
      return state;
    },

    [RequestFeedback.Success]: (state: IPropertiesState) => {
      return {
        ...state,
        selectedProperties: []
      };
    },

    [ProvideFeedback.Success]: (state: IPropertiesState) => {
      return {
        ...state,
        selectedProperties: []
      };
    }
  },
  initialState
);
