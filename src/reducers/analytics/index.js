import { S } from "../../utils/prefix";
import * as ActionTypes from "../../actions/analytics/action-types";
import AnalyticsStateManager from "./state-manager";

const INITIAL_STATE = {
    umamiUser: null,
    website: null
}

export default function analyticsState(state = INITIAL_STATE, action){
    switch (action.type){
        case S(ActionTypes.AUTHORIZED_UMAMI):
            return AnalyticsStateManager.authorizedUmami(state, action);
        case S(ActionTypes.GET_WEBSITE):
            return AnalyticsStateManager.getWebsite(state, action);
        default: 
            return state;
    }
}