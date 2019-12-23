import { IStringMap } from '../_helpers/socket';
import { IUser } from '../_store/reducers/users-all.reducer';
import { IIncomeRatings } from '../_store/reducers/users-history.reducer';

export const _userHistory: IUser[] = [
  {
    sUserId: 'matvey',
    sFirstName: 'Матвей',
    sMiddleName: 'Иванович',
    sLastName: 'Доможаков',
    sFullName: 'Доможаков Матвей Иванович',
    sTitle: 'Управляющий директор - начальник управления'
  },
  {
    sUserId: '123',
    sFirstName: 'Иван',
    sMiddleName: 'Иванович',
    sLastName: 'Териков',
    sFullName: 'Териков Иван Иванович',
    sTitle: 'Управляющий директор - начальник управления'
  }
];

export const _historyByUser: IStringMap<IIncomeRatings> = {
  matvey: {
    sUserId: 'matvey',
    aNotifications: [
      {
        sDateTime: '1565449200000',
        aCompetences: [
          {
            sId: '1',
            sName: 'Атрибуты компетенций',
            aAttributes: [
              {
                sId: '1',
                sName: 'Sketch',
                iRating: 10,
                sComment:
                  'Колоссально справляешься с SAP-ом, просто всех раскидал вчера на встрече!'
              },
              {
                sId: '2',
                sName: 'Adobe Photoshop',
                iRating: 5,
                sComment: ''
              }
            ]
          },
          {
            sId: '2',
            sName: 'Навыки',
            aAttributes: [
              {
                sId: '1',
                sName: 'Sketch',
                iRating: 10,
                sComment: ''
              }
            ]
          }
        ]
      },
      {
        sDateTime: '1565449200000',
        aCompetences: [
          {
            sId: '1',
            sName: 'Атрибуты компетенций',
            aAttributes: [
              {
                sId: '1',
                sName: 'Sketch',
                iRating: 10,
                sComment:
                  'Колоссально справляешься с SAP-ом, просто всех раскидал вчера на встрече!'
              },
              {
                sId: '2',
                sName: 'Adobe Photoshop',
                iRating: 5,
                sComment: ''
              }
            ]
          },
          {
            sId: '2',
            sName: 'Навыки',
            aAttributes: [
              {
                sId: '1',
                sName: 'Sketch',
                iRating: 10,
                sComment: ''
              }
            ]
          }
        ]
      },
      {
        sDateTime: '1565449200000',
        aProject: [
          {
            sId: '1',
            sName: 'Автор недоумевает',
            iRating: 5,
            sComment: 'Отличный проект! Классно все сделал, заказчик доволен!',
            sTitle: 'Автор недоумевает',
            sText:
              'Автор недоумевает: почему рекрутеры не приглашают его на собеседования? Опыт работы в продажах у него серьезный — без малого 15 лет, есть высшее образование и даже степень MBA. А дело в том, что, составляя резюме, соискатель допустил весьма.почему рекрутеры не приглашают его на собеседования? Опыт работы в продажах у него серьезный — без малого 15 лет, есть высшее образование и даже степень MBA. А дело в том, что, составляя резюме, соискатель допустил весьма.'
          }
        ]
      }
    ]
  },
  123: {
    sUserId: '123',
    aNotifications: [
      {
        sDateTime: '1565449200000',
        aCompetences: [
          {
            sId: '1',
            sName: 'Атрибуты компетенций',
            aAttributes: [
              {
                sId: '1',
                sName: 'JavaScript',
                iRating: 10,
                sComment: 'Отлично владеет JS'
              },
              {
                sId: '2',
                sName: 'Sap Hana',
                iRating: 8,
                sComment: 'глып глоп'
              }
            ]
          },
          {
            sId: '2',
            sName: 'Навыки',
            aAttributes: [
              {
                sId: '1',
                sName: 'Java Core',
                iRating: 10,
                sComment: 'Алгоритмы и структуры осетинских пирогов'
              }
            ]
          }
        ]
      }
    ]
  }
};
