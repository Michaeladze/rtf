import React, { useCallback, useEffect, useState } from 'react';
import './FeedbackActionBody.scss';
import { ICompetence, IIndicator } from '../../../_store/reducers/users-history.reducer';
import { FeedbackRecommendedList } from '../FeedbackRecommendedList/FeedbackRecommendedList';
import { PropertySearch } from '../PropertySearch/PropertySearch';
import {
  ChangePropertyFilter,
  GetRecommendedAttributes,
  GetRecommendedSkills
} from '../../../_store/actions/feedback-properties.action';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { IStore } from '../../../_store/store.interface';
import { breakpoints, customEqual } from '../../../_helpers/helpers';
import { competenceFilter, filterProperty } from '../filter-property';
import useReactRouter from 'use-react-router';
import FeedbackSkills from '../FeedbackSkills';
import FeedbackCompetences from '../FeedbackCompetences';

interface IFeedbackActionBodyProps {
  type: string;
  action: string;
  onClick: (property: IIndicator, competenceId?: string) => void;
}

export const FeedbackActionBody: React.FC<IFeedbackActionBodyProps> = ({ type, onClick, action }) => {
  const dispatch = useDispatch();
  const { match } = useReactRouter();
  /** ------------------------------------------------------------------------------------------------------------------
   * Показать больше навыков/атрибутов
   ------------------------------------------------------------------------------------------------------------------ */
  const [showRecommend, setShowRecommend] = useState(true);

  /** Активный юзер */
  const activeUser: IUser | null = useSelector((store: IStore) => store.users.activeUser, customEqual);

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);


  /** ------------------------------------------------------------------------------------------------------------------
   * Получение рекомендованных атрибутов/навыков по активному пользователю
   ------------------------------------------------------------------------------------------------------------------ */
  useEffect(() => {
    if (activeUser) {
      const userId = match.url.indexOf('request') >= 0 ? (loggedUser as IUser).sUserId : activeUser.sUserId;
      dispatch({ type: GetRecommendedAttributes.Pending, payload: userId });
      dispatch({ type: GetRecommendedSkills.Pending, payload: userId });
    }
  }, [activeUser,
    dispatch,
    loggedUser,
    match]);


  /** ----------------------------------------------------------------------------------------------------------------------
   * Получение данных из стора
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Полный список компетенций */
  const competences: ICompetence[] = useSelector((store: IStore) => store.properties.allCompetences, customEqual);

  /** Рекомендуемые атрибуты */
  const recommendedAttributes: IIndicator[] = useSelector(
    (store: IStore) => store.properties.recommendedAttributes, customEqual);

  /** Полный список навыков */
  const skills: IIndicator[] = useSelector((store: IStore) => store.properties.allSkills, customEqual);

  /** Рекомендуемые навыки */
  const recommendedSkills: IIndicator[] = useSelector(
    (store: IStore) => store.properties.recommendedSkills, customEqual);

  /** Получение фильтра значений */
  const propertyFilter: { searchString: string; type: string } | undefined = useSelector(
    (store: IStore) => store.properties.filter, customEqual);

  /** Применение фильтра для значений */
  const filterCompetences =
    propertyFilter && propertyFilter.type === 'attributes' ?
      competenceFilter(competences, propertyFilter.searchString) : competences;

  /** Применение фильтра для значений */
  const filterSkills =
    propertyFilter && propertyFilter.type === 'skills' ? filterProperty(skills, propertyFilter.searchString) : skills;


  /** ------------------------------------------------------------------------------------------------------------------
   * Отображение элементов
   ------------------------------------------------------------------------------------------------------------------ */
  /** Лейбл для соответствующего типа элемента */
  const label = type === 'skills' ? 'профессиональные навыки' : 'компетенции';

  /** Списки в зависимости от типа */
  const items = type === 'skills' ?
    <FeedbackSkills list={filterSkills} onPropertyClick={onClick}/> :
    <FeedbackCompetences list={filterCompetences} onPropertyClick={onClick}/>;

  /** Список всех рекомендуемых навыков/атрибутов */
  /** Скрываем рекомендуемые атрибуты на мобильных */
  const recAttributes = window.innerWidth > breakpoints.medium ? recommendedAttributes : '';
  const recommendedItems = type === 'skills' ? recommendedSkills : recAttributes;
  const recommendedItemsJSX = (recommendedItems && recommendedItems.length > 0 && showRecommend) ? (
    <>
      <div className='feedback-action__group-title'>
        <h4 className='feedback-action__group-title-text'>
          {type === 'skills' ? 'Проф. навыки из профиля' : 'Рекомендуемые'}
        </h4>
      </div>

      <div className='feedback-action__swiper'>
        <FeedbackRecommendedList onPropertyClick={onClick} list={recommendedItems} type={type}/>
      </div>
    </>
  ) : '';


  /** ------------------------------------------------------------------------------------------------------------------
   * Фильтр по названию
   ------------------------------------------------------------------------------------------------------------------ */
  const setFilter = useCallback((requestString: string) => {
    // Отображаем рекомендованное, если строка поиска пустая, и наоборот
    setShowRecommend(!requestString);

    // Устанавливаем фильтры
    dispatch({ type: ChangePropertyFilter.Set, payload: { filter: { type: type, searchString: requestString } } });
  }, [dispatch, type]);

  return (
    <>
      <p className='feedback-action__description'>
        {action === 'request' && `Выберите ${label}, по которым хотите запросить обратную связь`}
        {action === 'provide' && `Выберите ${label}, по которым хотите дать обратную связь, и укажите уровень от 1 до 10`}
      </p>

      <div className='feedback-action__search'><PropertySearch setFilter={setFilter}/></div>
      <div className='feedback-action__group'>{recommendedItemsJSX}</div>
      <div className='feedback-action__group'>
        {items}
      </div>
    </>
  );
};
