import { S }                    from '@utils/prefix'
import * as ActionTypes         from '@actions/membership/action-types'
import MembershipStateManager   from './state-manager';

const INITIAL_STATE = {
    loginData:  null,
    signupData: null,
    showSocialLoader: false,
};

export default function loginStates(state = INITIAL_STATE, action) {
    switch(action.type) {
        case S(ActionTypes.LOGIN):
        case ActionTypes.SET_SOCIAL_LOGIN_DETAILS:
            return MembershipStateManager.loginSuccess(state, action);
        case S(ActionTypes.SIGNUP):
            return MembershipStateManager.signupSuccess(state, action);
        case S(ActionTypes.SET_AFTER_USER_CREATE_OPERATION):
            return MembershipStateManager.setUserSuccess(state, action);
        case ActionTypes.SET_SOCIAL_LOGIN_LOADER:
            return { ...state, showSocialLoader: action.status }
        default:
            return state;
    }
}