import { S }                            from "@utils/prefix"
import * as ActionTypes                 from "@actions/collection/action-types"
import CollectionsStateManager          from "./state-manager"

const INITIAL_STATE = {
    collectionsAndItsCount: null,
    collectionData: [],
    sharedCollections:[],
    followedCollections: [],
    singleBookmarkGem:[],
    bookmarkInCollections:[],
    customFields:[],
    singleCollection: [],
    addedCollectionData: null,
    subCollectionsPageDetails: null,
    profileSubCollection:null,
    publicProfileSubCollection:null,
    subCollectionValue:null
}

export default function gemsStates(state = INITIAL_STATE, action) {
    switch (action.type) {
        case S(ActionTypes.FETCH_COLLECTION_WISE_COUNTS):
            return CollectionsStateManager.fetchCollectionWiseCountSuccess(state, action)

        case S(ActionTypes.ADD_COLLECTION):
            return CollectionsStateManager.addCollectionSuccess(state, action);
        case S(ActionTypes.GET_SINGLE_BOOKMARK_GEM):
            return CollectionsStateManager.getSingleBookmarkGem(state, action);
        case S(ActionTypes.UPLOAD_BOOKMARK_COVER):
            return CollectionsStateManager.uploadBookmarkCoverSuccess(state, action)
        case S(ActionTypes.GET_SHARED_COLLECTIONS):
            return CollectionsStateManager.getSharedCollections(state, action)
        case S(ActionTypes.GET_FOLLOWED_BY_ME_COLLECTION):
            return CollectionsStateManager.getFollowerCollections(state, action)
        case S(ActionTypes.GET_CUSTOM_FIELDS):
            return CollectionsStateManager.getCustomFields(state, action);
        case S(ActionTypes.GET_BOOKMARK_IN_COLLECTION):
            return CollectionsStateManager.getBookmarkInCollections(state, action);
        case S(ActionTypes.GET_SINGLE_COLLECTION):
            return CollectionsStateManager.getSingleCollection(state, action)
        case S(ActionTypes.DELETE_COLLECTION):
            return CollectionsStateManager.deleteCollectionSuccess(state, action);
        case S(ActionTypes.CREATE_COLLECTION):
            return CollectionsStateManager.createCollectionsSuccess(state, action)
        case S(ActionTypes.UPDATE_COLLECTION):
            return CollectionsStateManager.updateCollectionsSuccess(state, action)
        case S(ActionTypes.MOVE_TO_ROOT):
            return CollectionsStateManager.moveToRootSuccess(state, action)
        case S(ActionTypes.MOVE_COLLECTION_SHARED):
            return CollectionsStateManager.moveCollectionSharedSuccess(state, action)
        case S(ActionTypes.MOVE_COLLECTION):
            return CollectionsStateManager.moveCollectionSuccess(state, action)
        case S(ActionTypes.FOLLOW_COLLECTION):
            return CollectionsStateManager.followCollectionSuccess(state, action)
        case S(ActionTypes.UNFOLLOW_COLLECTION):
            return CollectionsStateManager.unfollowCollectionSuccess(state, action)
        case S(ActionTypes.CONFIG_COLLECTIONS):
            return CollectionsStateManager.configLimitForCollectionSuccess(state, action)

        case ActionTypes.DELETE_BULK_BOOKMARK_STATE:
            return CollectionsStateManager.deleteBulkBookmarkState(state, action)
        case ActionTypes.DELETE_BULK_BOOKMARK_STATE_SHARED_COLLECTION:
            return CollectionsStateManager.deleteBulkBookmarkStateShared(state, action)
        case ActionTypes.UPDATE_BULK_BOOKMARK_STATE:
            return CollectionsStateManager.updateBulkBookmarkState(state, action)
        case ActionTypes.UPDATE_BULK_BOOKMARK_STATE_SHARED_COLLECTION:
            return CollectionsStateManager.updateBulkBookmarkStateShared(state, action)
        case ActionTypes.MOVE_GEM_TO_SHARED_COLLECTION:
            return CollectionsStateManager.moveGemToSharedCollection(state, action)
        case ActionTypes.REMOVE_GEM_FROM_COLLECTION:
            return CollectionsStateManager.removeGemFromCollection(state, action)
        case ActionTypes.UPDATE_BOOKMARK_EXISTING_COLLECTION:
            return CollectionsStateManager.updateBookmarkInCollection(state, action)
        case ActionTypes.COLLECTION_MOVE:
            return CollectionsStateManager.collectionMoveSuccess(state, action)
        case ActionTypes.SHARED_COLLECTION_MOVE:
            return CollectionsStateManager.sharedCollectionMoveSuccess(state, action)
        case ActionTypes.UPDATE_SHARED_COLLECTION:
            return CollectionsStateManager.updateSharedCollection(state, action)
        case ActionTypes.REMOVE_SHARED_COLLECTION:
            return CollectionsStateManager.removeSharedCollectionSuccess(state, action)
        case ActionTypes.ADD_GEM_TO_SHARED_COLLECTION:
            return CollectionsStateManager.addGemToSharedCollection(state, action)
        case ActionTypes.RESET_SHARED_COLLECTIONS:
            return { ...state, sharedCollections: []}
        case ActionTypes.RESET_COLLECTION_WISE_COUNTS:
            return { ...state, collectionsAndItsCount: null}
        case ActionTypes.UPDATE_COLLECTION_WISE_COUNTS:
            return CollectionsStateManager.updateCollectionWiseCountState(state, action)
        case ActionTypes.REDUCE_COLLECTION_WISE_COUNTS:
            return CollectionsStateManager.reduceCollectionWiseCountState(state, action)
        case ActionTypes.ADD_COLLECTION_COUNT:
            return CollectionsStateManager.addCollectionWiseCountState(state, action)
        case ActionTypes.UPDATE_COUNT_PUBLIC_ADDED_GEM:
            return CollectionsStateManager.updateCountPublicAddedGem(state, action)
        case ActionTypes.UPDATE_COLLECTION_DATA_FOR_IMPORT:
            return CollectionsStateManager.updateCollectionDataForImport(state, action)
        case ActionTypes.SUB_COLLECTIONS_PAGE:
            return { ...state, subCollectionsPageDetails: action.data }
        case ActionTypes.SET_PROFILE_SUB_COLLECTION:
            return { ...state, profileSubCollection: action.collection }
        case ActionTypes.SET_PUBLIC_PROFILE_SUB_COLLECTION:
            return { ...state, publicProfileSubCollection: action.collection }
        case ActionTypes.ADD_SUB_COLLECTION_DATA:
            return { ...state, subCollectionValue: action.value }
        default:
            return state;
    }
}