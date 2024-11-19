import React, { useEffect, useRef, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Avatar, Button, Spin } from "antd";
import UserEngagement from "@components/userEngagement/UserEngagement";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CoverModal from "@components/common/Dialog/CoverModal";
import { rgbToHex } from "@utils/constants";
import { deleteCoverS3Link } from "@actions/collection";
import { useDispatch } from "react-redux";
import {
  UploadProfileCoverS3Link,
  UploadProfileCoverUnsplashS3Link,
  updateUser,
} from "@actions/user";
import session from "@utils/session";
import { openAuthModal } from "@actions/app";
import { followUser, unfollowUser } from "@actions/following";
import { useParams, usePathname } from "next/navigation";


const ProfileHeader = ({ user, follower, handleFollowAction }) => {
  const dispatch = useDispatch();
  const [openCoverModal, setOpenCoverModal] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState("");
  const [selectedCoverUnSplash, setSelectedCoverUnSplash] = useState("");
  const [selectedCoverGallery, setSelectedCoverGallery] = useState("");
  const [loadingCoverImg, setLoadingCoverImg] = useState(false);
  const [profileCoverImage, setProfileCoverImage] = useState({ type: "gallery", icon: "#3ea9d5" });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef(null);
  const [repositionMode, setRepositionMode] = useState(false);
  const [imagePosition, setImagePosition] = useState(null);
  const [following, setFollowing] = useState(
    user?.followerUsers && user?.followerUsers?.length > 0
      ? user?.followerUsers.includes(session.userId)
      : false
  );
  const [loading, setLoading] = useState(false);

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
  
  useEffect(() => {
    if (user) {
      setProfileCoverImage(user?.userDetails?.coverPhoto || { type: "gallery", icon: "#3ea9d5" });
      setImagePosition(
        user?.userDetails?.coverPhoto?.type === "unsplash" ||
          user?.userDetails?.coverPhoto?.type === "upload"
          ? user?.userDetails?.coverPhoto?.imagePosition
          : null
      );
    }
  }, [user]);
  
  const handleCoverModal = () => {
    setOpenCoverModal(true);
  };

  const handleImageUploadChange = (files) => {
    const fileSize = files.size / 1024 / 1024; // Convert to MB
    // if (fileSize > 5) {
    //   message.error(TextMessage.FILE_SIZE_ERROR);
    //   return;
    // }
    setSelectedCoverUnSplash("");
    setSelectedCoverGallery("");
    setSelectedCoverImage(files);
  };
  const handleUnSplashUploadChange = (files) => {
    setSelectedCoverImage("");
    setSelectedCoverGallery("");
    setSelectedCoverUnSplash(files);
  };
  const handleGalleryUploadChange = (e) => {
    setSelectedCoverImage("");
    setSelectedCoverUnSplash("");
    const hexColor = rgbToHex(e.target.style.background);
    setSelectedCoverGallery(hexColor);
  };

  const handleMouseDown = (e) => {
    if (repositionMode) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setImagePosition({ x, y });
    }
  };

  const handleSaveReposition = async () => {
    const data = {
      ...user.userDetails,
      coverPhoto: {
        type: profileCoverImage?.type,
        icon: profileCoverImage?.icon,
        imagePosition: { x: imagePosition.x, y: imagePosition.y },
      },
    };
    const res = await dispatch(updateUser(data));
    if (res.error === undefined) {
      setProfileCoverImage(res?.payload?.data?.coverPhoto || "");
      setRepositionMode(false);
      setIsDragging(false);
    } else {
      setRepositionMode(false);
      setIsDragging(false);
    }
  };

  const handleCoverModalSubmit = async () => {
    if (selectedCoverImage) {
      setLoadingCoverImg(true);
      const formData = new FormData();

      formData.append("files", selectedCoverImage);

      const res = await dispatch(UploadProfileCoverS3Link(formData));
      if (res.error === undefined) {
        const payload = {
          background: {
            type: "upload",
            icon: res.payload.data.media[0],
            imagePosition: { x: 50, y: 50 },
          },
        };

        const data = {
          ...user.userDetails,
          coverPhoto: payload.background,
        };
        const res1 = await dispatch(updateUser(data));
        if (res1.error === undefined) {
          setLoadingCoverImg(false);
          setSelectedCoverImage("");
          setSelectedCoverGallery("");
          setSelectedCoverUnSplash("");
          setOpenCoverModal(false);
          setProfileCoverImage(res1?.payload?.data?.coverPhoto || "");
        } else {
          setLoadingCoverImg(false);
          setProfileCoverImage("");
          setSelectedCoverGallery("");
          setSelectedCoverUnSplash("");
          setOpenCoverModal(false);
        }
      }
      return;
    }

    if (selectedCoverUnSplash) {
      setLoadingCoverImg(true);
      const res = await dispatch(
        UploadProfileCoverUnsplashS3Link(selectedCoverUnSplash)
      );
      if (res.error === undefined) {
        const payload = {
          background: {
            type: "unsplash",
            icon: res.payload.data.media[0],
            imagePosition: { x: 50, y: 50 },
          },
        };
        const data = {
          ...user.userDetails,
          coverPhoto: payload.background,
        };
        const res1 = await dispatch(updateUser(data));
        if (res1.error === undefined) {
          setLoadingCoverImg(false);
          setSelectedCoverImage("");
          setSelectedCoverUnSplash("");
          setSelectedCoverGallery("");
          setOpenCoverModal(false);
          setProfileCoverImage(res1?.payload?.data?.coverPhoto || "");
        } else {
          setSelectedCoverGallery("");
          setLoadingCoverImg(false);
          setSelectedCoverImage("");
          setSelectedCoverUnSplash("");
          setOpenCoverModal(false);
        }
      }
      return;
    }

    if (selectedCoverGallery) {
      setLoadingCoverImg(true);
      const payload = {
        background: {
          type: "gallery",
          icon: selectedCoverGallery,
        },
      };

      const data = {
        ...user.userDetails,
        coverPhoto: payload.background,
      };
      const res1 = await dispatch(updateUser(data));
      if (res1.error === undefined) {
        setLoadingCoverImg(false);
        setSelectedCoverImage("");
        setSelectedCoverUnSplash("");
        setSelectedCoverGallery("");
        setOpenCoverModal(false);
        setProfileCoverImage(res1?.payload?.data?.coverPhoto || "");
      } else {
        setSelectedCoverGallery("");
        setLoadingCoverImg(false);
        setSelectedCoverImage("");
        setSelectedCoverUnSplash("");
        setOpenCoverModal(false);
      }
    }
  };

  const handleDeleteCoverS3Link = async () => {
    if (
      profileCoverImage?.type === "upload" ||
      profileCoverImage?.type === "unsplash"
    ) {
      setLoadingCoverImg(true);
      const res = await dispatch(deleteCoverS3Link(profileCoverImage?.icon));

      if (res.error === undefined) {
        const payload = {
          ...user.userDetails,
          coverPhoto: null,
        };

        const res1 = await dispatch(updateUser(payload));
        if (res1.error === undefined) {
          setProfileCoverImage("");
          setSelectedCoverGallery("");
          setSelectedCoverImage("");
          setSelectedCoverUnSplash("");
          setLoadingCoverImg(false);
          setOpenCoverModal(false);
        } else {
          setSelectedCoverGallery("");
          setSelectedCoverImage("");
          setSelectedCoverUnSplash("");
          setLoadingCoverImg(false);
          setOpenCoverModal(false);
        }
      } else {
        setLoadingCoverImg(false);
        setOpenCoverModal(false);
      }
      return;
    }

    setLoadingCoverImg(true);
    const payload = {
      ...user.userDetails,
      coverPhoto: null,
    };
    const res1 = await dispatch(updateUser(payload));
    if (res1.error === undefined) {
      setProfileCoverImage("");
      setSelectedCoverGallery("");
      setSelectedCoverImage("");
      setSelectedCoverUnSplash("");
      setLoadingCoverImg(false);
      setOpenCoverModal(false);
    } else {
      setSelectedCoverGallery("");
      setSelectedCoverImage("");
      setSelectedCoverUnSplash("");
      setLoadingCoverImg(false);
      setOpenCoverModal(false);
    }
  };

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
  const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
  return (
    <div>
      <div className="bg-light-blue h-[20vh] relative group mt-[50px]">
        {Number(session?.userId) === user?.userDetails?.id && profileCoverImage &&
          (profileCoverImage?.type === "upload" ||
            profileCoverImage?.type === "unsplash") && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "20vh",
                overflow: "hidden",
              }}
              className="group"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {repositionMode && (
                <p
                  style={{
                    position: "absolute",
                    top: "calc(50% - 10px)",
                    left: " calc(50% - 90px)",
                    padding: "0.3rem 1.5rem",
                  }}
                  className="bg-[#00000066] text-white text-sm w-fit "
                >
                  Draw image to reposition
                </p>
              )}
              <img
                ref={imageRef}
                src={profileCoverImage?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/800x800_contain`)}
                alt={profileCoverImage?.altInfo || "Profile cover image"}
                style={{
                  display: "block",
                  objectFit: "cover",
                  borderRadius: "0px",
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                  objectPosition: `${imagePosition?.x}% ${imagePosition?.y}%`,
                  pointerEvents: repositionMode ? "auto" : "none",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              />
              {repositionMode ? (
                <div className="change-cover-wrapper opacity-0 transition-opacity  group-hover:opacity-100">
                  <div className="change-cover-btn-wrapper">
                    <div
                      className="change-cover-btn"
                      onClick={handleSaveReposition}
                    >
                      Save position
                    </div>
                    <div
                      className="change-cover-btn"
                      onClick={() => {
                        setIsDragging(false);
                        setRepositionMode(false);
                        setImagePosition({
                          x: profileCoverImage?.imagePosition?.x,
                          y: profileCoverImage?.imagePosition?.y,
                        });
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <div className="change-cover-wrapper opacity-0 transition-opacity  group-hover:opacity-100">
                  <div className="change-cover-btn-wrapper">
                    <div
                      className="change-cover-btn"
                      onClick={() => setOpenCoverModal(true)}
                    >
                      Change Cover
                    </div>
                    <div
                      className="change-cover-btn"
                      onClick={() => {
                        setRepositionMode(true);
                      }}
                    >
                      Reposition
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {Number(session?.userId) === user?.userDetails?.id && profileCoverImage && profileCoverImage?.type === "gallery" && (
          <div className="group" id="parent-cover-imagecontainer">
            <div
              style={{ background: profileCoverImage?.icon }}
              className="w-full h-[20vh]"
            ></div>

            <div className="change-cover-wrapper opacity-0 transition-opacity right-8 group-hover:opacity-100">
              <div className="change-cover-btn-wrapper">
                <div
                  className="change-cover-btn"
                  onClick={() => setOpenCoverModal(true)}
                >
                  Change Cover
                </div>
              </div>
            </div>
          </div>
        )}
        {Number(session?.userId) === user?.userDetails?.id && <div className="px-2 absolute top-2 left-2">
          <div className="flex flex-col opacity-100 md:flex md:flex-row md:items-center md:opacity-0 md:transition-opacity  md:group-hover:opacity-100">
            {!profileCoverImage && (
              <Button
                icon={<PhotoIcon className="h-5 w-5" />}
                type="text"
                className="text-[#3838389b] hover:bg-[#ffffffb1] hover:text-[#1c1c1c9a] cover-desc-btn"
                onClick={handleCoverModal}
              >
                Add cover
              </Button>
            )}
          </div>
        </div>}
      </div>

      <div className="-mt-14 lg:-mt-20 flex flex-col items-center justify-center gap-4 ">
        <div className="flex flex-col justify-center gap-y-2 items-center">
          <Avatar
            icon={
              user?.userDetails?.profilePhoto ? (
                <img
                  src={user?.userDetails?.profilePhoto?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/200x200_contain`)}
                  alt={user?.userDetails?.userName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = user?.userDetails?.profilePhoto;
                  }}
                />
              ) : (
                <UserCircleIcon />
              )
            }
            className="cursor-pointerh shadow-xl h-20 w-20 md:h-28 md:w-28 border-4 border-white"
          />
          <div className="flex flex-col gap-y-2 items-center text-center justify-center" >
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl  font-semibold">
              {user?.userDetails?.firstName} {user?.userDetails?.lastName}
            </h1>
            {session?.userId?.toString() !== user?.userDetails?.id.toString() && (
              <Button
                type="text" className={`text-[#105FD3] hover:text-[#105FD3] hover:underline`} 
                onClick={following ? handleUnfollow : handleFollow}
              >
                {following ? "Unfollow" : "Follow"}
                {loading && (
                  <div className="bg-blue-200 w-full h-full absolute left-0 top-0 rounded-md flex justify-center items-center">
                    <Spin size="small" />
                  </div>
                )}
              </Button>
            )}
            </div>
            {/* <h6 className='text-xs md:text-md leading-3'>@{user?.userDetails?.userName}</h6> */}
            <section className="px-2 md:px-16">
              {user?.userDetails?.about && (
                <div className="ql-editor">
                  <div dangerouslySetInnerHTML={{ __html: user?.userDetails?.about}} />
                </div>
              )}
            </section>
          </div>
        </div>
        <UserEngagement user={user} follower={follower} />
      </div>

      {openCoverModal && (
        <CoverModal
          openCoverModal={openCoverModal}
          setOpenCoverModal={setOpenCoverModal}
          selectedCoverImage={selectedCoverImage}
          setSelectedCoverImage={setSelectedCoverImage}
          handleImageUploadChange={handleImageUploadChange}
          handleUnSplashUploadChange={handleUnSplashUploadChange}
          handleGalleryUploadChange={handleGalleryUploadChange}
          loadingCoverImg={loadingCoverImg}
          handleCoverModalSubmit={handleCoverModalSubmit}
          collectionCoverImage={profileCoverImage}
          handleDeleteCoverS3Link={handleDeleteCoverS3Link}
          selectedCoverUnSplash={selectedCoverUnSplash}
          setSelectedCoverUnSplash={setSelectedCoverUnSplash}
          selectedCoverGallery={selectedCoverGallery}
          setSelectedCoverGallery={setSelectedCoverGallery}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
