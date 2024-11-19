"use client"
import { useEffect, useState }                         from "react";
import { useDispatch, useSelector }                          from "react-redux";
// import { RiDashboard2Fill }                 from "react-icons/ri";
import { useRouter }                        from "next/navigation";
import { 
    AdjustmentsHorizontalIcon, 
    ArrowDownTrayIcon, 
    ArrowUpTrayIcon, 
    BookOpenIcon, 
    BugAntIcon, 
    ChatBubbleBottomCenterTextIcon, 
    Cog6ToothIcon, 
    MegaphoneIcon, 
    StarIcon 
}                                           from "@heroicons/react/24/outline";
import {  
    Dropdown, 
    Layout, 
    Tooltip, 
    Tree 
}                                           from "antd";

import ReportBugsModal                      from "@components/modal/ReportBug";
import session                              from "@utils/session";
import { MainSidebarData }                  from "@utils/main-sidebar";
import { generateMainSidebarTreeData }      from "@utils/generateMainSidebarTreeData";

import { 
    enableTourSteps,
    getCategorySeeMore,
    getExpandedKeys,
    getExpandedTagKeys,
    openAuthModal,
    openDrawer,
    openSearchModal, 
    selectedMainSidebar, 
    selectedSecondarySidebar, 
    setWelcomeModalStatus,
    showEmailVerficationModal,
    sidebarSelected,
    updateTourStepsData
}                                           from "@actions/app";
import axios from "axios";
import { resetGemsFilters } from "@actions/gems";
import { getFollowByMeCollection, resetCollectionWiseCounts, resetSharedCollections } from "@actions/collection";

import BookmarkIcon from "@components/footer/BookmarkIcon";
import { PiDownloadSimple, PiWarning } from "react-icons/pi";
// import { BiDollar } from "react-icons/bi";
import { TbUsersPlus } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa6";
import { getIsPlanOwner } from "@actions/plan-service";
import { updateUser } from "@actions/user";
// import { FaShoppingCart } from "react-icons/fa";

const { Sider } = Layout;

const MainSidebar = ({ setCollapsed= () => {}, page='', }) => {
    const dispatch = useDispatch()
    const { mainSidebarSelected,secondarySidebarSelected } = useSelector(state => state.app)
    const navigate                      = useRouter()
    const [menuList, 
           setMenuList]                 = useState(session?.webappSidebar || MainSidebarData);
    const [showReportBug, 
           setShowReportBug]            = useState(false);
    const { isPlanOwner }               = useSelector(state => state.planService)

    useEffect(() => {
        if (isPlanOwner === -1) {
            dispatch(getIsPlanOwner())
        }
    }, [isPlanOwner])

    const onDropMenu = async (info) => {
        const { node, dragNode } = info;
        const dragIndex = menuTreeData.findIndex(
        (item) => item.key === dragNode.key
        );
        let dropIndex = menuTreeData.findIndex((item) => item.key === node.key);
        const newTreeData = [...menuTreeData];
        newTreeData.splice(dragIndex, 1);

        newTreeData.splice(dropIndex, 0, dragNode);

        const filtered = newTreeData.map((item) => item.label);

        setMenuList(filtered);
        session.setWebappSidebar(filtered)

        const data = {
            webapp_sidebar_arr : filtered,
        }

        dispatch(updateUser(data))
    }

    const handleChangeMenuClickName = (value) => {
        if(page === 'singleGem'){
            if(value === 'search'){
            dispatch(openSearchModal(true))
            return;
            }

            dispatch(selectedMainSidebar(value));
            if (value === "all") {
            dispatch(selectedSecondarySidebar('all'))
            dispatch(getFollowByMeCollection())
            navigate.push(`/u/${session.username}/all-bookmarks`)
            return;
            }
            if (value === "leader-board") {
            navigate.push(`/u/${session.username}/leader-board`);
            return;
            }
            if (value === "activity") {
            navigate.push(`/u/${session.username}/timeline`);
            return;
            }
            if (value === 'profile') {
                navigate.push(`/u/${session.username}`)
            return;
            }
        }
        if(!session?.userId){
            dispatch(openAuthModal({
                open: true,
                action : 'login'
            }))
            return;
        }
        if (value === 'search'){
            dispatch(openSearchModal(true))
            return;
        }

        if (value !== 'all'){
            dispatch(selectedSecondarySidebar(null))
            dispatch(sidebarSelected(null))
            dispatch(getCategorySeeMore(false))
            dispatch(getExpandedKeys([]))
            dispatch(getExpandedTagKeys([]))
        }
        dispatch(selectedMainSidebar(value))

        if (value === "all") {
            setCollapsed(false)
            dispatch(selectedSecondarySidebar(secondarySidebarSelected || 'all'))
            dispatch(getFollowByMeCollection())
            navigate.push(`/u/${session.username}/all-bookmarks`)
            return;
        }

        setCollapsed(true)
        if (value === "leader-board") {
            navigate.push(`/u/${session.username}/leader-board`);
            return;
        }
        if (value === "activity") {
            navigate.push(`/u/${session.username}/timeline`);
            return;
        }
        if (value === 'profile') {
            navigate.push(`/u/${session.username}`)
            return;
        }
    };

    const cbs = {
        handleChangeMenuClickName,
    }

    const menuTreeData = generateMainSidebarTreeData(menuList, cbs, mainSidebarSelected);

    const handleLogout = async() => {
        const userString = localStorage.getItem("userInfo");
        session.clear();
        dispatch(selectedMainSidebar('all'))
        dispatch(selectedSecondarySidebar('all'))
        dispatch(resetGemsFilters())
        dispatch(resetCollectionWiseCounts())
        dispatch(resetSharedCollections())
        navigate.push("/");
        axios.delete('/api/cookies');
        localStorage.setItem("userInfo", userString);
    };

    const settingItems = [
        {
            label: (
                <div
                className="flex items-center"
                onClick={() => navigate.push(`/u/${session.username}/edit-profile`)}
                >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-[10px]" />
                <span>Settings</span>
                </div>
            ),
            key: "2",
        },
        // {
        //     label: (
        //         <div
        //         className="flex items-center"
        //         onClick={() => navigate.push(`/u/${session.username}/all-bookmarks`)}
        //         >
        //         <RiDashboard2Fill className="h-5 w-5 mr-[10px]"/>
        //         <span>Dashboard</span>
        //         </div>
        //     ),
        //     key: "3",
        // },
        {
            label: (
                <div className="flex items-center"
                     onClick={() => window.open("https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk", "_blank")}
                >
                <StarIcon
                    className="h-5 w-5 mr-[10px]"
                />
                <span>Rate Us</span>
                </div>
            ),
            key: "4",
        },
        {
            label: (
                <div
                className="flex items-center"
                onClick={() => window.open("https://www.curateit.com/u/curateit.com/g/192327/step-by-step-guide-to-begin-your-journey-on-curateit", "_blank")}
                >
                <BookOpenIcon
                    className="h-5 w-5 mr-[10px]"
                />
                <span>Read Me</span>
                </div>
            ),
            key: "5",
        },
        {
            label: (
                <div
                className="flex items-center"
                onClick={() => setShowReportBug(true)}
                >
                <BugAntIcon
                    className="h-5 w-5 mr-[10px]"
                />
                <span>Report Bug</span>
                </div>
            ),
            key: "6",
        },
        {
            label: (
                <div
                className="flex items-center"
                onClick={() => window.open("https://web.curateit.com/whats-new", "_blank")}
                >
                <MegaphoneIcon className="h-5 w-5 mr-[10px]"/>
                <span>What's new?</span>
                </div>
            ),
            key: "7",
        },
        {
            label: (
                <div className="flex items-center"
                     onClick={() => dispatch(setWelcomeModalStatus(true, "sidebar"))}
                >
                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-[10px]" />
                    <span>Tutorial</span>
                </div>
            ),
            key: "8",
        },
        {
          label: (
            <div
              className="flex items-center"
              onClick={() => {
                dispatch(updateTourStepsData(0))
                dispatch(enableTourSteps(true))
              }}
            >
              <BookOpenIcon
                className="h-5 w-5 mr-[10px]"
              />
              <span>Product Tour</span>
            </div>
          ),
          key: "9",
        },
        {
            label: (
                <div className="flex items-center"
                     onClick={() => window.open("https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk", "_blank")}
                >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-[10px]" />
                    <span>Download Extension</span>
                </div>
            ),
            key: "10",
        },
        {
            label: (
                <div
                    className="flex items-center"
                    onClick={handleLogout}
                >
                    <img
                        className="h-5 w-5 mr-[10px]"
                        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/log-out.svg`}
                        alt="logout icon"
                    />
                    <span>Logout</span>
                </div>
            ),
            key: "12",
        },
    ];

    if (isPlanOwner === true) {
        settingItems.splice(8, 0, {
          label: (
            <div
              className="flex items-center"
              onClick={() => navigate.push(`/u/${session.username}/edit-profile?billing=true`)}
            >
              <FaRegCreditCard className="h-5 w-5 mr-[10px]" />
              <span>Billing</span>
            </div>
          ),
          key: "11",
        })
    }
    return (
      <>
        <Sider
          trigger={null}
          collapsed={true}
          width={50}
          className="main-sidebar"
          collapsedWidth={50}
        >
          <div className="flex flex-col items-center justify-start pt-4 h-full">
            <img
              className="w-5 h-5 object-contain"
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
              alt="curateit-logo"
            />

            <div className="property-tree mt-4">
              <Tree
                className="menu-tree-structure"
                treeData={menuTreeData}
                draggable
                onDrop={onDropMenu}
                blockNode
                selectable={false}
              />
            </div>

            {/* add bk */}
            <div className="flex flex-col items-center shadow bg-[#347AE2] p-2 cursor-pointer rounded-[6px] w-fit">
              <Tooltip title={"Add bookmark"} placement="right">
                <button
                  onClick={() => {
                    if (!session?.userId) {
                      dispatch(
                        openAuthModal({
                          open: true,
                          action: "login",
                        })
                      );
                      return;
                    }
                    dispatch(openDrawer("bookmark"));
                  }}
                >
                  {/* <img
                                    className="h-5 w-5 cursor-pointer"
                                    src={`${NEXT_PUBLIC_}/webapp/icons/add-bookmark.svg`}
                                    alt="add bookmark icon"
                                /> */}
                  <BookmarkIcon color="#FFFFFF" />
                </button>
              </Tooltip>
            </div>

            {session.isUserConfirmed === "false" && (
              <PiWarning
                className="h-5 w-5 cursor-pointer mt-2 text-red-500"
                onClick={() => {
                  dispatch(showEmailVerficationModal(true));
                }}
              />
            )}
            <div className="sider-footer">
              {!session?.userId ? (
                <></>
              ) : (
                <PiDownloadSimple
                  className="h-5 w-5 cursor-pointer mt-2"
                  onClick={() =>
                    navigate.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?download=true`
                    )
                  }
                />
              )}
              
              {!session?.userId ? (
                <></>
              ) : (
                <ArrowUpTrayIcon
                  className="h-5 w-5 cursor-pointer mt-2"
                  onClick={() => dispatch(openDrawer("upload-bookmark"))}
                />
              )}

              {!session?.userId ? (
                <></>
              ) : (
                <TbUsersPlus
                  className="h-5 w-5 cursor-pointer mt-2"
                  onClick={() =>
                    navigate.push(`/u/${session.username}/referral`)
                  }
                />
              )}

              {!session?.userId ? (
                <></>
              ) : (
                <Dropdown
                  menu={{
                    items: settingItems,
                  }}
                  placement="top"
                  trigger={["click"]}
                >
                  <Cog6ToothIcon className="h-5 w-5 cursor-pointer mt-2" />
                </Dropdown>
              )}
            </div>
          </div>
        </Sider>
        {showReportBug && (
          <ReportBugsModal
            showPopup={showReportBug}
            onCancel={() => setShowReportBug(false)}
          />
        )}
      </>
    );
}

export default MainSidebar;