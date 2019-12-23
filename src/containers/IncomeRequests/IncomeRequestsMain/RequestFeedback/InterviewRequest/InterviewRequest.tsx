import React from 'react';
import './InterviewRequest.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import InterviewExpert from './InterviewExpert/InterviewExpert';
import { IInterviewRequestResponse } from '../../../../../_store/interfaces/sberprofi.interface';
import InterviewApplication from './InterviewApplication/InterviewApplication';
import MyRatingForm from '../MyRatingForm/MyRatingForm';
import RequestFeedbackUser from '../RequestFeedbackUser/RequestFeedbackUser';
import { formatDate } from '../../../../../_reactShared/utils/helpers';

const InterviewRequest = () => {

  const { oPayload } = useSelector((store: IStore) => store.userRequest.selection) as IInterviewRequestResponse;

  /** Эксперты */
  const experts = oPayload.oInterviewInfo.aInterviewers.map((e) => <InterviewExpert key={e.oUser.sUserId}
    user={e.oUser}/>);

  /** Дата интервью */
  const d = formatDate(oPayload.oInterviewInfo.lInterviewTime);

  return (
    <div>
      <RequestFeedbackUser/>

      <h2 className='profi__title'>До {d.iDayOfMonth} {d.sMonth} {d.sYear} года проведи интервью с сотрудником в рамках профоценки в
        сообществе {oPayload.oCommunity && oPayload.oCommunity.sName}.</h2>
      {oPayload.oInterviewInfo.sInterviewComment &&
      <p className='profi__description'>{oPayload.oInterviewInfo.sInterviewComment}</p>}

      <div className='interview__section'>
        <h3 className='interview__title'>Эксперты - участники интервью</h3>
        <div className='interview__experts'>{experts}</div>
      </div>

      <div className='interview__section'>
        <h3 className='interview__title'>Заявка на оценку</h3>
        <InterviewApplication item={oPayload.oUserEstimateCard}/>
      </div>

      {/*<div className='interview__section'>*/}
      {/*<h3 className='interview__title'>Ваша оценка</h3>*/}
      {/*<p className='interview__my-rating'>Ваши ответы будут доступны экспертам сообщества и самому сотруднику</p>*/}
      {/*</div>*/}

      {oPayload.aQuestions.length > 0 &&
      <MyRatingForm fields={oPayload.aQuestions} request={oPayload} type='interview'/>}
    </div>
  );
};

export default InterviewRequest;
