import React, { useRef, useState } from 'react';
import './ViewContainer.scss';
import useReactRouter from 'use-react-router';
import { isMobile } from '../../../_helpers/helpers';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  height?: number;
  goBackUrl?: string;
}

interface IStyles {
  maxHeight: string;
}

const ViewContainer: React.FC<IProps> = ({ children, height, goBackUrl }) => {

  const { history } = useReactRouter();

  /** Высота контента */
  const styles: IStyles = {
    maxHeight: height ? `${height}%` : '60%'
  };

  /** Ссылка на контент */
  const content = useRef<HTMLDivElement>(null);

  /** Клик по контейнеру меняет роутер */
  const handleClick = () => {
    (content.current as HTMLDivElement).classList.add('hide');

    setTimeout(() => {
      /** Убираем из LocalStorage ссылку 'назад' для истории */
      localStorage.removeItem('backToHistoryList');
      goBackUrl ? history.push(goBackUrl) : history.goBack();
    }, 300);
  };

  /** Клик по контенту */
  const stopPropagationHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /** Расстояние для тачей */
  const [distance] = useState(70);
  /** Направление движения. True если вверх, false - вниз */
  const [swipingUpward, setSwipingUpward] = useState<boolean | undefined>(undefined);
  /** Расстояние тача */
  const [delta, setDelta] = useState(0);
  /** Есть ли хотя бы одна открытая модалка */
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  /** Флаг говорит, если handleClick запущен */
  const [toggleClick, setToggleClick] = useState<boolean>(false);
  /** Координата начала тача для закрытия страницы */
  const [firstTouch, setFirstTouch] = useState<number | undefined>(undefined);
  /** Последняя координата тача для определения направления */
  const [lastTouchCoordinate, setLastTouchCoordinate] = useState<number | undefined>(undefined);
  /** Развернуто или свернуто окно. Нужно для того, чтоб не выполнять лишние расчеты */
  const [expanded, setExpanded] = useState<boolean>(false);
  /** Функция движения пальцем */
  const onTouchMove = (e: React.TouchEvent) => {

    /** Если есть открытая модалка, отменяем тач */
    if (isAnyModalOpen) {
      return;
    }

    /** Тот самый (возможно) костыль для того, чтоб скролл не менял роутер */
    const isSearchToggled = localStorage.getItem('isSearchToggled');
    if (isSearchToggled && isSearchToggled === 'true') {
      return;
    }

    /** Направление скролла */
    const isSwipingUpward = lastTouchCoordinate ? lastTouchCoordinate > e.touches[0].pageY : undefined;

    /** При смене направления тача обнуляем расстояния */
    if (swipingUpward !== undefined && isSwipingUpward !== undefined && swipingUpward !== isSwipingUpward) {
      setDelta(0);
      setFirstTouch(undefined);
    }

    /** Записываем последнее направление движения */
    setSwipingUpward(isSwipingUpward);

    /** Меняем предыдщую координату для определения направления скролла */
    setLastTouchCoordinate(e.touches[0].pageY);

    /** Считаем перемещение тача */
    if (!firstTouch) {
      setFirstTouch(e.touches[0].pageY);
    }
    setDelta(Math.abs((firstTouch as number) - e.touches[0].pageY));

    if (content && content.current) {
      const scrollContainer = content.current.querySelector<HTMLDivElement>('.rtf__common-body--overflow');

      if (scrollContainer) {
        if (isSwipingUpward) {
          /** Если свайп вверх, то разворачиваем попап на всю высоту */
          if (!expanded && delta > distance) {
            content.current.style.maxHeight = 'calc(100% - 60px)';
            setExpanded(true);
            scrollContainer.style.overflowY = 'auto';
            setFirstTouch(undefined);
            setDelta(0);
          }
        }

        if (!isSwipingUpward && isSwipingUpward !== undefined) {

          if (expanded) {
            /** Если свайп вниз, то возвращаем высоту в исходную точку */
            if (scrollContainer.scrollTop <= 0 && delta > distance) {
              setExpanded(false);
              scrollContainer.style.overflow = 'hidden';
              content.current.style.maxHeight = styles.maxHeight;

              /** При сворачивании обнуляем первую координату */
              setFirstTouch(undefined);
              setDelta(0);
            }
          }

          /** Закрываем сктраницу, если дергаем за верхнюю черту или страница не раскрыта */
          if (!expanded || (e.target as HTMLElement).classList.contains('mobile-content__line')) {
            if (!toggleClick) {
              /** Нужно проскролить @param distance, чтоб закрыть страницу */
              if (delta > distance) {
                setToggleClick(true);
                handleClick();
              }
            }
          }
        }
      }
    }
  };

  /** Проверяем открытые модалки */
  const checkOpenedModals = () => {
    const modals = document.querySelectorAll<HTMLDivElement>('.ant-modal-wrap');
    let isOpened = false;

    for (let i = 0; i < modals.length; i++) {
      const style = modals[i].getAttribute('style');
      if (style === null || style === '') {
        isOpened = true;
        break;
      }
    }

    setIsAnyModalOpen(isOpened);
  };

  /** При завершении тача сбрасываем значение последней координаты */
  const onTouchEnd = () => {
    setLastTouchCoordinate(undefined);
    setFirstTouch(undefined);
    checkOpenedModals();
  };

  /** Если мобильная версия, то оборачиваем */
  return isMobile() ?
    <div className='mobile-container'>
      <div className="mobile-container--relative" onClick={handleClick}>

        <div className='mobile-content'
          ref={content}
          style={styles}
          onClick={stopPropagationHandler}
          onTouchStart={checkOpenedModals}
          onTouchMoveCapture={onTouchMove}
          onTouchEnd={onTouchEnd}>

          <div className='mobile-content__line'/>
          {children}

        </div>
      </div>
    </div>
    :
    <> {children} </>;
};

export default ViewContainer;
