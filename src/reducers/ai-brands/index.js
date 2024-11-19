import { S }            from "@utils/prefix"
import * as ActionTypes from "@actions/ai-brands/action-types"
import AIBrandsManager  from "./state-manager"

const INITIAL_STATE = {
    voices: [],
    personas: []
}

export default function aiBrandStates(state = INITIAL_STATE, action) {
    switch (action.type) {
        case S(ActionTypes.ADD_BRAND):
        case S(ActionTypes.ADD_PERSONA):
        case S(ActionTypes.ADD_VOICE):
            return AIBrandsManager.addBrandSuccess(state, action)
        case S(ActionTypes.EDIT_BRAND):
            return AIBrandsManager.editBrandSuccess(state, action)
        case S(ActionTypes.DELETE_BRAND):
            return AIBrandsManager.deleteBrandSuccess(state, action)
        case S(ActionTypes.FETCH_PERSONAS):
            return { ...state, personas: [ ...action.payload.data.data ] };
        case S(ActionTypes.FETCH_VOICES):
            return { ...state, voices: [ ...action.payload.data.data ] };
        default:
            return state;
    }
}