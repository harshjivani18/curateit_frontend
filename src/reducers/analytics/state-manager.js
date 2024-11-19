import session from "../../utils/session";

export default class AnalyticsStateManager {
    static authorizedUmami = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.umamiUser = data;
            session.setUmamiToken(data.token) 
        }
        return state;
    }

    static getWebsite = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.website = data;
        }
        return state;
    }
}