// import { IPropertyGroup } from '../_store/reducers/statisticsAll.reducer';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const _statisticsMocks = {
  aGroup: [
    {
      sGroupId: '1',
      sGroupName: 'Системное мышление и решение проблем',
      iAverage: getRandomInt(30, 100) / 10,
      aGroupItem: [
        {
          sGroupId: '11',
          sGroupName: 'Системное мышление и решение проблем',
          iAverage: getRandomInt(30, 100) / 10,
          iCountOtherUsers: getRandomInt(1, 100),
          iDynamic: getRandomInt(-30, 30) / 10,
          aTopUsers: [
            {
              sUserId: '00106169',
              sFirstName: 'Иван',
              sMiddleName: 'Иванович',
              sSecondName: 'Иванов',
              sFullName: 'Иван Иванович Иванов',
              sIncomeComment:
                'Почему рекрутеры не приглашают его на собеседования? Опыт работы в продажах у него серьезный — без малого 15 лет, есть высшее образование и даже степень MBA. А дело в том, что, составляя резюме, соискатель допустил весьма распространенную ошибку — сделал его слишком типичным. ' +
                'Резюме со списком типичных для данной должности обязанностей и достижений ничем не выделяется среди десятков или сотен аналогичных CV.',
              iRating: 4
            }
          ]
        },
        {
          sGroupId: '12',
          sGroupName: 'Управление результатом и ответственность',
          iAverage: getRandomInt(30, 100) / 10,
          iCountOtherUsers: getRandomInt(1, 100),
          iDynamic: getRandomInt(-30, 30) / 10,
          aTopUsers: [
            {
              sUserId: 'matvey',
              sFirstName: 'Иван',
              sMiddleName: 'Иванович',
              sSecondName: 'Иванов',
              sFullName: 'Иван Иванович Иванов',
              iRating: 4
            }
          ]
        },
        {
          sGroupId: '13',
          sGroupName: 'Сдержанность',
          iAverage: getRandomInt(30, 100) / 10,
          iCountOtherUsers: getRandomInt(1, 100),
          iDynamic: getRandomInt(-30, 30) / 10,
          aTopUsers: [
            {
              sUserId: 'mfsd',
              sFirstName: 'Иван',
              sMiddleName: 'Иванович',
              sSecondName: 'Иванов',
              sFullName: 'Иван Иванович Иванов',
              sTitle: 'Meneger',
              sIncomeComment:
                'Почему рекрутеры не приглашают его на собеседования? Опыт работы в продажах у него серьезный — без малого 15 лет, есть высшее образование и даже степень MBA. А дело в том, что, составляя резюме, соискатель допустил весьма распространенную ошибку — сделал его слишком типичным. ' +
                'Резюме со списком типичных для данной должности обязанностей и достижений ничем не выделяется среди десятков или сотен аналогичных CV.',
              iRating: 4
            },
            {
              sUserId: 'mat32vey',
              sFirstName: 'Иван',
              sMiddleName: 'Иванович',
              sSecondName: 'Иванов',
              sFullName: 'Иван Иванович Иванов',
              iRating: 4,
              sTitle: 'Meneger'
            },
            {
              sUserId: 'matv42ey',
              sFirstName: 'Иван',
              sMiddleName: 'Иванович',
              sSecondName: 'Иванов',
              sFullName: 'Иван Иванович Иванов',
              iRating: 4,
              sTitle: 'Meneger'
            }
          ]
        }
      ],
      aTopUsers: [
        {
          sUserId: 'matvey',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        },
        {
          sUserId: '170856',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        },
        {
          sUserId: 'matvey1',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        },
        {
          sUserId: 'matvey2',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        },
        {
          sUserId: 'matvey3',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        },
        {
          sUserId: 'matvey4',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        },
        {
          sUserId: 'matvey5',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        }
      ],
      iCountOtherUsers: getRandomInt(1, 100),
      iDynamic: getRandomInt(-30, 30) / 10
    },
    {
      sGroupId: '2',
      sGroupName: 'Инновационность и Digital- навыки ',
      iAverage: getRandomInt(30, 100) / 10,
      aTopUsers: [
        {
          sUserId: 'matvey',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        }
      ],
      iCountOtherUsers: getRandomInt(1, 100),
      iDynamic: getRandomInt(-30, 30) / 10
    },
    {
      sGroupId: '3',
      sGroupName: 'Управление результатом и ответсвенность',
      iAverage: getRandomInt(30, 100) / 10,
      aTopUsers: [
        {
          sUserId: 'matvey',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        }
      ],
      iCountOtherUsers: getRandomInt(1, 100),
      iDynamic: getRandomInt(-30, 30) / 10
    },
    {
      sGroupId: '4',
      sGroupName: 'Клиентоцентричность',
      iAverage: getRandomInt(30, 100) / 10,
      aTopUsers: [
        {
          sUserId: 'matvey',
          sFirstName: 'Иван',
          sMiddleName: 'Иванович',
          sSecondName: 'Иванов',
          sFullName: 'Иван Иванович Иванов'
        }
      ],
      iCountOtherUsers: getRandomInt(1, 100),
      iDynamic: getRandomInt(-30, 30) / 10
    },
    {
      sGroupId: '5',
      sGroupName: 'Развитие команд и сотрудников',
      iAverage: getRandomInt(30, 100) / 10,
      aTopUsers: [],
      iCountOtherUsers: getRandomInt(1, 100),
      iDynamic: getRandomInt(-30, 30) / 10
    },
    {
      sGroupId: '6',
      sGroupName: 'Управление собой',
      iAverage: getRandomInt(30, 100) / 10,
      aTopUsers: [],
      iCountOtherUsers: getRandomInt(1, 100),
      iDynamic: getRandomInt(-30, 30) / 10
    }
  ]
};

export const _statisticsAsideMock: any= [
  {
    sId: '6fklk1',
    sName: 'Сильные стороны',
    aProperty: [
      {
        sId: 'ewe33',
        sName: 'Атрибуты',
        aListProperty: [
          {
            sId: '246vf5',
            sName: 'Уровень экспертизы в SAP',
            iRating: 7.4
          },
          {
            sId: '2wb46v5',
            sName: 'Любознательность',
            iRating: 7.4
          }
        ]
      },
      {
        sId: 'ewe33',
        sName: 'Навыки',
        aListProperty: [
          {
            sId: '246fv5',
            sName: 'Уровень экспертизы в SAP',
            iRating: 7.4
          },
          {
            sId: '24f6v5',
            sName: 'Любознательность',
            iRating: 7.4
          }
        ]
      }
    ]
  },
  {
    sId: '123ww',
    sName: 'Зоны развития',
    aProperty: [
      {
        sId: 'ewefdfds33',
        sName: 'Атрибуты',
        aListProperty: [
          {
            sId: '246vwqv5',
            sName: 'Уровень экспертизы в SAP',
            iRating: 1.4
          },
          {
            sId: '246vdsd5',
            sName: 'Любознательность',
            iRating: 3.4
          }
        ]
      },
      {
        sId: 'ewe00033',
        sName: 'Навыки',
        aListProperty: [
          {
            sId: '246dsdv5',
            sName: 'Уровень экспертизы в SAP',
            iRating: 1.4
          },
          {
            sId: '246sdf22v5',
            sName: 'Любознательность',
            iRating: 1.4
          }
        ]
      }
    ]
  },
  {
    sId: '123ww11',

    sName: 'За последние 7 дней:',
    aProperty: [
      {
        sId: 'ewedfeger33',
        sName: 'Обратная связь',
        aListProperty: [
          {
            sId: '24232323',
            sName: 'Исходящих оценок',
            iRating: 24
          },
          {
            sId: '3223236c',
            sName: 'Входящих',
            iRating: 34
          }
        ]
      },
      {
        sId: 'ewefsdfsdf333',
        sName: 'Благодарности',
        aListProperty: [
          {
            sId: '3423ve',
            sName: 'Вас пока никто не поблагодарил',
            iRating: 1
          },
          {
            sId: '43dfdf',
            sName: 'Выданных благодарности',
            iRating: 4
          }
        ]
      }
    ]
  },
];

