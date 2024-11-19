import { S }                from "@utils/prefix"
import * as ActionTypes     from "@actions/plan-service/action-types";
import PlanServiceStateManager      from './state-manager'

const INITIAL_STATE = {
    planService: null,
    isPlanOwner: -1,
    ownerDetails: null,
    plan: null
}

export default function planServiceStates(state = INITIAL_STATE, action) {
    switch (action.type) {
        case S(ActionTypes.GET_PLAN_SERVICE):
            return PlanServiceStateManager.getPlanServiceSuccess(state, action)
        case S(ActionTypes.GET_IS_PLAN_OWNER):
            return { ...state, isPlanOwner: action.payload?.data?.isPlanOwner, ownerDetails: action.payload?.data?.ownerDetails, plan: action.payload?.data?.plan }
        default:
            return state;
    }
}