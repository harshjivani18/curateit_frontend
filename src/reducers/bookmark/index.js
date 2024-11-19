import { S,  } from "../../utils/prefix";
import * as ActionTypes from "../../actions/bookmark/action-types";
import BookmarkStateManager from "./state-manager";

const INITIAL_STATE = {
    allBookmarks:[],
    bookmarkByCollections:[],
    totalCount: 0,
    bookmarkByFilters:[],
    bookmarkByFiltersCount: 0,
    filteredBookmarks:[],
    filteredBookmarksCount:0,
    filterPageFilteredBookmarks:[],
    filterPageFilteredBookmarksCount:0,
    addedGem: null
}


export default function bookmarkState(state = INITIAL_STATE, action){
    switch (action.type){
        case S(ActionTypes.GET_ALL_BOOKMARK):
            return BookmarkStateManager.getAllBookmarks(state, action);
        case S(ActionTypes.GET_BOOKMARK_BY_COLLECTION):
            return BookmarkStateManager.getBookmarkByCollections(state, action);
        case S(ActionTypes.GET_BOOKMARK_BY_FILTERS):
            return BookmarkStateManager.getBookmarkByFilters(state, action);
        case S(ActionTypes.FILTER_BOOKMARK):
            return BookmarkStateManager.getFilteredBookmarks(state, action);
        case S(ActionTypes.FILTER_PAGE_BOOKMARK):
            return BookmarkStateManager.getFilterPageFilteredBookmarks(state, action);

        case ActionTypes.RESET_EXISTING_GEM:
            return BookmarkStateManager.resetExistingGem(state, action)
        case ActionTypes.RESET_FILTER_BOOKMARK:
            return { ...state, filteredBookmarks: [],filteredBookmarksCount:0 }
        case ActionTypes.RESET_FILTER_PAGE_BOOKMARK:
            return { ...state, filterPageFilteredBookmarks: [],filterPageFilteredBookmarksCount:0 }
        case ActionTypes.RESET_FILTERED_BOOKMARKS_DATA:
            return { ...state, bookmarkByFilters: [], bookmarkByFiltersCount: 0 }
        case ActionTypes.GEM_ADDED:
            return { ...state, addedGem: action.gem }
        default: 
        return state;
    }
}