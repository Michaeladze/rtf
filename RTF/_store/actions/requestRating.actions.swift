//
//  requestRating.actiond.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift

/* создаем все actions в этом объекте */
enum requestRatingActions: Action {
    case pendingAddRequestsRating
    case successAddRequestsRating
    
    case pendingEditRequestsRating
    case successEditRequestsRating
}
