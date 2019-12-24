//
//  thanks.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct thanksState: StateType {
    var collection = ""
    var status = ""
}

func thanksReducer(action: Action, state: thanksState?) -> thanksState {
    var state = state ?? thanksState()
    
    guard let action = action as? thanksActions else {
        return state
    }
    
    switch action {
    case .pendingGetThanksCount:
        state.status = "[Pending] pendingGetThanksCount"
        break;
    case .successGetThanksCount:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetThanksCount"
        break;
    case .pendingAddThank:
        state.status = "[Pending] pendingAddThank"
        break;
    case .successAddThank:
        state.status = "[Success] successAddThank"
        break;
    case .pendingAddThanksForProjectAssessment:
        state.status = "[Pending] pendingAddThanksForProjectAssessment"
        break;
    case .successAddThanksForProjectAssessment:
        state.status = "[Success] successAddThanksForProjectAssessment"
        break;
    }
    
    return state;
}
