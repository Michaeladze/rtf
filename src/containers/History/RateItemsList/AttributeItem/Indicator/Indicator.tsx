import React from 'react';
import './Indicator.scss';
import { ReactComponent as Icon } from '../../../../../_assets/svg/feedback-property-icon.svg';
import Comment from '../../../../../components/Comment';
import { IStringMap } from '../../../../../_helpers/socket';
import { IIndicator } from '../../../../../_store/reducers/users-history.reducer';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import { customEqual } from '../../../../../_helpers/helpers';
import { IIncomeAssessmentItem } from '../../../../../_store/reducers/users-request.reducer';

interface IAttributesItemProps {
  indicator: IIncomeAssessmentItem;
  type: string;
  showComment?: boolean;
}

const Indicator: React.FC<IAttributesItemProps> = ({ indicator, type, showComment }) => {
  /** Получение справочника */
  const assessmentsMap: IStringMap<IStringMap<IIndicator>> = useSelector(
    (store: IStore) => store.properties.dictionary,
    customEqual
  );

  let comment = '';
  if (indicator.sRespondentComment) {
    comment = indicator.sRespondentComment;
  }

  if (indicator.sRequesterComment) {
    comment = indicator.sRequesterComment
  }

  const commentJSX = indicator.sRespondentComment &&
    <div className='indicator-comment'>
      <Comment comment={comment} textLength={100} />
    </div>;

  const isIconIndicator = indicator.iGrade ? (
    <div className='indicator__header-rating'>{indicator.iGrade}</div>
  ) : (
    <div className='indicator__header-icon'>
      <Icon/>
    </div>
  );

  // *******************************************************************************************************************

  return (
    <div className='indicator'>
      <header className='indicator__header'>
        {isIconIndicator}

        <h5 className='indicator__header-title'>
          {type === 'attributes'
            ? indicator.oAttributeToCategory &&
            assessmentsMap[type][indicator.oAttributeToCategory.sAttributeId]
              .sName
            : indicator.oSkill &&
            assessmentsMap[type][indicator.oSkill.sId].sName}
        </h5>

      </header>

      {showComment ? commentJSX : ''}
    </div>
  );
};

export default Indicator;
