import React from 'react';
import ReactDOM from 'react-dom';
import { messageReducer } from './_store/reducers/message.reducer';
import App from './App';
import * as serviceWorker from './serviceWorker';
import intercept from './_helpers/interceptor';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  addUserToInbox$,
  addUserToRequests$,
  getAssessmentsByIdCount$,
  getAssessmentsCount$,
  getInboxAll$
} from './_store/effects/users-inbox.effects';
import inboxReducer from './_store/reducers/users-inbox.reducer';
import usersAllReducer from './_store/reducers/users-all.reducer';
import { getAllUsersEffect$ } from './_store/effects/users-all.effects';
import {
  addToFeedbackFavEffect$,
  deleteFromFavEffect$,
  getFavFeedbackUsersEffect$,
  setPinForFavEffect$
} from './_store/effects/users-favourite.effects';
import { usersHistoryReducer } from './_store/reducers/users-history.reducer';
import {
  getHistoryEffect$,
  getUserHistoryEffect$,
  setHistoryUsersFilterEffect$,
  updateAssessmentStatusEffect$,
  updateProjectAssessmentStatusEffect$
} from './_store/effects/users-history.effects';
import { getMyTeamEffect$ } from './_store/effects/users-team.effects';
import { usersTeamReducer } from './_store/reducers/users-team.reducer';
import usersReducer from './_store/reducers/users.reducer';
import {
  getAllCompetencesEffect$,
  getAllSkillsEffect$,
  getRecommendedAttributesEffect$,
  getRecommendedSkillsEffect$,
  provideFeedbackEffect$,
  requestFeedbackEffect$
} from './_store/effects/feedback-properties.effects';
import { usersRecentReducer } from './_store/reducers/users-recent.reducer';
import { propertiesReducer } from './_store/reducers/feedback-properties.reducer';
import {
  deleteFromRecentEffect$,
  getRecentUsersEffect$,
  setPinForRecentEffect$
} from './_store/effects/users-recent.effects';
import { userRequestReducer } from './_store/reducers/users-request.reducer';
import {
  addThanksForAssessmentEffect$,
  addThanksForProjectEffect$,
  getThanksCount$
} from './_store/effects/thanks.effects';
import { getMeEffects$, getUserByIdEffects$, setCurrentUserWithAssessments$ } from './_store/effects/users.effects';
import { usersFavouriteReducer } from './_store/reducers/users-favourite.reducer';
import { getRequestsRatingEffect$ } from './_store/effects/requestsRating.effects';
import { userRequestRatingReducer } from './_store/reducers/requestRating.reducer';
import {
  addProjectAssessmentEffect$,
  answerUserRequestEffect$, canNotAnswerEstimate$, canNotAnswerInterview$,
  getRequestEffect$,
  getUserEstimate$,
  getUserRequestEffect$,
  getUsersWithRequestEffect$,
  saveEstimateFrom$,
  saveInterviewResponse$,
  sendEstimateFrom$,
  sendInterviewResponse$,
  setIncomeRequestsUsersFilterEffect$
} from './_store/effects/users-request.effects';
import {
  getItemsForAttributeStatistic$,
  getSkillStatisticsEffect$,
  getStatisticsForCompetencies$,
  getStatisticsSummary$
} from './_store/effects/statistics.effects';
import notificationsReducer from './react_shared/components/notifications/redux/notifications.reducer';
import { statisticsAllReducer } from './_store/reducers/statisticsAll.reducer';
import { feedbackPostEffect$ } from './react_shared/components/Feedback/redux/feedback.effect';
import bossReducer from './_store/reducers/boss.reducer';
import { getBossEffect$ } from './_store/effects/boss.effects';
import { comparisonReducer } from './_store/reducers/comparison.reducer';
import { getSubordinatesEffect$ } from './_store/effects/subordinates.effects';
import { subordinatesReducer } from './_store/reducers/subordinates.reducer';
import { getTeamInfoEffect$ } from './_store/effects/team-info.effects';
import { teamInfoReducer } from './_store/reducers/team-info.reducer';
import { getStatisticForUserEffect$, setComparisonFilterEffect$ } from './_store/effects/comparison.effects';

/** Подключаем интерцепт */
intercept();

/** Создаем middleware для эффектов (эпиков) */
const observableMiddleware = createEpicMiddleware();

/** Регистрируем редьюсеры */
const reducers = combineReducers({
  inboxReducer,
  allUsers: usersAllReducer,
  favouriteUsers: usersFavouriteReducer,
  userHistory: usersHistoryReducer,
  myTeam: usersTeamReducer,
  users: usersReducer,
  properties: propertiesReducer,
  recentUsers: usersRecentReducer,
  userRequest: userRequestReducer,
  userRequestRating: userRequestRatingReducer,
  message: messageReducer,
  notifications: notificationsReducer,
  statisticsAll: statisticsAllReducer,
  boss: bossReducer,
  comparison: comparisonReducer,
  subordinates: subordinatesReducer,
  teamInfo: teamInfoReducer
});

/** Создаем store */
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(observableMiddleware))
);

/** Регистрируем эффекты */
observableMiddleware.run(
  combineEpics(
    getInboxAll$,
    getThanksCount$,
    addThanksForAssessmentEffect$,
    addThanksForProjectEffect$,
    getAssessmentsCount$,
    getAssessmentsByIdCount$,
    setCurrentUserWithAssessments$,
    addUserToInbox$,
    addUserToRequests$,

    getMeEffects$,
    getUserByIdEffects$,

    // компетенции и навыки
    getAllCompetencesEffect$,
    getAllSkillsEffect$,
    getRecommendedAttributesEffect$,
    getRecommendedSkillsEffect$,
    requestFeedbackEffect$,
    provideFeedbackEffect$,
    answerUserRequestEffect$,

    getMyTeamEffect$,
    getAllUsersEffect$,

    // история
    getUserHistoryEffect$,
    getHistoryEffect$,
    updateAssessmentStatusEffect$,
    updateProjectAssessmentStatusEffect$,
    setHistoryUsersFilterEffect$,

    // избранное
    getFavFeedbackUsersEffect$,
    addToFeedbackFavEffect$,
    setPinForFavEffect$,
    deleteFromFavEffect$,

    // недавние/последние
    getRecentUsersEffect$,
    setPinForRecentEffect$,
    deleteFromRecentEffect$,

    // request user
    getUsersWithRequestEffect$,
    getUserRequestEffect$,
    getRequestsRatingEffect$,
    getRequestEffect$,
    addProjectAssessmentEffect$,
    setIncomeRequestsUsersFilterEffect$,

    // statistics
    getStatisticsForCompetencies$,
    getSkillStatisticsEffect$,
    getStatisticsSummary$,
    getItemsForAttributeStatistic$,

    getStatisticForUserEffect$,
    setComparisonFilterEffect$,

    // Обратная связь
    feedbackPostEffect$,

    // Руководитель
    getBossEffect$,

    // Подчиненные
    getSubordinatesEffect$,
    getTeamInfoEffect$,

    // Сберпрофи и интервью
    getUserEstimate$,
    sendEstimateFrom$,
    saveEstimateFrom$,
    sendInterviewResponse$,
    saveInterviewResponse$,
    canNotAnswerEstimate$,
    canNotAnswerInterview$
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
