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

class mainScreenViewController: UIViewController {
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

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        store.dispatch(usersRecentActions.pendingGetRecentUsers)
        /* test funcion */
        getRequest()
    }
    
}

func getRequest (){

    //print(Environment.appAuth);
    
    let sessionManager = Alamofire.SessionManager.default
    sessionManager.adapter = interceptor(project: "RTF")
    sessionManager.request("https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/p2p-assessment/relation/recent", method: .post).responseJSON { response in
        switch response.result {
        case .success(let value):
            let json = JSON(value)
            //print("JSON: \(json)")
        case .failure(let error):
            print(error)
        }
    }
}

//Расширение основого контролллера - Обработчик списка пользователей
extension mainScreenViewController: UICollectionViewDelegate, UICollectionViewDataSource{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 15;
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = myViewCollection.dequeueReusableCell(withReuseIdentifier: "userList", for: indexPath)
            as! UserListCollectionViewCell
        cell.firstName.text = navButton + String(indexPath.row)
        cell.lastName.text = "Первый " + String(indexPath.row)

        cell.userImage.layer.cornerRadius = 30
        //cell.userImage.layer.masksToBounds = true
        cell.userImage.image = #imageLiteral(resourceName: "ava.jpg")
        return cell
    }
}
