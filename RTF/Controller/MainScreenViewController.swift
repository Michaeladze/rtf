//
//  ViewController.swift
//  RTF
//
//  Created by 16688500 on 06.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import UIKit
import Alamofire
import ReSwift
import SwiftyJSON

var navButton: String = "Default"

class MainScreenViewController: UIViewController, StoreSubscriber {


    typealias StoreSubscriberStateType = UsersRecentState
    @IBOutlet weak var myViewCollection: UICollectionView!
    @IBOutlet weak var userProfileButton: UIButton!
    @IBOutlet weak var assessmentListButton: UIButton!
    @IBOutlet weak var requestListButton: UIButton!
    @IBOutlet weak var latestListButton: UIButton!
    
//Оценки - Запросы - Недвание
    @IBAction func navButtonPressed(_ sender: UIButton) {
        navButton = String(sender.currentTitle!)
        assessmentListButton.setTitleColor(#colorLiteral(red: 0.5172071457, green: 0.5210528374, blue: 0.5516760945, alpha: 1), for: .normal)
        requestListButton.setTitleColor(#colorLiteral(red: 0.5172071457, green: 0.5210528374, blue: 0.5516760945, alpha: 1), for: .normal)
        latestListButton.setTitleColor(#colorLiteral(red: 0.5172071457, green: 0.5210528374, blue: 0.5516760945, alpha: 1), for: .normal)
        sender.setTitleColor(#colorLiteral(red: 0, green: 0, blue: 0, alpha: 1), for: .normal)
        myViewCollection.backgroundColor = #colorLiteral(red: 0.8392156863, green: 0.8549019608, blue: 1, alpha: 1)
        myViewCollection.scrollToItem(at: IndexPath(item: 0, section: 0), at: [], animated: true)
        myViewCollection.reloadData()
        //print(navButton)
    }

    func newState(state: UsersRecentState) {
        print(state)
    }

    override func viewWillAppear(_ animated: Bool) {
        store.subscribe(self) {
            $0.select {
                $0.usersRecentSubState
            }
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        store.unsubscribe(self)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        store.dispatch(usersRecentActions.pendingGetRecentUsers)

        store.subscribe(self) { sub in
            sub.select { state in
                state.usersRecentSubState
            }
        }

    }

}


//Расширение основого контролллера - Обработчик списка пользователей
extension MainScreenViewController: UICollectionViewDelegate, UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 15;
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = myViewCollection.dequeueReusableCell(withReuseIdentifier: "userList", for: indexPath)
                as! UserListCollectionViewCell
        cell.firstName.text = navButton + String(indexPath.row)
        cell.lastName.text = "Первый " + String(indexPath.row)

        cell.userImage.layer.cornerRadius = cell.userImage.frame.height/2
        //cell.userImage.layer.masksToBounds = true
        cell.userImage.image = #imageLiteral(resourceName: "ava.jpg")
        return cell
    }
}
