//
// Created by anton on 24/12/2019.
// Copyright (c) 2019 16688500. All rights reserved.
//

import Foundation


struct UsersReducer<T: Equatable>: Equatable {
    var collection: [T] = []
    var loading: Bool = false
    mutating func setCollection(values: [T]) {
        self.collection = values
        self.loading = false
    }
}