import * as BookmarkActionTypes         from '../actions/bookmark/action-types'
import * as CollectionActionTypes       from '../actions/collection/action-types'
import * as GemActionTypes              from '../actions/gems/action-types'
import * as PocketActionTypes           from '../actions/pocketAccess/action-types'
import * as RaindropActionTypes         from '../actions/raindrop/action-types'

export const GAMIFICATION_ACTIONS = [
    { type: BookmarkActionTypes.DELETE_BOOKMARK, module: "gem" }, // Check
    { type: BookmarkActionTypes.EXTRACT_IMAGE_TEXT, module: "gem" }, // Check   
    { type: BookmarkActionTypes.ADD_GEM, module: "gem" }, // Check
    { type: BookmarkActionTypes.UPLOAD_PDF, module: "gem" }, // Check
    { type: BookmarkActionTypes.CREATE_AUDIO, module: "gem" }, // Check
    { type: BookmarkActionTypes.CREATE_VIDEO, module: "gem" }, // Check
    { type: BookmarkActionTypes.ADD_IMAGE, module: "gem" }, // Check    
    { type: BookmarkActionTypes.ADD_CODE, module: "gem" }, // Check
    { type: CollectionActionTypes.ADD_COLLECTION, module: "collection" }, // Check
    { type: CollectionActionTypes.CREATE_COLLECTION, module: "collection" }, // Check
    { type: CollectionActionTypes.DELETE_COLLECTION, module: "collection" }, // Check
    { type: CollectionActionTypes.DELETE_ALL_COLLECTIONS, module: "collection" }, // Check
    { type: GemActionTypes.DELETE_ALL_GEMS, module: "gem" }, // Check
    { type: GemActionTypes.ADD_HIGHLIGHT, module: "gem" }, // Check
    { type: GemActionTypes.DELETE_HIGHLIGHT, module: "gem" }, // Check
    { type: PocketActionTypes.SYNC_POCKET_DATA, module: "gem" }, // Check
    { type: RaindropActionTypes.SYNC_RAINDROP_DATA, module: "gem" }, // Check
    { type: RaindropActionTypes.SYNC_RAINDROP_HIGHLIGHTS, module: "gem" }, // Check
    { type: RaindropActionTypes.UPLOAD_RAINDROP_HIGHLIGHTS, module: "gem" }, // Check
]