import { parseDateRange } from "../../lib/date";
import session from "../../utils/session";

export default class DashboardStateManager {
    static setLocale = (prevState, action) => {
        const state = { ...prevState };
        if (action.payload) {
            state.locale = action.payload;
        }
        return state;
    };

    static setShareToken = (prevState, action) => {
        const state = { ...prevState };
        if (action.payload) {
            state.shareToken = action.payload;
            session.setUmamiClientAuthToken(action.payload);
        }
        return state;
    };

    static setDashboardUser = (prevState, action) => {
        const state = { ...prevState };
        if (action.payload) {
            state.user = action.payload;
            session.setUmamiClientUser(action.payload);
        }
        return state;
    };

    static setDashboardConfig = (prevState, action) => {
        const state = { ...prevState };
        if (action.payload) {
            state.config = action.payload;
        }
        return state;
    };

    static setDateRange = (prevState, action) => {
        const state = { ...prevState };
        if (action.payload) {
            let dateRange = action.payload;

            if (typeof dateRange === 'string') {
                dateRange = parseDateRange(dateRange);
            }

            state.dateRange = { ...dateRange, modified: Date.now() };
            session.setDateRangeConfig({ ...dateRange, modified: Date.now() });
        }
        return state;
    };
}
