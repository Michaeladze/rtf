//
//  usersRecent.actions.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift

/* создаем все actions в этом объекте */
enum usersRecentActions: Action {
    case pendingGetRecentUsers
    case successGetRecentUsers([IUser])
    
    case pendingPinForRecent
    case successPinForRecent
    
    case pendingDeleteFromRecent
    case successDeleteFromRecent
    
    case successUpdateRecentFlag
}
