import * as ActionTypes         from '@actions/app/action-types';
// import AppStateManager          from './state-manager';

const INITIAL_STATES = {
  showWelcomeModal: false,
  showExceedModal: false,
  exceedMessage: "",
  showSearchModal: false,
  showCoverImage: false,
  welcomeModalContext: "",
  drawerType: "",
  mainSidebarSelected: "all",
  secondarySidebarSelected: "all",
  isMobileView: false,
  isMobileSidebar: false,
  addBkPage: null,
  inboxViewUpdateData: null,
  authModal: {
    open: false,
    action: "login",
  },
  sidebarSelectedItem: null,
  categorySeeMore: false,
  expandKeys: [],
  expandTagKeys: [],
  previousPathName: null,
  publicCollectionView: "moodboard",
  publicSidebarSelectedItem: "all",
  showEmailModal: false,
  tourStepsEnabled: false,
  tourStepIndex: 0,
  showUrlInputFromTourSteps: false,
  isFromWelcomeModal: false,
  parentCollectionValue: null,
  parentTagValue: null,
  isSyncing: false,
  percentage: 1,
  totals: null,
  currentImportStatus: null,
  onboardingCurrentStep: 1,
  onboardingUserPreference: null,
  showNoLoaderOnboarding: false,
  bookmarklet: null,
  subPageParentData: null,
  editPageDataNavbar: null,
};

export default function appStateManager(state = INITIAL_STATES, action) {
    switch (action.type) {
      case ActionTypes.SHOW_VERIFICATION_MODAL:
        return { ...state, showEmailModal: action.status };
      case ActionTypes.SET_WELCOME_MODAL:
        return {
          ...state,
          showWelcomeModal: action.status,
          welcomeModalContext: action.context,
        };
      case ActionTypes.SHOW_EXCEED_POPUP:
        return {
          ...state,
          showExceedModal: action.status,
          exceedMessage: action.exceedMessage,
        };
      case ActionTypes.OPEN_SEARCH__MODAL:
        return { ...state, showSearchModal: action.value };
      case ActionTypes.OPEN_DRAWER:
        return { ...state, drawerType: action.drawerType };
      case ActionTypes.MAIN_SIDEBAR_SELECTED:
        return { ...state, mainSidebarSelected: action.value };
      case ActionTypes.SECONDARY_SIDEBAR_SELECTED:
        return { ...state, secondarySidebarSelected: action.value };
      case ActionTypes.SET_IS_MOBILE_VIEW:
        return { ...state, isMobileView: action.value };
      case ActionTypes.SET_IS_MOBILE_SIDEBAR:
        return { ...state, isMobileSidebar: action.value };
      case ActionTypes.ADD_BK_FROM_PAGE:
        return { ...state, addBkPage: action.value };
      case ActionTypes.INBOX_VIEW_UPDATES:
        return { ...state, inboxViewUpdateData: action.value };
      case ActionTypes.OPEN_AUTH_MODAL:
        return { ...state, authModal: action.value };
      case ActionTypes.SIDEBAR_SELECTED_ITEM:
        return { ...state, sidebarSelectedItem: action.value };
      case ActionTypes.CATEGORY_SEE_MORE:
        return { ...state, categorySeeMore: action.value };
      case ActionTypes.SET_EXPAND_KEYS:
        return { ...state, expandKeys: action.value };
      case ActionTypes.SET_EXPAND_TAG_KEYS:
        return { ...state, expandTagKeys: action.value };
      case ActionTypes.PREVIOUS_PATH_NAME:
        return { ...state, previousPathName: action.value };
      case ActionTypes.PUBLIC_COLLECTION_VIEW:
        return { ...state, publicCollectionView: action.value };
      case ActionTypes.PUBLIC_SIDEBAR_SELECTED_ITEM:
        return { ...state, publicSidebarSelectedItem: action.value };
      case ActionTypes.ENABLE_TOUR_STEPS:
        return { ...state, tourStepsEnabled: action.status };
      case ActionTypes.UPDATE_TOUR_STEPS_DATA:
        return { ...state, tourStepIndex: action.data };
      case ActionTypes.SHOW_URL_INPUT_FROM_TOUR_STEPS:
        return { ...state, showUrlInputFromTourSteps: action.data };
      case ActionTypes.IS_FROM_WELCOME_MODAL:
        return { ...state, isFromWelcomeModal: action.data };
      case ActionTypes.SET_PARENT_COLLECTION:
        return { ...state, parentCollectionValue: action.value };
      case ActionTypes.SET_PARENT_TAG:
        return { ...state, parentTagValue: action.value };
      case ActionTypes.SET_PERCENTAGE:
        return { ...state, percentage: action.percent };
      case ActionTypes.SYNCING_COLLECTION:
        return { ...state, isSyncing: action.status };
      case ActionTypes.SET_CURRENT_UPLOAD_ITEMS:
        return { ...state, totals: action.totals };
      case ActionTypes.SET_CURRENT_IMPORT_STATUS:
        return { ...state, currentImportStatus: action.status };
      case ActionTypes.SET_ONBOARDING_CURRENT_STEP:
        return { ...state, onboardingCurrentStep: action.value };
      case ActionTypes.SET_ONBOARDING_USER_PREFERENCE:
        return { ...state, onboardingUserPreference: action.value };
      case ActionTypes.SET_NO_LOADER_FROM_ONBOARDING:
        return { ...state, showNoLoaderOnboarding: action.value };
      case ActionTypes.SET_BOOKMARKLET_VALUE:
        return { ...state, bookmarklet: action.value };
      case ActionTypes.SET_SUBPAGE_PARENT_DETAILS_NAVBAR:
        return { ...state, subPageParentData: action.value };
      case ActionTypes.SET_EDIT_PAGE_NAVBAR:
        return { ...state, editPageDataNavbar: action.value };
      default:
        return state;
    }
}