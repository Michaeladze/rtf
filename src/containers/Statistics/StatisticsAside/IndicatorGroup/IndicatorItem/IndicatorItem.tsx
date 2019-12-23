import React from 'react';
import './IndicatorItem.scss';
import { ITotal } from "../../StatisticsAside";
import { IAttributes } from "../../../../../_store/reducers/statisticsAll.reducer";

interface IIndicatorGroupProps {
  item?: IAttributes;
  total?: ITotal;
}

const IndicatorItem: React.FC<IIndicatorGroupProps> = ({ item, total }) => {
  return (
    <>
      { item &&
        <li className='indicator-item' key={item.sId}>
          <div className='indicator-item__rating'>
            {item.fAverageGrade === 10 ? 10 : item.fAverageGrade.toFixed(1)}
          </div>
          <span className='indicator-item__name'>{item.sName}</span>
        </li>
      }
      { total &&
      <li className='indicator-item'>
        <div className='indicator-item__rating'>{total.count}</div>
        <span className='indicator-item__name'>{total.sName}</span>
      </li>
      }
    </>
  );
};
export default IndicatorItem;
