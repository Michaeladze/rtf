//
//  usersHistory.actions.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift

/* создаем все actions в этом объекте */
enum usersHistoryActions: Action {
    case pendingGetUserHistory
    case successGetUserHistory
    
    case pendingGetHistory
    case successGetHistory
    
    case pendingUpdateAssessmentStatus
    case successUpdateAssessmentStatus
    
    case pendingUpdateProjectAssessmentStatus
    case successUpdateProjectAssessmentStatus
    
    case pendingSetHistoryUsersFilter
    case successSetHistoryUsersFilter
    
    case setClearHistoryFlag
}
