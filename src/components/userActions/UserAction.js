import React, { useState, useEffect, useRef } from "react";
import { HiDotsHorizontal, HiDotsVertical, HiShare } from "react-icons/hi";
import { Spin, Dropdown, Button } from "antd";
import { Menu } from "@headlessui/react";
import MenuList from "@components/menuList/menuList";
import { useDispatch } from "react-redux";
import { followUser } from "@actions/following";
import { useParams, usePathname, useRouter } from "next/navigation";
import session from "@utils/session";
import { unfollowUser } from "@actions/following";
import SocialShare from "@components/socialShare/SocialShare";
import { MdOutlineContactPhone } from "react-icons/md";
import { openAuthModal } from "@actions/app";
// import ViewComponent from "@components/layouts/Topbar/ViewComponent";
// import FilterComponent from "@components/layouts/Topbar/FilterComponent";

const UserActions = ({ isMobile, user, handleFollowAction,setOpenContactDrawer=()=>{} }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const shareRef = useRef(null);
  const [following, setFollowing] = useState(
    user?.followerUsers && user?.followerUsers?.length > 0
      ? user?.followerUsers.includes(session.userId)
      : false
  );
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : "profile";
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
  // const sourceId = searchParams[4];
  // const slug = searchParams[5];

  useEffect(() => {
    if (user?.followerUsers?.length > 0) {
      if (user?.followerUsers.includes(Number(session.userId))) {
        setFollowing(true);
      }else{
        setFollowing(false);
      }
    }
  }, [user]);

  const MENUS = [
    {
      id: 1,
      name: "Edit",
    },
    {
      id: 2,
      name: "Share",
    },
    {
      id: 3,
      name: "Follow",
    },
  ];

  const handleFollow = async () => {
    if(!session?.userId){
      dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
              trigger: 'userfollow',
              username: uname,
              id: sourceId,
              module: module,
              slug: slug
            }
        }))
      return;
    }
    setLoading(true);
    const data = {
      hierarchyLevel: "user",
      followerUserId: user?.userDetails?.id,
    };
    dispatch(followUser(data)).then((res) => {
      if (res?.payload?.status === 200) {
        setFollowing(true);
        handleFollowAction("follow");
      }
      setLoading(false);
    });
  };

  const handleUnfollow = async () => {
    if(!session && !session?.userId){
      dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
              trigger: 'userunfollow',
              username: uname,
              id: sourceId,
              module: module,
              slug: slug
            }
        }))
      return;
    }
    setLoading(true);
    const data = {
      hierarchyLevel: "user",
      followerUserId: user?.userDetails?.id,
    };
    dispatch(unfollowUser(data)).then((res) => {
      if (res?.payload?.status === 200) {
        setFollowing(false);
        handleFollowAction("unfollow");
      }
      setLoading(false);
    });
  };

  const handleClick = (e) => {
    if (shareRef.current && !shareRef.current.contains(e.target)) {
      setShowShare(false);
    }
  };

  const handleOpen = (flag) => {
    setShowShare(flag);
};

const dropdownnRenderUI = () => {
   return(
    <div className='bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]'>
        <SocialShare user={user?.userDetails} isProfile={true}
        setShowShare={setShowShare} 
        />
    </div>
   )
}

  useEffect(() => {
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <div className="mt-2 md:mt-0">
      <div className="hidden md:block lg:hidden">
        <MenuList menus={MENUS} position="right-0">
          <Menu.Button>
            <HiDotsVertical className="h-5 w-5" />
          </Menu.Button>
        </MenuList>
      </div>
      <div className="flex justify-start gap-2 lg:justify-end items-center md:gap-3 md:hidden lg:flex">
        {/* {isMobile &&
          <>
            {session?.userId.toString() === user?.userDetails?.id.toString() && <button className='px-4 h-8 rounded-md border-[1px] border-gray-400'>
              <ViewComponent isMobile={isMobile} />
            </button>}
            {session?.userId.toString() === user?.userDetails?.id.toString() && <button className='px-4 h-8 rounded-md border-[1px] border-gray-400'>
              <FilterComponent isMobile={isMobile} />
            </button>}
          </>
        } */}
        {session?.userId?.toString() === user?.userDetails?.id?.toString() && (
          <Button className="rounded-md text-[#347AE2] bg-[#E5F0FF] hover:bg-[#E5F0FF] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2]"
          onClick={() => setOpenContactDrawer(true)}
          >
            {isMobile ? <MdOutlineContactPhone className="h-4 w-4" /> : 'Contacts'}
          </Button>
        )}
        {session?.userId?.toString() === user?.userDetails?.id?.toString() && (
          <Button className="rounded-md" onClick={() => router.push(`/u/${session.username}/edit-profile`)}>
            <HiDotsHorizontal className="h-4 w-4" />
          </Button>
        )}
        {/* <button
          className='px-4 flex items-center gap-1 h-8 rounded-md bg-blue-600 text-white relative'
          onClick={(e) => {
            e.stopPropagation();
            setShowShare(true)
          }}
        >
          <HiShare className='h-5 w-5' />
          {isMobile ? "" : "Share"}
          {showShare && <div className='bg-white w-full h-full absolute left-0 top-0 rounded-md flex justify-center items-center' ref={shareRef}>
            <SocialShare user={user?.userDetails} isProfile={true} />
          </div>}
        </button> */}
        <Dropdown
          overlayStyle={{ width: "250px" }}
          trigger={["click"]}
          dropdownRender={() => dropdownnRenderUI()}
          onOpenChange={handleOpen}
          open={showShare}
          placement="bottomRight"
        >
          <button className='px-3 h-8 shadow flex justify-center items-center outline-none rounded-md text-white bg-[#347AE2] gap-2 relative'>
              <HiShare className='h-5 w-5' />
              <span className="hidden md:block">Share</span>
          </button>
        </Dropdown>

        {session?.userId?.toString() !== user?.userDetails?.id.toString() && (
          <button
            className="px-4 h-8 rounded-md bg-blue-600 text-white relative"
            onClick={following ? handleUnfollow : handleFollow}
          >
            {following ? "Unfollow" : "Follow"}
            {loading && (
              <div className="bg-blue-200 w-full h-full absolute left-0 top-0 rounded-md flex justify-center items-center">
                <Spin size="small" />
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserActions;
