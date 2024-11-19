import { incrementTagCount, manageMoveTag, modifyTag, removeBookmarkById, removeGemFromTagState, removeSharedCollection, updateAddGemAllTag, updateAndGetNewTagData }            from "@utils/find-collection-id";

export default class TagStateManager {
    static addTagSuccess = (prevState, action) => {
        const state = { ...prevState };
        const data  = action.payload?.data;
        if (data?.data) {
            state.addedTagData = { ...data.data, folders: [], bookmarks: [], parent_tag: null };
            state.allTags      = [ ...state.allTags, { ...data.data, folders: [], bookmarks: [], parent_tag: null } ]
        }
        return state;
    }

    static fetchTagsWithCountsSuccess = (prevState, action) => {
        const state         = { ...prevState };
        const { data }      = action.payload;
        if (data) {
            state.tagsWithGemsCount = data;
        }
        return state;
    }

    static moveTagSuccess = (prevState, action) => {
        const state                     = { ...prevState }
        const { dragObj, dropObj }      = action.meta.previousAction.meta
        const newTag                    = manageMoveTag(state.tagsWithGemsCount, dragObj, dropObj)
        state.tagsWithGemsCount                   = [ ...newTag ]
        return state
    }

    static updateAddNewGemInTag = (prevState, action) => {
        const state = { ...prevState };
        const newData = updateAddGemAllTag(state.allTags,action.data.tagIds,action.data.gemId,action.data.gemObj)

        state.allTags = [...newData]
        return state;
    }
    static removeGemFromTag = (prevState, action) => {
        const state = { ...prevState };
        const newData = removeGemFromTagState(state.allTags,action.gemId)

        state.allTags = [...newData]
        return state;
    }

    static updateTag = (prevState, action) => {
        const state           = { ...prevState }
        const { id,isSelectedTagShared }    = action.meta.previousAction.meta
        const { data }        = action.payload.data

        if(!isSelectedTagShared){
            if (data) {
                const payload = {
                    ...data.attributes,
                }
                const newTags = modifyTag(state.allTags, Number(id), payload)
                state.allTags = [ ...newTags ]
                const nTags = modifyTag(state.tagsWithGemsCount, Number(id), payload)
                state.tagsWithGemsCount = [ ...nTags ]
            }
        }

        if(isSelectedTagShared){
            if (data) {
                const payload = {
                    ...data.attributes,
                }
                const newTags = modifyTag(state.sharedTags, Number(id), payload)
                state.sharedTags = [ ...newTags ]
            }
        }

        return state
    }

    static deleteTag = (prevState, action) => {
        const state         = { ...prevState };
        const { id, isSelectedTagShared }        = action.meta.previousAction.meta
        const { data }      = action.payload;

        if(!isSelectedTagShared){
            if (data) {
                const newTagData     = updateAndGetNewTagData(state.tagsWithGemsCount, Number(id))
                state.tagsWithGemsCount    = [ ...newTagData ]
            }
        }

        if(isSelectedTagShared){
            const newCollection = removeSharedCollection(state.sharedTags, Number(id));
            state.sharedTags = [...newCollection];
        }

        return state;
    };

    static getSuggestedTagColors = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.suggestedTagColors = data?.data || [];
        }
        return state;
    }

    static moveToRootSuccess = (prevState, action) => {
        const state          = { ...prevState }
        const { sourceObj }  = action.meta.previousAction.meta
        const newData  = manageMoveTag(state.allTags, sourceObj, null)

        state.allTags = [ ...newData ]
        return state
    }

    static addTagCountState = (prevState, action) => {
        const state          = { ...prevState }
        const { tagNames,process }  = action
        const newData  = incrementTagCount(state.tagsWithGemsCount, tagNames,process)

        state.tagsWithGemsCount = newData
        return state
    }

    static getSingleTagDetails = (prevState, action) => {
        const state         = { ...prevState };
        const { data }      = action.payload;
        if (data) {
            state.singleTag = data?.data || [];
        }
        return state;
    }

    static getSharedTags = (prevState, action) => {
        const state         = { ...prevState };
        const { data }      = action.payload;
        if (data) {
            state.sharedTags = data?.data || [];
        }
        return state;
    }

    static removeSharedTagSuccess = (prevState, action) => {
    const state = { ...prevState };
    const { tagId } = action;
    const newCollection = removeSharedCollection(state.sharedTags, tagId);
    state.sharedTags = [...newCollection];
    return state;
    }

    static removeGemSharedTags = (prevState, action) => {
    const state = { ...prevState };
    const { tagId,gemId } = action;
    const newCollection = removeBookmarkById(state.sharedTags, tagId,gemId);
    state.sharedTags = [...newCollection];
    return state;
    }
}