import { S,  } from "../../utils/prefix";
import * as ActionTypes from "../../actions/broken-duplicate/action-types";
import BrokenDuplicateStateManager from "./state-manager";

const INITIAL_STATE = {
    brokenLinks: [],
    duplicateLinks: [],
    totalCount:0,
    filteredBrokenBookmarks:[],
    filteredBrokenBookmarksCount:0,
}

export default function brokenDuplicateState(state = INITIAL_STATE, action){
    switch (action.type){
        case S(ActionTypes.GET_BROKEN_LINKS):
            return BrokenDuplicateStateManager.getBrokenLinks(state, action);
        case S(ActionTypes.GET_DUPLICATE_LINKS):
            return BrokenDuplicateStateManager.getDuplicateLinks(state, action);
        case S(ActionTypes.FILTER_BROKEN_BOOKMARK):
            return BrokenDuplicateStateManager.getFilteredBrokenBookmarks(state, action);
        
        case ActionTypes.RESET_FILTER_BROKEN_BOOKMARK:
            return { ...state, filteredBrokenBookmarks: [],filteredBrokenBookmarksCount:0 }
        default: 
        return state;
    }
}