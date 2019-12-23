import React, { useCallback, useEffect, useState } from 'react';
import './AddAttributesPopup.scss';
import { ICompetence, IIndicator } from '../../../_store/reducers/users-history.reducer';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';
import { SearchAttributeItem } from './SearchAttributeItem/SearchAttributeItem';
import SearchPopup from './SearchPopup/SearchPopup';
import {
  GetAllCompetences,
  GetAllSkills, GetRecommendedAttributes,
  GetRecommendedSkills
} from '../../../_store/actions/feedback-properties.action';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { customEqual } from '../../../_helpers/helpers';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import SearchCompetence from './SearchCompetence';

interface IAddColleagueToFavPopupProps {
  activeIndicators: IIndicator[] | undefined;
  type: string;
}

export const AddAttributesPopup: React.FC<IAddColleagueToFavPopupProps> = React.memo(
  ({ type, activeIndicators }) => {
    const dispatch = useDispatch();

    useEffect(() => {
      type === 'attributes' ?
        dispatch({ type: GetAllCompetences.Pending }) :
        dispatch({ type: GetAllSkills.Pending });
    }, [dispatch, type]);

    /** Активный юзер */
    const activeUser: IUser | null = useSelector((store: IStore) => store.users.activeUser, customEqual);

    /** Получение рекомендованных атрибутов/навыков по активному пользователю */
    useEffect(() => {
      if (activeUser) {
        type === 'attributes' ?
          dispatch({ type: GetRecommendedAttributes.Pending, payload: activeUser.sUserId }) :
          dispatch({ type: GetRecommendedSkills.Pending, payload: activeUser.sUserId });
      }
    }, [type, activeUser, dispatch]);

    /** Скрыть рекомендуемое при поиске */
    const [showRecommend, setShowRecommend] = useState(true);

    /** ---------------------------------------------------------------------------------------------------------------
     * Получение данных из стора
     --------------------------------------------------------------------------------------------------------------- */
    /** Полный список компетенций */
    const competences: ICompetence[] = useSelector((store: IStore) => store.properties.allCompetences, customEqual);

    /** Рекомендуемые атрибуты */
    const recommendedAttributes: IIndicator[] = useSelector((store: IStore) => store.properties.recommendedAttributes,
      customEqual
    );

    /** Полный список навыков */
    const skills: IIndicator[] = useSelector((store: IStore) => store.properties.allSkills, customEqual);

    /** Рекомендуемые навыки */
    const recommendedSkills: IIndicator[] = useSelector((store: IStore) => store.properties.recommendedSkills,
      customEqual
    );

    /** ---------------------------------------------------------------------------------------------------------------
     * Индексы активных элементов
     --------------------------------------------------------------------------------------------------------------- */
    const [activeIndexes, setActiveIndexes] = useState([] as string[]);
    useEffect(() => {
      if (activeIndicators) {
        setActiveIndexes(activeIndicators.map((el) => el.sId));
      }
    }, [activeIndicators]);

    /** ---------------------------------------------------------------------------------------------------------------
     * Навыки
     --------------------------------------------------------------------------------------------------------------- */
    const [filteredSkills, setFilteredSkills] = useState(skills);

    /** Все навыки, кроме уже выбранных */
    useEffect(() => {
      if (skills && skills.length > 0) {
        setFilteredSkills(skills.filter((item) => activeIndexes && activeIndexes.indexOf(item.sId) < 0));
      }
    }, [activeIndexes, skills]);

    /** Отображение доступных для добавления навыков */
    const allSkillsJSX = filteredSkills && filteredSkills.length > 0 && filteredSkills.map((item: IIndicator) => (
      <SearchAttributeItem type={type} item={item} key={item.sId} selectedProperties={activeIndicators}/>
    ));

    /** ---------------------------------------------------------------------------------------------------------------
     * Компетенции
     --------------------------------------------------------------------------------------------------------------- */
    const [filteredCompetences, setFilteredCompetences] = useState(competences);
    /** Все компетенции, кроме уже выбранных */
    useEffect(() => {
      if (competences && competences.length > 0) {
        setFilteredCompetences(
          competences.map((el: ICompetence) => {
            return {
              ...el,
              aAttributes: el.aAttributes && el.aAttributes.filter((elem) =>
                activeIndexes && activeIndexes.indexOf(elem.sId) < 0)
            }
          })
        )
      }
    }, [activeIndexes, competences]);

    /** Отображение доступных для добавления компетенций */
    const allCompetencesJSX = filteredCompetences && filteredCompetences.length > 0 &&
      filteredCompetences.map((item: ICompetence) => (
        item.aAttributes && item.aAttributes.length > 0 ?
          <SearchCompetence competence={item} key={item.sId} activeIndicators={activeIndicators}/> : ''
      ));

    const itemsAllJSX = type === 'attributes' ? allCompetencesJSX : allSkillsJSX;

    /** ---------------------------------------------------------------------------------------------------------------
     * Рекомендоавнные навыки или атрибуты
     --------------------------------------------------------------------------------------------------------------- */
    const recommendedItems = type === 'attributes' ? recommendedAttributes : recommendedSkills;

    const itemsRecommendJSX = recommendedItems && recommendedItems.length > 0 &&
      recommendedItems.map((item: IIndicator) => (
        <SearchAttributeItem type={type} item={item} key={item.sId} selectedProperties={activeIndicators}/>
      ));

    const recommendJSX = showRecommend ?
      <>
        <h4 className='add-attribute__title'>Рекомендуемые</h4>
        <div className='add-attribute__group'>
          <ul className='add-attribute__list'>{itemsRecommendJSX}</ul>
        </div>
      </> : '';

    /** ---------------------------------------------------------------------------------------------------------------
     * Обработка фильтра
     --------------------------------------------------------------------------------------------------------------- */
    const handleFilter = useCallback((str: string) => {
      // Отображаем рекомендованное, если строка поиска пустая, и наоборот
      setShowRecommend(!str);

      if (type === 'attributes') {
        setFilteredCompetences(() => competences.map((el: ICompetence) => {
          if (!str) {
            return {
              ...el,
              aAttributes: el.aAttributes && el.aAttributes.filter((elem) =>
                activeIndexes && activeIndexes.indexOf(elem.sId) < 0)
            }
          }

          return {
            ...el,
            aAttributes: el.aAttributes && el.aAttributes.filter((elem) =>
              (activeIndexes && activeIndexes.indexOf(elem.sId) < 0
                ? elem.sName.toLowerCase().includes(str.toLowerCase()) : false))
          }
        }))
      } else {
        setFilteredSkills(skills.filter((e) => {
          if (!str) {
            return activeIndexes && activeIndexes.indexOf(e.sId) < 0;
          }

          return e && e.sName && activeIndexes && activeIndexes.indexOf(e.sId) < 0
            ? e.sName.toLowerCase().includes(str.toLowerCase()) : false;
        }));
      }
    }, [type,
      competences,
      activeIndexes,
      skills]);

    /** ---------------------------------------------------------------------------------------------------------------
     * Обработка тач скролла
     --------------------------------------------------------------------------------------------------------------- */
    const onTouchMove = (e: React.TouchEvent) => {
      /** В этом попапе скролл происходит в этом контейнере */
      const scrollView = (e.currentTarget.parentNode as HTMLDivElement).parentNode as HTMLDivElement;
      if (scrollView.scrollTop > 0) {
        e.stopPropagation();
      }
    };

    /** ---------------------------------------------------------------------------------------------------------------
     * Заголовки
     --------------------------------------------------------------------------------------------------------------- */
    const popupTitle = type === 'attributes' ? 'Добавить атрибут' : 'Добавить проф. навык';
    const sectionTitle = type === 'attributes' ? 'Все атрибуты' : 'Все проф. навыки';

    // ****************************************************************************************************************

    return (
      <div style={{ height: '100%' }} onTouchMove={onTouchMove}>
        <ActionPopup titleText={popupTitle}>
          <div className='add-attribute'>
            <SearchPopup setFilter={handleFilter}/>
            {recommendJSX}

            <h4 className='add-attribute__title'>{sectionTitle}</h4>

            <div className='add-attribute__group'>
              <ul className='add-attribute__list'>{itemsAllJSX}</ul>
            </div>
          </div>
        </ActionPopup>
      </div>
    );
  });

export default AddAttributesPopup;
