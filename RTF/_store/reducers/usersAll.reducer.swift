//
//  usersAll.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct usersAllState: StateType {
    var collection = ""
    var status = ""
}

func usersAllReducer(action: Action, state: usersAllState?) -> usersAllState {
    var state = state ?? usersAllState()
    
    guard let action = action as? usersAllActions else {
        return state
    }
    
    switch action {
    case .pendingGetAllUsers:
        state.status = "[Pending] pendingGetAllUsers"
        break;
    case .successGetAllUsers:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetAllUsers"
        break;
    }
    
    return state;
}
