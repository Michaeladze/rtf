//
// Created by anton on 23/12/2019.
// Copyright (c) 2019 anton. All rights reserved.
//

import Foundation

struct Environment {

    static var env: String = Environment.variable(named: "REACT_APP_ENV") ?? ENV.REACT_APP_ENV
    static var appPath: String = Environment.variable(named: "REACT_APP_HOST") ?? ENV.REACT_APP_HOST
    static var appAuth: String = Environment.variable(named: "REACT_APP_BASIC_AUTH") ?? ENV.REACT_APP_BASIC_AUTH

    static func variable(named name: String) -> String? {
        let processInfo = ProcessInfo.processInfo
        guard let value = processInfo.environment[name] else {
            return nil
        }
        return value
    }
}

struct ENV {
    static var REACT_APP_ENV: String = "dev"//"$(REACT_APP_ENV)"
    static var REACT_APP_HOST: String = "https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment/"//"$(REACT_APP_HOST)"
    static var REACT_APP_BASIC_AUTH: String = "Basic QWRtaW5fTEI6cGFzc3dvcmQ="//"$(REACT_APP_BASIC_AUTH)"
}
