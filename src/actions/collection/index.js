import * as ActionTypes from "./action-types";
const headers = {
  "Content-Type": "multipart/form-data",
};

export const fetchCollectionWiseCounts = () => ({
  type: ActionTypes.FETCH_COLLECTION_WISE_COUNTS,
  payload: {
    request: {
      url: "/api/collection-wise-counts",
      method: "get",
    },
  },
});

export const updateCollection = (id, data, tags) => ({
  type: ActionTypes.UPDATE_COLLECTION,
  payload: {
    request: {
      url: `/api/collections/${id}`,
      method: "put",
      data: { data },
    },
  },
  meta: {
    id,
    updatedData: data,
    tags,
  },
});

export const moveCollection = (sourceId, destinationId, dragObj, dropObj) => ({
  type: ActionTypes.MOVE_COLLECTION,
  payload: {
    request: {
      url: `/api/collections/${sourceId}/move/${destinationId}`,
      method: "post",
    },
  },
  meta: {
    sourceId,
    destinationId,
    dragObj,
    dropObj,
  },
});

export const moveCollectionShared = (
  sourceId,
  destinationId,
  dragObj,
  actionType = "add"
) => ({
  type: ActionTypes.MOVE_COLLECTION_SHARED,
  payload: {
    request: {
      url: `/api/collections/${sourceId}/move/${destinationId}`,
      method: "post",
    },
  },
  meta: {
    sourceId,
    destinationId,
    dragObj,
    actionType,
  },
});

export const resetSharedCollections = () => ({
  type: ActionTypes.RESET_SHARED_COLLECTIONS,
});

export const getAllCollections = () => ({
  type: ActionTypes.FETCH_COLLECTION,
  payload: {
    request: {
      url: `/api/bookmark/collections`,
      method: "get",
    },
  },
});

export const clearCollectionState = () => {
  return {
    type: ActionTypes.CLEAR_COLLECTIONS,
  };
};

export const deleteCoverS3Link = (url) => ({
  type: ActionTypes.DELETE_COVER_S3_LINK,
  payload: {
    request: {
      url: `/api/files?path=${url}`,
      method: "delete",
    },
  },
});

export const getUserCollections = () => ({
  type: ActionTypes.GET_USER_COLLECTIONS,
  payload: {
    request: {
      url: `/api/get-user-collections`,
      method: "get",
    },
  },
});

export const addCollections = (data) => ({
  type: ActionTypes.ADD_COLLECTION,
  payload: {
    request: {
      url: `/api/collections`,
      method: "post",
      data,
    },
  },
});

export const addCollectionReset = () => {
  return {
    type: ActionTypes.ADD_COLLECTION_RESET,
  };
};

export const bulkSelectEdit = (data) => ({
  type: ActionTypes.BULK_SELECT_EDIT,
  payload: {
    request: {
      url: `/api/edit-bookmarks`,
      method: "put",
      data: {
        bookmarks: data,
      },
    },
  },
});

export const deleteBulkBookmarkState = (arrayIds) => ({
  type: ActionTypes.DELETE_BULK_BOOKMARK_STATE,
  arrayIds,
});

export const deleteBulkBookmarkStateSharedCollection = (arrayIds) => ({
  type: ActionTypes.DELETE_BULK_BOOKMARK_STATE_SHARED_COLLECTION,
  arrayIds,
});

export const updateBulkBookmarkState = (updateArray) => ({
  type: ActionTypes.UPDATE_BULK_BOOKMARK_STATE,
  updateArray,
});

export const updateBulkBookmarkStateSharedCollection = (updateArray) => ({
  type: ActionTypes.UPDATE_BULK_BOOKMARK_STATE_SHARED_COLLECTION,
  updateArray,
});

export const getSingleBookmarkGem = (gemId) => ({
  type: ActionTypes.GET_SINGLE_BOOKMARK_GEM,
  payload: {
    request: {
      url: `/api/gems/${gemId}?populate=*`,
      method: "get",
    },
  },
});

export const moveGemToSharedCollection = (collectionId, gemId, gem) => ({
  type: ActionTypes.MOVE_GEM_TO_SHARED_COLLECTION,
  collectionId,
  gemId,
  gem,
});

export const removeGemFromCollection = (
  gemId,
  parentCollectionId,
  isCurrentCollectionShared = false
) => ({
  type: ActionTypes.REMOVE_GEM_FROM_COLLECTION,
  gemId,
  parentCollectionId,
  isCurrentCollectionShared,
});

export const updateBookmarkWithExistingCollection = (
  gem,
  parent,
  isCollectionChanged,
  process,
  existingParent = null
) => ({
  type: ActionTypes.UPDATE_BOOKMARK_EXISTING_COLLECTION,
  gem,
  parent,
  process,
  isCollectionChanged,
  existingParent,
});

export const updateGem = (id, data) => ({
  type: ActionTypes.UPDATE_GEM,
  payload: {
    request: {
      url: `/api/gems/${id}`,
      method: "put",
      data,
    },
  },
});

export const uploadBookmarkCover = (gemId, data) => ({
  type: ActionTypes.UPLOAD_BOOKMARK_COVER,
  payload: {
    request: {
      url: `/api/gems/${gemId}/upload-bookmark-cover`,
      method: "put",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    },
  },
  meta: {
    gemId,
  },
});

export const deleteAllCollections = () => ({
  type: ActionTypes.DELETE_ALL_COLLECTIONS,
  payload: {
    request: {
      url: `/api/delete-collections`,
      method: "delete",
    },
  },
});

export const deleteImageFromS3 = (url) => ({
  type: ActionTypes.DELETE_IMG_FROM_S3,
  payload: {
    request: {
      url: `/api/files?path=${url}`,
      method: "delete",
    },
  },
});

export const uploadScreenshots = (data) => ({
  type: ActionTypes.UPLOAD_SCREENSHOTS,
  payload: {
    request: {
      url: `/api/gems/upload-screenshot`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    },
  },
});

export const getBookmarkInCollections = (collectionId, page) => ({
  type: ActionTypes.GET_BOOKMARK_IN_COLLECTION,
  payload: {
    request: {
      url: `/api/collections/${collectionId}/bookmarks?perPage=20&page=${page}`,
      method: "get",
    },
  },
});

export const getCustomFields = (collectionId) => ({
  type: ActionTypes.GET_CUSTOM_FIELDS,
  payload: {
    request: {
      url: `/api/custom-property/${collectionId}`,
      method: "get",
    },
  },
});

export const getSharedCollections = () => ({
  type: ActionTypes.GET_SHARED_COLLECTIONS,
  payload: {
    request: {
      url: `/api/share-with-me`,
      method: "get",
    },
  },
});

export const updateCollectionPageConfig = (data) => ({
  type: ActionTypes.UPDATE_COLLECTION_PAGE_CONFIG,
  payload: {
    request: {
      url: `/api/config-coll-setting`,
      method: "put",
      data,
    },
  },
});

export const createCustomFields = (data) => ({
  type: ActionTypes.CREATE_CUSTOM_FIELDS,
  payload: {
    request: {
      url: `/api/custom-fields`,
      method: "post",
      data: {
        data,
      },
    },
  },
});

export const updateCustomFieldsProperty = (customFieldId, data) => ({
  type: ActionTypes.UPDATE_CUSTOM_FIELDS_PROPERTY,
  payload: {
    request: {
      url: `/api/custom-fields/${customFieldId}`,
      method: "put",
      data,
    },
  },
});
export const deleteCustomFieldsProperty = (
  customFieldId,
  customPropertyId
) => ({
  type: ActionTypes.DELETE_CUSTOM_FIELDS_PROPERTY,
  payload: {
    request: {
      url: `/api/custom-fields/${customFieldId}?id=${customPropertyId}`,
      method: "delete",
    },
  },
});

export const uploadIcons = (data,isIcon=true,w=200,h=200) => ({
  type: ActionTypes.UPLOAD_ICONS,
  payload: {
    request: {
      url: w && h ? `/api/icon?isIcon=${isIcon}&w=${w}&h=${h}` : `/api/icon?isIcon=${isIcon}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    },
  },
});

export const uploadUnsplash = (data,isIcon=true) => ({
  type: ActionTypes.UPLOAD_UNSPLASH,
  payload: {
    request: {
      url: `/api/icon?isIcon=${isIcon}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    },
  },
});

export const UploadUnsplashCoverS3Link = (link, collectionId) => ({
  type: ActionTypes.UPLOAD_UNSPLASH_IMAGE_IN_S3,
  payload: {
    request: {
      url: `/api/upload?fileLink=${link}&isCollectionCover=true&collectionId=${collectionId}`,
      method: "post",
      headers,
    },
  },
});

export const UploadCoverS3Link = (data, collectionId) => ({
  type: ActionTypes.UPLOAD_COVER_S3_LINK,
  payload: {
    request: {
      url: `/api/upload?isCollectionCover=true&collectionId=${collectionId}`,
      method: "post",
      headers,
      data,
    },
  },
});

export const getCollectionFilteredBookmark = (
  filterby = "",
  queryBy = "",
  termtype = "",
  page,
  name,
  sortby = "",
  orderby = ""
) => ({
  type: ActionTypes.COLLECTION_FILTER_BOOKMARK,
  payload: {
    request: {
      url: `/api/filter-search?filterby=collectionName,${filterby}&queryby=${name},${queryBy}&termtype=is,${termtype}&sortby=${sortby}&orderby=${orderby}&page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const resetCollectionFilteredBookmark = () => ({
  type: ActionTypes.RESET_COLLECTION_FILTER_BOOKMARK,
});

export const getSingleCollection = (collectionId) => ({
  type: ActionTypes.GET_SINGLE_COLLECTION,
  payload: {
    request: {
      url: `/api/collections/${collectionId}?populate=*`,
      method: "get",
    },
  },
});

export const createCollection = (
  data,
  tags,
  isSharedCollection = false,
  isParent = true
) => ({
  type: ActionTypes.CREATE_COLLECTION,
  payload: {
    request: {
      url: `/api/collections`,
      method: "post",
      data: { data },
    },
  },
  meta: {
    tags,
    isSharedCollection,
    isParent,
  },
});

export const collectionMove = (sourceId, destinationId, dragObj, dropObj) => ({
  type: ActionTypes.COLLECTION_MOVE,
  sourceId,
  destinationId,
  dragObj,
  dropObj,
});

export const sharedCollectionMove = (
  sourceId,
  destinationId,
  dragObj,
  actionType = "add"
) => ({
  type: ActionTypes.SHARED_COLLECTION_MOVE,
  sourceId,
  destinationId,
  dragObj,
  actionType,
});

export const deleteCollection = (
  collectionId,
  isSelectedCollectionShared = null
) => ({
  type: ActionTypes.DELETE_COLLECTION,
  payload: {
    request: {
      url: `/api/collections/${collectionId}`,
      method: "delete",
    },
  },
  meta: {
    id: collectionId,
    isSelectedCollectionShared,
  },
});

export const updateSharedCollection = (collectionId, gem) => ({
  type: ActionTypes.UPDATE_SHARED_COLLECTION,
  collectionId,
  gem,
});

//share collections flow

export const shareCollectionViaEmail = (collectionId, data) => ({
  type: ActionTypes.SHARE_COLLECTION_VIA_EMAIL,
  payload: {
    request: {
      url: `/api/collection-email/${collectionId}`,
      method: "post",
      data,
    },
  },
});

export const updateGroupAccess = (collectionId, token, data, userId) => ({
  type: ActionTypes.UPDATE_GROUP_ACCESS,
  payload: {
    request: {
      url: `/api/collection-group-security/${collectionId}?token=${token}&userId=${userId}`,
      method: "put",
      data
    }
  }
})

export const shareCollectionViaEmailGroup = (collectionId, data) => ({
  type: ActionTypes.SHARE_COLLECTION_VIA_EMAIL_GROUP,
  payload: {
    request: {
      url: `/api/sharecollection-group-mail/${collectionId}`,
      method: "post",
      data,
    },
  },
});

export const checkUserRegistered = (token, collectionId) => ({
  type: ActionTypes.CHECK_USER_REGISTERED,
  payload: {
    request: {
      url: `/api/check-user/${token}/${collectionId}`,
      method: "get",
    },
  },
});

export const checkCollectionExpiration = (email, collectionId) => ({
  type: ActionTypes.CHECK_COLLECTION_EXPIRATION,
  payload: {
    request: {
      url: `/api/collection-email?collectionId=${collectionId}&email=${email}`,
      method: "get",
    },
  },
});

export const updateUnRegisteredUser = (token, collectionId) => ({
  type: ActionTypes.UPDATE_UNREGISTERED_USER,
  payload: {
    request: {
      url: `/api/collection/update-unregister-user?tokenId=${token}&collectionId=${collectionId}`,
      method: "patch",
    },
  },
});

export const removeAccessEmail = (token, collectionId) => ({
  type: ActionTypes.REMOVE_ACCESS_EMAIL,
  payload: {
    request: {
      url: `/api/collection/${collectionId}/remove-access?id=${token}&isLink=false`,
      method: "delete",
    },
  },
});

export const changeSecurityEmail = (collectionId, tokenId, data) => ({
  type: ActionTypes.CHANGE_SECURITY_EMAIL,
  payload: {
    request: {
      url: `/api/collections/${collectionId}/security?id=${tokenId}`,
      method: "post",
      data,
    },
  },
});

//link flow
export const shareCollectionViaLink = (
  collectionId,
  allowEmail,
  accessType
) => ({
  type: ActionTypes.SHARE_COLLECTION_VIA_LINK,
  payload: {
    request: {
      url: `/api/collection-link/${collectionId}?allowEmail=${allowEmail}&accessType=${accessType}`,
      method: "post",
      // data
    },
  },
});

export const checkCollectionViaLink = (inviteTokenId, collectionId) => ({
  type: ActionTypes.CHECK_COLLECTION_VIA_LINK,
  payload: {
    request: {
      url: `/api/collection-link?inviteId=${inviteTokenId}&collectionId=${collectionId}`,
      method: "get",
    },
  },
});

export const removeAccessLink = (id, collectionId) => ({
  type: ActionTypes.REMOVE_ACCESS_LINK,
  payload: {
    request: {
      url: `/api/collection/${collectionId}/remove-access?id=${id}&isLink=true`,
      method: "delete",
    },
  },
});

export const changeSecurityLink = (collectionId, tokenId, data) => ({
  type: ActionTypes.CHANGE_SECURITY_LINK,
  payload: {
    request: {
      url: `/api/collections/${collectionId}/security?id=${tokenId}&isLink=true`,
      method: "post",
      data,
    },
  },
});

//public

export const shareCollectionViaPublic = (collectionId, data) => ({
  type: ActionTypes.SHARE_COLLECTION_VIA_PUBLIC,
  payload: {
    request: {
      url: `/api/collections/${collectionId}/generatelink?isShare=true`,
      method: "post",
      data,
    },
  },
});

export const checkCollectionViaPublic = (inviteTokenId, collectionId) => ({
  type: ActionTypes.CHECK_COLLECTION_VIA_PUBLIC,
  payload: {
    request: {
      url: `/api/collection-public?inviteId=${inviteTokenId}&collectionId=${collectionId}`,
      method: "get",
    },
  },
});

export const disablePublicLink = (collectionId) => ({
  type: ActionTypes.DISABLE_PUBLIC_LINK,
  payload: {
    request: {
      url: `/api/collection/${collectionId}/disable-link`,
      method: "post",
    },
  },
});

export const setPasswordPublicLink = (data, collectionId) => ({
  type: ActionTypes.SET_PASSWORD_PUBLIC_LINK,
  payload: {
    request: {
      url: `/api/collection/${collectionId}/password`,
      method: "post",
      // headers,
      data,
    },
  },
});

export const removeSharedCollection = (collectionId) => ({
  type: ActionTypes.REMOVE_SHARED_COLLECTION,
  collectionId,
});

export const getPublicShareCollection = (collectionId, page) => ({
  type: ActionTypes.GET_PUBLIC_SHARE_COLLECTION,
  payload: {
    request: {
      url: `/api/share-public-collection?collectionId=${collectionId}&page=${page}&perPage=20&isPagination=true`,
      method: "get",
    },
  },
});

export const addGemToSharedCollection = (collectionId, gem) => ({
  type: ActionTypes.ADD_GEM_TO_SHARED_COLLECTION,
  collectionId,
  gem,
});

export const likeBookmarkGem = (gemId) => ({
  type: ActionTypes.LIKE_GEM,
  payload: {
    request: {
      url: `/api/count-gem/${gemId}?type=like`,
      method: "put",
    },
  },
});

export const getRandomBookmarkGem = (payload) => ({
  type: ActionTypes.GET_RANDOM_BOOKMARK_GEMS,
  payload: {
    request: {
      url: `/api/gems/${payload?.gemId}?random=true&page=${payload?.page}&perPage=20`,
      method: "get",
    },
  },
});

export const resetCollectionWiseCounts = () => ({
  type: ActionTypes.RESET_COLLECTION_WISE_COUNTS,
});

export const updateCollectionWiseCount = (
  currentCollectionId,
  changedCollectionId
) => ({
  type: ActionTypes.UPDATE_COLLECTION_WISE_COUNTS,
  currentCollectionId,
  changedCollectionId,
});

export const reduceCollectionWiseCount = (currentCollectionId) => ({
  type: ActionTypes.REDUCE_COLLECTION_WISE_COUNTS,
  currentCollectionId,
});

export const moveToRoot = (sourceId, sourceObj) => ({
  type: ActionTypes.MOVE_TO_ROOT,
  payload: {
    request: {
      url: `/api/collections/${sourceId}/move-to-root`,
      method: "post",
    },
  },
  meta: {
    sourceObj,
    sourceId,
  },
});

export const addCollectionCount = (collectionId) => ({
  type: ActionTypes.ADD_COLLECTION_COUNT,
  collectionId,
});

export const getBookmarkInBio = (collectionId, page) => ({
  type: ActionTypes.GET_BOOKMARK_IN_BIO,
  payload: {
    request: {
      url: `/api/collections/${collectionId}/bookmarks?perPage=20&page=${page}&isBio=true`,
      method: "get",
    },
  },
});

export const updateCollectionSEODetails = (seoObj, collectionId) => ({
  type: ActionTypes.UPDATE_COLLECTION_SEO_DETAILS,
  payload: {
    request: {
      url: `/api/collections/${collectionId}/seo-details`,
      method: "patch",
      data: seoObj,
    },
  },
});

export const copyCollection = (collectionId) => ({
  type: ActionTypes.COPY_COLLECTION,
  payload: {
    request: {
      url: `/api/copy-collection/${collectionId}`,
      method: "post",
    },
  },
});

export const sharedCollectionSubCollection = (collectionId) => ({
  type: ActionTypes.GET_PUBLIC_COLLECTION_SUB_COLLECTION,
  payload: {
    request: {
      url: `/api/share-public-subcollection?collectionId=${collectionId}`,
      method: "get",
    },
  },
});

export const sharedSubCollectionsTagsCount = (collectionId) => ({
  type: ActionTypes.GET_PUBLIC_COLLECTION_TAGS,
  payload: {
    request: {
      url: `/api/sharecollection-tag-counts/${collectionId}`,
      method: "get",
    },
  },
});

export const sharedSubCollectionsFilter = (collectionId) => ({
  type: ActionTypes.GET_PUBLIC_COLLECTION_CATEGORY,
  payload: {
    request: {
      url: `/api/sharecollection-gem-filter-counts/${collectionId}`,
      method: "get",
    },
  },
});

export const getPendingGems = (collectionId, page) => ({
  type: ActionTypes.GET_PENDING_GEMS,
  payload: {
    request: {
      url: `/api/pending-gems/${collectionId}?page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const approveRejectGem = (collectionId, gemId, data) => ({
  type: ActionTypes.APPROVE_REJECT_GEM,
  payload: {
    request: {
      url: `/api/collection/${collectionId}/public-gem/${gemId}`,
      method: "put",
      data,
    },
  },
});

export const getResolvedGems = (collectionId, atLast, gemType, page) => ({
  type: ActionTypes.GET_PENDING_GEMS,
  payload: {
    request: {
      url:
        gemType !== "all"
          ? `/api/processed-gems/${collectionId}?gems=${gemType}&atLast=${atLast}&page=${page}&perPage=20`
          : `/api/processed-gems/${collectionId}?atLast=${atLast}&page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const updateCountPublicAddedGem = (collectionId) => ({
  type: ActionTypes.UPDATE_COUNT_PUBLIC_ADDED_GEM,
  collectionId,
});

export const getSubCollections = (collectionId,page) => ({
  type: ActionTypes.GET_SUB_COLLECTIONS,
  payload: {
    request: {
      url: `/api/sub-collection/${collectionId}?page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const setSubCollectionsPageDetails = (data) => ({
  type: ActionTypes.SUB_COLLECTIONS_PAGE,
  data
});

export const getParentPublicCollectionInProfile = (page,userId='',isOwn=true) => ({
  type: ActionTypes.GET_PARENT_PUBLIC_COLLECTION_IN_PROFILE,
  payload: {
    request: {
      url: isOwn ? `/api/collection-data?page=${page}&perPage=20` : `api/collection-data-public?userId=${userId}&page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const setProfileSubCollection = (collection) => ({
    type: ActionTypes.SET_PROFILE_SUB_COLLECTION,
    collection
})

export const setPublicProfileSubCollection = (collection) => ({
    type: ActionTypes.SET_PUBLIC_PROFILE_SUB_COLLECTION,
    collection
})

export const getPublicCollectionFilterGems = (collectionId,type,page) => ({
  type: ActionTypes.GET_PUBLIC_COLLECTION_FILTERS_GEMS,
  payload: {
    request: {
      url: `/api/public-collection-gems/${collectionId}?type=${type}&perPage=20&page=${page}`,
      method: "get",
    },
  },
});

export const getPublicCollectionTagsGems = (collectionId,tagId,page) => ({
  type: ActionTypes.GET_PUBLIC_COLLECTION_TAGS_GEMS,
  payload: {
    request: {
      url: `/api/public-collection-gems-tags/${collectionId}?tagId=${tagId}&page=${page}&perPage=20`,
      method: "get",
    },
  },
});

export const deleteEmptyCollections = () => ({
  type: ActionTypes.DELETE_EMPTY_COLLECTIONS,
  payload: {
    request: {
      url: `/api/collection-delete`,
      method: "delete",
    },
  },
});

export const checkIsPublicCollection = (collectionId) => ({
  type: ActionTypes.CHECK_IS_PUBLIC_COLLECTION,
  payload: {
    request: {
      url: `/api/is-public-collection/${collectionId}`,
      method: "get",
    },
  },
})

export const checkIsPublicGem = (gemId) => ({
  type: ActionTypes.CHECK_IS_PUBLIC_GEM,
  payload: {
    request: {
      url: `/api/is-public-gem/${gemId}`,
      method: "get",
    },
  },
})

export const getFollowByMeCollection = () => ({
  type: ActionTypes.GET_FOLLOWED_BY_ME_COLLECTION,
  payload: {
    request: {
      url: `/api/followed-by-me`,
      method: "get",
    },
  },
})

export const followCollection = (collectionId, collection) => ({
  type: ActionTypes.FOLLOW_COLLECTION,
  payload: {
      request: {
          url: `/api/following-users`,
          method: "post",
          data: {
            hierarchyLevel: "collection",
            collectionId
          }
      }
  },
  meta: {
    collection
  }
});

export const unfollowCollection = (collectionId) => ({
  type: ActionTypes.UNFOLLOW_COLLECTION,
  payload: {
      request: {
          url: `/api/unfollowing-users`,
          method: "post",
          data: {
            hierarchyLevel: "collection",
            collectionId
          }
      }
  },
  meta: {
    collectionId
  }
});

export const configlimitCollection = () => ({
  type: ActionTypes.CONFIG_LIMIT_FOR_COLLECTION,
  payload: {
      request: {
          url: `/api/config-limits`,
          method: "get",
      }
  }
});

export const configCollections = () => ({
  type: ActionTypes.CONFIG_COLLECTIONS,
  payload: {
      request: {
          url: `/api/config-collections`,
          method: "get",
      }
  }
});

export const exportCollection = (id) => ({
  type: ActionTypes.EXPORT_COLLECTION,
  payload: {
      request: {
          url: `/api/collection-export/${id}`,
          method: "post",
      }
  }
});

export const addSubCollectionData = (value) => ({
    type: ActionTypes.ADD_SUB_COLLECTION_DATA,
    value
})
export const removeShareWithMeCollection = (id) => ({
  type: ActionTypes.REMOVE_SHARE_WITH_ME_COLLECTION,
  payload: {
      request: {
          url: `/api/remove-collection/${id}`,
          method: "delete",
      }
  }
});


export const uploadCsvTextLinks = (data) => ({
    type: ActionTypes.UPLOAD_CSV_TEXT_LINKS,
    payload: {
        request: {
            url: `/api/collection-import`,
            method: "post",
            data
        }
    }
})

export const addImportCollection = (data) => (
  {
  type: ActionTypes.ADD_IMPORT_COLLECTION,
  payload: {
      request: {
          url: `/api/import-single-collection`,
          method: "post",
          data
      }
  }
});

export const importGemsWithIcon = (data) => ({
    type: ActionTypes.IMPORT_GEMS_WITH_ICON,
    payload: {
      request: {
        url: `/api/import-gems-with-icons`,
        method: "post",
        data:data
      },
    }
  })

export const updateCollectionDataForImport = (data) => ({
  type: ActionTypes.UPDATE_COLLECTION_DATA_FOR_IMPORT,
  data
})

export const createCollectionActivity = (data) => ({
  type: ActionTypes.ADD_COLLECTION_ACTIVITY,
  payload: {
    client: 'logging',
    request: {
      method: "post",
      url: `/api/activity`,
      data
    },
  }
})

export const getCollectionById = (collectionId) => ({
  type: ActionTypes.GET_COLLECTION_BY_ID,
  payload: {
      request: {
          url: `api/collections/${collectionId}`,
          method: "get",
      }
  }
})

export const getRelatedCollection = (gemId) => ({
  type: ActionTypes.GET_RELATED_COLLECTION,
  payload: {
    request: {
      url: `/api/fetch-gem-related-collections/${gemId}`,
      method: "get",
    },
  },
});