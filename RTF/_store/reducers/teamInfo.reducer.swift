//
//  teamInfo.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct teamInfoState: StateType {
    var collection = ""
    var status = ""
}

func teamInfoReducer(action: Action, state: teamInfoState?) -> teamInfoState {
    var state = state ?? teamInfoState()
    
    guard let action = action as? teamInfoActions else {
        return state
    }
    
    switch action {
    case .pendingGetTeamInfo:
        state.status = "[Pending] pendingGetTeamInfo"
        break;
    case .successGetTeamInfo:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetBoss"
        break;
    case .setClearTeamList:
        state.status = "[Set] setClearTeamList"
        break;
    }
    
    return state;
}
