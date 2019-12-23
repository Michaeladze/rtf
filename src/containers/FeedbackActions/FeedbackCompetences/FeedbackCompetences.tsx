import React from 'react';
import './FeedbackCompetences.scss';
import { ICompetence, IIndicator } from '../../../_store/reducers/users-history.reducer';
import Competence from '../Competence';

interface IProps {
  list: ICompetence[];
  onPropertyClick: (property: IIndicator, competenceId?: string) => void;
}

const FeedbackCompetences: React.FC<IProps> = ({ list, onPropertyClick }) => {

  /** Список всех элементов */
  const itemsList = list.map((item: ICompetence) => (
    item.aAttributes && item.aAttributes.length > 0 ? <div className='feedback-competences__item' key={item.sId}>
      <Competence competence={item} handlePropertyClick={onPropertyClick}/>
    </div> : ''
  ));

  return (
    <>
      <ul className='feedback-competences'>{itemsList}</ul>
    </>
  );
};

export default FeedbackCompetences;
