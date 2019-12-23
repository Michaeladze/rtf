import { createSelector } from "reselect";
import { IStore } from "../store.interface";

/** Селект статистики с учетом периода */
export const selectStatistics = createSelector(
  (state: IStore) => state.statisticsAll.competenceStatistics,
  (state: IStore) => state.statisticsAll.periodFilter,
  (data, period) => data[period]
);

/** Селект шэйперов с учетом периода */
export const selectShapers = createSelector(
  (state: IStore) => state.statisticsAll.shapeStatistics,
  (state: IStore) => state.statisticsAll.periodFilter,
  (data, period) => {
    if (data.hasOwnProperty(period)) {
      return data[period];
    }
    return [];
  }
);

/** Селект навыков с учетом периода */
export const selectSkills = createSelector(
  (state: IStore) => state.statisticsAll.skillsStatistics,
  (state: IStore) => state.statisticsAll.periodFilter,
  (data, period) => {
    if (data.hasOwnProperty(period)) {
      return data[period];
    }
    return [];
  }
);
