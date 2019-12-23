import React, { useState } from 'react';
import './StatisticsSkillsList.scss';
import IndicatorProgress from '../../../StatisticsAccordion/IndicatorProgress/IndicatorProgress';
import StandardButton from '../../../../../components/StandardButton/StandardButton';
import { IAttributesSkills } from '../../../../../_store/reducers/statisticsAll.reducer';
import Modal from 'antd/lib/modal';
import StatisticsRatingPopup from '../../../../popups/StatisticsRatingPopup/StatisticsRatingPopup';
import { IIndicator } from '../../../../../_store/reducers/users-history.reducer';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';
import { animateExit, breakpoints } from '../../../../../_helpers/helpers';
import PopupMobileWrapper from '../../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import Filter from '../../Filter';
import useReactRouter from 'use-react-router';

interface IStatisticsSkillsListProps {
  statisticsSkills: IAttributesSkills[];
}

const StatisticsSkillsList: React.FC<IStatisticsSkillsListProps> = ({ statisticsSkills }) => {
  /** ID подчиненного из роута */
  const { location } = useReactRouter();
  const arr = location.pathname.split('/');
  const sSubordinateId = arr.length >= 4 && arr[3];

  /** ------------------------------------------------------------------------------------------------------------------
   * Реакт хуки
   * ------------------------------------------------------------------------------------------------------------------ */
  const [sortHigh, setSortHigh] = useState(false);

  const [sortLow, setSortLow] = useState(false);

  const [showStatisticsPopup, togglePopup] = useState(false);

  const [activeSkill, setActiveSkill] = useState();

  /** ----------------------------------------------------------------------------------------------------------------------
   * Попап открыть/закрыть методы
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Открытие попапа  */
  const openDialog = (skill: IIndicator) => {
    togglePopup(true);
    setActiveSkill(skill)
  };

  /** Закрытие попапа */
  const handleClose = () => {
    animateExit(() => togglePopup(false));
  };

  /** Сортировака по возрастанию */
  const sortFromHigh = () => {
    setSortHigh(!sortHigh);
    setSortLow(false);
    statisticsSkills.sort((a, b) => (a.fAverageGrade > b.fAverageGrade ? 1 : -1));
  };

  /** Сортировака по убыванию */
  const sortFromLow = () => {
    setSortLow(!sortLow);
    setSortHigh(false);
    statisticsSkills.sort((a, b) => (a.fAverageGrade < b.fAverageGrade ? 1 : -1));
  };

  /** Фильтр в десктопе */
  const filter = window.innerWidth > breakpoints.medium &&
    <div className="statistics-skills-filter__search"><Filter/></div>;

  /** Сообщение, если нет статистики */
  const infoTip = <p className='info-tip'>{ sSubordinateId ?
    'Сотрудник еще не получал обратную связь по профессиональным навыкам' :
    'Вы еще не получали обратную связь по профессиональным навыкам'}</p>;

  /** Список навыков в обертке */
  const skillsJSX = (statisticsSkills && statisticsSkills.length > 0) ?
    <div className='statistics-skills-list'>
      {statisticsSkills.map((skill: IAttributesSkills) => {
        return (
          <div className='statistics-skill__wrap' key={skill.oSkill.sId} onClick={() => openDialog(skill.oSkill)}>
            <IndicatorProgress skill={skill}/>
          </div>
        );
      })}
    </div> : infoTip;

  return (
    <>
      <div className='statistics-skills-filter'>
        <div className="statistics-skills-filter__actions">
          <div className={`statistics-skills__button ${sortHigh ? 'active' : ''}`}>
            <StandardButton
              handler={sortFromHigh}
              type={'link'}
              value={'По возрастанию'}
            />
          </div>
          <div className={`statistics-skills__button ${sortLow ? 'active' : ''}`}>
            <StandardButton
              handler={sortFromLow}
              type={'link'}
              value={'По убыванию'}
            />
          </div>
        </div>

        {filter}
      </div>

      {skillsJSX}

      <Modal
        closeIcon={<CloseIcon/>}
        bodyStyle={{ height: 'auto' }}
        centered={true}
        visible={showStatisticsPopup}
        footer={null}
        onCancel={handleClose}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleClose}>
          <StatisticsRatingPopup item={activeSkill} type='skill'/>
        </PopupMobileWrapper>
      </Modal>
    </>
  );
};
export default StatisticsSkillsList;
