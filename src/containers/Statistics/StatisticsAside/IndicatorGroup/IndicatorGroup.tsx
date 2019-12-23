import React from 'react';
import './IndicatorGroup.scss';
import IndicatorItem from './IndicatorItem/IndicatorItem';
import { ITotal } from "../StatisticsAside";
import { IAttributes } from "../../../../_store/reducers/statisticsAll.reducer";

interface IIndicatorGroupProps {
  groupAttributes?: IAttributes[] | undefined;
  groupSkills?: IAttributes[] | undefined ;
  title: string;
  groupThanks?:ITotal[] | undefined;
  groupTotalRating?:ITotal[] | undefined;
}

const IndicatorGroup: React.FC<IIndicatorGroupProps> = ({
  groupAttributes, groupSkills,  title, groupThanks, groupTotalRating
}) => {

  /** Текст заглушка  */
  const textHelp =
    <h2 className='indicator__help-text'>Информация будет представлена, когда у вас будет достаточно обратной связи</h2>;

  /** Текст заголовка  */
  const subtitleFirst =  groupAttributes ? 'Атрибуты' : 'Обратная связь';
  const subtitleSecond =  groupSkills ? 'Проф. навыки' : 'Благодарности';

  const groupAttributeJSX =  groupAttributes &&
    groupAttributes.map((item) => (
      item.sName ?
        <IndicatorItem key={item.sName} item={item}/> : null
    ));

  const groupSkillsJSX = groupSkills &&
    groupSkills.map((item) => (
      item.sName ?
        <IndicatorItem key={item.sName} item={item}/> : null
    ));

  const groupThanksJSX = groupThanks &&
    groupThanks.map((total) => (
      <IndicatorItem key={total.sName} total={total}/>
    ));

  const groupTotalRatingJSX = groupTotalRating &&
    groupTotalRating.map((total) => (
      <IndicatorItem key={total.sName} total={total}/>
    ));

  return (
    <>
      <article className='indicator-group__card'>
        <h4 className='indicator-group__card-name'>{title}</h4>
        <div className="indicator-group__list">
          <h6 className='indicators__title'>{subtitleFirst}</h6>
          { groupAttributes && groupAttributes.length === 0  ? textHelp  : groupAttributeJSX}
          { groupTotalRating && !groupSkills ? groupTotalRatingJSX : ''}

        </div>
        <div className="indicator-group__list">
          <h6 className='indicators__title'>{subtitleSecond}</h6>
          {  groupSkills && groupSkills.length === 0 ? textHelp : groupSkillsJSX}
          {  groupThanks && !groupAttributes ? groupThanksJSX : '' }
        </div>
      </article>
    </>
  );
};
export default IndicatorGroup;
