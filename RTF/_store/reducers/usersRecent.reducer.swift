//
//  usersRecent.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct usersRecentState: StateType {
    var collection:[IUser] = []
    var status = ""
}

func usersRecentReducer(action: Action, state: usersRecentState?) -> usersRecentState {
    var state = state ?? usersRecentState()
    
    guard let action = action as? usersRecentActions else {
        return state
    }
    print("red" ,action)
    switch action {
    case .pendingGetRecentUsers:
        state.status = "[Pending] pendingGetRecentUsers"
        break;
    case .successGetRecentUsers(let users):
        state.collection = users;
        state.status = "[Success] successGetRecentUsers"
        break;
    case .pendingPinForRecent:
        state.status = "[Pending] pendingPinForRecent"
        break;
    case .successPinForRecent:
        state.status = "[Success] successPinForRecent"
        break;
    case .pendingDeleteFromRecent:
        state.status = "[Pending] pendingDeleteFromRecent"
        break;
    case .successDeleteFromRecent:
        state.status = "[Success] successDeleteFromRecent"
        break;
    case .successUpdateRecentFlag:
        state.status = "[Success] successUpdateRecentFlag"
        break;
    }
    
    return state;
}
