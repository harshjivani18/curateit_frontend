"use client";

import { useState, useEffect } from "react";
import { Spin, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ErrorPage from "@components/error/ErrorPage";
import CommonLayout from "@components/layouts/CommonLayout";
import session from "@utils/session";
import { selectedMainSidebar } from "@actions/app";
import {
  clearCollectionState,
  resetSharedCollections,
  // getAllCollections,
  createCollection,
  fetchCollectionWiseCounts,
} from "@actions/collection";
import { clearAllTags } from "@actions/tags";
import { disableMsg } from "@actions/membership";
import { getOtherUserDetails, updateUser } from "@actions/user";
import ProfileHeader from "@components/pageHeader/ProfileHeader";
import ProfileSocial from "@components/profileSocial/ProfileSocial";
import Tabs from "@components/tabs/Tabs";
import AllGems from "@components/common/profileCollections/AllGems";
import AllBio from "@components/common/profileCollections/AllBio";
// import AllFeed from "@components/common/profileCollections/AllFeed";
// import StoriesComponent from "@components/storiesComponent/StoriesComponent";
import ProfileShareHeader from "@components/common/ProfileShareHeader";
// import ProfileTools from "@components/profileTools/ProfileTools";
import {
  HiOutlineSquares2X2,
  // HiOutlineQueueList,
  HiOutlineWindow,
} from "react-icons/hi2";
// import {FaInstagram} from "react-icons/fa"
// import InstaWall from "@components/common/profileCollections/InstaWall";
import ContactDrawer from "@components/drawers/ContactDrawer";
import AllGemsPublic from "@components/common/profileCollections/AllGemsPublic";
import AuthModal from "@components/modal/AuthModal";

const TABS = [
  {
    icon: <HiOutlineWindow className="h-5 w-5 mr-1" />,
    name: "Bio",
    current: true,
    disabled: false,
  },
  // {
  //   icon: <HiOutlineQueueList className="h-5 w-5 mr-1" />,
  //   name: "Feed",
  //   current: false,
  //   disabled: false,
  // },
  {
    icon: <HiOutlineSquares2X2 className="h-5 w-5 mr-1" />,
    name: "Gems",
    current: false,
    disabled: false,
  },
  // {
  //   icon: <FaInstagram className="h-5 w-5 mr-1" />,
  //   name: "Insta Wall",
  //   current: false,
  //   disabled: false,
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username } = useParams();
  const searchParams = useSearchParams();
  const { userId, isInstaWall } = searchParams;
  const [user, setUser] = useState({});
  const [follower, setFollower] = useState([]);
  const [processing, setProcessing] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showMainSidebar, setShowMainSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [tabs, setTabs] = useState(TABS);
  const [bioId, setBioId] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const [bioContactId, setBioContactId] = useState(null);
  const [openContactDrawer, setOpenContactDrawer] = useState(false);
  const [name, setName] = useState('');
  const { authModal } = useSelector((state) => state.app);
  useEffect(() => {
    if (userId && userId !== session.userId) {
      message.error(TextMessage.LOGIN_TEXT);
      session.clear();
      dispatch(selectedMainSidebar("all"));
      dispatch(clearCollectionState());
      dispatch(clearAllTags());
      dispatch(disableMsg());
      dispatch(resetSharedCollections());
      router.push("/");
    }

    if (isInstaWall) {
      activateTab("Insta Wall")
    }
  }, [userId, isInstaWall, router, dispatch]);

  useEffect(() => {
    if(username){
      let formatedUsername = username;
      setName(decodeURIComponent(username))
      if (username?.startsWith("@")) {
        formatedUsername = username.substring(1);
      }
      if (username?.startsWith("%40")) {
        formatedUsername = username.substring(3);
      }
      dispatch(selectedMainSidebar("profile"));
      dispatch(getOtherUserDetails(formatedUsername || session.username)).then(
        (res) => {
          if (res?.payload?.data?.status === 200) {
            setShowError(false);
            setUser(res?.payload?.data);
            setFollower(res?.payload?.data?.followerUsers || []);
            setSocialLinks(res?.payload?.data?.userDetails?.socialLinks || []);
            if(res?.payload?.data?.userDetails?.id === Number(session?.userId)){
              if(res?.payload?.data?.userDetails?.bio_collection){
              setBioId(res?.payload?.data?.userDetails?.bio_collection)
              }else{
                const payload = {
                    name: 'Bio',
                    description: '',
                    tags: [],
                    author: session.userId,
                    avatar: null,
                    media_type: 'Link',
                    collection: null
                }
                dispatch(createCollection(payload,[])).then((res1) => {
                  if(res1.error === undefined){
                    setBioId(res1?.payload?.data?.data?.id)
                    session.setBioCollectionId(res1?.payload?.data?.data?.id)
                    const data = {
                      bio_collection : res1?.payload?.data?.data?.id
                    }
                    dispatch(updateUser(data))
                    dispatch(fetchCollectionWiseCounts())
                  }
                })
              }

              if(res?.payload?.data?.userDetails?.bio_contact_collection){
                setBioContactId(res?.payload?.data?.userDetails?.bio_contact_collection)
              }else{
                const payload = {
                    name: 'Bio Contact',
                    description: '',
                    tags: [],
                    author: session.userId,
                    avatar: null,
                    media_type: 'Link',
                    collection: null
                }
                dispatch(createCollection(payload,[])).then((res1) => {
                  if(res1.error === undefined){
                    setBioContactId(res1?.payload?.data?.data?.id)
                    session.setBioContactCollectionId(res1?.payload?.data?.data?.id)
                    const data = {
                      bio_contact_collection : res1?.payload?.data?.data?.id
                    }
                    dispatch(updateUser(data))
                    dispatch(fetchCollectionWiseCounts())
                  }
                })
              }
            }else{
              setBioId(res?.payload?.data?.userDetails?.bio_collection)
              setBioContactId(res?.payload?.data?.userDetails?.bio_contact_collection)
            }
          } else {
            setShowError(true);
            message.error('Login to view other user profile')
            router.push("/sign-in")
          }
          // dispatch(getAllCollections());
          setProcessing(false);
        }
      );
    }
  }, [username]);

  const handleFollowAction = (type) => {
    const currentId = Number(session?.userId);
    if (type === "follow") {
      if (!follower.includes(currentId)) {
        const newArr = [...follower];
        newArr.push(currentId);
        setFollower(newArr);
        setUser({...user,followerUsers:newArr})
      }
    } else if (type === "unfollow") {
      if (follower.includes(currentId)) {
        const index = follower.indexOf(currentId);
        const newArr = [...follower];
        newArr.splice(index, 1);
        setFollower(newArr);
        setUser({...user,followerUsers:newArr})
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activateTab = (name) => {
    const newTab = tabs.map((t) => {
      if (t.name === name) {
        return { ...t, current: true };
      } else {
        return { ...t, current: false };
      }
    });

    setTabs(newTab);
  };

  const checkAtive = (name) => {
    const currentTab = tabs.filter((t) => t.name === name)[0];
    if (currentTab?.current) {
      return true;
    }
    return false;
  };

  return (
    <CommonLayout
      showSecondarySidebar={false}
      showMainSidebar={showMainSidebar}
    >
      {processing ? (
        <div className="spinDiv">
          <Spin size="middle" tip="Loading..." />
        </div>
      ) : (
        <>
          {showError ? (
            <ErrorPage message="User not found" />
          ) : (
            <div className="pb-4">
              <ProfileShareHeader
                isMobile={isMobile}
                user={user}
                handleFollowAction={handleFollowAction}
                setOpenContactDrawer={setOpenContactDrawer}
              />
              <ProfileHeader
                user={user}
                follower={follower}
                handleFollowAction={handleFollowAction}
              />
              <section className="px-2 md:px-16 lg:px-40">
                {socialLinks && (
                  <ProfileSocial
                    // socialHandles={user?.userDetails?.socialLinks}
                    socialHandles={socialLinks}
                  />
                )}
              </section>
              {
                // <section>
                //   <div className="flex justify-center mt-2 items-center">
                //      <StoriesComponent/>
                //   </div>
                // </section>
              }

              {
                <section>
                  <div>
                    <div className="flex justify-center  mt-2 items-center py-4">
                      <Tabs showTabs={tabs} activateTab={activateTab} />
                    </div>
                    <div className="h-full pb-10">
                      <div className="mt-2">
                        <div
                          className={classNames(
                            checkAtive("Bio") ? "" : "hidden"
                          )}
                        >
                          {checkAtive("Bio") ?<AllBio bioId={bioId} userName={decodeURIComponent(username)}
                          setSocialLinks={setSocialLinks} socialLinks={socialLinks} bioContactId={bioContactId}
                          /> : <></>}
                        </div>
                        {/* <div
                          className={classNames(
                            checkAtive("Feed") ? "" : "hidden"
                          )}
                        >
                          {checkAtive("Feed") ? <AllFeed /> : <></>}
                        </div> */}
                        {/* <div
                          className={classNames(
                            checkAtive("Insta Wall") ? "" : "hidden"
                          )}
                        >
                          {checkAtive("Insta Wall") ? <InstaWall isMobile={isMobile} 
                          isOwnUser={(name?.startsWith("@") ? name?.substring(1) : name) === session?.username ? true : false} 
                          /> : <></>}
                        </div> */}
                        {
                        (name?.startsWith("@") ? name?.substring(1) : name) === session?.username ? 
                        <div
                          className={classNames(
                            checkAtive("Gems") ? "" : "hidden"
                          )}
                        >
                          {checkAtive("Gems") ? <AllGems user={user} /> : <></>}
                        </div> :
                        <div
                          className={classNames(
                            checkAtive("Gems") ? "" : "hidden"
                          )}
                        >
                          {checkAtive("Gems") ? <AllGemsPublic user={user} /> : <></>}
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                </section>
              }

              {
              openContactDrawer &&
              <ContactDrawer
              openDrawer={openContactDrawer}
              setOpenDrawer={setOpenContactDrawer}
              bioContactId={bioContactId}
              />
              }
              {/* {<ProfileTools />} */}
              {authModal?.open && <AuthModal
              openModal={authModal?.open}
              />}
            </div>
          )}
        </>
      )}
    </CommonLayout>
  );
};

export default Profile;
