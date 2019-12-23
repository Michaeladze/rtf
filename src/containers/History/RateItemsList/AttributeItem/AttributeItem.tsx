import React from 'react';
import './AttributeItem.scss';
import { IIncomeAssessmentItem } from '../../../../_store/reducers/users-request.reducer';
import Indicator from './Indicator/Indicator';

interface IAttributesItemProps {
  attribute: IIncomeAssessmentItem;
  showComment?: boolean
}

const AttributeItem: React.FC<IAttributesItemProps> = ({ attribute, showComment }) => {
  /** Тип индикатора */
  const type = attribute.oAttributeToCategory ? 'attributes' : 'skills';

  /** Получение списка индикаторов  */
  const indicators = attribute && (
    <Indicator key={attribute.sId} indicator={attribute} type={type} showComment={showComment}/>
  );

  return (
    <article className='attribute'>
      <div className='indicators'>{indicators}</div>
    </article>
  );
};

export default AttributeItem;
