export default class BookmarkStateManager {
    static getAllBookmarks = (prevState, action) => {
        const state = { ...prevState };
        const {data,totalBookmark} = action.payload.data;
        if (data) {
            state.allBookmarks = data.bookmark || [];  
            state.totalCount = totalBookmark || 0;
        }
        return state;
    };

    static getBookmarkByCollections = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload.data;
        if (data) {
            state.bookmarkByCollections = data || [];  
        }
        return state;
    };

    static getBookmarkByFilters = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        state.bookmarkByFilters = data?.message || [];  
        state.bookmarkByFiltersCount = data?.totalCount || 0;  
        
        return state;
    };

    static resetExistingGem = (prevState, action) => {
        const state         = { ...prevState }
        const { gemId }     = action

        const index         = state.bookmarkByFilters.findIndex((b) => { return b.id === gemId })

        if (index !== -1) {
            state.bookmarkByFilters.splice(index, 1)
            state.bookmarkByFilters         = [ ...state.bookmarkByFilters ]
        }

        return state
    }

    static getFilteredBookmarks = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.filteredBookmarks = data?.finalRes || [];  
            state.filteredBookmarksCount = data?.totalCount || 0;
        }
        return state;
    };

    static getFilterPageFilteredBookmarks = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload;
        if (data) {
            state.filterPageFilteredBookmarks = data?.finalRes || [];  
            state.filterPageFilteredBookmarksCount = data?.totalCount || 0;
        }
        return state;
    };
}
