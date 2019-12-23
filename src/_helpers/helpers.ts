/** Функция для округления числа
 *  @param value - число, которое нужно преобразовать
 *  @param decimalNumber - количество знаков после запятой
 * */
import { RefObject, useCallback, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { sendNotification } from '../react_shared/components/notifications/notification';

export function formatDecimal(value: number, decimalNumber: number): number {
  return Number(value.toFixed(decimalNumber));
}

/** Функция для добавления окончаний к месяцам
 * @param value - имя месяца
 * */
export const getMonthName = (value: string) => {
  if (value) {
    const arr: string[] = value.split('');
    let result;
    const month = [
      'январь',
      'февраль',
      'апрель',
      'май',
      'июнь',
      'июль',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь'
    ];

    if (month.indexOf(value) !== -1) {
      arr.splice(arr.length - 1, 1, 'я');
      result = arr.join('');
      return result;
    }

    arr.push('а');
    result = arr.join('');
    return result;
  }

  return '';
};

/** Функция для форматирования даты
 *  @param date - дата, которую нужно преобразовать
 * */
export function formatDate(date: string | number) {
  const tempDate = new Date(Number(date));
  const sMonth = getMonthName(
    [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь'
    ][tempDate.getMonth()]
  );
  const sMonthShort = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сент',
    'окт',
    'нояб',
    'дек'
  ][tempDate.getMonth()];
  const iDayOfMonth = tempDate.getDate();
  const sDayOfWeek = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ][tempDate.getDay()];
  let tempHour = tempDate.getHours();
  // const sPartOfDay = tempHour >= 12 ? 'pm' : 'am';
  // tempHour = tempHour % 12;
  const sHour = tempHour < 10 ? `0${tempHour}` : tempHour.toString();
  const tempMinutes = tempDate.getMinutes();
  const sMinutes =
    tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes.toString();
  const sYear = tempDate.getFullYear();

  return {
    sMonth,
    iDayOfMonth,
    sDayOfWeek,
    sHour,
    // sPartOfDay,
    sMinutes,
    sYear,
    sMonthShort
  };
}

export const customEqual = <TYPE>(a: TYPE, b: TYPE) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/** Функция сокращения длинных имен
 * @param text - строка, которую нужно сократить
 * @param n - количество видимых символов
 * @param symbol - символ, который нужно поставить в конце строки */
export const getShortName = (text: string, n: number = 20, symbol: string = '...') => {
  let result = '';
  let tmpArr = Array.from(text);
  let tmpArr2 = [];

  if (n > tmpArr.length) {
    result = text;
  } else {
    tmpArr2 = tmpArr.slice(0, n);
    result = `${tmpArr2.join('')}${symbol}`;
  }

  return result;
};

/** Всегда оборачивайте хандлер в useCallback! */
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e?: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      event.stopPropagation();

      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };
    // console.log('add');
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      // console.log('remove');
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Hook возвращает объект с шириной и высотой окна при вызове + при изменении размеров окна ререндерит компонент
export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export const breakpoints = {
  xSmall: 320,
  small: 480,
  medium: 659,
  large: 1024,
  xLarge: 1140,
  xxLarge: 1400
};

/** Функция для анимирования скрытия попапов и мобильных страниц */
export const animateExit = (callback: () => void) => {
  const modals = document.querySelectorAll('.ant-modal-body');
  const modal = modals[modals.length - 1];

  if (window.innerWidth && window.innerWidth < breakpoints.medium && modal) {
    modal.classList.add('hide');

    setTimeout(() => {
      modal.classList.remove('hide');
    }, 250);
  }

  setTimeout(() => {
    callback();
  }, 250);
};

/** Функция возвращает true, если мобильная версия */
export const isMobile = (): boolean => {
  return window.innerWidth <= breakpoints.medium;
};

/** Ссылки на проекты */
export const links = {
  profileProd: 'https://smartcareerprofile-j237750ea.dispatcher.ru1.hana.ondemand.com/#/',
  bwProd: 'https://feedback-j237750ea.dispatcher.ru1.hana.ondemand.com/#/',
  smartIPR: 'https://smartcareer-j237750ea.dispatcher.ru1.hana.ondemand.com/#/goals',
  feedBack: 'https://rtf-j237750ea.dispatcher.ru1.hana.ondemand.com/#/',
  projects: 'https://rtfachievements-j237750ea.dispatcher.ru1.hana.ondemand.com/#/my-projects'
};

/** Хук для подгрузки данных по скроллу */
export const useLazyLoad = (container: HTMLDivElement | null, callback: () => void, direction?: string) => {

  /** При скролле следим, если дошли до низа страницы, запускаем функцию callback() */
  useEffect(() => {
    if (container && callback) {
      const sub = fromEvent(container, 'scroll')
        .pipe(
          map((e: Event) => e.currentTarget as HTMLDivElement),
          debounceTime(300)
        )
        .subscribe((e: HTMLDivElement) => {
          direction === 'horizontal' ?
            ((e.scrollWidth - e.scrollLeft === e.clientWidth) && callback()) :
            ((e.scrollHeight - e.scrollTop === e.clientHeight) && callback());
        });
      return () => sub.unsubscribe();
    }
  }, [container, callback]);

};

/** Валидация формы обратной связи */
export const validateExtension = (
  value: string,
  validArray: string[]
): boolean => {
  let _validFileExtensions: string[] = validArray;
  let currentFileExtension: string = value.split('.')[
    value.split('.').length - 1
  ];
  let isValid =
    _validFileExtensions.indexOf(currentFileExtension.toLocaleLowerCase()) >= 0;
  if (!isValid) {
    sendNotification({
      sMessage: `Разрешены только следующие расширения для файлов: ${validArray.join()}`,
      iStatus: 0
    });
  }
  return isValid;
};

/** Валидация формы обратной связи */
export const validateSize = (
  value: number,
  maxSize: number,
  maxSizeString: string
) => {
  let isValid = value < maxSize;

  if (!isValid) {
    sendNotification({
      sMessage: `Превышен максимальный размер файла в ${maxSizeString}`,
      iStatus: 0
    });
  }
  return isValid;
};


/** Склонение существительных
 * @param n - число
 * @param one - количественная группа
 * @param two - количественная группа
 * @param five - количественная группа
 * @example getNoun(12, 'сотрудник', 'сотрудника', 'сотрудников') вернет 'сотрудников'
 * */
export const getNoun = (n: number, one: string, two: string, five: string) => {
  n = Math.abs(n);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;
  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
};
