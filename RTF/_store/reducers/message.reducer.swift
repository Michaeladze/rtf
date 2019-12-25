//
//  message.reducer.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift


struct MessageState: StateType {
    var collection = ""
    var status = ""
}

func messageReducer(action: Action, state: MessageState?) -> MessageState {
    var state = state ?? MessageState()

    guard let action = action as? messageActions else {
        return state
    }

    switch action {
    case .successShowMessage:
        state.collection = "data blob, state change"
        state.status = "[Success] successShowMessage"
        break;
    }
    
    return state;
}
