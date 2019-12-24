import ReSwift
import ReSwiftThunk


let GetUsersPendingThunk = Thunk<MainState> { dispatch, getState in
    guard let state = getState() else { return }
     print(state)

    UserServiceClass().getUsers(){ result in
        guard let result = result else { return }

        DispatchQueue.main.async {
            dispatch(
                    AllActions.GetUsersSuccess(
                            users: result.users
                    )
            )
        }
    }

//    if case .searching = state.search {
//        dispatch(fetchSearchMoviesPage)
//    } else {
//        dispatch(fetchNextUpcomingMoviesPage)
//    }
}
