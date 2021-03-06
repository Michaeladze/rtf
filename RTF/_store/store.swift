//
//  store.swift
//  RTF
//
//  Created by Anton Elistratov on 24.12.2019.
//  Copyright © 2019 16688500. All rights reserved.
//

import ReSwift

/*
 state приложения
 описывает типы переменных и инициализирует их
 */
struct AppState: StateType {
    var usersSubState: UsersState = UsersState()
    var bossSubState: BossState = BossState()
    var comparisonSubState: ComparisonState = ComparisonState()
    var feedbackPropsSubState: FeedbackPropsState = FeedbackPropsState()
    var messageSubState: MessageState = MessageState()
    var requestRatingSubState = requestRatingState()
    var statisticsSubState = statisticsState()
    var subordinatesSubState = subordinatesState()
    var teamInfoSubState = teamInfoState()
    var thanksSubState = thanksState()
    var usersAllSubState = usersAllState()
    var usersFavouriteSubState = usersFavouriteState()
    var userHistorySubState = usersHistoryState()
    var usersInboxSubState = usersInboxState()
    var usersRecentSubState: UsersRecentState = UsersRecentState()
    var usersRequestSubState = usersRequestState()
    var usersTeamSubState = usersTeamState()
}

/*
 главный reducer
 парсит Actions, на основе этого вызывает нужный reducer и пересоздает state приложения
 */
func appReducer(action: Action, state: AppState?) -> AppState {
    return AppState(
        usersSubState: usersReducer(action: action, state: state?.usersSubState),
        bossSubState: bossReducer(action: action, state: state?.bossSubState),
        comparisonSubState: comparisonReducer(action: action, state: state?.comparisonSubState),
        feedbackPropsSubState: feedbackPropsReducer(action: action, state: state?.feedbackPropsSubState),
        messageSubState: messageReducer(action: action, state: state?.messageSubState),
        requestRatingSubState: requestRatingReducer(action: action, state: state?.requestRatingSubState),
        statisticsSubState: statisticsReducer(action: action, state: state?.statisticsSubState),
        subordinatesSubState: subordinatesReducer(action: action, state: state?.subordinatesSubState),
        teamInfoSubState: teamInfoReducer(action: action, state: state?.teamInfoSubState),
        thanksSubState: thanksReducer(action: action, state: state?.thanksSubState),
        usersAllSubState: usersAllReducer(action: action, state: state?.usersAllSubState),
        usersFavouriteSubState: usersFavouriteReducer(action: action, state: state?.usersFavouriteSubState),
        userHistorySubState: usersHistoryReducer(action: action, state: state?.userHistorySubState),
        usersInboxSubState: usersInboxReducer(action: action, state: state?.usersInboxSubState),
        usersRecentSubState: usersRecentReducer(action: action, state: state?.usersRecentSubState),
        usersRequestSubState: usersRequestReducer(action: action, state: state?.usersRequestSubState),
        usersTeamSubState: usersTeamReducer(action: action, state: state?.usersTeamSubState)
    )
}

/*
 инициализация переменной store
 через эту переменную происходит взаимодействией со всех архитектурой redux
 */
let store = Store(
    reducer: appReducer,
    state: AppState(),
    middleware: [userRecentEffect]
)
