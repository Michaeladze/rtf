import React from 'react';
import './Competences.scss';
import StatisticsAccordion from '../../../StatisticsAccordion/StatisticsAccordion';
import { IAttributes } from "../../../../../_store/reducers/statisticsAll.reducer";

interface ICompetencesProps {
  statistics: IAttributes[];
}

const Competences: React.FC<ICompetencesProps> = ({ statistics }) => {
  return (
    <div className='statistics-tab__competence'>
      <StatisticsAccordion items={statistics} />
    </div>
  );
};
export default Competences;
