import ReSwift
import ReSwiftThunk


struct MainState: StateType, Equatable {
    var users: UsersReducer<IUser> = UsersReducer<IUser>()

}


let thunksMiddleware: Middleware<MainState> = createThunksMiddleware()
let mainStore = Store(
        reducer: _mainReducer,
        state: MainState(),
        middleware: [thunksMiddleware]
)