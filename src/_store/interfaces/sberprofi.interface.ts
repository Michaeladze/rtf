/** Тело запроса с бека */
import { IUser } from '../reducers/users-all.reducer';

export interface ISPRequestResponse {
  sActivityType: string; // Тип объекта запроса
  oPayload: ISPRequest; // Запрос
}

/** Объект запроса */
export interface ISPRequest {
  sId: string; // ID запроса
  oTargetMastershipRate: ISPExpertise; // Желаемый уровень мастерства
  oCurrentMastershipRate: ISPExpertise; // Текущий уровень мастерства
  aEstimatorAttribute: ISPEstimatorAttribute[]; // Атрибуты оцениваемого
  aEstimatorSkill: ISPEstimatorSkill[]; // Навыки оцениваемого
  aQuestions: ISPQuestion[]; // Вопросы
  lCreationDate: number; // Дата создания запроса
  oCommunity: ICommunity; // Сообщество
}

/** Сообщество */
export interface ICommunity {
  sId: string;
  sName: string;
  sLogoLink: string;
}

/** Вопрос */
export interface ISPQuestion {
  sId: string; // ID вопроса
  sTitleName: string; // Вопрос
  aAnswers: ISPAnswer[]; // Ответы
  sType: string; // Тип вопроса
}

/** Ответа из вариантов */
export interface ISPAnswerOption {
  sId: string; // ID ответа
  sText: string; // Текст овтета
  bSelected?: boolean; // Выбран/Не выбран
}

/** Ответ */
export interface ISPAnswer {
  sId?: string; // ID ответа
  sComment?: string; // Текст ответа
  sOption?: ISPAnswerOption; // Ответ серди вариантов
}

/** Общий интерфейс для атрибутов/навыков */
export interface ISPAssessment {
  sId: string; // ID объекта оценки
  sCanNotAnswerType?: string; // Тип ответа в случае Не могу овтетить
  sCanNotAnswerText?: string; // Текст ответа в случае Не могу овтетить
  iGrade?: number; // Рейтинг от 1 до 10
}

/** Атрибут */
export interface ISPEstimatorAttribute extends ISPAssessment {
  sAttributeId: string; // ID атрибута
  sAttributeName: string; // Название атрибута
}

/** Навык */
export interface ISPEstimatorSkill extends ISPAssessment {
  sSkillId: string; // ID навыка
  sSkillName: string; // Название навыка
}

/** Уровень мастерства */
export interface ISPExpertise {
  sId: string; // ID уровня мастерства
  iCommunityId: number; // ID сообщества
  sLevelTitle: string; // Название уровня мастерства
  iMinGrade: number; // Необходимый грейд для текущего уровня мастерства
}

// ====================================================================================================================
// Interview
export interface IInterviewRequestResponse {
  sActivityType: string; // Тип объекта запроса
  oPayload: IInterviewRequest; // Запрос
}

/** Объект запроса */
export interface IInterviewRequest {
  sId: string;
  oUserEstimateCard: IInterviewUser;
  aQuestions: IInterviewQuestion[];
  oInterviewInfo: IInterviewInfo;
  oCommunity: ICommunity; // Сообщество
}

/** Инфо об экспертах */
export interface IInterviewInfo {
  lInterviewTime: number;
  sInterviewComment: string;
  aInterviewers: IInterviewUser[];
}

/** Карточка пользователя  */
export interface IInterviewUser {
  oUser: IUser;
  oTargetMastershipRate: ISPExpertise;
  oCurrentMastershipRate: ISPExpertise;
  iCountRate: number;
  iCountTotal: number;
  aInterviewMastershipResults: ISPExpertise[];
  aTestingResult: ISPExpertise[],
  sWorkExpCurrentYear: string;
  sWorkExpBankYear: string;
  sWorkExpCurrentMonth: string;
  sWorkExpBankMonth: string;
  oSelfRate: ISPExpertise;
}

/** Вопрос интервью */
export interface IInterviewQuestion {
  sId: string
  sDescription: string;
  sTitleName: string;
  sType: string;
  aAnswers: any[];
}

// ====================================================================================================================
// API body

/** Ответить/Сохранить за запрос интервью */
export interface IInterviewResponse {
  sId: string;
  oCurrentMastershipRate: {
    sId: string;
  },
  aQuestions: IInterviewQuestion[]
}

/** Ответить/Сохранить за запрос проф оценки */
export interface ISPResponse {
  sId: string;
  oTargetMastershipRate: {
    sId: string;
  },
  oCurrentMastershipRate: {
    sId: string;
  },
  aEstimatorAttribute: ISPEstimatorAttribute[];
  aEstimatorSkill: ISPEstimatorAttribute[];
  aQuestions: IInterviewQuestion[];
}
