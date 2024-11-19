// import { S, } from "../../utils/prefix";
import * as ActionTypes from "../../actions/dashboard/action-types";
import DashboardStateManager from "./state-manager";
import { DEFAULT_DATE_RANGE, DEFAULT_LOCALE, DEFAULT_THEME } from "../../lib/constants";
import session from "../../utils/session";

const INITIAL_STATE = {
    locale: DEFAULT_LOCALE,
    theme: DEFAULT_THEME,
    dateRange: session.getDateRangeConfig() || DEFAULT_DATE_RANGE,
    shareToken: session.getUmamiClientAuthToken() || null,
    user: session.getUmamiClientUser() || {},
    config: null,
}


export default function dashboardState(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SET_LOCALE:
            DashboardStateManager.setShareToken(state, action);
            return DashboardStateManager.setLocale(state, action);
        // case ActionTypes.SET_LOCALE:
        //     return DashboardStateManager.setShareToken(state, action);
        case ActionTypes.SET_DASHBOARD_USER:
            return DashboardStateManager.setDashboardUser(state, action);
        case ActionTypes.SET_DASHBOARD_CONFIG:
            return DashboardStateManager.setDashboardConfig(state, action);
        case ActionTypes.SET_DATE_RANGE:
            return DashboardStateManager.setDateRange(state, action);
        default:
            return state;
    }
}