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

            Alamofire.request(Interceptor.serviceRequest(service: "relation/recent")).response { response in
                switch response.error {
                case .none:
                    let data = try? JSONDecoder().decode([IUser].self, from: response.data!)
                    next(usersRecentActions.successGetRecentUsers(data!))
                case .some(let error):
                    print(error)
                }
            }
        }}}
    }
