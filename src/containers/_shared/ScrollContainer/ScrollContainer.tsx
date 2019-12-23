import React, { useEffect, useState } from 'react';
import './ScrollContainer.scss';
import { useLazyLoad } from '../../../_helpers/helpers';
import { ReactComponent as ArrowBack } from '../../../_assets/svg/arrow_back.svg';

interface IProps {
  /** Высота внешнего контейнера */
  containerHeight: number;
  /** Высота внутрннего контейнера */
  contentHeight: number;
  /** Список элементов */
  children: JSX.Element[];
  /** Ленивая загрузка */
  lazyLoad?: (page: number, setPage: Function) => void;
}

const ScrollContainer: React.FC<IProps> = ({ children, containerHeight, contentHeight, lazyLoad }) => {
  /** Номер страницы */
  const [page, setPage] = useState(1);

  /** Ленивая подгрузка списка */
  useLazyLoad(document.querySelector<HTMLDivElement>('.scroll-container__inner'), (() => {
    lazyLoad && lazyLoad(page, () => setPage(page + 1));
  }), 'horizontal');

  return (
    <div className='scroll-container' style={{ height: `${containerHeight}px` }}>
      <div className='scroll-container__inner' style={{ height: `${contentHeight}px` }}>
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;
