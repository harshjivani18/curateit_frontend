import * as ActionTypes from './action-types';

export const getAllBookmarks = (page) => (
    {
        type: ActionTypes.GET_ALL_BOOKMARK,
        payload: {
            request: {
                url: `/api/get-all-bookmark?perPage=20&page=${page}`,
                method: "get"
            }
        }
    });

export const getAllBookmarksByAmount = (amount = 20) => (
    {
        type: ActionTypes.GET_ALL_BOOKMARK_BY_AMOUNT,
        payload: {
            request: {
                url: `/api/get-all-bookmark?perPage=${amount}&page=1`,
                method: "get"
            }
        }
    });

export const getAllBookmarksByUserId = (body) => (
    {
        type: ActionTypes.GET_ALL_BOOKMARK_BY_USERID,
        payload: {
            request: {
                url: `/api/get-all-bookmark?perPage=20&page=${body.page}&userQueryId=${body.userId}`,
                method: "get"
            }
        }
    });

export const getBookmarkByCollections = (query) => (
    {
        type: ActionTypes.GET_BOOKMARK_BY_COLLECTION,
        payload: {
            request: {
                url: `/api/get-all-bookmark?groupBy=${query}`,
                method: "get"
            }
        }
    });

export const changeBookmarkCollections = (bookmarkId, collectionId) => (
    {
        type: ActionTypes.CHANGE_BOOKMARK_TO_DIFFERENT_COLLECTION,
        payload: {
            request: {
                url: `/api/bookmark/${bookmarkId}/move/${collectionId}`,
                method: "post"
            }
        }
    });

export const deleteBookmark = (bookmarkId) => ({
    type: ActionTypes.DELETE_BOOKMARK,
    payload: {
        request: {
            url: `/api/gems/${bookmarkId}`,
            method: "delete",
        }
    }
})

export const bulkDeleteBookmark = (data) => ({
    type: ActionTypes.DELETE_BOOKMARK,
    payload: {
        request: {
            url: `/api/delete-bookmarks`,
            method: "post",
            data
        }
    }
})

export const getBookmarkByFilters = (query = '', page, isMediaType = false, isFavourite = false, isTags = false) => (
    {
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

export const resetExistingGem = (gemId) => ({
    type: ActionTypes.RESET_EXISTING_GEM,
    gemId
})

export const getBookmarkByFiltersAndAmount = (query = '', amount, page, isMediaType = false, isFavourite = false, isTags = false) => (
    {
        type: ActionTypes.GET_BOOKMARK_BY_FILTERS_AND_AMOUNT,
        payload: {
            request: {
                url: isMediaType ? `/api/fetch-bookmarks?type=${query}&perPage=${amount}&page=${page}` :
                    isFavourite ? `/api/fetch-bookmarks?is_favourite=true&perPage=${amount}&page=${page}` :
                        isTags ? `/api/fetch-bookmarks?tags=true&perPage=${amount}&page=${page}` :
                            `/api/fetch-bookmarks?type=${query}&perPage=${amount}&page=${page}`,
                method: "get"
            }
        }
    });


export const extractImageText = (image) => ({
    type: ActionTypes.EXTRACT_IMAGE_TEXT,
    payload: {
        request: {
            url: `/api/ocre?image=${image}&ocr=true`,
            method: "post",
            data: {
                link: image
            }
        }
    }
})

export const updateBookmarkFilterConfig = (data) => ({
    type: ActionTypes.UPDATE_BOOKMARK_FILTERS_CONFIG,
    payload: {
        request: {
            url: `/api/config-coll-setting?isFilter=true`,
            method: "put",
            data: {
                data
            }
        }
    }
});

export const getGroupByData = (groupBy, page) => (
    {
        type: ActionTypes.GROUP_BY,
        payload: {
            request: {
                url: `/api/filter-bookmark?groupBy=${groupBy}&perPage=10&pageno=${page}`,
                method: "get"
            }
        }
    });

export const getSubGroupByData = (groupBy, subGroupBy, page) => (
    {
        type: ActionTypes.SUB_GROUP_BY,
        payload: {
            request: {
                url: `/api/filter-bookmark?groupBy=${groupBy}&subGroupBy=${subGroupBy}&perPage=10&pageno=${page}`,
                method: "get"
            }
        }
    });

export const resetGroupByData = () => ({
    type: ActionTypes.RESET_GROUP_BY,
})
export const resetSubGroupByData = () => ({
    type: ActionTypes.RESET_SUB_GROUP_BY,
})


//filter page
export const getGroupByFilterPageData = (groupBy, page = '', is_favourite = false, pagination) => (
    {
        type: ActionTypes.GROUP_BY_FILTER_PAGE,
        payload: {
            request: {
                url: page ? `/api/filter-bookmark?groupBy=${groupBy}&page=${page}&perPage=10&pageno=${pagination}` :
                    is_favourite ? `/api/filter-bookmark?groupBy=${groupBy}&is_favourite=${is_favourite}&perPage=10&pageno=${pagination}` : `/api/filter-bookmark?groupBy=${groupBy}&perPage=10&pageno=${pagination}`,
                method: "get"
            }
        }
    });

export const getSubGroupByFilterPageData = (groupBy, subGroupBy, page = '', is_favourite = false, pagination) => (
    {
        type: ActionTypes.SUB_GROUP_BY_FILTER_PAGE,
        payload: {
            request: {
                url: page ? `/api/filter-bookmark?groupBy=${groupBy}&page=${page}&subGroupBy=${subGroupBy}&perPage=10&pageno=${pagination}` :
                    is_favourite ? `/api/filter-bookmark?groupBy=${groupBy}&is_favourite=${is_favourite}&subGroupBy=${subGroupBy}&perPage=10&pageno=${pagination}` :
                        `/api/filter-bookmark?groupBy=${groupBy}&subGroupBy=${subGroupBy}&perPage=10&pageno=${pagination}`,
                method: "get"
            }
        }
    });

export const resetGroupByFilterPageData = () => ({
    type: ActionTypes.RESET_GROUP_BY_FILTER_PAGE,
})
export const resetSubGroupByFilterPageData = () => ({
    type: ActionTypes.RESET_SUB_GROUP_BY_FILTER_PAGE,
})

export const getBookDetails = (bookName) => ({
    type: ActionTypes.GET_BOOK_DETAILS,
    payload: {
        request: {
            url: `/api/book-list?name=${bookName}`,
            method: "get"
        }
    }
})

export const getPlatformProfile = (url) => ({
    type: ActionTypes.GET_PLATFORM_PROFILE,
    payload: {
        request: {
            url: `/api/platform/profile?url=${url}`,
            method: "get"
        }
    }
})

export const updateBrokenDuplicateFilterConfig = (data) => ({
    type: ActionTypes.UPDATE_BROKEN_DUPLICATE_FILTERS_CONFIG,
    payload: {
        request: {
            url: `/api/config-coll-setting?isLinks=true`,
            method: "put",
            data: {
                data
            }
        }
    }
});

export const getFilteredBookmarks = (filterby = '', queryBy = '', termtype = '', page, sortby = '', orderby = '', isSort = false, isFilter = false) => (
    {
        type: ActionTypes.FILTER_BOOKMARK,
        payload: {
            request: {
                url: `/api/filter-search?filterby=${filterby}&queryby=${queryBy}&termtype=${termtype}&sortby=${sortby}&orderby=${orderby}&page=${page}&perPage=20`
                ,
                method: "get"
            }
        }
    });

export const resetFilterBookmark = () => ({
    type: ActionTypes.RESET_FILTER_BOOKMARK,
})

export const resetFilteredBookmarkData = () => ({
    type: ActionTypes.RESET_FILTERED_BOOKMARKS_DATA
})

export const getFilterPageFilteredBookmarks = (filterby = '', queryBy = '', termtype = '', page, type, sortby = '', orderby = '') => (
    {
        type: ActionTypes.FILTER_PAGE_BOOKMARK,
        payload: {
            request: {
                url: `/api/filter-search?filterby=${type === 'without tags' ? 'tags' : type === 'Favourites' ? 'is_favourite' : 'media_type'},${filterby}&queryby=${type === 'without tags' ? ' ' : type === 'Favourites' ? true : type},${queryBy}&termtype=${type === 'without tags' ? 'empty' : 'is'},${termtype}&sortby=${sortby}&orderby=${orderby}&page=${page}&perPage=20`,
                method: "get"
            }
        }
    });

export const resetFilterPageFilteredBookmark = () => ({
    type: ActionTypes.RESET_FILTER_PAGE_BOOKMARK,
})

export const searchBookmark = (value) => (
    {
        type: ActionTypes.SEARCH_BOOKMARK,
        payload: {
            request: {
                url: `/api/search?search=${value}`,
                method: "get"
            }
        }
    });

export const getSearchBooks = (name) => ({
    type: ActionTypes.SEARCH_BOOKS,
    payload: {
        request: {
            url: `/api/book-list?name=${name}`,
            method: "get",
        }
    }
})

export const getSelectedBook = (id) => ({
    type: ActionTypes.CREATE_BOOK_GEM,
    payload: {
        request: {
            url: `/api/book-details?bookId=${id}`,
            method: "get",
        }
    }
})

export const getSearchMovies = (name) => ({
    type: ActionTypes.SEARCH_MOVIES,
    payload: {
        request: {
            url: `/api/movies-list?name=${name}`,
            method: "get",
        }
    }
})

export const getSelectedMovie = (id) => ({
    type: ActionTypes.CREATE_MOVIE_GEM,
    payload: {
        request: {
            url: `/api/movie-details?imdbId=${id}`,
            method: "get",
        }
    }
})

export const addGem = (data,isPublic=false) => ({
    type: ActionTypes.ADD_GEM,
    payload: {
      request: {
        url: isPublic ? `/api/gems?populate=tags&isPublic=true` : `/api/gems?populate=tags`,
        method: "post",
        data
      },
    }
});

export const createPdf = (data) => ({
    type: ActionTypes.UPLOAD_PDF,
    payload: {
        request: {
            url: `/api/pdf`,
            method: "post",
            data
        }
    }
})

export const createAudio = (data, isRecord) => ({
    type: ActionTypes.CREATE_AUDIO,
    payload: {
        request: {
            url: `/api/audios?isRecord=${isRecord}`,
            method: "post",
            data
        }
    }
})

export const createVideo = (data) => ({
    type: ActionTypes.CREATE_VIDEO,
    payload: {
        request: {
            url: `/api/videos`,
            method: "post",
            data
        }
    }
})

export const addImage = (data, image, imgColor = true) => (
    {
        type: ActionTypes.ADD_IMAGE,
        payload: {
            request: {
                url: imgColor ? `/api/ocre?image=${image}&imageColor=true` : `/api/ocre?image=${image}`,
                method: "post",
                data
            }
        }
    });

export const addCode = (data) => (
    {
        type: ActionTypes.ADD_CODE,
        payload: {
            request: {
                url: `/api/code`,
                method: "post",
                data
            }
        }
    });

export const profilePageFilteredBookmarks = (filterby = '', queryBy = '', termtype = '', page, sortby = '', orderby = '', userId = '') => (
    {
        type: ActionTypes.FILTER_PROFILE_PAGE_BOOKMARK,
        payload: {
            request: {
                url: `/api/filter-search?filterby=${filterby}&queryby=${queryBy}&termtype=${termtype}&sortby=${sortby}&orderby=${orderby}&page=${page}&perPage=20&userQueryId=${userId}`
                ,
                method: "get"
            }
        }
    });

export const saveOtherGemInCollection = (url) => (
    {
        type: ActionTypes.SAVE_OTHER_GEM_IN_COLLECTION,
        payload: {
            request: {
                url: `/api/collection-list?url=${url}`,
                method: "get"
            }
        }
    });

export const saveSocialProfileInCache = (url, socialSite, id, platform) => (
    {
        type: ActionTypes.SAVE_SOCIAL_PROFILE_IN_CACHE,
        payload: {
            request: {
                url: `/api/cache-details?url=${url}&socialSite=${socialSite}&id=${id}&platform=${platform}`,
                method: "get"
            }
        }
    });

export const getPageConfig = (userId) => ({
    type: ActionTypes.GET_PAGE_CONFIG,
    payload: {
        request: {
            url: userId ? `/api/get-bookmark-configs?queryUserId=${userId}` : `/api/get-bookmark-configs`,
            method: "get"
        }
    }
});

export const savePageConfig = (data) => ({
    type: ActionTypes.SAVE_PAGE_CONFIG,
    payload: {
        request: {
            url: `/api/change-bookmark-configs`,
            method: "put",
            data
        }
    }
});

export const gemAdded = (gem) => ({
    type: ActionTypes.GEM_ADDED,
    gem
})

export const getBookmarkDetailsMicrolink = (url) => ({
    type: ActionTypes.GET_BOOKMARK_DETAILS_MICROLINK,
    payload: {
        request: {
            url: `/api/cache-details?url=${url}`,
            method: "get"
        }
    }
});

export const getAudioText = (data) => ({
    type: ActionTypes.FETCH_TEXT_FROM_AUDIO,
    payload: {
        request: {
            url: `/api/enhanced-text`,
            method: "post",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data
        }
    }
});

// public
export const addGemPublic = (data) => ({
    type: ActionTypes.ADD_GEM_PUBLIC,
    payload: {
      request: {
        url: `/api/gems?populate=tags&isPublic=true`,
        method: "post",
        data
      },
    }
  });

export const createPdfPublic = (data) => ({
    type: ActionTypes.UPLOAD_PDF_PUBLIC,
    payload: {
        request: {
            url: `/api/pdf?isPublic=true`,
            method: "post",
            data
        }
    }
})

export const createAudioPublic = (data) => ({
    type: ActionTypes.CREATE_AUDIO_PUBLIC,
    payload: {
        request: {
            url: `/api/audios?isPublic=true`,
            method: "post",
            data
        }
    }
})

export const createVideoPublic = (data) => ({
    type: ActionTypes.CREATE_VIDEO_PUBLIC,
    payload: {
        request: {
            url: `/api/videos?isPublic=true`,
            method: "post",
            data
        }
    }
})

export const addImagePublic = (data,image,imgColor=true) => (
  {
  type: ActionTypes.ADD_IMAGE_PUBLIC,
  payload: {
      request: {
          url: `/api/ocre?image=${image}&imageColor=true&isPublic=true`,
          method: "post",
          data
      }
  }
});

export const addCodePublic = (data) => (
  {
  type: ActionTypes.ADD_CODE_PUBLIC,
  payload: {
      request: {
          url: `/api/code?isPublic=true`,
          method: "post",
          data
      }
  }
});

export const uploadAllTypeFileInS3 = (data) => ({
  type: ActionTypes.UPLOAD_ALL_FILE_TYPE,
  payload: {
    request: {
      url: `/api/upload-all-file`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    },
  },
});

export const getTextFromImage = (url) => ({
    type: ActionTypes.GET_TEXT_FROM_IMAGE,
    payload: {
        request: {
            url: `/api/image-text?image=${url}`,
            method: "get"
        }
    }
});

export const uploadAllTypeUrlInS3 = (data) => ({
  type: ActionTypes.UPLOAD_ALL_FILE_TYPE,
  payload: {
    request: {
      url: `/api/upload-all-file`,
      method: "post",
      data,
    },
  },
});

export const fetchPlatformTypeFromUrl = (data) => ({
  type: ActionTypes.GET_PLATFORM_TYPE,
  payload: {
    request: {
      url: `/api/fetch-platform-gem-type`,
      method: "post",
      data,
    },
  },
});