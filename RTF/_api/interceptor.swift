//
//  interceptor.swift
//  RTF
//
//  Created by Anton Elistratov on 23.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import Foundation
import Alamofire

/**
 usage:
 let sessionManager = SessionManager()
 sessionManager.adapter = interceptor(customParams: "1234")
 sessionManager.request("https://jsonplaceholder.typicode.com/posts")
 */

// DOCS: https://github.com/Alamofire/Alamofire/blob/master/Documentation/AdvancedUsage.md
class interceptor: RequestAdapter {
    
    // TODO use ENV
    let RTF_HOST = "https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment/"
    
    // можно передавать кастомный value и делать реквест
    // сортировка по этой штуке
    private let project: String

    init(project: String) {
        self.project = project
    }

    func adapt(_ urlRequest: URLRequest) throws -> URLRequest {
        var urlRequest = urlRequest
        
        //TODO implement this way
//        switch project {
//        case "RTF":
//            urlRequest.setValue("application/json", forHTTPHeaderField: "Content-type")
//            urlRequest.setValue("Basic QWRtaW5fTEI6cGFzc3dvcmQ=", forHTTPHeaderField: "Authorization")
//            urlRequest.url?.absoluteString = RTF_HOST + urlRequest.url?.absoluteString;
//        default:
//            break;
//        }

        if let urlString = urlRequest.url?.absoluteString, urlString.hasPrefix("https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment") {

            urlRequest.setValue("application/json", forHTTPHeaderField: "Content-type")
            urlRequest.setValue("Basic QWRtaW5fTEI6cGFzc3dvcmQ=", forHTTPHeaderField: "Authorization")
        }
        
        return urlRequest
    }
}
