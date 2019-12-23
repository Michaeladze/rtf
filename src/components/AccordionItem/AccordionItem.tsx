import React, { useEffect, useRef, useState } from 'react';
import './AccordionItem.scss';
import { useSelector } from 'react-redux';
import { customEqual } from '../../_helpers/helpers';
import { IStore } from '../../_store/store.interface';

interface IAccordionItemProps {
  contentHeader: React.ReactNode;
  contentPanel: React.ReactNode;
}

const AccordionItem: React.FC<IAccordionItemProps> = ({ contentHeader, contentPanel }) => {
  /** ----------------------------------------------------------------------------------------------------------------------
   * Хуки
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Отображение попапа */
  const [active, setActive] = useState('');
  const [height, setHeight] = useState('0px');

  const ref = useRef<HTMLInputElement>(null);

  /** Получение фильтра */
  const propertyFilter: string = useSelector((store: IStore) => store.statisticsAll.propertyFilter, customEqual);

  /** Тоггл аккордеона во время поиска атрибутов */
  useEffect(() => {
    setActive(propertyFilter.length ? 'active' : '');
    setHeight(propertyFilter.length ? `${ref.current && ref.current.scrollHeight}px` : '0px');
  }, [propertyFilter]);

  /** Обработка тоггла аккордеона */
  const toggleAccordion = () => {
    setActive(active === '' ? 'active' : '');
    setHeight(active === 'active' ? '0px' : `${ref.current && ref.current.scrollHeight}px`);
  };

  return (
    <>
      <div className='accordion'>
        <header
          className={`accordion__header ${active}`}
          onClick={toggleAccordion}>
          {contentHeader}
        </header>

        <div
          ref={ref}
          style={{ maxHeight: `${height}` }}
          className='accordion__content-wrap'>
          <div className='accordion__content'>{contentPanel}</div>
        </div>
      </div>
    </>
  );
};
export default AccordionItem;
