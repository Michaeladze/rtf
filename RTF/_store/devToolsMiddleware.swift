//
//  devToolsMiddleware.swift
//  RTF
//
//  Created by Anton Elistratov on 24.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift
import ReSwiftMonitor

/*
 аналог redux devtools на express
 https://cocoapods.org/pods/ReSwiftMonitor
 пока не работает :<
 */
var middleware: [Middleware<AppState>] = {
    var _middleware: [Middleware<AppState>] = []
    #if DEBUG
    let monitorMiddleware = MonitorMiddleware.make(configuration: Configuration())
    _middleware.append(monitorMiddleware)
    #endif
    return _middleware
}()
