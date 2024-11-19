import { Dropdown, Layout, Tree } from "antd";
import { useEffect, useState } from "react";
import { menuData } from "../../utils/constants";
import { generateMenuTreeData } from "../../utils/generateTreeData";
import session from "../../utils/session";
import { useSelector, useDispatch } from "react-redux";
import { openSearchModal, resetPageTitle, setWelcomeModalStatus, sidebarMenuClicked } from "../../actions/app";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { AdjustmentsHorizontalIcon, ArrowDownTrayIcon, BookOpenIcon, BugAntIcon, ChatBubbleBottomCenterTextIcon, Cog6ToothIcon, MegaphoneIcon, StarIcon } from "@heroicons/react/24/outline";
// import { RiDashboard2Fill } from "react-icons/ri";
import ReportBugsModal from "../../components/report-bugs-modal/ReportBugsModal";
import { clearCollectionState, resetSharedCollections } from "../../actions/collection";
import { clearAllTags } from "../../actions/tags";
import { disableMsg } from "../../actions/login";
import axios from "axios";
import { FaRegCreditCard } from "react-icons/fa6";
import { getIsPlanOwner } from "@actions/plan-service";
// import { BiDollar } from "react-icons/bi";
// import { FaShoppingCart } from "react-icons/fa";

const { Sider } = Layout;

const SingleGemSidebar = ({collapsed}) => {
    const dispatch = useDispatch()
    const { sidebarMenuClickedName } =
    useSelector((state) => state.app);
    const navigate = useNavigate()
    const [menuClickedName, setMenuClickedName] = useState(
    sidebarMenuClickedName
  );
  const { sideBarMenuData } = useSelector((state) => state.collections);
  const { allTags } = useSelector((state) => state.tags);
  const [showReportBug, setShowReportBug] = useState(false);

  const { isPlanOwner } = useSelector(state => state.planService)

  useEffect(() => {
      if (isPlanOwner === -1) {
          dispatch(getIsPlanOwner())
      }
  }, [isPlanOwner])
    

    const handleChangeMenuClickName = (value) => {
    if(value === 'search'){
      dispatch(openSearchModal(true))
      return;
    }
    setMenuClickedName(value);
    dispatch(sidebarMenuClicked(value));
    if (value === "all") {
      navigate(`/u/${session.username}/all-bookmarks`);
      return;
    }
    if (value === "leader-board") {
      navigate(`/u/${session.username}/leader-board`);
      return;
    }
    if (value === "activity") {
      navigate(`/u/${session.username}/timeline`);
      return;
    }
    if (value === "collection") {
      navigate(
        `/u/${session.username}/c/${session.unfiltered_collection_id}/unfiltered`
      );
      return;
    }
    if (value === "filter") {
      const filtered =
        sideBarMenuData &&
        sideBarMenuData.filter((item) => item.title !== "Without Tags");
      const url = filtered && filtered[0]?.link;
      navigate(url);
      return;
    }
    if (value === "broken") {
      navigate(`/u/${session.username}/links/broken`);
      return;
    }
    if (value === "duplicate") {
      navigate(`/u/${session.username}/links/duplicate`);
      return;
    }
    if (value === "tag") {
      const id = allTags && allTags[0].id;
      navigate(
        `/u/${session.username}/tags/${id}/${allTags?.[0]?.slug || slugify(
          allTags?.length !== 0 && allTags[0]?.tag ? allTags[0]?.tag : "",
          { lower: true, remove: /[0-9&,+()$~%.'":*?<>{}/\/]/g }
        )}`
      );
      return;
    }
    if (value === 'profile') {
      navigate(`/u/${session.username}`)
      return;
    }
  };

     const cbs = {
        handleChangeMenuClickName,
    };

    const menuTreeData = generateMenuTreeData(menuData, cbs,menuClickedName);

    const handleLogout = async () => {
    const userString = localStorage.getItem("userInfo");
    session.clear();
    dispatch(sidebarMenuClicked("all"))
    dispatch(clearCollectionState());
    dispatch(clearAllTags());
    dispatch(disableMsg())
    dispatch(resetSharedCollections())
    dispatch(resetPageTitle())
    navigate.push("/"); 
    axios.delete('/api/cookies');
    localStorage.setItem("userInfo", userString);
  };

    const settingItems = [
    {
      label: (
        <div
          className="flex items-center"
          onClick={() => navigate(`/u/${session.username}/edit-profile`)}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-[10px]" />
          <span>Settings</span>
        </div>
      ),
      key: "2",
    },
    // {
    //   label: (
    //     <div
    //       className="flex items-center"
    //       onClick={() => navigate(`/u/${session.username}/all-bookmarks`)}
    //     >
    //       <RiDashboard2Fill className="h-5 w-5 mr-[10px]"/>
    //       <span>Dashboard</span>
    //     </div>
    //   ),
    //   key: "3",
    // },
    {
      label: (
        <div
          className="flex items-center"
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
        <div
          className="flex items-center"
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
          onClick={() => window.open("https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk", "_blank")}
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-[10px]" />
          <span>Download Extension</span>
        </div>
      ),
      key: "9",
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
      key: "11",
    },
  ];

  if (isPlanOwner === true) {
    settingItems.splice(6, 0, {
      label: (
        <div
          className="flex items-center"
          onClick={() => navigate.push(`/u/${session.username}/edit-profile?billing=true`)}
        >
          <FaRegCreditCard className="h-5 w-5 mr-[10px]" />
          <span>Billing</span>
        </div>
      ),
      key: "10",
    })
  }

    return(
        <>
            <Sider
            className={"sider-left singleGemSider"}
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={50}
            defaultCollapsed={true}
            collapsedWidth={50}
            >
                <img className='w-5 h-5 object-contain ml-[10px]' src="/logo192.png" alt="curateit-logo" />

                <div
                className={`fixed property-tree mt-3`}
              >
                <Tree
                  className="menu-tree-structure"
                  treeData={menuTreeData}
                  draggable
                //   onDrop={onDropMenu}
                  blockNode
                  selectable={false}
                />

                {/* add bk */}
                {/* <div className="flex flex-col items-center shadow bg-[#347AE2] p-2 rounded-[6px] w-fit">
                  <Tooltip title={'Add bookmark'} placement="right">
                    <button
                      onClick={() => dispatch(openAddBookmarkDrawer(true))}
                      >
                          <img
                            className="h-5 w-5 cursor-pointer"
                            src="/icons/add-bookmark.svg"
                            alt="add bookmark icon"
                          />
                    </button>
                  </Tooltip>
                </div> */}
              </div>

              <div className="sider-left-footer">
            
            <div className="flex items-center">
              <Dropdown
                menu={{
                  items: settingItems,
                }}
                placement="top"
                trigger={["click"]}
              >
                <Cog6ToothIcon className="h-5 w-5 cursor-pointer" />
              </Dropdown>
              {/* <ArrowRightOnRectangleIcon
                className="h-5 w-5 cursor-pointer ml-2"
                onClick={handleSiderPosition}
              /> */}
            </div>
          </div>

          {showReportBug && <ReportBugsModal showPopup={showReportBug} onCancel={() => setShowReportBug(false)} />}
            </Sider>
        </>
    )
}

export default SingleGemSidebar;