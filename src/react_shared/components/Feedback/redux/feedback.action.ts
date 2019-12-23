import { createActions } from 'redux-actions';

export enum GetFeedback {
  Post = '[Post] Get feedback',
  PostSuccess = '[PostSuccess] Get feedback'
}

export interface IFeedBackPost {
  oFeedbackApp: {
    sValue: string;
    sDescription: string;
  };
  oFeedbackType: {
    sValue: string;
    sDescription: string;
  };
  iRateValue: number;
  sMessage: string;
  iAttachmentExist: number;
}

createActions({
  [GetFeedback.Post]: (payload: IFeedBackPost) => payload,
  [GetFeedback.PostSuccess]: (payload: IFeedBackPost) => payload
});
