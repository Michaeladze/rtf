import React from 'react';
import './ResultOfRatingPopup.scss';
import StandardButton from '../../../components/StandardButton';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';
import { recommendations } from '../../../_mocks/recommendations';
import { ReactComponent as ArrowIcon } from '../../../_assets/svg/arrow_back.svg';

interface IThankfulCommentPopupProps {
  onCancel: () => void;
  sName: string;
}

export const ResultOfRatingPopup: React.FC<IThankfulCommentPopupProps> = ({
  onCancel
}) => {
  const recommendationsList =
    recommendations &&
    recommendations.map((item: string) => (
      <li key={item} className='result-rating__recommendation'>
        {item}
      </li>
    ));

  // *******************************************************************************************************************

  return (
    <ActionPopup>
      <div className='result-rating__popup'>
        <div className='result-rating__top'>
          <h2 className='result-rating__title'>
            Поздравляем! <br />
            Вы прошли оценку
          </h2>
        </div>
        <div className='result-rating__content'>
          <h3 className='result-rating__title result-rating__title--content'>
            Результаты оценки
          </h3>

          <section className='result-rating__section'>
            <h4 className='result-rating__subtitle'>Уровень мастерства</h4>
            <span className='result-rating__position result-rating__position--yellow'>
              Middle
            </span>
            <ArrowIcon className='result-rating__arrow' />
            <span className='result-rating__position result-rating__position--green'>
              Senior
            </span>
          </section>

          <section className='result-rating__section'>
            <h4 className='result-rating__subtitle'>
              Рекомендация по развитию
            </h4>
            <ul className='result-rating__recommendations'>
              {recommendationsList}
            </ul>
          </section>
        </div>

        <form action=''>
          <textarea
            className='result-rating__input'
            placeholder='Добавить комментарий'
          />

          <StandardButton
            type='primary'
            handler={onCancel}
            value={'Поблагодарить'}
          />
        </form>
      </div>
    </ActionPopup>
  );
};
