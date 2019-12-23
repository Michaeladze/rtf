import React from 'react';
import './DiagramShaper.scss';
import { IAttributes } from "../../../../../_store/reducers/statisticsAll.reducer";

interface IDiagramShaperProps {
  statistics: IAttributes[];
}

const DiagramShaper: React.FC<IDiagramShaperProps> = ({ statistics }) => {

  /** Данные для прелоудера */
  const statisticPreloaderData: IAttributes[] = [0, 0, 0].map((_, i) => ({
    iId: i,
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
      <div className='diagram-shaper__item' key={item.sId}>
        <span className="diagram-shaper__text">
          {item.sName}
        </span>
        <div className='diagram-shaper__bar'>
          <div
            className='diagram-shaper__bar-progress'
            style={{ transform: `scaleX(${item.fAverageGrade / 10})` }}
          />
        </div>
        <span className='diagram-shaper__count'>{item.fAverageGrade.toFixed(1)}</span>
      </div>
    ));

  return (
    <div className='diagram-shaper'>
      <div className='diagram-shaper__list'>{barItemJSX}</div>
    </div>
  );
};
export default DiagramShaper;
