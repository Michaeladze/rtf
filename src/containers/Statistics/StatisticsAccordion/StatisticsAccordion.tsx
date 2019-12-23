import React from 'react';
import './StatisticsAccordion.scss';

import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import StatisticsAccordionHeader from './StatisticsAccordionHeader/StatisticsAccordionHeader';
import StatisticsAccordionPanel from './StatisticsAccordionPanel/StatisticsAccordionPanel';
import { IAttributes } from "../../../_store/reducers/statisticsAll.reducer";

interface IStatisticsAccordionProps {
  items: IAttributes[];
}

const StatisticsAccordion: React.FC<IStatisticsAccordionProps> = ({ items }) => {
  const accordionItemJSX = items && items.map((item) => (
    <AccordionItem
      key={item.sName}
      contentHeader={<StatisticsAccordionHeader item={item} />}
      contentPanel={<StatisticsAccordionPanel item={item} />}
    />
  ));

  return (
    <div className='statistic-accordion__wrap'>
      {accordionItemJSX}
    </div>
  );
};
export default StatisticsAccordion;
