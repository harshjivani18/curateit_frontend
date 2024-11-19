import { addGemsCount, addNewOrUpdateGemInCollection, decrementGemCount, deleteBulkBookmarks, incrementCollectionCount, manageMove, manageMoveShared, modifyCollection, modifySharedCollection, moveGemFromOwnToSharedCollection, removeGemFromCollections, removeSharedCollection, updateAndGetNewCollection, updateBulkBookmarks, updateBulkBookmarksShared, updateCountForGemAddedInPublicCollection, updateGemCount, updateMediaInBookmark } from "@utils/find-collection-id";
import { setIsFollowerCollectionToAll } from "@utils/find-follow-collection";
import session from "@utils/session";

export default class CollectionsStateManager {

    static fetchCollectionWiseCountSuccess = (prevState, action) => {
        const state         = { ...prevState };
        const { data }      = action.payload;
        

        if (data) {
            const filtered = data.filter(item => (item.id !== Number(session?.bio_collection_id)) && item?.name?.toLowerCase() !== 'bio')
            state.collectionsAndItsCount = filtered;
        }

        return state
    }

    static addCollectionSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload;
    if (data) {
      state.addedCollectionData = {
        ...data?.data,
        id: data.data?.id,
        folders: [],
        bookmarks: [],
        collection: null,
      };
      if (state.collectionsAndItsCount) {
        state.collectionsAndItsCount = [
          ...state.collectionsAndItsCount,
          {
            ...data?.data,
            id: data.data?.id,
            folders: [],
            bookmarks: [],
            collection: null,
            gems_count:0
          },
        ];
      }
      else {
        state.collectionsAndItsCount = [
          {
            ...data?.data,
            id: data.data?.id,
            folders: [],
            bookmarks: [],
            collection: null,
            gems_count:0
          },
        ];
      }
      // state.collectionsAndItsCount = [
      //   ...state.collectionsAndItsCount,
      //   {
      //     ...data?.data,
      //     id: data.data?.id,
      //     folders: [],
      //     bookmarks: [],
      //     collection: null,
      //     gems_count:0
      //   },
      // ];
    }
    return state;
  };

  static deleteBulkBookmarkState = (prevState, action) => {
        const state                     = { ...prevState }
        const { arrayIds,
              }                         = action

        let latestData                  = [ ...state.collectionData ]

        latestData = deleteBulkBookmarks(latestData,arrayIds)
        state.collectionData  = [ ...latestData ]
        // let bookmarks = flattenBookmarks(latestData);
        // let result = countProperties(bookmarks);
        // state.sideBarMenuData = result;

        return state
    }

    static deleteBulkBookmarkStateShared = (prevState, action) => {
        const state                     = { ...prevState }
        const { arrayIds,
              }                         = action

        let latestData                  = [ ...state.sharedCollections ]

        latestData = deleteBulkBookmarks(latestData,arrayIds)
        state.sharedCollections  = [ ...latestData ]

        return state
    }

    static updateBulkBookmarkState = (prevState, action) => {
        const state                     = { ...prevState }
        const { updateArray,
              }                         = action

        let latestData                  = [ ...state.collectionData ]

        latestData = updateBulkBookmarks(latestData,updateArray)
        state.collectionData  = [ ...latestData ]
        // let bookmarks = flattenBookmarks(latestData);
        // let result = countProperties(bookmarks);
        // state.sideBarMenuData = result;

        return state
    }

    static updateBulkBookmarkStateShared = (prevState, action) => {
    const state                     = { ...prevState }
    const { updateArray,}           = action

    let latestData                  = [ ...state.sharedCollections ]

    latestData = updateBulkBookmarksShared(latestData,updateArray)
    state.sharedCollections  = [ ...latestData ]

    return state
  };

  static getSingleBookmarkGem = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload.data;
    if (data) {
      state.singleBookmarkGem = data.attributes || [];
    }
    return state;
  };

  static moveGemToSharedCollection = (prevState, action) => {
        const state                     = { ...prevState }
        const { collectionId,gem}                         = action

        let latestData                  = [ ...state.sharedCollections ]

        latestData = moveGemFromOwnToSharedCollection(latestData,collectionId,gem)
        state.sharedCollections  = [ ...latestData ]
        return state
    }

 static removeGemFromCollection = (prevState, action) => {
    const state = { ...prevState };
    const { gemId, parentCollectionId,isCurrentCollectionShared } = action;
    if(isCurrentCollectionShared){
      const newCollection = removeGemFromCollections(
      state.sharedCollections,
      gemId,
      parentCollectionId
    );
      state.sharedCollections = [...newCollection];
    }
    if(!isCurrentCollectionShared){
      const newCollection = removeGemFromCollections(
      state.collectionData,
      gemId,
      parentCollectionId
    );
    state.collectionData = [...newCollection];
    // let bookmarks = flattenBookmarks(newCollection);
    // let result = countProperties(bookmarks);
    // state.sideBarMenuData = result;
    }
    return state;
  };

  static updateBookmarkInCollection = (prevState, action) => {
    const state = { ...prevState };
    const { gem, parent, isCollectionChanged,process } = action;

    let latestData = [...state.collectionData];
    if (process === "add") {
      latestData = addNewOrUpdateGemInCollection(state.collectionData, gem, parent, "add")
    }

    if(process === 'update'){
      const obj = { ...gem };
    delete obj.parent;
    if (isCollectionChanged) {
      latestData = manageMove(state.collectionData, obj, parent);
    } else {
      latestData = addNewOrUpdateGemInCollection(
        state.collectionData,
        obj,
        parent,
        "update"
      );
    }
    }

    state.collectionData = [...latestData];
    // let bookmarks = flattenBookmarks(latestData);
    // let result = countProperties(bookmarks);
    // state.sideBarMenuData = result;

    return state;
  };

  static uploadBookmarkCoverSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { gemId } = action.meta.previousAction.meta;
    const { data } = action.payload;
    if (data) {
      const updatedCollection = updateMediaInBookmark(
        state.collectionData,
        gemId,
        data.media
      );
      state.collectionData = [...updatedCollection];
    }
    return state;
  };

  static getSharedCollections = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload;
    if(data){
      state.sharedCollections = data.data;
    }
    
    return state;
  };

  static getFollowerCollections = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload;
    if(data){
      state.followedCollections = [ ...setIsFollowerCollectionToAll(data?.data) ]
    }
    
    return state;
  };

  static followCollectionSuccess = (prevState, action) => {
    const state             = { ...prevState };
    const { collection }    = action.meta.previousAction.meta;
    if (collection) {
      let coll = { ...collection }

      if (coll.follower_users && coll.follower_users?.length !== 0) {
        coll = {
          ...coll,
          isFollowerCollection: true,
          follower_users: [ ...coll.follower_users, {
            id: parseInt(session.userId),
            username: session.username,
            email: session.emailAddress
          }]
        }
      }
      else {
        coll = {
          ...coll,
          isFollowerCollection: true,
          follower_users: [{
            id: parseInt(session.userId),
            username: session.username,
            email: session.emailAddress
          }]
        }
      }
      state.followedCollections = [ ...state.followedCollections, coll  ]
    }
    
    return state;
  };

  static unfollowCollectionSuccess = (prevState, action) => {
    const state             = { ...prevState };
    const { collectionId }  = action.meta.previousAction.meta;
    const idx               = state.followedCollections.findIndex((f) => { return f.id === parseInt(collectionId) })

    if (idx !== -1) {
      state.followedCollections.splice(idx, 1)
      state.followedCollections = [ ...state.followedCollections ]
    }
    
    return state;
  };

  static getCustomFields = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload;
    if (data) {
      state.customFields = data || [];
    }
    return state;
  };

  static getBookmarkInCollections = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload;
    if (data) {
      state.bookmarkInCollections = data.collection || [];
    }
    return state;
  };

  static getSingleCollection = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload.data;
    if (data) {
      state.singleCollection = data || null;
    }
    return state;
  };

  static collectionMoveSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { dragObj, dropObj } = action;
    const newCollection = manageMove(state.collectionsAndItsCount, dragObj, dropObj);

    state.collectionsAndItsCount = [...newCollection];
    return state;
    }

  static sharedCollectionMoveSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { destinationId,dragObj } = action;
    const newCollection = manageMoveShared(state.sharedCollections, destinationId, dragObj);
    state.sharedCollections = [...newCollection];
    return state;
    }

  static deleteCollectionSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { id ,isSelectedCollectionShared } = action.meta.previousAction.meta;
    const { data } = action.payload;

    if(!isSelectedCollectionShared){
      if (data) {
        const newCollection = updateAndGetNewCollection(state.collectionsAndItsCount, Number(id));
        state.collectionsAndItsCount = [...newCollection];
      }
    }

    if(isSelectedCollectionShared){
      const newCollection = removeSharedCollection(state.sharedCollections, Number(id));
      state.sharedCollections = [...newCollection];
    }
    
    return state;
  };

  static updateSharedCollection = (prevState, action) => {
        const state                     = { ...prevState }
        const { collectionId,gem}       = action

        let latestData                  = [ ...state.sharedCollections ]

        latestData = modifySharedCollection(latestData,collectionId,gem)
        state.sharedCollections  = [ ...latestData ]
        return state
    }

  static removeSharedCollectionSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { collectionId } = action;
    const newCollection = removeSharedCollection(state.sharedCollections, collectionId);
    state.sharedCollections = [...newCollection];
    return state;
    }

    static addGemToSharedCollection = (prevState, action) => {
        const state                     = { ...prevState }
        const { collectionId,gem } = action;
        const newCollection             = moveGemFromOwnToSharedCollection(state.sharedCollections, collectionId,gem)
        state.sharedCollections = [ ...newCollection ]
        return state
    }

    static updateCollectionWiseCountState = (prevState, action) => {
        const state = { ...prevState };
        const { currentCollectionId,changedCollectionId } = action;
        const newCollection             = updateGemCount(state.collectionsAndItsCount, currentCollectionId, changedCollectionId)
        state.collectionsAndItsCount = newCollection;
        return state
    }

    static reduceCollectionWiseCountState = (prevState, action) => {
        const state = { ...prevState };
        const { currentCollectionId } = action;
        const newCollection             = decrementGemCount(state.collectionsAndItsCount, currentCollectionId,)
        state.collectionsAndItsCount = newCollection;
        return state
    }
    static addCollectionWiseCountState = (prevState, action) => {
        const state = { ...prevState };
        const { collectionId } = action;
        const newCollection             = incrementCollectionCount(state.collectionsAndItsCount, collectionId)
        state.collectionsAndItsCount = newCollection;
        return state
    }

    static createCollectionsSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { data } = action.payload;
    const { tags,isSharedCollection,isParent} = action.meta.previousAction.meta;
    if(!isSharedCollection && isParent){
      if (data) {
      state.collectionsAndItsCount = [
        ...state.collectionsAndItsCount,
        {
          ...data?.data,
          id: data.data?.id,
          folders: [],
          gems_count:0,
          collection: null,
          tags: tags,
        },
      ];
    }
    return state;
    }
    return state;
  };

  static updateCountPublicAddedGem = (prevState, action) => {
        const state = { ...prevState };
        const { collectionId } = action;
        const newCollection             = updateCountForGemAddedInPublicCollection(state.collectionsAndItsCount, collectionId)
        state.collectionsAndItsCount = newCollection;
        return state
    }

  static updateCollectionsSuccess = (prevState, action) => {
        const state           = { ...prevState }
        const { id, updatedData,tags }    = action.meta.previousAction.meta
        const { data }        = action.payload;
        const dataWithTags = {
            ...updatedData,
            tags: tags
        }
        if (data && data.data) {
            const newCollection = modifyCollection(state.collectionsAndItsCount, Number(id), dataWithTags)
            state.collectionsAndItsCount = [ ...newCollection ]
        }
        return state
    }

    static moveToRootSuccess = (prevState, action) => {
        const state          = { ...prevState }
        const { sourceObj }  = action.meta.previousAction.meta
        const newCollection  = manageMove(state.collectionsAndItsCount, sourceObj, null)

        state.collectionsAndItsCount = [ ...newCollection ]
        // session.setCollectionData(JSON.stringify(newCollection))
        return state
    }

    static moveCollectionSharedSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { sourceId,destinationId,dragObj,actionType } = action.meta.previousAction.meta;
    if(actionType === 'add'){
      const newCollection = manageMoveShared(state.sharedCollections, destinationId, dragObj);
      state.sharedCollections = [...newCollection];
    }
    if(actionType === 'edit'){
      // data, sourceCollectionId, destinationCollectionId, updatedSourceObject
      const newCollection = moveAndUpdateSharedCollection(state.sharedCollections, sourceId,destinationId, dragObj);
      state.sharedCollections = [...newCollection];
    }
    if(actionType === 'moveOwnToShare'){
      const newCollection = updateAndGetNewCollection(state.collectionsAndItsCount,sourceId);
      state.collectionsAndItsCount = [...newCollection];
      const newCollection1 = manageMoveShared(state.sharedCollections, destinationId, dragObj);
      state.sharedCollections = [...newCollection1];
    }
    return state;
  };

  static moveCollectionSuccess = (prevState, action) => {
        const state                     = { ...prevState }
        const { dragObj, dropObj }      = action.meta.previousAction.meta
        const newCollection             = manageMove(state.collectionsAndItsCount, dragObj, dropObj)

        state.collectionsAndItsCount = [ ...newCollection ]
        // session.setCollectionData(JSON.stringify(newCollection))
        return state
    }

    static configLimitForCollectionSuccess = (prevState, action) => {
      const state = { ...prevState }
      const { data } = action.payload
      if (data?.data) {
        const configs = data?.data
        session.setAiPromptLibraryId(configs?.aiPromptLibraryId)
        session.setTextExpanderLibraryId(configs?.textExpanderId)

      }
      return state
    }

    static updateCollectionDataForImport = (prevState, action) => {
        const state    = { ...prevState };
        const { data } = action;
        const obj = addGemsCount(data)
        if (data) {
            const arr = Array.isArray(state.collectionsAndItsCount) ? state.collectionsAndItsCount : []
            // state.importData     = [ ...state.importData, obj ]
            state.collectionsAndItsCount = [...arr, obj];
            // session.setCollectionData(JSON.stringify(state.collectionData))

        }
        return state;
    }
}