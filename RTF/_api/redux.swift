//
// Created by anton on 24/12/2019.
// Copyright (c) 2019 16688500. All rights reserved.
//

import ReSwift
import ReSwiftThunk

func combineReducers<T>(_ first: @escaping Reducer<T>, _ remainder: Reducer<T>...) -> Reducer<T> {
    return { action, state in
        let firstResult = first(action, state)
        let result = remainder.reduce(firstResult) { result, reducer in
            return reducer(action, result)
        }
        return result
    }
}


