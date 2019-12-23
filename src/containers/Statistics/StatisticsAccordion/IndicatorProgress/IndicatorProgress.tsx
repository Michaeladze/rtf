import React from 'react';
import './IndicatorProgress.scss';
import { ReactComponent as ArrowBack } from '../../../../_assets/svg/arrow.svg';
import UsersStack from '../../../../components/UsersStack';
import { IAttributes, IAttributesSkills } from '../../../../_store/reducers/statisticsAll.reducer';

interface IIndicatorProgressProps {
  item?: IAttributes;
  skill?: IAttributesSkills;
}

const IndicatorProgress: React.FC<IIndicatorProgressProps> = ({ item, skill }) => {

  /** Атрибут или Навык */
  const property = item ? item : skill;
  /** Пользователи */
  const usersJSX = property && property.aLastUsersId &&
      <UsersStack users={property.aLastUsersId} className={'grey-text'}/>;
  /** Округление динамики */
  const dynamic = property ? parseFloat(String(property.fDifference.toFixed(1))) : 0;

  /** Округление рейтинга */
  const rating = property && parseFloat(String(property.fAverageGrade.toFixed(1)));

  /** Направление стрелки */
  const rotate = property && property.fDifference >= 0 ? 'rotate' : '';

  /** Отображение дельты */
  const deltaJSX = property && (property.fAverageGrade === 0) ?
    <span className='hyphen'/> :
    <>
      <ArrowBack className={`progress-status__indicator ${rotate}`}/>
      <span className='progress-status__number'>{dynamic}</span>
    </>
  ;

  const titleJSX = item ? item.sName : skill && skill.oSkill.sName;

  // ******************************************************************************

  return (
    <div className='indicator-progress'>
      <div className='indicator__rating'>
        <span className='indicator-rating__number'>{rating}</span>
      </div>
      <h6 className='indicator-progress__title'>{titleJSX}</h6>
      <i className='indicator-progress__arrow--mobile'/>
      <div className='indicator-progress__content'>
        <div className='progress-status'>
          {deltaJSX}
        </div>
      </div>

      <div className='indicator-progress__users'>{usersJSX}</div>
    </div>
  );
};
export default IndicatorProgress;
