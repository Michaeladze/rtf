import { IIndicator } from '../../_store/reducers/users-history.reducer';
import { IAttributesSkills } from '../../_store/reducers/statisticsAll.reducer';

/** Функция для фильтрации атрибутов
 * @param properties - список значений для фильтрации
 * @param filter - строка со значением фильтра */
export const filterProperty = (properties: IIndicator[], filter: string) => {
  if (properties) {
    try {
      return properties.filter((property: IIndicator) => {
        let result = true;

        result = result && property.sName !== undefined &&
          (property.sName.toLowerCase().includes(filter.toLowerCase()));

        return result;
      });

    } catch (e) {
      return properties;
    }
  }

  return [];
};

/** Фильтр компетенций
 * @param competences - список компетенций для фильтрации
 * @param filter - строка со значением фильтра */
export const competenceFilter = (competences: any, filter: string) => {
  if (competences) {
    try {
      return competences.map((el: any) => {
        return {
          ...el,
          aAttributes: el.aAttributes && el.aAttributes.filter((elem: any) => {
            let result = true;

            result = result && elem.sName !== undefined &&
              (elem.sName.toLowerCase().includes(filter.toLowerCase()));

            return result;
          })
        }
      });
    } catch (e) {
      return competences;
    }
  }

  return [];
};


/** Фильтр навыков в статистике
 * @param skills - список навыков для фильтрации
 * @param filter - строка со значением фильтра */
export const filterStatSkills = (skills: IAttributesSkills[], filter: string) => {
  if (skills) {
    try {
      return skills.filter((skill: IAttributesSkills) => {
        let result = true;

        result = result && skill.oSkill && skill.oSkill.sName !== undefined &&
          (skill.oSkill.sName.toLowerCase().includes(filter.toLowerCase()));

        return result;
      });

    } catch (e) {
      return skills;
    }
  }

  return [];
};
