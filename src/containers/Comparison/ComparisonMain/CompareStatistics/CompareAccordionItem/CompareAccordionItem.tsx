import React from 'react';
import './CompareAccordionItem.scss';
import { IAttributes } from '../../../../../_store/reducers/statisticsAll.reducer';
import { ReactComponent as Arrow } from '../../../../../_assets/svg/arrow-down.svg';

interface IProps {
  competence: IAttributes;
}

/** Функция для округления средней оценки */
export const getAverageGrade = (grade: number) => {
  if (grade !== undefined) {
    return parseFloat(String(grade.toFixed(1)));
  }

  return grade;
};

const CompareAccordionItem: React.FC<IProps> = ({ competence }) => {
  /** Флаги для тоггла аккордеона */
  const isOpen = !!document.querySelector<HTMLDivElement>(`.show[data-competence="c${competence.sId}"]`);
  const isActive = !!document.querySelector<HTMLOrSVGImageElement>(`.active[data-arrow="c${competence.sId}"]`);

  /** Список атрибутов внутри компетенций */
  const attributes = competence.aAttributes && competence.aAttributes.map((attribute) =>
    <div className='compare-accordion-item__attribute' key={attribute.sId}>
      <div className='compare-accordion-item__attribute-name'>{attribute.sName}</div>
      <div className='compare-accordion-item__attribute-count'>{getAverageGrade(attribute.fAverageGrade)}</div>
    </div>
  );

  /** Тоггл аккордеона */
  const toggleItem = (competence: IAttributes) => {
    const comp = document.querySelectorAll<HTMLDivElement>(`div[data-competence="c${competence.sId}"]`);
    const arrows = document.querySelectorAll<HTMLOrSVGImageElement>(`svg[data-arrow="arrow${competence.sId}"]`);

    comp.forEach((c) => {
      c.classList.toggle('show');
    });

    /** Активный класс для стрелки */
    arrows.forEach((a) => {
      a.classList.toggle('active');
    });
  };

  return (
    <div className='compare-accordion-item'>
      <button type='button' onClick={() => toggleItem(competence)} className='compare-accordion-item__action'>
        <span className='compare-accordion-item__name'>{competence.sName}</span>
        <span className='compare-accordion-item__rating'>{getAverageGrade(competence.fAverageGrade)}</span>
        <Arrow
          data-arrow={`arrow${competence.sId}`}
          className={`compare-accordion-item__icon ${isActive ? 'show' : ''}`}/>
      </button>

      <div
        className={`compare-accordion-item__attributes ${isOpen ? 'show' : ''}`}
        data-competence={`c${competence.sId}`}>{attributes}</div>
    </div>
  );
};

export default CompareAccordionItem;
