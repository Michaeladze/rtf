import { IUser } from '../_store/reducers/users-all.reducer';

export const _usersRequest: IUser = {
  sUserId: '123',
  sFirstName: 'Иван',
  sMiddleName: 'Иванович',
  sLastName: 'Териков',
  sFullName: 'Териков Иван Иванович',
  bIsMe: false,
  sIncomeComment:
    'Привет, Вань! Оцени меня плиз, после нашей встречи на итоговой встречи. Спасибо, бро!',
  sPhoto: '',
  bIsPinned: true,
  sTitle: 'Управляющий директор - начальник управления',
  bIsMyTeam: true
};
