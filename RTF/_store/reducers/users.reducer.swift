//
//  users.swift
//  RTF
//
//  Created by Anton Elistratov on 24.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct usersState: StateType {
    var collection = ""
    var status = ""
}

func usersReducer(action: Action, state: usersState?) -> usersState {
    var state = state ?? usersState()
    
    guard let action = action as? usersActions else {
        return state
    }
    
    switch action {
    case .pendingGetMe:
        state.status = "[Pending] pendingGetMe"
        break;
    case .successGetMe:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetMe"
        break;
    case .pendingGetUserById:
        state.status = "[Pending] pendingGetUserById"
        break;
    case .pendingCurrentUser:
        state.status = "[Pending] pendingCurrentUser"
        break;
    case .setCurrentUser:
        state.status = "[Set] setCurrentUser"
        break;
    case .setActiveUser:
        state.status = "[Set] setActiveUser"
        break;
    case .setAssessmentsCount:
        state.status = "[Set] setAssessmentsCount"
        break;
    case .filterActiveList:
        state.status = "[Filter] filterActiveList"
        break;
    }
    
    return state;
}
