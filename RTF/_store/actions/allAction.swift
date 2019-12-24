import ReSwift
enum AllActions: Action  {
//получение пользователей
    case GetUsersPending
    case GetUsersSuccess(users: [IUser])
}

