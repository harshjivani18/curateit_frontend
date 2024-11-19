import { S,  } from "../../utils/prefix";
import * as ActionTypes from "../../actions/user/action-types";
import UserStateManager from "./state-manager";

const INITIAL_STATE = {
    userTags:[],
    userData:[],
    pageConfig: {}
}


export default function userState(state = INITIAL_STATE, action){
    switch (action.type){
        case S(ActionTypes.FETCH_USER_DETAILS):
            return UserStateManager.getUserDetails(state, action);
        case S(ActionTypes.UPDATE_USER):
            return UserStateManager.updateUserDetails(state, action);
        
        case ActionTypes.UPDATE_USER_TAGS:
            return UserStateManager.updateUserTags(state, action)

        default: 
        return state;
    }
}