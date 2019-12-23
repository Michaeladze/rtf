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
    
    // можно передавать кастомный value и делать реквест
    // сортировка по этой штуке
    private let customParams: String

    init(customParams: String) {
        self.customParams = customParams
    }

    func adapt(_ urlRequest: URLRequest) throws -> URLRequest {
        var urlRequest = urlRequest

        if let urlString = urlRequest.url?.absoluteString, urlString.hasPrefix("https://jsonplaceholder.typicode.com/posts") {
            urlRequest.setValue("CustomHeaderValue " + customParams, forHTTPHeaderField: "CustomHeader")
            
            /* debug */
            print("request intercepted with params: ")
            print(customParams)
            print("to destination: ")
            print(urlString);
        }
        
 

        return urlRequest
    }
}
