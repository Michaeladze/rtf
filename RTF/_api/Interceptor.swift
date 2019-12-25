//
//  interceptor.swift
//  RTF
//
//  Created by Anton Elistratov on 23.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import Alamofire

enum Interceptor: URLRequestConvertible {
    
    case serviceRequest(service: String)
    
    static let RTF_ENDPOINT = "https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment/"
    
    var requestMethod: HTTPMethod {
        switch self {
        case .serviceRequest:
            return .post
        }
    }
    
    var servicePath: String {
        switch self {
        case .serviceRequest(let service):
            return service
        }
    }
    
    func asURLRequest() throws -> URLRequest {
        let url = try Interceptor.RTF_ENDPOINT.asURL()

        var urlRequest = URLRequest(url: url.appendingPathComponent(servicePath))
        urlRequest.httpMethod = requestMethod.rawValue
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-type")
        urlRequest.setValue("Basic QWRtaW5fTEI6cGFzc3dvcmQ=", forHTTPHeaderField: "Authorization")

        return urlRequest
    }
}
