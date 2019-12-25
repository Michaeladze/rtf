//
//  boss.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct bossState: StateType {
    var collection = ""
    var status = ""
}

func bossReducer(action: Action, state: bossState?) -> bossState {
    var state = state ?? bossState()
    
    guard let action = action as? bossActions else {
        return state
    }


    switch action {
    case .pendingGetBoss:
        state.status = "[Pending] pendingGetBoss"
        break;
    case .successGetBoss:
        state.collection = "data blob, state change"
        state.status = "[Success] successGetBoss"
        break;
    }
    
    return state;
}
