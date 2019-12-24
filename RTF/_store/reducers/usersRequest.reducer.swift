//
//  usersRequest.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct usersRequestState: StateType {
    var collection = ""
    var status = ""
}

func usersRequestReducer(action: Action, state: usersRequestState?) -> usersRequestState {
    var state = state ?? usersRequestState()
    
    guard let action = action as? usersRequestActions else {
        return state
    }
    
    switch action {
    case .pendingGetUsersWithRequest:
        state.status = "[Pending] pendingGetUsersWithRequest"
        break;
    case .successGetUsersWithRequest:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetUsersWithRequest"
        break;
    }
    
    return state;
}
