import React from 'react';
import './Competence.scss'
import { ICompetence, IIndicator } from '../../../_store/reducers/users-history.reducer';
import { FeedbackProperty } from '../FeedbackProperty/FeedbackProperty';

interface IProps {
  competence: ICompetence;
  handlePropertyClick: (property: IIndicator, competenceId?: string) => void;
}

const Competence: React.FC<IProps> = ({ competence, handlePropertyClick }) => {
  /** Список индикаторов */
  const indicatorsJSX = competence.aAttributes
    .sort((a, b) => (a.sName > b.sName ? 1 : -1))
    .map((item: IIndicator) => (
      <li
        className='feedback-competence__list-item'
        key={item.sId}
        onClick={() => handlePropertyClick(item, competence.sId as string)}>
        <FeedbackProperty feedbackItem={item}/>
      </li>
    ));

  return (
    <div className='feedback-competence'>
      <div className='feedback-competence__head'>
        <h6 className='feedback-competence__title'>{competence.sName}</h6>
      </div>

      <div className='feedback-competence__body'>
        <ul className='feedback-competence__list'>{indicatorsJSX}</ul>
      </div>
    </div>
  );
};

export default Competence;
