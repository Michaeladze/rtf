//
// Created by anton on 24/12/2019.
// Copyright (c) 2019 16688500. All rights reserved.
//

import Foundation


struct IUser: Codable, Equatable {
    /** ID */
    let sUserId: String
    /** Имя */
    let sFirstName: String?
    /** Фамилия */
    let sMiddleName: String?
    /** Отчество */
    let sLastName: String?
    /** Полное имя */
    let sFullName: String?
    /** Должность */
    let sTitle: String?
    /** Функциональный блок */
    let sStructure: String?
    /** Рейтинг */
    let iRating: Int?
    /* я ли это?*/
    let bIsMe: Bool?
    /** Тип */
    let bIsPinned: Bool?
    /** Принадлежность к команде текущего пользователя */
    let bIsMyTeam: Bool?;
    /** Фото */
    let sPhoto: String?;
    /** ????? */
    let sIncomeComment: String?;
    /** Статус (прочитано, просмотрено и тп) */
    let sStatus: String?;
    /** Число входящих оценок */
    let iIncomeRates: Int?;
    /** Число входящих запросов */
    let IncomeRequests: Int?;
    /** Входящие или исходящие оценки, true - входящие, false - исходящие */
    let bTypeEstimate: Bool?;
    /** Функциональный блок */
    let sExtidFblock: String?;
}

