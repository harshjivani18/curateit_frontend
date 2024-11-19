import { useEffect }                    from "react";
import { FaRegCreditCard }              from "react-icons/fa6";
import { Dropdown }                     from "antd";
import { useRouter }                    from "next/navigation";
import { useDispatch, useSelector }     from "react-redux";
import axios                            from "axios";
import { 
    AdjustmentsHorizontalIcon, 
    StarIcon, BookOpenIcon, 
    BugAntIcon, 
    MegaphoneIcon, 
    ChatBubbleBottomCenterTextIcon, 
    ArrowDownTrayIcon 
}                                       from "@heroicons/react/24/outline"

import session                          from "../../utils/session";

import { 
  resetPageTitle, 
  setWelcomeModalStatus, 
  sidebarMenuClicked
}                                       from "@actions/app";
import { clearCollectionState, 
         resetSharedCollections }       from "@actions/collection";
import { clearAllTags }                 from "@actions/tags";
import { disableMsg }                   from "@actions/login";
import { getIsPlanOwner }               from "@actions/plan-service";


const SettingsMenu = (props) => {
    const navigate        = useRouter()
    const dispatch        = useDispatch()
    const { isPlanOwner } = useSelector(state => state.planService)

    useEffect(() => {
      if (isPlanOwner === -1) {
        dispatch(getIsPlanOwner())
      }
    }, [isPlanOwner])

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
              onClick={props.onShowReportBug}
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

    return (
        <Dropdown
                menu={{
                  items: settingItems,
                }}
                placement="top"
                trigger={["click"]}
              >
                {props.children}
        </Dropdown>
    )
}

export default SettingsMenu

