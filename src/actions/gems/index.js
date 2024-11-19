import * as ActionTypes from './action-types';

export const searchBookmark = (value) => ({
    type: ActionTypes.SEARCH_GEMS,
    payload: {
        request: {
            url: `/api/search?search=${value}`,
            method: "get"
        }
    }
});

export const getBookmarkByFilters = (query = '', page, isMediaType = false, isFavourite = false, isTags = false) => ({
    type: ActionTypes.GET_BOOKMARK_BY_FILTERS,
    payload: {
        request: {
            url: isMediaType ? `/api/fetch-bookmarks?type=${query}&perPage=20&page=${page}` :
                isFavourite ? `/api/fetch-bookmarks?is_favourite=true&perPage=20&page=${page}` :
                    isTags ? `/api/fetch-bookmarks?tags=true&perPage=20&page=${page}` :
                        `/api/fetch-bookmarks?type=${query}&perPage=20&page=${page}`,
            method: "get"
        }
    }
});

export const fetchGemsFilters = () => ({
    type: ActionTypes.FETCH_GEMS_FILTERS,
    payload: {
        request: {
            url: "/api/gems-filters-count",
            method: "get"
        }
    }
})

export const deleteAllGems = () => ({
    type: ActionTypes.DELETE_ALL_GEMS,
    payload: {
      request: {
        url: `/api/delete-gems`,
        method: "delete",
      },
    },
  })

export const updateScreenshot = (token, data) => ({
    type: ActionTypes.UPDATE_SCREENSHOT,
    payload: {
        request: {
          url: `/api/update-existing-screenshot`,
          method: "put",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          data
        }
    }
})

export const resetGemsFilters = () => ({
  type: ActionTypes.RESET_GEMS_FILTERS,
});

export const setCurrentGem = (gem) => ({
  type: ActionTypes.SET_CURRENT_GEM,
  gem
})

export const fetchTextToSpeech = (body) => ({
  type: ActionTypes.FETCH_TEXT_TO_SPEECH,
    payload: {
      request: {
        url: `api/text-to-speechify`,
        method: "POST",
        data:body
      }
    }
  });

export const addHighlight = (collectionId,highlightData) => (
  {
  type: ActionTypes.ADD_HIGHLIGHT,
  payload: {
      request: {
          url: `/api/collections/${collectionId}/highlights`,
          method: "post",
          data: highlightData
      }
  }
});


export const deleteHighlight = (collectionId,gemId,highlightId) => ({
    type: ActionTypes.DELETE_HIGHLIGHT,
    payload: {
        request: {
            url: `/api/collections/${collectionId}/highlights/${gemId}/${highlightId}`,
            method: "delete",
        }
    },
})

export const fetchUrlHighlights = (url) => ({
  type: ActionTypes.FETCH_URL_HIGHLIGHTS,
  payload: {
    request: {
      url: `/api/highlights?url=${encodeURIComponent(url)}`,
      method: "get"
    }
  }
})

export const fetchDomainDetails = (link,isColor=false,isTechStack=false) => ({
    type: ActionTypes.FETCH_DOMAIN_DETAILS,
    payload: {
        request: {
            url: isColor ? `/api/domain?url=${link}&brandcolor=true` : isTechStack ? `/api/domain?url=${link}&technologystack=true` :  `/api/domain?url=${link}`,
            method: "get",
            data: {
                link
            }
        }
    }
})

export const setDomainDetails = (data) => ({
    type: ActionTypes.SET_DOMAIN_DETAILS,
    payload: data
})

export const fetchTranscriptUrl = (url) => ({
  type: ActionTypes.GET_TRANSCRIPT_URL,
  payload: {
    request: {
      url: `/api/fetch-transcript?url=${url}`,
      method: "get"
    }
  }
})

export const getArticle = (url) => ({
  type: ActionTypes.FETCH_ARTICLE,
  payload: {
    request: {
      url: `/api/article?url=${url}`,
      method: "get"
    }
  }
})

export const getSingleFile = (id, isRefreshed=false) => ({
  type: ActionTypes.GET_SINGLE_FILE,
  payload: {
    request: {
      url: isRefreshed ? `/api/reader-view/${id}?refresh=true` : `/api/reader-view/${id}`,
      method: "get"
    }
  }
})

export const updateFilterCount = (mediaType,process='add') => ({
    type: ActionTypes.UPDATE_FILTER_COUNT,
    mediaType,process
})

export const updateGemSeoDetails = (gemId,seoDetails) => ({
  type: ActionTypes.UPDATE_GEM_SEO_DETAILS,
  payload: {
    request: {
      url: `/api/gems/${gemId}/seo-details`,
      method: "patch",
      data: { seo: seoDetails, slug: seoDetails?.seo?.slug, altInfo: seoDetails?.seo?.altInfo || "" }
    }
  }
})

export const updateUsageCount = (gemId) => ({
  type: ActionTypes.UPDATE_USAGE_COUNT,
  payload: {
    request: {
      url: `/api/usage-count/${gemId}`,
      method: "PUT",
    }
  }
})

export const getUsageCount = (gemId) => ({
  type: ActionTypes.GET_USAGE_COUNT,
  payload: {
    request: {
      url: `/api/gems-usage-list`,
      method: "GET",
    }
  }
})

// blogs

export const createBlog = (data, collectionId) => ({
  type: ActionTypes.CREATE_BLOG,
  payload: {
    request: {
      url: `/api/blogs/${collectionId}`,
      method: "post",
      data
    }
  }
})

export const updateBlog = (data, blogId) => ({
  type: ActionTypes.UPDATE_BLOG,
  payload: {
    request: {
      url: `/api/blogs/${blogId}`,
      method: "patch",
      data
    }
  }
})

export const publishBlog = (blogId) => ({
  type: ActionTypes.PUBLISH_BLOG,
  payload: {
    request: {
      url: `/api/blogs/${blogId}/published`,
      method: "patch",
    }
  }
})