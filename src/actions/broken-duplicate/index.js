import * as ActionTypes from "./action-types";

export const getBrokenLinks = (page) => ({
  type: ActionTypes.GET_BROKEN_LINKS,
  payload: {
    request: {
      url: `/api/identify-broken-gems?perPage=20&page=${page}`,
      method: "get",
    }
  }
});

export const getDuplicateLinks = (page) => ({
  type: ActionTypes.GET_DUPLICATE_LINKS,
  payload: {
    request: {
      url: `/api/identify-duplicate-gems?perPage=20&page=${page}`,
      method: "get",
    }
  }
});

export const getDuplicateLinksByAmount = (amount) => ({
  type: ActionTypes.GET_DUPLICATE_LINKS_BY_AMOUNT,
  payload: {
    request: {
      url: `/api/identify-duplicate-gems?perPage=${amount}&page=1`,
      method: "get",
    }
  }
});

export const getFilteredBrokenBookmarks = (filterby='',queryBy='',termtype='',page,sortby='',orderby='') => (
    {
        type: ActionTypes.FILTER_BROKEN_BOOKMARK,
        payload: {
            request: {
                url: `/api/filter-search?filterby=broken_link,${filterby}&queryby=true,${queryBy}&termtype=is,${termtype}&sortby=${sortby}&orderby=${orderby}&page=${page}&perPage=20`,
                method: "get"
            }
        }
    });

export const resetFilterBrokenBookmark = () => ({
    type: ActionTypes.RESET_FILTER_BROKEN_BOOKMARK,
})