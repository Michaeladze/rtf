import ReSwift
import ReSwiftThunk



func _mainReducer(action: Action, state: MainState?) -> MainState {
    var state = state ?? MainState()
    guard let action = action as? AllActions else {
        return state
    }

    switch action {
    case AllActions.GetUsersSuccess(let users):
        state.users.setCollection(values: users)
    case AllActions.GetUsersPending:
        state.users.loading = true
    }
    return state

}