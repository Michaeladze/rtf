import { IUser } from '../_store/reducers/users-all.reducer';

export const homeHeaderMock = {
  aLikes: [
    'matvey',
    '00106224',
    '00106226',
    'sbrf316254',
    'sbrf316254',
    '123456'
  ],
  aLiked: ['matvey', 'sbrf316254']
};

export const homeInboxMock: IUser[] = [
  {
    sUserId: 'matvey',
    sFirstName: 'Матвей',
    sMiddleName: 'Иванович',
    sLastName: 'Доможаков',
    sFullName: 'Доможаков Матвей Иванович',
    bIsMe: false,
    sPhoto: '',
    sTitle: 'Управляющий директор - начальник управления',
    bTypeEstimate: false,
    sStatus: 'INBOX',
    iIncomeRates: 7,
    iIncomeRequests: 3
  },
  {
    sUserId: '123',
    sFirstName: 'Иван',
    sMiddleName: 'Иванович',
    sLastName: 'Териков',
    sFullName: 'Териков Иван Иванович',
    bIsMe: false,
    sPhoto: '',
    bIsPinned: true,
    sTitle: 'Управляющий директор - начальник управления',
    bIsMyTeam: true,
    bTypeEstimate: false,
    sStatus: 'INBOX',
    iIncomeRates: 7,
    iIncomeRequests: 3
  },
  {
    sUserId: '111111',
    sFirstName: 'Михаил',
    sMiddleName: 'Тамазиевич',
    sLastName: 'Кутатеаладзе',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 7,
    iIncomeRequests: 3
  },
  {
    sUserId: '222222',
    sFirstName: 'Пугачев',
    sMiddleName: 'Александрович',
    sLastName: 'Антон',
    sFullName: 'Пугачев Антон Александрович',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 0,
    iIncomeRequests: 0
  },
  {
    sUserId: '3333333',
    sFirstName: 'Михаил',
    sMiddleName: 'Отчествович',
    sLastName: 'Фамильер',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '444444',
    sFirstName: 'Георгий',
    sMiddleName: 'Отчествович',
    sLastName: 'Фамильер',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '555555',
    sFirstName: 'Арсений',
    sMiddleName: 'Отчествович',
    sLastName: 'Фамильер',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '666666',
    sFirstName: 'Михаил',
    sMiddleName: 'Тамазиевич',
    sLastName: 'Кутатеаладзе',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '777777',
    sFirstName: 'Пугачев',
    sMiddleName: 'Александрович',
    sLastName: 'Антон',
    sFullName: 'Пугачев Антон Александрович',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '888888',
    sFirstName: 'Михаил',
    sMiddleName: 'Отчествович',
    sLastName: 'Фамильер',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '999999',
    sFirstName: 'Георгий',
    sMiddleName: 'Отчествович',
    sLastName: 'Фамильер',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  },
  {
    sUserId: '101010',
    sFirstName: 'Арсений',
    sMiddleName: 'Отчествович',
    sLastName: 'Фамильер',
    sFullName: 'Кутателадзе Михаил Тамазиевич',
    sTitle: 'Главный ИТ Инжнер',
    sStatus: 'INBOX',
    iIncomeRates: 5,
    iIncomeRequests: 6
  }
];
