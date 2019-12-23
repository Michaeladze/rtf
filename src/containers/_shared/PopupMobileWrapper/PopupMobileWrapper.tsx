import React, { useState } from 'react';
import './PopupMobileWrapper.scss';
import { breakpoints } from '../../../_helpers/helpers';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  handleClose: () => void;
}

const PopupMobileWrapper: React.FC<IProps> = ({ children, handleClose }) => {

  /** Расстояние, которое нужно просвайпить для закрытия */
  const DISTANCE = -70;

  /** Расстояние тача */
  const [delta, setDelta] = useState(0);
  /** Координата начала тача для закрытия страницы */
  const [firstTouch, setFirstTouch] = useState<number | undefined>(undefined);
  /** Флаг говорит, если handleClose запущен */
  const [toggleClose, setToggleClose] = useState<boolean>(false);

  /** Свайп вниз */
  const onTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();

    /** Считаем перемещение тача */
    if (!firstTouch) {
      setFirstTouch(e.touches[0].pageY);
    }
    setDelta((firstTouch as number) - e.touches[0].pageY);

    if (!toggleClose && delta < DISTANCE) {
      setToggleClose(true);
      handleClose();

      /** При закрытии попапа через 500мс возвращаем флаги в исходное положение */
      setTimeout(() => {
        setToggleClose(false);
        setDelta(0);
        setFirstTouch(undefined);
      }, 500);
    }
  };

  /** Отпускаем тач - сбрасываем стартовую координату */
  const onTouchEnd = () => {
    setFirstTouch(undefined);
    setDelta(0);
  };

  return (
    window.innerWidth > breakpoints.medium ? <> {children} </> :
      <div className='popup-mobile__wrapper'
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <div className='mobile-content__line'/>
        {children}
      </div>
  );
};

export default PopupMobileWrapper;
