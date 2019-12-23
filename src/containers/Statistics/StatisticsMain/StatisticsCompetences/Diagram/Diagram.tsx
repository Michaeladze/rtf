import React from 'react';
import './Diagram.scss';
import { IAttributes } from '../../../../../_store/reducers/statisticsAll.reducer';

interface IDiagramProps {
  statistics: IAttributes[];
}

const Diagram: React.FC<IDiagramProps> = ({ statistics }) => {

  /** Данные для прелоудера */
  const statisticPreloaderData: IAttributes[] = [0,
    0,
    0,
    0,
    0,
    0].map((_, i) => ({
    sId: `${i}`,
    fAverageGrade: 0.0,
    sName: '',
    fDifference: 0,
    aLastUsersId: [],
    iCountUser: 0,
    iGradeCount: 0
  }));

  /** Массив с прелоудером */
  const s = statistics && statistics.length > 0 ? statistics : statisticPreloaderData;

  const barItemJSX =
    s && s.map((item) => (
      <div className='diagram__item' key={item.sId}>
        <div className='diagram__bar'>
          <div
            className='diagram__bar-progress'
            style={{ transform: `scaleY(${item.fAverageGrade / 10})` }}
          />
        </div>
        <span className='diagram__count'>{item.fAverageGrade.toFixed(1)}</span>
        <div className='tooltip-diagram'>
          <div className='tooltip-diagram__text'>{item.sName}</div>
        </div>
      </div>
    ));

  return (
    <div className='diagram'>
      <div className='diagram__list'>{barItemJSX}</div>
    </div>
  );
};
export default Diagram;
