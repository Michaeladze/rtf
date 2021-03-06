//
//  subordinates.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct subordinatesState: StateType {
    var collection = ""
    var status = ""
}

func subordinatesReducer(action: Action, state: subordinatesState?) -> subordinatesState {
    var state = state ?? subordinatesState()
    
    guard let action = action as? subordinatesActions else {
        return state
    }
    
    switch action {
    case .pendingGetSubordinates:
        state.status = "[Pending] pendingGetBoss"
        break;
    case .successGetSubordinates:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetBoss"
        break;
    case .setClearSubordinatesList:
        state.status = "[Set] setClearSubordinatesList"
        break;
    }
    
    return state;
}
