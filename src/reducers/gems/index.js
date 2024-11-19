import { S }            from "@utils/prefix"
import * as ActionTypes from "@actions/gems/action-types"
import GemsStateManager from "./state-manager"

const INITIAL_STATE = {
    bookmarkByFilters: null,
    filtersAndItsCount: null,
    currentGem: null,
    highlights : [],
    details: null,
    mediaTypeChartData: []
}

export default function gemsStates(state = INITIAL_STATE, action) {
    switch (action.type) {
        case S(ActionTypes.GET_BOOKMARK_BY_FILTERS):
            return GemsStateManager.getBookmarkByFilterSuccess(state, action)
        case S(ActionTypes.FETCH_GEMS_FILTERS):
            return GemsStateManager.fetchGemsFiltersSuccess(state, action)
        case S(ActionTypes.FETCH_URL_HIGHLIGHTS):
            return { ...state, highlights: action?.payload?.data ? action?.payload?.data : [] }
        case S(ActionTypes.FETCH_DOMAIN_DETAILS):
            return GemsStateManager.detailSuccess(state, action);
        case ActionTypes.UPDATE_FILTER_COUNT:
            return GemsStateManager.updateFilterCountState(state, action);

        case ActionTypes.RESET_GEMS_FILTERS:
            return { ...state, filtersAndItsCount: null}
        case ActionTypes.SET_CURRENT_GEM:
            return { ...state, currentGem: action.gem !== null ? { ...action.gem } : null }
        default:
            return state;
    }
}