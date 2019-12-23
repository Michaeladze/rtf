import { IUser } from '../_store/reducers/users-all.reducer';

export const _feedbackUsersMock: IUser[] = [
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
    bIsMyTeam: true
  },
  {
    sUserId: '2',
    sFirstName: 'Лилия',
    sMiddleName: 'Петровна',
    sLastName: 'Петрова',
    sFullName: 'Петрова Лилия Петровна',
    bIsMe: false,
    sPhoto: '',
    sTitle: 'Управляющий директор - начальник управления'
  },
  {
    sUserId: '3',
    sFirstName: 'Константин',
    sMiddleName: 'Константинович',
    sLastName: 'Константинов',
    sFullName: 'Константинов Константин Константинович',
    bIsMe: false,
    sPhoto: '',
    sTitle: 'Управляющий директор - начальник управления',
    bIsMyTeam: true
  }
];
