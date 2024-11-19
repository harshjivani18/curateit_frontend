import * as ActionTypes         from "@actions/tags/action-types";
const headers = {
  'Content-Type': 'multipart/form-data',
}

export const addTag = (data) => ({
    type: ActionTypes.ADD_TAG,
    payload: {
        request: {
            url: `/api/tags`,
            method: "post",
            data
        }
    }
});

export const fetchTagsWithGemsCount = () => ({
    type: ActionTypes.FETCH_TAGS_WITH_GEM_COUNTS,
    payload: {
        request: {
            url: `/api/tag-wise-gem-counts`,
            method: "get"
        }
    }
})

export const clearAllTags = () => {
    return{
    type: ActionTypes.CLEAR_ALL_TAGS
  }};

export const moveTag = (sourceId,destinationId,dragObj,dropObj) => ({
    type: ActionTypes.MOVE_TAG,
    payload: {
      request: {
        url: `/api/tags/${sourceId}/move/${destinationId}`,
        method: "post",
      }
    },
    meta: {
        sourceId, 
        destinationId,
        dragObj,
        dropObj
    }
});

export const updateAddNewGemInTag = (tagIds,gemId,gemObj,isShared=false) => {
    return{
    type: ActionTypes.UPDATE_ADD_NEW_GEM_TAG,
    data: {
      tagIds,gemId,gemObj,isShared
    }
  }};
export const removeGemFromTag = (gemId) => {
    return{
    type: ActionTypes.REMOVE_GEM_FROM_TAG,
    gemId
  }};

export const getGemsInTag = (tagId,page) => (
    {
    type: ActionTypes.GET_GEMS_IN_TAGS,
    payload: {
        request: {
            url: `/api/tags/${tagId}?perPage=20&page=${page}`,
            method: "get"
        }
    }
});

export const updateConfigTag = (data) => (
    {
    type: ActionTypes.UPDATE_CONFIG_TAG,
    payload: {
        request: {
            url: `/api/config-coll-setting?isTag=true`,
            method: "put",
            data
        }
    }
});

export const getTagPageFilteredBookmarks = (filterby='',queryBy='',termtype='',page,name,sortby='',orderby='') => (
    {
        type: ActionTypes.TAG_FILTER_BOOKMARK,
        payload: {
            request: {
                url: 
                `/api/filter-search?filterby=tags,${filterby}&queryby=${name},${queryBy}&termtype=is,${termtype}&sortby=${sortby}&orderby=${orderby}&page=${page}&perPage=20`
                ,
                method: "get"
            }
        }
    });

export const resetTagPageFilteredBookmark = () => ({
    type: ActionTypes.RESET_TAG_FILTER_BOOKMARK,
})

export const uploadIconsTag = (data) => ({
  type: ActionTypes.UPLOAD_ICONS_TAG,
  payload: {
    request: {
      url: `/api/icon?isTagIcon=true`,
      method: "post",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data
    }
  }
})

export const UploadUnsplashCoverS3LinkTag = (link, tagId) => ({
  type: ActionTypes.UPLOAD_UNSPLASH_IMAGE_IN_S3_TAG,
  payload: {
    request: {
      url: `/api/upload?fileLink=${link}&isTagCover=true&tagId=${tagId}`,
      method: "post",
      headers,
    }
  }
});

export const UploadCoverS3LinkTag = (data, tagId) => ({
  type: ActionTypes.UPLOAD_COVER_S3_LINK_TAG,
  payload: {
    request: {
      url: `/api/upload?isTagCover=true&tagId=${tagId}`,
      method: "post",
      headers,
      data
    }
  }
});

export const updateTag = (tagId,data,isSelectedTagShared=null) => (
    {
    type: ActionTypes.UPDATE_TAG,
    payload: {
        request: {
            url: `/api/tags/${tagId}`,
            method: "put",
            data : {
                data
            }
        }
    },
    meta: {
    id:tagId, 
    updatedData: data,
    isSelectedTagShared
  }
});

export const getSuggestedTagColors = () => (
    {
    type: ActionTypes.SUGGESTED_TAG_COLORS,
    payload: {
        request: {
            url: `/api/tag-colors`,
            method: "get"
        }
    }
});

export const deleteTag = (tagId,isSelectedTagShared=null) => ({
  type: ActionTypes.DELETE_TAG,
  payload: {
    request: {
      url: `/api/tags/${tagId}`,
      method: "delete",
    }
  },
  meta: {
    id:tagId,
    isSelectedTagShared:isSelectedTagShared
  }
});

export const moveToRootTag = (sourceId, sourceObj) => ({
  type: ActionTypes.MOVE_TO_ROOT_TAG,
  payload: {
    request: {
      url: `/api/tags/${sourceId}/move-to-root`,
      method: "post"
    },
  },
  meta: {
    sourceObj,
    sourceId
  }
})

export const addTagCount = (tagNames,process='add') => ({
    type: ActionTypes.ADD_TAG_COUNT,
    tagNames,process
})

export const shareTagViaEmail = (tagId, data) => ({
  type: ActionTypes.SHARE_TAG_VIA_EMAIL,
  payload: {
    request: {
      url: `/api/tag-email/${tagId}`,
      method: "post",
      data
    }
  }
});

export const shareTagViaLink = (tagId,data) => ({
  type: ActionTypes.SHARE_TAG_VIA_LINK,
  payload: {
    request: {
      url: `/api/tag-link/${tagId}`,
      method: "post",
      data
    }
  }
});

export const checkTagExpiration = (email, tagId) => ({
  type: ActionTypes.CHECK_TAG_EXPIRATION,
  payload: {
    request: {
      url: `/api/tag-email?tagId=${tagId}&email=${email}`,
      method: "get",
    }
  }
});

export const getSharedTags = () => ({
  type: ActionTypes.GET_SHARED_TAGS,
  payload: {
    request: {
      url: `/api/share-with-me-tags`,
      method: "get",
    }
  }
});

export const resetSharedTags = () => ({
  type: ActionTypes.RESET_SHARED_TAGS,
});

export const checkTagViaLink = (inviteTokenId, tagId) => ({
  type: ActionTypes.CHECK_TAG_VIA_LINK,
  payload: {
    request: {
      url: `/api/tag-link?inviteId=${inviteTokenId}&tagId=${tagId}`,
      method: "get",
    }
  }
});

export const getPublicShareTag = (tagId,page) => ({
  type: ActionTypes.GET_PUBLIC_SHARE_TAG,
  payload: {
    request: {
      url: `/api/share-public-tags?tagId=${tagId}&page=${page}&perPage=20&isPagination=true`,
      method: "get",
    }
  }
});

export const getSingleTagDetails = (tagId) => ({
  type: ActionTypes.GET_SINGLE_TAG_DETAILS,
  payload: {
    request: {
      url: `/api/tags/${tagId}?shareDetails=true`,
      method: "get",
    }
  }
});

export const getPublicSharedTags = (tagId) => ({
  type: ActionTypes.GET_PUBLIC_SHARED_TAGS,
  payload: {
    request: {
      url: `/api/share-public-tags?tagId=${tagId}`,
      method: "get",
    }
  }
});

export const changeSecurityEmail = (tagId, tokenId, data) => ({
  type: ActionTypes.CHANGE_SECURITY_EMAIL,
  payload: {
    request: {
      url: `/api/tag/${tagId}/security?id=${tokenId}`,
      method: "post",
      data
    }
  }
});

export const removeAccessEmail = (token, tagId) => ({
  type: ActionTypes.REMOVE_ACCESS_EMAIL,
  payload: {
    request: {
      url: `/api/tag/${tagId}/remove-access?id=${token}&isLink=false`,
      method: "delete",
    }
  }
});

export const removeSharedTag = (tagId) => ({
  type: ActionTypes.REMOVE_SHARED_TAG,
  tagId
})

export const removeAccessLink = (id, tagId) => ({
  type: ActionTypes.REMOVE_ACCESS_LINK,
  payload: {
    request: {
      url: `/api/tag/${tagId}/remove-access?id=${id}&isLink=true`,
      method: "delete",
    }
  }
});

export const changeSecurityLink = (tagId, tokenId, data) => ({
  type: ActionTypes.CHANGE_SECURITY_LINK,
  payload: {
    request: {
      url: `/api/tag/${tagId}/security?id=${tokenId}&isLink=true`,
      method: "post",
      data
    }
  }
});

//public
export const shareTagViaPublic = (tagId, data) => ({
  type: ActionTypes.SHARE_TAG_VIA_PUBLIC,
  payload: {
    request: {
      url: `/api/tag-public-link/${tagId}?isShare=true`,
      method: "post",
      data
    }
  }
});

export const checkTagViaPublic = (tagId) => ({
  type: ActionTypes.CHECK_TAG_VIA_PUBLIC,
  payload: {
    request: {
      url: `/api/tag-public-link?tagId=${tagId}`,
      method: "get",
    }
  }
});

export const disablePublicLink = (tagId) => ({
  type: ActionTypes.DISABLE_PUBLIC_LINK,
  payload: {
    request: {
      url: `/api/tag/${tagId}/disable-link`,
      method: "post",
    }
  }
});

export const setPasswordPublicLink = (data, tagId) => ({
  type: ActionTypes.SET_PASSWORD_PUBLIC_LINK,
  payload: {
    request: {
      url: `/api/tag/${tagId}/password`,
      method: "post",
      // headers,
      data
    }
  }
});

export const updateUnRegisteredUserTag = (token, tagId) => ({
  type: ActionTypes.UPDATE_UNREGISTERED_USER_TAG,
  payload: {
    request: {
      url: `/api/tag/update-unregister-user?tokenId=${token}&tagId=${tagId}`,
      method: "patch",
    }
  }
});

export const removeGemFromSharedTags = (tagId,gemId) => ({
  type: ActionTypes.REMOVE_GEM_FROM_SHARED_TAGS,
  tagId,gemId
})

export const updateTagSeoDetails = (tagId,seoDetails) => ({
  type: ActionTypes.UPDATE_TAG_SEO_DETAILS,
  payload: {
    request: {
      url: `/api/tags/${tagId}/seo-details`,
      method: "patch",
      data: seoDetails
    }
  }
})

export const shareTagViaGroup = (tagId, data) => ({
  type: ActionTypes.SHARE_TAG_VIA_GROUP,
  payload: {
    request: {
      url: `/api/sharetags-group-mail/${tagId}/`,
      method: "post",
      data
    }
  }
})

export const updateGroupTagAccess = (tagId, token, formData) => ({
  type: ActionTypes.UPDATE_TAG_GROUP_ACCESS,
  payload: {
    request: {
      url: `/api/tag-group-security/${tagId}?token=${token}`,
      method: "put",
      data: formData
    }
  }
})

export const deleteAllTags = () => ({
  type: ActionTypes.DELETE_ALL_TAGS,
  payload: {
    request: {
      url: `/api/delete-all-tags`,
      method: "delete",
    },
  },
})

export const deleteEmptyTags = () => ({
  type: ActionTypes.DELETE_EMPTY_TAGS,
  payload: {
    request: {
      url: `/api/tags-delete`,
      method: "delete",
    },
  },
})

export const checkIsTagPublic = (tagId) => ({
  type: ActionTypes.CHECK_IS_TAG_PUBLIC,
  payload: {
    request: {
      url: `/api/is-public-tag/${tagId}`,
      method: "get",
    }
  }
})

export const removeShareWithMeTag = (tagId) => ({
  type: ActionTypes.REMOVE_SHARE_WITH_ME_TAG,
  payload: {
    request: {
      url: `/api/remove-tag/${tagId}`,
      method: "delete",
    }
  }
})

export const getSubTags = (tagId,page) => ({
  type: ActionTypes.GET_SUB_TAGS,
  payload: {
    request: {
      url: `/api/sub-tag/${tagId}?page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const setSubTagPageDetails = (data) => ({
  type: ActionTypes.SUB_TAG_PAGE,
  data
});

export const addSubTagData = (value) => ({
    type: ActionTypes.ADD_SUB_TAG_DATA,
    value
})

export const getSharedTagsFilterCounts = (tagId) => ({
  type: ActionTypes.GET_SHARED_TAGS_FILTER_COUNTS,
  payload: {
    request: {
      url: `/api/sharetag-gem-filter-counts/${tagId}`,
      method: "get",
    }
  }
});

export const getSharedTagsCollectionsCounts = (tagId) => ({
  type: ActionTypes.GET_SHARED_TAGS_COLLECTIONS_COUNTS,
  payload: {
    request: {
      url: `/api/sharetag-collection-counts/${tagId}`,
      method: "get",
    }
  }
});

export const getSharedTagsFiltersGems = (tagId,type,page) => ({
  type: ActionTypes.GET_SHARED_TAGS_FILTERS_GEMS,
  payload: {
    request: {
      url: `/api/public-tag-gems/${tagId}?type=${type}&page=${page}&perPage=20`,
      method: "get",
    }
  }
});

export const getSharedTagsCollectionsGems = (tagId,type,page) => ({
  type: ActionTypes.GET_SHARED_TAGS_COLLECTIONS_GEMS,
  payload: {
    request: {
      url: `/api/public-tag-gems-collections/${tagId}?collectionId=${type}&page=${page}&perPage=20`,
      method: "get",
    }
  }
});

export const getSharedTagPublicSidebar = (tagId,) => ({
  type: ActionTypes.GET_SHARED_TAGS_PUBLIC_SIDEBAR,
  payload: {
    request: {
      url: `/api/share-public-subtag?tagId=${tagId}`,
      method: "get",
    }
  }
});