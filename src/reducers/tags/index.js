import { S }                from "@utils/prefix"
import * as ActionTypes     from "@actions/tags/action-types";
import TagStateManager      from './state-manager'

const INITIAL_STATE = {
    addedTagData: null,
    allTags: [],
    tagsWithGemsCount: null,
    suggestedTagColors: [],
    gemAddedTag: null,
    sharedTags:[],
    singleTag:[],
    subTagsPageDetails:null,
    subTagValue:null,
    parentTagValue:null
}

export default function tagStates(state = INITIAL_STATE, action) {
    switch (action.type) {
        case S(ActionTypes.ADD_TAG):
            return TagStateManager.addTagSuccess(state, action);
        case S(ActionTypes.FETCH_TAGS_WITH_GEM_COUNTS):
            return TagStateManager.fetchTagsWithCountsSuccess(state, action);
        case S(ActionTypes.MOVE_TAG):
            return TagStateManager.moveTagSuccess(state, action)
        case S(ActionTypes.UPDATE_TAG):
            return TagStateManager.updateTag(state, action);
        case S(ActionTypes.SUGGESTED_TAG_COLORS):
            return TagStateManager.getSuggestedTagColors(state, action)
        case S(ActionTypes.DELETE_TAG):
            return TagStateManager.deleteTag(state, action)
        case S(ActionTypes.MOVE_TO_ROOT_TAG):
            return TagStateManager.moveToRootSuccess(state, action)
        case S(ActionTypes.GET_SINGLE_TAG_DETAILS):
            return TagStateManager.getSingleTagDetails(state, action)
        case S(ActionTypes.GET_SHARED_TAGS):
            return TagStateManager.getSharedTags(state, action)
        case ActionTypes.REMOVE_SHARED_TAG:
            return TagStateManager.removeSharedTagSuccess(state, action)

        case ActionTypes.UPDATE_ADD_NEW_GEM_TAG:
            return TagStateManager.updateAddNewGemInTag(state, action)
        case ActionTypes.REMOVE_GEM_FROM_TAG:
            return TagStateManager.removeGemFromTag(state, action)
        case ActionTypes.ADD_TAG_COUNT:
            return TagStateManager.addTagCountState(state, action)
        case ActionTypes.REMOVE_GEM_FROM_SHARED_TAGS:
            return TagStateManager.removeGemSharedTags(state, action)
        case ActionTypes.RESET_SHARED_TAGS:
            return { ...state, sharedTags: []}
        case ActionTypes.SUB_TAG_PAGE:
            return { ...state, subTagsPageDetails: action.data }
        case ActionTypes.ADD_SUB_TAG_DATA:
            return { ...state, subTagValue: action.value }
        case ActionTypes.CLEAR_ALL_TAGS:
            return { ...state, tagsWithGemsCount: null }
        default:
            return state;
    }
}