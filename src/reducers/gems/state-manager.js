import { CHART_COLORS } from "@utils/constants";
import { modifyFilterCount } from "@utils/find-collection-id";
import { MEDIA_TYPES_ICONS_OBJ }            from "@utils/media-types";
export default class GemsStateManager {
    static getBookmarkByFilterSuccess = (prevState, action) => {
        const state = { ...prevState };
        const data  = action.payload?.data;
        if (data?.data) {
            state.addedTagData = { ...data.data, folders: [], bookmarks: [], parent_tag: null };
            state.allTags      = [ ...state.allTags, { ...data.data, folders: [], bookmarks: [], parent_tag: null } ]
        }
        return state;
    }

    static fetchGemsFiltersSuccess = (prevState, action) => {
        const state         = { ...prevState };
        const { data }      = action.payload;

        if (data) {
            const arr = []
            const mediaArr = []
            Object.keys(data).forEach((key) => {
                const o = MEDIA_TYPES_ICONS_OBJ[key];
                arr.push({ ...o, count: data[key] })
                mediaArr.push({ ...o, color: CHART_COLORS[Math.floor(Math.random()*CHART_COLORS.length)], count: data[key]})
            })
            state.filtersAndItsCount = arr.sort((a, b) => b.count - a.count);
            state.mediaTypeChartData = mediaArr.sort((a, b) => b.count - a.count);
        }  

        return state
    }

    static detailSuccess = (prevState, action) => {
        const state = { ...prevState };
        const data = action.payload.data;
        if (!data?.status && !data?.message) {
            state.details = data;
        }
        return state;
    };

    static updateFilterCountState = (prevState, action) => {
        const state = { ...prevState };
        const {mediaType,process} = action;
        const data = modifyFilterCount(state.filtersAndItsCount,mediaType,process)
        state.filtersAndItsCount = data
        return state;
    };
}