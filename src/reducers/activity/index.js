import { S,  } from "@utils/prefix";
import * as ActionTypes from "@actions/activity/action-types";
import ActivityStateManager from "./state-manager";

const INITIAL_STATE = {
    leaderBoard: [],
    leaderBoardCount: 0,
    activityLogs:[],
    activityTotalCount: 0,
}


export default function activityState(state = INITIAL_STATE, action){
    switch (action.type){
        case S(ActionTypes.GET_LEADERBOARD):
            return ActivityStateManager.getLeaderBoard(state, action);
        case S(ActionTypes.GET_ACTIVITY_LOGS):
            return ActivityStateManager.getActivityLogs(state, action);
        default: 
        return state;
    }
}