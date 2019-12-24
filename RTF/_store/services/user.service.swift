//
// Created by anton on 24/12/2019.
// Copyright (c) 2019 16688500. All rights reserved.
//

import Foundation

struct userList: Codable {
    let users: [IUser]
}

protocol UserServiceFetcher {
    func getUsers( completion: @escaping (userList?) -> Void)
}
class UserServiceClass: UserServiceFetcher {

    func getUsers( completion: @escaping (userList?) -> Void) {
        fetch(
                url: "https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment/relation/recent",
                completion: completion
        )
    }
    func fetch<T: Codable>(url: String, completion: @escaping (T?) -> Void) {
        guard let url = URL(string: url) else { return completion(nil) }


        var request = URLRequest(url: url)
       request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Authorization", forHTTPHeaderField: "Basic QWRtaW5fTEI6cGFzc3dvcmQ=")
        request.httpMethod = "POST"
            let task = URLSession.shared.dataTask(with: request) { data, tmp, pmp1 in
            guard
                    let data = data,
                    let obj = try? JSONDecoder().decode(T.self, from: data)
                    else {
                return completion(nil)
            }

            completion(obj)
        }

        task.resume()
    }

}
