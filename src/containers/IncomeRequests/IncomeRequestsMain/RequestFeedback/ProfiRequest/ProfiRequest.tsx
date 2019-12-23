import React, { useState } from 'react';
import './ProfiRequest.scss';
import ProfiExpertise from './ProfiExpertise/ProfiExpertise';
import ProfiQuestion from './ProfiQuestion/ProfiQuestion';
import MyRatingForm from '../MyRatingForm/MyRatingForm';
import StandardButton from '../../../../../components/StandardButton';
import { IInterviewQuestion, ISPRequestResponse } from '../../../../../_store/interfaces/sberprofi.interface';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import { GetUserEstimate } from '../../../../../_store/actions/users-request.action';
import RequestFeedbackUser from '../RequestFeedbackUser/RequestFeedbackUser';

const ProfiRequest = () => {
  const dispatch = useDispatch();

  /** Данные профоценки */
  const { oPayload } = useSelector((store: IStore) => store.userRequest.selection) as ISPRequestResponse;
  /** Вопросы для коллег */
  const colleagueQuestions: IInterviewQuestion[] = useSelector((store: IStore) => store.userRequest.questions);

  /** Форма со своим ответом */
  const [showForm, setShowForm] = useState(false);

  /** Вопросы */
  const questions = oPayload.aQuestions.map((q) => <ProfiQuestion key={q.sId} item={q}/>);

  const getUserEstimate = () => {
    dispatch({ type: GetUserEstimate.Pending, payload: oPayload.sId });
    setShowForm(true)
  };

  return (
    <div>
      <RequestFeedbackUser/>

      <h2 className='profi__title'>Иван проходит професиональную оценку в
        сообществе {oPayload.oCommunity && oPayload.oCommunity.sName}.</h2>
      <p className='profi__description'>Изучи его самооценку и оцени его уровень профессионального мастерства. Твоя
        обратная связь будет доступна экспертам сообщества и самому сотруднику</p>
      <div className='profi__expertise-wrapper'>
        <ProfiExpertise from={oPayload.oCurrentMastershipRate} to={oPayload.oTargetMastershipRate}/>
      </div>
      <div className='profi__questions'>{questions}</div>

      {showForm && colleagueQuestions.length > 0 &&
      <MyRatingForm fields={colleagueQuestions} request={oPayload} type='sberprofi'/>}

      {!showForm && <StandardButton customClass='profi__show-form' type='primary' handler={getUserEstimate}
        value='Дать свою оценку' buttonType='button'/>}

    </div>
  );
};

export default ProfiRequest;
