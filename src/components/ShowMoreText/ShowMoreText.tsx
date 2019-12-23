import React, { useState } from 'react';
import './ShowMoreText.scss';
import { getShortName } from '../../_helpers/helpers';

interface IShowMoreText {
  text: string;
  textLength: number;
}

const ShowMoreText: React.FC<IShowMoreText> = ({ text, textLength }) => {
  /** Показать/скрыть элементы */
  const [isShowing, setToggle] = useState(false);

  /** Кнопка показать/скрыть комментарий */
  const showMore = () => {
    setToggle(!isShowing);
  };

  const showTextJSX =
    text.length > textLength ? (
      <span className='show-more__title' onClick={showMore}>
        {isShowing ? ' Скрыть' : ' Показать'}
      </span>
    ) : null;

  const showMoreTextJSX =
    !isShowing && text ? (
      <p className='show-more__text'>
        {text ? getShortName(text, textLength) : ''} {showTextJSX}
      </p>
    ) : (
      <p className='show-more__text'>
        {text}
        {showTextJSX}
      </p>
    );

  return <>{showMoreTextJSX}</>;
};
export default ShowMoreText;
