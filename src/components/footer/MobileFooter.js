import { useDispatch, useSelector }     from "react-redux";
import { 
    AdjustmentsHorizontalIcon, 
    ArrowDownTrayIcon, 
    ArrowUpTrayIcon, 
    BookOpenIcon, 
    BugAntIcon, 
    ChatBubbleBottomCenterTextIcon, 
    Cog6ToothIcon, 
    MegaphoneIcon, 
    PlusIcon, 
    StarIcon 
}                                       from "@heroicons/react/24/outline";
import { Dropdown }                     from "antd";
import { useEffect, useState }          from "react";
import axios                            from "axios";
// import { BiDollar } from "react-icons/bi";
import { TbUsersPlus }                  from "react-icons/tb";
import { FaRegCreditCard }              from "react-icons/fa6";
import { 
    RiAccountCircleLine, 
    RiMenuFill, 
    RiSearch2Line, 
    RiTimeLine 
}                                       from "react-icons/ri";
import { 
    useParams, 
    usePathname, 
    useRouter 
}                                       from "next/navigation";
import { MdOutlineLeaderboard }         from 'react-icons/md';

import ReportBugsModal                  from "@components/report-bugs-modal/ReportBugsModal";

import session                          from "@utils/session";

import { 
    enableTourSteps, 
    openAuthModal, 
    openDrawer, 
    openSearchModal, 
    selectedMainSidebar, 
    selectedSecondarySidebar, 
    setIsMobileSidebar, 
    setWelcomeModalStatus, 
    updateTourStepsData 
}                                       from "@actions/app";
import { resetGemsFilters }             from "@actions/gems";
import { 
    resetCollectionWiseCounts, 
    resetSharedCollections 
}                                       from "@actions/collection";
import { getIsPlanOwner }               from "@actions/plan-service";
import { PiDownloadSimple } from "react-icons/pi";
// import { FaShoppingCart } from "react-icons/fa";

const iconStyle = {
    color: "#575C70",
};

const MobileFooter = ({ collapsed, setCollapsed, coverImage }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [showReportBug, 
           setShowReportBug]            = useState(false);

    const { isPlanOwner } = useSelector(state => state.planService)

    const searchParams = useParams();
    const searchPathname = usePathname();
    const uname = searchParams?.username;
    const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
    const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
    const slug = searchParams?.name;

    // const searchParams = window.location.pathname.split("/");
    // const uname = searchParams[2];
    // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
    // const sourceId = searchParams[4];
    // const slug = searchParams[5];

    useEffect(() => {
        if (isPlanOwner === -1) {
            dispatch(getIsPlanOwner())
        }
    }, [isPlanOwner])
    
    const handleLogout = async() => {
        session.clear();
        dispatch(selectedMainSidebar('all'))
        dispatch(selectedSecondarySidebar('all'))
        dispatch(resetGemsFilters())
        dispatch(resetCollectionWiseCounts())
        dispatch(resetSharedCollections())
        router.push("/");
        axios.delete('/api/cookies');
    };

    const settingItems = [
      {
        label: (
          <div
            className="flex items-center"
            onClick={() => router.push(`/u/${session.username}/leader-board`)}
          >
            <MdOutlineLeaderboard className="h-5 w-5 mr-2" />
            <span>Leader Board</span>
          </div>
        ),
        key: "0",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() => router.push(`/u/${session.username}/timeline`)}
          >
            <RiTimeLine className="h-5 w-5 mr-2" />
            <span>Activity</span>
          </div>
        ),
        key: "1",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() => router.push(`/u/${session.username}/edit-profile`)}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
            <span>Settings</span>
          </div>
        ),
        key: "2",
      },
      // {
      //     label: (
      //         <div
      //         className="flex items-center"
      //         onClick={() => router.push(`/u/${session.username}/all-bookmarks`)}
      //         >
      //         <RiDashboard2Fill className="h-5 w-5 mr-2"/>
      //         <span>Dashboard</span>
      //         </div>
      //     ),
      //     key: "3",
      // },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() =>
              window.open(
                "https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk",
                "_blank"
              )
            }
          >
            <StarIcon className="h-5 w-5 mr-2" />
            <span>Rate Us</span>
          </div>
        ),
        key: "4",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() =>
              window.open(
                "https://www.curateit.com/u/curateit.com/g/192327/step-by-step-guide-to-begin-your-journey-on-curateit",
                "_blank"
              )
            }
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
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
            <BugAntIcon className="h-5 w-5 mr-2" />
            <span>Report Bug</span>
          </div>
        ),
        key: "6",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() =>
              window.open("https://web.curateit.com/whats-new", "_blank")
            }
          >
            <MegaphoneIcon className="h-5 w-5 mr-2" />
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
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2" />
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
              dispatch(setIsMobileSidebar(true));
              setTimeout(() => {
                dispatch(updateTourStepsData(0));
                dispatch(enableTourSteps(true));
              }, 500);
            }}
          >
            <BookOpenIcon className="h-5 w-5 mr-[10px]" />
            <span>Product Tour</span>
          </div>
        ),
        key: "9",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() =>
              window.open(
                "https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk",
                "_blank"
              )
            }
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            <span className="whitespace-nowrap">Download Extension</span>
          </div>
        ),
        key: "10",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?download=true`
              )
            }
          >
            <PiDownloadSimple className="h-5 w-5 mr-[10px]" />
            <span>Download</span>
          </div>
        ),
        key: "11",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() => dispatch(openDrawer("upload-bookmark"))}
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-[10px]" />
            <span>Upload Bookmark</span>
          </div>
        ),
        key: "12",
      },
      {
        label: (
          <div
            className="flex items-center"
            onClick={() => router.push(`/u/${session.username}/referral`)}
          >
            <TbUsersPlus className="h-5 w-5 mr-[10px]" />
            <span>Refer and Earn</span>
          </div>
        ),
        key: "13",
      },
      {
        label: (
          <div className="flex items-center" onClick={handleLogout}>
            <img
              className="h-5 w-5 mr-2"
              src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/log-out.svg`}
              alt="logout icon"
            />
            <span>Logout</span>
          </div>
        ),
        key: "14",
      },
    ];

    if (isPlanOwner === true) {
        settingItems.splice(10, 0, {
          label: (
            <div
              className="flex items-center"
              onClick={() =>
                router.push(`/u/${session.username}/edit-profile?billing=true`)
              }
            >
              <FaRegCreditCard className="h-5 w-5 mr-[10px]" />
              <span>Billing</span>
            </div>
          ),
          key: "13",
        });
    }

    return (
        <>
            <div className="flex justify-between items-center w-full px-2 py-1 fixed bottom-0 bg-white" style={{ zIndex: "999" }}>
                <div className="p-2  cursor-pointer" onClick={() => {
                          if(!session?.userId){
                              dispatch(openAuthModal({
                                  open: true,
                                  action : 'login',
                                  extraInfo: {
                                    trigger: 'signup',
                                    username: uname,
                                    id: sourceId,
                                    module: module,
                                    slug: slug
                                  }
                              }))
                              return;
                          }
                          dispatch(setIsMobileSidebar(true))
                        }}>
                    <RiMenuFill className="h-5 w-5 cursor-pointer text-[#575C70]"/>
                </div>
                <div className="p-2  cursor-pointer" onClick={() => {
                    if(!session?.userId){
                        dispatch(openAuthModal({
                            open: true,
                            action : 'login',
                            extraInfo: {
                                trigger: 'signup',
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug
                            }
                        }))
                        return;
                    }
                    dispatch(openSearchModal(true))
                    }}>
                    <RiSearch2Line className="h-5 w-5 " style={iconStyle} />
                </div>
                {/* open bookmark sidebar */}
                <div className="p-2 cursor-pointer flex gap-[10px] rounded-[45px] bg-[#347AE2]" onClick={() => {
                    if(!session?.userId){
                        dispatch(openAuthModal({
                            open: true,
                            action : 'login',
                            extraInfo: {
                                trigger: 'signup',
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug
                            }
                        }))
                        return;
                    }
                    dispatch(openDrawer('bookmark'))
                    }}>
                    <PlusIcon className="h-5 w-5 text-white"/>
                </div>

                <div className="p-2  cursor-pointer" onClick={() => {
                    if(!session?.userId){
                        dispatch(openAuthModal({
                            open: true,
                            action : 'login',
                            extraInfo: {
                                trigger: 'signup',
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug
                            }
                        }))
                        return;
                    }
                    router.push(`/u/${session.username}`)
                    }}>
                    <RiAccountCircleLine className="h-5 w-5 " style={iconStyle} />
                </div>
                
                {!session?.userId ? <></> : <div className="p-2 relative">
                    <Dropdown
                            overlayStyle={{position:'fixed',bottom:'0px'}}
                            menu={{
                            items: settingItems,
                            }}
                            placement="top"
                            trigger={["click"]}
                        >
                            <Cog6ToothIcon className="h-5 w-5 cursor-pointer" style={iconStyle}/>
                    </Dropdown>
                </div>}
            </div>

            {showReportBug && <ReportBugsModal showPopup={showReportBug} onCancel={() => setShowReportBug(false)} />}
        </>
    )
}

export default MobileFooter;