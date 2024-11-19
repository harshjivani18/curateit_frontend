export default class BrokenDuplicateStateManager {
    static getBrokenLinks = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.brokenLinks = data.data || [];  
            state.totalCount = data.gemsCount || 0;  
        }
        return state;
    };

    static getDuplicateLinks = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.duplicateLinks = data.data || [];  
            state.totalCount = data.gemCount || 0;
        }
        return state;
    };

    static getFilteredBrokenBookmarks = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.filteredBrokenBookmarks = data?.finalRes || [];  
            state.filteredBrokenBookmarksCount = data?.totalCount || 0;
        }
        return state;
    };
}
