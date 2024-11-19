import * as ActionTypes from './action-types';

export const fetchPlans = () => ({
    type: ActionTypes.FETCH_ALL_PLANS,
    payload: { 
        request: {
            url: "/api/plans",
            method: "GET"
        }
    }
})