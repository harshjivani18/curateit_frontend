import * as ActionTypes from './action-types';

export const setWelcomeModalStatus = (status, context = "") => ({
    type: ActionTypes.SET_WELCOME_MODAL,
    status,
    context
})

export const showEmailVerficationModal = (status) => ({
    type: ActionTypes.SHOW_VERIFICATION_MODAL,
    status
})

export const getSuperAdminConfiguration = () => ({
    type: ActionTypes.GET_SUPER_ADMIN_CONFIGURATION,
    payload: {
        request: {
            url: `/api/super-admin-configurations`,
            method: "get",
        }
    }
})

export const openSearchModal = (value) => ({
    type: ActionTypes.OPEN_SEARCH__MODAL,
    value
})

export const openDrawer = (drawerType) => ({
    type: ActionTypes.OPEN_DRAWER,
    drawerType
})

export const selectedMainSidebar = (value) => ({
    type: ActionTypes.MAIN_SIDEBAR_SELECTED,
    value
})

export const resetPageTitle = () => ({
    type: ActionTypes.RESET_PAGE_TITLE
})

export const selectedSecondarySidebar = (value) => ({
    type: ActionTypes.SECONDARY_SIDEBAR_SELECTED,
    value
})

export const sidebarMenuClicked = (name) => ({
    type: ActionTypes.SIDEBAR_MENU_CLICKED,
    name
});


export const setPage = (pageName) => ({
    type: ActionTypes.SET_PAGE,
    pageName
});

export const setCurrentSelectedPage = (pageId) => ({
    type: ActionTypes.SET_CURRENT_PAGE,
    pageId
});

export const setCurrentSidebarSelectedPage = (pageId) => ({
    type: ActionTypes.SET_SIDEBAR_CURRENT_PAGE,
    pageId
});

export const setSiderPosition = (position) => ({
    type: ActionTypes.SET_SIDER_POSITION,
    position
});

export const sidebarSetPage = (pageName) => ({
    type: ActionTypes.SIDEBAR_SET_PAGE,
    pageName
});

export const openAddBookmarkDrawer = (value) => ({
    type: ActionTypes.SHOW_ADD_BOOKMARK_DRAWER,
    value
})

export const openCollectionCreateDrawer = (value) => ({
    type: ActionTypes.OPEN_COLLECTION_CREATE_DRAWER,
    value
})

export const openTagCreateDrawer = (value) => ({
    type: ActionTypes.OPEN_TAG_CREATE_DRAWER,
    value
})

export const setIsMobileView = (value) => ({
    type: ActionTypes.SET_IS_MOBILE_VIEW,
    value
})
export const setIsMobileSidebar = (value) => ({
    type: ActionTypes.SET_IS_MOBILE_SIDEBAR,
    value
})

export const addBkFromPage = (value) => ({
    type: ActionTypes.ADD_BK_FROM_PAGE,
    value
});

export const inboxViewUpdates = (value) => ({
    type: ActionTypes.INBOX_VIEW_UPDATES,
    value
});

export const openAuthModal = (value) => ({
    type: ActionTypes.OPEN_AUTH_MODAL,
    value
})

export const sidebarSelected = (value) => ({
    type: ActionTypes.SIDEBAR_SELECTED_ITEM,
    value
})

export const getCategorySeeMore = (value) => ({
    type: ActionTypes.CATEGORY_SEE_MORE,
    value
})

export const getExpandedKeys = (value) => ({
    type: ActionTypes.SET_EXPAND_KEYS,
    value
})

export const getExpandedTagKeys = (value) => ({
    type: ActionTypes.SET_EXPAND_TAG_KEYS,
    value
})

export const setPreviousPathName = (value) => ({
    type: ActionTypes.PREVIOUS_PATH_NAME,
    value
})

export const setPublicCollectionView = (value) => ({
    type: ActionTypes.PUBLIC_COLLECTION_VIEW,
    value
})

export const publicSidebarSelected = (value) => ({
    type: ActionTypes.PUBLIC_SIDEBAR_SELECTED_ITEM,
    value
})

export const toggleExceedPopup = (status, exceedMessage) => ({
    type: ActionTypes.SHOW_EXCEED_POPUP,
    status,
    exceedMessage
})

export const enableTourSteps = (status) => ({
    type: ActionTypes.ENABLE_TOUR_STEPS,
    status
})
export const updateTourStepsData = (data) => ({
    type: ActionTypes.UPDATE_TOUR_STEPS_DATA,
    data
})
export const setShowUrlInputFromTourSteps = (data) => ({
    type: ActionTypes.SHOW_URL_INPUT_FROM_TOUR_STEPS,
    data
})
export const fromWelcomeModal = (data) => ({
    type: ActionTypes.IS_FROM_WELCOME_MODAL,
    data
})

export const setParentCollectionData = (value) => ({
    type: ActionTypes.SET_PARENT_COLLECTION,
    value
})

export const setParentTagData = (value) => ({
    type: ActionTypes.SET_PARENT_TAG,
    value
})

export const setSyncingCollection = (status) => ({
    type: ActionTypes.SYNCING_COLLECTION,
    status
})

export const setPercentageData = (percent) => ({
    type: ActionTypes.SET_PERCENTAGE,
    percent
})

export const setCurrentUploadItems = (totals) => ({
    type: ActionTypes.SET_CURRENT_UPLOAD_ITEMS,
    totals
})

export const setCurrentImportStatus = (status) => ({
    type: ActionTypes.SET_CURRENT_IMPORT_STATUS,
    status
})

export const setOnboardingCurrentStep = (value) => ({
  type: ActionTypes.SET_ONBOARDING_CURRENT_STEP,
  value,
});

export const setOnboardingUserPreference = (value) => ({
  type: ActionTypes.SET_ONBOARDING_USER_PREFERENCE,
  value,
});

export const setNoLoaderFromOnboarding = (value) => ({
  type: ActionTypes.SET_NO_LOADER_FROM_ONBOARDING,
  value,
});

export const setBookmarkletValue = (value) => ({
  type: ActionTypes.SET_BOOKMARKLET_VALUE,
  value,
});

export const setSubPageParentData = (value) => ({
  type: ActionTypes.SET_SUBPAGE_PARENT_DETAILS_NAVBAR,
  value,
});

export const setEditDataNavbar = (value) => ({
  type: ActionTypes.SET_EDIT_PAGE_NAVBAR,
  value,
});