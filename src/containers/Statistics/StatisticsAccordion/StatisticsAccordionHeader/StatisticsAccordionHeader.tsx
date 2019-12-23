import React from 'react';
import './StatisticsAccordionHeader.scss';
import IndicatorProgress from '../IndicatorProgress/IndicatorProgress';
import { IAttributes } from '../../../../_store/reducers/statisticsAll.reducer';

interface IStatisticsAccordionHeaderProps {
  item: IAttributes;
}

const StatisticsAccordionHeader: React.FC<IStatisticsAccordionHeaderProps> = ({ item }) => {

  const StatisticsAccordionHeaderJSX = item.aAttributes && item.aAttributes.length ?
    <div className='statistics-accordion-header'>
      <IndicatorProgress item={item}/>
    </div> : '';

  return (
    <>{ StatisticsAccordionHeaderJSX }</>
  );
};
export default StatisticsAccordionHeader;
