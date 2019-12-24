//
//  feedback-properties.action.swift
//  RTF
//
//  Created by Anton Elistratov on 25.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift

/* создаем все actions в этом объекте */
enum feedbackPropsActions: Action {
    case pendingGetAllCompetences
    case successGetAllCompetences
    
    case pendingGetRecommendedAttributes
    case successGetRecommendedAttributes
    
    case pendingGetAllSkills
    case successGetAllSkills
    
    case pendingGetRecommendedSkills
    case successGetRecommendedSkills
    
    case pendingRequestFeedback
    case successRequestFeedback
    
    case pendingProvideFeedback
    case successProvideFeedback
    
    case setChangePropertyFilter
    case setSelectProperty
}
