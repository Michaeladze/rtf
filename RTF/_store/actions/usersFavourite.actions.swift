//
//  usersFavourite.actions.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift

/* создаем все actions в этом объекте */
enum usersFavouriteActions: Action {
    case pendingGetFavFeedbackUsers
    case successGetFavFeedbackUsers
    
    case pendingPinForFav
    case successPinForFav
    
    case pendingDeleteFromFav
    case successDeleteFromFav
    
    case pendingAddToFeedbackFav
    case successAddToFeedbackFav
}
