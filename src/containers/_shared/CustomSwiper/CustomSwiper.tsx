import React, { useEffect, useRef } from 'react';
import Swiper, { SwiperInstance } from 'react-id-swiper';
import './CustomSwiper.scss';
import 'antd/lib/button/style/index.css';
import { ReactComponent as ArrowBack } from '../../../_assets/svg/arrow_back.svg';

interface IFreeModeSwiperProps {
  /** Слайды с контентом */
  children: JSX.Element[];
  /** Наличие фиксированных позиций у слайдов */
  freeMode?: boolean;
  /** Расстояние между слайдами */
  spaceBetween: number;
  /** Количество видимых слайдов. По умолчанию: 'auto' */
  slidesPerView?: number | string;
  /** Расстояние между слайдами на мобиле */
  mobileSpaceBetween?: number;
  /** Количество видимых слайдов на мобильном. По умолчанию: 'auto' */
  mobileSlidesPerView?: number;
  /** ID для стрелки назад */
  arrowPrevId?: string;
  /** ID для стрелки вперед */
  arrowNextId?: string;
  /** Индекс, на который нужно переместить свайпер */
  slideTo?: number;
  /** Динамическая подгрузка слайдов */
  addItems?: () => void;
  /** Наличие слайдов для подгрузки */
  flag?: boolean;
}

const CustomSwiper: React.FC<IFreeModeSwiperProps> = ({
  children,
  spaceBetween,
  slidesPerView = 'auto',
  freeMode,
  mobileSpaceBetween = 0,
  mobileSlidesPerView = 'auto',
  arrowPrevId = 'arrow-prev',
  arrowNextId = 'arrow-next',
  slideTo,
  addItems,
  flag
}) => {
  /** Экемпляр свайпера */
  const swiper = useRef<SwiperInstance>(null);

  /** Получаем экземпляр свайпера и записываем его в реф */
  const getSwiper = ((s: SwiperInstance) => {
    swiper.current = s;
  });

  /** Конфиг свайпера */
  const params = {
    spaceBetween: spaceBetween,
    slidesPerView: slidesPerView,
    freeMode: freeMode,
    navigation: {
      prevEl: `#${arrowPrevId}`,
      nextEl: `#${arrowNextId}`
    },
    breakpoints: {
      660: {
        slidesPerView: mobileSlidesPerView,
        spaceBetween: mobileSpaceBetween
      }
    },
    on: {
      slideChange: () => {
        if (swiper.current.isEnd && addItems && flag) {
          addItems();
        }
      },
    }
  };

  /** Ребилдим свайпер, если есть слайды для подгрузки */
  const isRebuildOnUpdate = swiper.current && swiper.current.isEnd && addItems && flag;

  /** Если задан @param slideTo, то перемещаем свайпер на него  */
  useEffect(() => {
    if (swiper.current && slideTo !== undefined) {
      swiper.current.slideTo(slideTo);
    }
  }, [slideTo, isRebuildOnUpdate]);

  return (
    <>
      <Swiper
        {...params} getSwiper={getSwiper} rebuildOnUpdate={isRebuildOnUpdate} shouldSwiperUpdate={true}>
        {children}
      </Swiper>
      <>
        <button id={arrowPrevId} className='swiper-button-prev'>
          <ArrowBack className='swiper-arrow__icon swiper-arrow__icon--prev'/>
        </button>
        <button id={arrowNextId} className='swiper-button-next'>
          <ArrowBack className='swiper-arrow__icon'/>
        </button>
      </>
    </>
  );
};
export default CustomSwiper;
