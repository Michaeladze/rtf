//
// Created by anton on 25/12/2019.
// Copyright (c) 2019 16688500. All rights reserved.
//

import Foundation
import ReSwift
import Alamofire
import SwiftyJSON

     var userRecentEffect: Middleware<AppState> {
        return { dispatch, getState in { next in return { action in
            print(action)
            next(action)
            let sessionManager = Alamofire.SessionManager.default
            sessionManager.adapter = interceptor(project: "RTF")
            sessionManager.request("https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment/relation/recent", method: .post).responseJSON { response in
                switch response.result {
                case .success(let value):
                    let json = JSON(value)
                    print("JSON: \(json)")
                    next(usersRecentActions.successGetRecentUsers)

                case .failure(let error):
                    print(error)
                }
            }


        }}}
    }
