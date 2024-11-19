"use client";
import { useState, useEffect }                  from "react";
import { Layout }                               from "antd";
import { useDispatch, useSelector }             from "react-redux";
import { useRouter }                            from 'next/navigation';
import Joyride, { ACTIONS, EVENTS, STATUS }     from "react-joyride";
// import HeaderComponent from "./InnerHeader";
import TransactionFailedPopup                   from "@components/common/FloatingLogos/TransactionFailedPopup";
import InnerSidebar                             from "@components/sidebars/InnerSidebar";
import WelcomeModal                             from "@components/modal/WelcomeModal";
import MainSidebar                              from "@components/sidebars/MainSidebar";
import SearchModal                              from "@components/modal/SearchModal";
import AddBookmark                              from "@components/drawers/AddBookmark";
import CollectionCreateEditDrawer               from "@components/drawers/CollectionDrawer";
import TagCreateEditDrawer                      from "@components/drawers/TagDrawer";
import MobileFooter                             from "@components/footer/MobileFooter";
import SiderDrawer                              from "@components/drawers/SiderDrawer";
import EmailVerificationModal                   from "@components/modal/EmailVerificationModal";
import DownloadExtension                        from "@components/common/FloatingLogos/DownloadExtension";
import ExceedLimitModal                         from "@components/modal/ExceedLimitModal";

import { setSubCollectionsPageDetails }         from "@actions/collection";
import { 
  enableTourSteps, 
  openDrawer, 
  selectedSecondarySidebar, 
  setIsMobileSidebar, 
  setIsMobileView, 
  setShowUrlInputFromTourSteps, 
  sidebarSelected, 
  updateTourStepsData }                         from "@actions/app";
import slugify from "slugify";
import UploadBookmarkDrawer from "@components/drawers/UploadBookmarkDrawer";
// import userState from "@reducers/user";

const { Content } = Layout;

const CommonLayout = ({
  children,
  showSecondarySidebar = true,
  coverImage = false,
}) => {
  const dispatch = useDispatch();
  const navigate                      = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExtensionExists, setIsExtensionExists] = useState(false);
  const {
    showWelcomeModal,
    showSearchModal,
    drawerType,
    isMobileSidebar,
    showEmailModal,
    showExceedModal,
    tourStepsEnabled,
    tourStepIndex
  } = useSelector((state) => state.app);
  const followedCollections = useSelector((state) => state.collections.followedCollections)
  const [run, setRun] = useState(true);
  useEffect(() => {
    function onDOMLoaded() {
      const element = document.getElementById("curateit-extension-installed");
      setIsExtensionExists(
        element !== null
      );
    }
    onDOMLoaded();
    if (typeof window === "undefined") return;
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        dispatch(setIsMobileView(true));
      } else {
        setIsMobile(false);
        dispatch(setIsMobileView(false));
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const steps = [
    {
      target: "#tour-collection-plus-icon",
      title:`Let's Go`,
      content: `Tap "+" to create your first Collection!`,
      disableBeacon: true,
      title: "Collection",
      placement: 'right',
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling: true,
    },
    {
      target: "#tour-collection-name-input",
      title:`Enter a collection title`,
      content: "Give your first collection a signature name!",
      disableBeacon: true,
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      hideCloseButton: true,
      hideBackButton: true,
      disableScrolling: true,
    },
    {
      target: "#tour-collection-save-button",
      content: "Now save your collection.",
      disableBeacon: true,
      spotlightClicks: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling: true,
      locale:{next: ''},    
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          display:'none'
        }
      },
    },
    {
      target: "#tour-collection-add-button",
      content: "Hit 'Add' to drop a gem in your collection!",
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
    },
    {
      target: "#tour-collection-url-button",
      content: "Just click to add your gem's link!",
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: "#tour-collection-url-input",
      content: "Just paste the gem’s link and press enter to capture your find!",
      disableBeacon: true,
      spotlightClicks: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
      disableScrolling: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: "#tour-collection-save-gem-button",
      content: "Tap 'Save' to keep it with you…forever!",
      disableBeacon: true,
      disableOverlayClose: true,
      spotlightClicks: true,
      hideCloseButton: true,
      disableScrolling: true,
      locale:{next: ''},   
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          display:'none'
        }
      },
    },
    {
      target: "#curateit-c-id",
      content: "Explore our curateit collection!",
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
      spotlightClicks: true,
      placement: 'right',
    },
  ];

  const mobileSteps = [
    {
      target: "#tour-collection-plus-icon",
      title:`Let's Go`,
      content: `Tap "+" to create your first Collection!`,
      disableBeacon: true,
      title: "Collection",
      placement: 'bottom',
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: "#tour-collection-name-input",
      title:`Enter a collection title`,
      content: "Give your first collection a signature name!",
      disableBeacon: true,
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      hideCloseButton: true,
      hideBackButton: true,
      disableScrolling: true,
    },
    {
      target: "#tour-collection-save-button",
      content: "Now save your collection.",
      disableBeacon: true,
      spotlightClicks: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling: true,
      locale:{next: ''},    
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          display:'none'
        }
      },
    },
    {
      target: "#tour-collection-add-button",
      content: "Hit 'Add' to drop a gem in your collection!",
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
    },
    {
      target: "#tour-collection-url-button",
      content: "Just click to add your gem's link!",
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: "#tour-collection-url-input",
      content: "Just paste the gem’s link and click on this area to capture your find!",
      disableBeacon: true,
      spotlightClicks: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
      disableScrolling: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: "#tour-collection-save-gem-button",
      content: "Tap 'Save' to keep it with you…forever!",
      disableBeacon: true,
      disableOverlayClose: true,
      spotlightClicks: true,
      hideCloseButton: true,
      disableScrolling: true,
      locale:{next: ''},   
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          display:'none'
        }
      },
    },
    {
      target: "#curateit-c-id",
      content: "Explore our curateit collection!",
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      hideCloseButton: true,
      spotlightClicks: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { action, index, type } = data;

    if (index === 0 && action === ACTIONS.NEXT && type === EVENTS.STEP_AFTER) {
      dispatch(openDrawer("collection"));
    }
    if (index === 3 && action === ACTIONS.NEXT && type === EVENTS.STEP_AFTER) {
        dispatch(openDrawer("bookmark"));
    }
    if (index === 4 && action === ACTIONS.NEXT && type === EVENTS.STEP_AFTER) {
        dispatch(setShowUrlInputFromTourSteps(true));
    }
    if (index === 5 && action === ACTIONS.NEXT && type === EVENTS.STEP_AFTER) {
        dispatch(setShowUrlInputFromTourSteps(false));
    }

    //nee
    if (index === 6 && action === ACTIONS.PREV && type === EVENTS.STEP_AFTER) {
        dispatch(setShowUrlInputFromTourSteps(true));
    }
    if (index === 7 && action === ACTIONS.NEXT && type === EVENTS.TOUR_END) {
      const col = followedCollections?.filter(item => item?.name === 'Curateit')
      dispatch(setSubCollectionsPageDetails(null))
      dispatch(selectedSecondarySidebar('collections'))
      if(Array.isArray(col) && col[0]?.id){
        dispatch(sidebarSelected(`Folder-${col[0]?.id}`));
        navigate.push(
          `/u/${col[0]?.author?.username}/c/${col[0]?.id}/${
            col[0]?.slug ||
            slugify(col[0]?.name || "", {
              lower: true,
              remove: /[&,+()$~%.'":*?<>{}/\/]/g,
            })
          }`
        );
        isMobile && dispatch(setIsMobileSidebar(false));
        setRun(false);
        dispatch(enableTourSteps(false));
        dispatch(updateTourStepsData(0));
        return;
      }
      isMobile && dispatch(setIsMobileSidebar(false))
      setRun(false);
      dispatch(enableTourSteps(false));
      dispatch(updateTourStepsData(0))
    }
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setTimeout(() => {
        // setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        dispatch(updateTourStepsData(index + (action === ACTIONS.PREV ? -1 : 1)))
      }, 400);
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setRun(false);
      dispatch(enableTourSteps(false));
      dispatch(updateTourStepsData(0))
    }
  };

  return (
    <>
      {showWelcomeModal && <WelcomeModal />}
      {showExceedModal && <ExceedLimitModal />}
      {showEmailModal && <EmailVerificationModal />}
      {showSearchModal && <SearchModal />}
      {drawerType === "bookmark" && (
        <AddBookmark open={drawerType === "bookmark"} />
      )}
      {drawerType === "collection" && (
        <CollectionCreateEditDrawer
          open={drawerType === "collection"}
          title={"Create Collection"}
          action="create"
        />
      )}
      {drawerType === "tags" && (
        <TagCreateEditDrawer
          open={drawerType === "tags"}
          title={"Create Tag"}
          action="create"
        />
      )}
      {drawerType === "upload-bookmark" && (
        <UploadBookmarkDrawer open={drawerType === "upload-bookmark"} />
      )}
      {isMobileSidebar && isMobile && <SiderDrawer />}

      {tourStepsEnabled && <Joyride
        continuous={true}
        run={tourStepsEnabled}
        steps={isMobile ? mobileSteps : steps}
        stepIndex={tourStepIndex}
        callback={handleJoyrideCallback}
        showProgress
        scrollToFirstStep={true}
        styles={{
          options: {
            primaryColor: '#347AE2',
          },
        }}
        showSkipButton={process.env.NODE_ENV === 'development' ? true : false}
      />}

      <Layout style={{ minHeight: "100vh" }}>
        {isMobile ? (
          <MobileFooter
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            coverImage={coverImage}
          />
        ) : (
          <MainSidebar setCollapsed={setCollapsed} />
        )}
        <Layout className="ct-pure-white">
          {collapsed || !showSecondarySidebar || isMobile ? (
              <></>
            ) : (
              <InnerSidebar
                collapsed={collapsed}
                isMobile={isMobile}
                setCollapsed={setCollapsed}
                coverImage={coverImage}
              />
            )}
          <Layout className="ct-pure-white header-layout">        
            <Content
              style={{
                padding: "16px",
                paddingTop:'0px',
                paddingLeft: isMobile
                  ? "16px"
                  : collapsed || !showSecondarySidebar
                  ? "60px"
                  : "16px",
                backgroundColor: "rgba(255,255,255,.8)",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        {!isExtensionExists && !isMobile && (
          <div className="fixed z-50 right-4 bottom-4">
            <DownloadExtension />
          </div>
        )}
        <TransactionFailedPopup />
      </Layout>
    </>
  );
};

export default CommonLayout;
