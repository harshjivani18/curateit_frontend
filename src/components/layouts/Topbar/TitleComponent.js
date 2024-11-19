import "./TitleComponent.css";
import { 
  ArrowLeftIcon, 
  DocumentDuplicateIcon, 
  PencilSquareIcon, 
  ShareIcon, 
  // XMarkIcon 
}                             from "@heroicons/react/24/outline";

import { 
  Checkbox, 
  Dropdown, 
  Tooltip 
}                             from "antd";
import { Emoji, EmojiStyle }  from "emoji-picker-react";
import { 
  useParams, 
  usePathname, 
  // useRouter 
}                             from "next/navigation";
import { useState }           from "react";
// import { PiFolderSimpleUserBold } from "react-icons/pi";
// import * as ReactIcons        from "react-icons/ri";
import { 
  useDispatch, 
  // useSelector 
}                             from "react-redux";

import SocialShare            from "@components/socialShare/SocialShare";

import session                from "@utils/session";

import { openAuthModal }      from "@actions/app";

const TitleComponent = ({
  checkedBookmark,
  title,
  addEditIcon,
  avatarCoverData,
  handleEditCall,
  // permissions=null,
  // icon='',
  // coverImage='',
  // setOpenIcon=() => {},
  // handleCoverModal,
  page='',
  handleCopyCollection,
  copyLoading='',
  isMobile=false,
  type='',
  // isSubCollection='',
  showCopyCollectionIcon='',
  handleSelectSubCollection=()=>{},
  showBackArrow='',
  onFollowCollection=null, 
  following=false, 
  onUnfollowCollection=null, 
  isFollowedCollection=false, 
  isPrivateProfile=false, 
  isFollowerChildCollection=false,
  showFollowerCopy=true,
  showShare=false,
  collectionUrl='',
  // shortDescription=null
}) => {
  // const { subCollectionsPageDetails } = useSelector(state => state.collections)
  const dispatch = useDispatch()
  // const navigate = useRouter();
  // const [open, setOpen] = useState(false);

  const [openShare, setOpenShare] = useState(false);

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : null;
  // const tagId = searchParams[4];
  // const slug = searchParams[5];

    // const Icon =
    // avatarCoverData &&
    // avatarCoverData?.type === "icon" &&
    // ReactIcons[avatarCoverData?.icon];

    // const handleOpen = (flag) => {
    //     setOpen(flag);
    // };

    const handleOpenShare = (flag) => {
        setOpenShare(flag);
    };

  //   const handleClose = () => {
  //   setOpen(false);
  // };

  const onFollowClick = () => {
    if(session && session?.userId){
      following ? onUnfollowCollection && onUnfollowCollection() : onFollowCollection && onFollowCollection()
    }else{
      dispatch(openAuthModal({
            open: true,
            action : 'login',
            extraInfo: {
              trigger: 'follow',
              username: uname,
              id: sourceId,
              module: module,
              slug: slug
          }

        }))
    }
  }

    // const dropdownnRenderUI = () => {
    //    return(
    //     <div className='bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px] relative'>
    //         <div className="absolute top-[5px] right-[5px] w-fit">
    //           <XMarkIcon
    //             className="h-4 w-4 text-[#344054] cursor-pointer"
    //             onClick={handleClose}
    //           />
    //         </div>

    //         <div onClick={() => {
    //           handleClose()
    //           handleEditCall()
    //         }} className='text-[#37352f80]'>
    //           {page === 'collection' ? 'Update Collection' : 'Update Tag'}
    //         </div>
    //         {
    //           (!permissions || (permissions && (permissions?.accessType === 'editor' || permissions?.accessType === 'owner'))) && 
    //             <>
    //             <div className='text-[#37352f80] my-2'
    //             onClick={() => {
    //               handleClose()
    //               setOpenIcon(true)
    //             }}
    //             >
    //               {icon ? 'Update Icon' : 'Add Icon'}
    //             </div>
    //             <div className='text-[#37352f80]'
    //             onClick={() => {
    //               handleClose()
    //               handleCoverModal()
    //             }}
    //             >
    //               {coverImage ? 'Update cover' : 'Add cover'}
    //             </div> 
    //             </>
    //         }
    //     </div>
    //    )
    // }

    const dropdownnRenderShareUI = () => {
    return (
      <div className="bg-white z-50 p-3 rounded-lg shadow-lg border-[0.5px]">
        <SocialShare
          collectionUrl={collectionUrl}
          setShowShare={setOpenShare}
        />
      </div>
    );
  };  

  if (page === "collection-public-shared") {
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
      <>
        {checkedBookmark?.length === 0 
          ? (<>
              {showBackArrow && <ArrowLeftIcon className="h-4 w-4 cursor-pointer" onClick={handleSelectSubCollection}/>}
              <div className="flex items-center">
                <div className="flex items-center">
                  {/* <div className="mr-1"> */}
                    
                  {/* </div> */}
                  <h1 className={`${page === "collection-public-shared" ? "z-[50]" : ""} ${(isMobile && title?.length > 30) ? '!text-sm mx-1' : ''} ct-collection-title mb-0 capitalize`}>
                  {avatarCoverData && avatarCoverData?.type === "image" && (
                      <img
                        className="rounded-lg"
                        src={avatarCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/800x800_contain`) || ""}
                        alt={"Curateit"}
                      />
                    )}
                    {avatarCoverData && avatarCoverData?.type === "emoji" && (
                      // <div className="flex items-center justify-center">
                        <Emoji
                          unified={avatarCoverData?.icon || ""}
                          emojiStyle={EmojiStyle.APPLE}
                          size={22}
                        />
                      // </div>
                    )}
                    {avatarCoverData && avatarCoverData?.type === "color" && (
                      // <div className="flex items-center justify-center">
                        <div
                          style={{
                            height: "3rem",
                            width: "3rem",
                            borderRadius: "50%",
                            background: avatarCoverData?.icon || "",
                          }}
                        ></div>
                      // </div>
                    )}
                    {/* {avatarCoverData && avatarCoverData?.type === "icon" && (
                      // <div className="flex items-center justify-center">
                        <Icon style={{ fontSize: "3rem" }} />
                      // </div>
                    )} */}
                    {title}
                  </h1>
                </div>
              </div>
              <div className={`flex mr-4 ${page === "collection-public-shared" ? "z-50" : ""}`}>
              {addEditIcon && !isMobile &&(
                <PencilSquareIcon
                  onClick={handleEditCall}
                  className="h-5 w-5 cursor-pointer"
                />
              )}
              {/* {(addEditIcon && isMobile) ?(
                <Dropdown
                overlayStyle={{ width: '160px' }}
                trigger={['click']}
                dropdownRender={() => (dropdownnRenderUI())}
                onOpenChange={handleOpen}
                open={open}
                placement="bottom"
              >
                <PencilSquareIcon className="h-5 w-5 cursor-pointer"/>
              </Dropdown> 
              ) : <div></div>} */}

              {showShare && !isFollowedCollection && !isMobile &&
              <Dropdown
                    overlayStyle={{ width: "250px" }}
                    trigger={["click"]}
                    dropdownRender={() => dropdownnRenderShareUI()}
                    onOpenChange={handleOpenShare}
                    open={openShare}
                    placement="bottom"
                  >
                    <ShareIcon className="h-5 w-5 ml-1 cursor-pointer" />
                  </Dropdown>
              }

              {
              ((isFollowedCollection && showFollowerCopy) || (page === 'collection-public-shared' && type === 'collection-public' && showCopyCollectionIcon)) && 
              <Tooltip title={`${copyLoading ? 'Copying...' : 'Copy collection'}`}>
                <DocumentDuplicateIcon className={`h-4 w-4 ${copyLoading ? 'text-gray-200 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                if(copyLoading){
                  return;
                }else{
                  handleCopyCollection()
                }
              }}
              />
              </Tooltip>
              }
              {
                  ((page === 'profile-bookmark' && showBackArrow && !isPrivateProfile) || (page === 'collection-public-shared' && type === 'collection-public') || (isFollowedCollection && !isFollowerChildCollection))
                  && 
                    <div
                      className={`ml-2 text-blue-500`}
                      style={{cursor: "pointer"}}
                      type="primary"
                      onClick={onFollowClick}
                    >
                      {following ? "Unfollow" : "Follow"}
                    </div>
                }
              </div>
          </>) 
          : (<Checkbox indeterminate={true}>{checkedBookmark.length}</Checkbox>)}
      </>
    )
  }
  const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return(
        <>
            {checkedBookmark?.length === 0 ? (
              <>
              {/* {
                (page === 'collection' || page === 'collection-public-shared') && subCollectionsPageDetails && subCollectionsPageDetails?.page && isSubCollection &&
                <ArrowLeftIcon className="h-4 w-4 cursor-pointer" onClick={() => navigate.back()}/>
                } */}
              {
              page === 'profile-bookmark' && showBackArrow && 
              <ArrowLeftIcon className="h-4 w-4 cursor-pointer" onClick={handleSelectSubCollection}/>
              }
                <div className="flex items-center">
                  <div>
                    {avatarCoverData && avatarCoverData?.type === "image" && (
                      <img
                        className="w-[24px] h-[24px] rounded-lg"
                        src={avatarCoverData?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/24x24_contain`) || ""}
                        alt={"Curateit"}
                      />
                    )}
                    {avatarCoverData && avatarCoverData?.type === "emoji" && (
                      <div className="flex items-center justify-center">
                        <Emoji
                          unified={avatarCoverData?.icon || ""}
                          emojiStyle={EmojiStyle.APPLE}
                          size={22}
                        />
                      </div>
                    )}
                    {avatarCoverData && avatarCoverData?.type === "color" && (
                      <div className="flex items-center justify-center">
                        <div
                          style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            background: avatarCoverData?.icon || "",
                          }}
                        ></div>
                      </div>
                    )}
                    {/* {avatarCoverData && avatarCoverData?.type === "icon" && (
                      <div className="flex items-center justify-center">
                        <Icon style={{ fontSize: "20px" }} />
                      </div>
                    )} */}
                  </div>
                    <h1 className={`${page === "collection-public-shared" ? "z-[50]" : ""} ${(isMobile && page === 'collection-public-shared' && title?.length > 30) ? '!text-sm mx-1' : (isMobile && page !== 'collection-public-shared') ? 'mx-1 break-words !text-base' : 'mx-2'} ${page !== 'collection-public-shared' ? 'w-fit' : ''} pageHeading block mb-0 capitalize`}>
                    {title}
                    </h1>
                </div>
                {addEditIcon && !isMobile &&(
                  <PencilSquareIcon
                    onClick={handleEditCall}
                    className="h-5 w-5 cursor-pointer"
                  />
                )}
                {/* {(addEditIcon && isMobile) ?(
                  <Dropdown
                  overlayStyle={{ width: '160px' }}
                  trigger={['click']}
                  dropdownRender={() => (dropdownnRenderUI())}
                  onOpenChange={handleOpen}
                  open={open}
                  placement="bottom"
                >
                  <PencilSquareIcon className="h-5 w-5 cursor-pointer"/>
                </Dropdown> 
                ) : <div></div>} */}

                {showShare && !isFollowedCollection && !isMobile &&
                <Dropdown
                      overlayStyle={{ width: "250px" }}
                      trigger={["click"]}
                      dropdownRender={() => dropdownnRenderShareUI()}
                      onOpenChange={handleOpenShare}
                      open={openShare}
                      placement="bottom"
                    >
                      <ShareIcon className="h-5 w-5 ml-1 cursor-pointer"/>
                    </Dropdown>
                }

                {
                ((isFollowedCollection && showFollowerCopy) || (page === 'collection-public-shared' && type === 'collection-public' && showCopyCollectionIcon)) && 
                <Tooltip title={`${copyLoading ? 'Copying...' : 'Copy collection'}`}>
                  <DocumentDuplicateIcon className={`h-4 w-4 ${copyLoading ? 'text-gray-200 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                  if(copyLoading){
                    return;
                  }else{
                    handleCopyCollection()
                  }
                }}
                />
                </Tooltip>
                }
                {
                    ((page === 'profile-bookmark' && showBackArrow && !isPrivateProfile) || (page === 'collection-public-shared' && type === 'collection-public') || (isFollowedCollection && !isFollowerChildCollection))
                    && 
                      <div
                        className={`ml-2 text-blue-500`}
                        style={{cursor: "pointer"}}
                        type="primary"
                        onClick={onFollowClick}
                      >
                        {following ? "Unfollow" : "Follow"}
                      </div>
                  }
              </>
            ) : (
              <Checkbox indeterminate={true}>{checkedBookmark.length}</Checkbox>
            )}
          </>
    )
}

export default TitleComponent;