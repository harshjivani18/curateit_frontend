"use client"
import { Layout, Spin, message } from "antd";
import Sidebar from "@components/profile-edit-components/Sidebar";
import HeaderComponent from "@components/profile-edit-components/Header";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetPageTitle, sidebarMenuClicked } from "@actions/app";
import { TextMessage } from "@utils/constants";
import session from "@utils/session";
import { clearCollectionState, resetSharedCollections } from "@actions/collection";
import { clearAllTags } from "@actions/tags";
import { disableMsg } from "@actions/membership";
import { deleteAccount, getUserDetails, updateUser } from "@actions/user";
import SocialComponent from "@components/profile-edit-components/SocialComponent";
import DisplaySettingComponent from "@components/profile-edit-components/DisplaySettingComponent";
import DataComponent from "@components/profile-edit-components/DataComponent";
import DeleteModal from "@components/modal/DeleteModal";
import ProfileComponent from "@components/profile-edit-components/ProfileComponent";
import { ChevronLeftIcon,CheckBadgeIcon, ShieldCheckIcon, TrashIcon, UserCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { FiLayout } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import OptionComponent from "@components/profile-edit-components/OptionComponent";
import SEOModal from "@components/modal/SEOModal";
import AiProfile from "@components/ai-profile/AiProfile";
import { MdGroups } from "react-icons/md";
// import GroupComponent from "@components/profile-edit-components/group";
import DownloadExtension from "@components/common/FloatingLogos/DownloadExtension";
import TeamsComponent from "@components/profile-edit-components/Teams";
import ExceedLimitModal from "@components/modal/ExceedLimitModal";
// import { BiDollar } from "react-icons/bi";
import UserPricingComponent from "@components/profile-edit-components/UserPricingComponent";
import { FaRegCreditCard } from "react-icons/fa6";
import { getIsPlanOwner } from "@actions/plan-service";
import TransactionFailedPopup from "@components/common/FloatingLogos/TransactionFailedPopup";
// import CookieConsent from "@components/cookie/CookieConsent";
import { PiDownloadSimple } from "react-icons/pi";
import DownloadComponent from "@components/profile-edit-components/DownloadComponent";
import { FaRobot } from "react-icons/fa";
import AISettingPage from "../ai-setting-page";
// import { FaShoppingCart } from "react-icons/fa";
// import EditProfilePicture from "@components/ai-profile/EditProfilePicture";


const { Content } = Layout;

const EditProfile = ({}) => {
    const searchParams  = useSearchParams()
    const userId = searchParams.get('userId')
    const billing = searchParams.get('billing')
    const download = searchParams.get('download')
    const dispatch = useDispatch()
    const router = useRouter()
    const { showExceedModal } = useSelector(state => state.app)

    const user = useSelector((state) => state?.users?.userData);
    const [loading, setLoading] = useState(false);
    const [currentSidebar,setCurrentSidebar] = useState(billing ? "Billing" : download ? 'Download' : 'Profile')

    const [openModal,setOpenModal] = useState(false)
    const [modalType,setModalType] = useState(null)
    const [loadingModal,setLoadingModal] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [mobileCurrentSidebar,setMobileCurrentSidebar] = useState(billing ? "Billing" : download ? 'Download' : '')
    const [loadingSEO,setLoadingSEO] = useState(false)
    const [isExtensionExists, setIsExtensionExists] = useState(false)

    const { isPlanOwner } = useSelector(state => state.planService)

    useEffect(() => {
        if (isPlanOwner === -1) {
            dispatch(getIsPlanOwner())
        }
    }, [isPlanOwner])

    useEffect(() => {
      if(mobileCurrentSidebar === 'SEO'){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },[mobileCurrentSidebar])
    

    useEffect(() => {
        function onDOMLoaded() {
            const element = document.getElementById("curateit-extension-installed")
            setIsExtensionExists(element !== null)
        }
        onDOMLoaded()
        if (typeof window === 'undefined') return;
        function handleResize() {
            if (window.innerWidth <= 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if(userId && (userId !== session.userId)){
        message.error(TextMessage.LOGIN_TEXT)
        session.clear();
        dispatch(sidebarMenuClicked("all"))
        dispatch(clearCollectionState());
        dispatch(clearAllTags());
        dispatch(disableMsg())
        dispatch(resetSharedCollections())
        router.push('/');
      }
    },[userId,router,dispatch])

    const getUserData = async () => {
        setLoading(true)
        dispatch(getUserDetails()).then(res => {
            if (res?.payload?.status === 200) {
                setLoading(false);
            } else {
                getUserData()
            }
        })
    }

    useEffect(() => {
        if (!user || (Array.isArray(user) && user.length === 0)) {
            getUserData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        session.clear();
        dispatch(sidebarMenuClicked("all"))
        dispatch(clearCollectionState());
        dispatch(clearAllTags());
        dispatch(disableMsg())
        dispatch(resetSharedCollections())
        dispatch(resetPageTitle())
        router.push("/");
    }

    const handleCancel = () => {
        setOpenModal(false)
        setModalType(null)
    }

    const handleOpenDeleteModal = () => {
        setOpenModal(true)
        setModalType('account')
    }

    const handleDeleteAccount = () => {
        setLoadingModal(true)
        dispatch(deleteAccount()).then((res) => {
            if (res?.payload?.status === 200) {
                setLoadingModal(false)
                logout()
            } else {
                setLoadingModal(false);
                message.error("An error occurred while deleting. Please try again!")
                router.push("/")
            }
        })
    }

    const handleGoBack = () => {
        router.push(`/u/${session.username}`)
    }

    const handleGoBackOptions = () => {
        setMobileCurrentSidebar('')
    }

    const onSEOUpdate = async (data) => {
        setLoadingSEO(true)
        let obj = {
            seo: data
        }
        if (user?.coverPhoto?.type === "upload" || user?.coverPhoto?.type === "unsplash") {
            obj = {
                ...obj,
                coverPhoto: { ...user.coverPhoto, altInfo: data?.seo?.altInfo }
            }
        }
        const seoRes = await dispatch(updateUser(obj));
        if (seoRes?.payload?.status === 200) {
          message.success(`Profile ${TextMessage.SEO_UPDATE}`);
          setLoadingSEO(false)
        }else{
            setLoadingSEO(false)
        }
    }

    const options = [
      {
        title: "Profile",
        icon: <UserCircleIcon className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "Socials",
        icon: <CheckBadgeIcon className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "Profile Picture",
        icon: <PhotoIcon className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "Groups",
        icon: <MdGroups className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "Display Settings",
        icon: <FiLayout className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "SEO",
        icon: (
          <HiOutlineLightningBolt className="h-5 w-5 cursor-pointer mr-4" />
        ),
      },
      {
        title: "Data",
        icon: <ShieldCheckIcon className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "Download",
        icon: <PiDownloadSimple className="h-5 w-5 cursor-pointer mr-4" />,
      },
      {
        title: "AI Settings",
        icon: <FaRobot className="h-5 w-5 cursor-pointer mr-4" />,
      }
      // {
      // title: 'Delete Account',
      // icon: <TrashIcon className="h-5 w-5 cursor-pointer mr-4 text-[#E23434]"/>,
      // },
    ];

    if (isPlanOwner === true) {
        options.splice(5, 0, {
            title: 'Billing',
            icon: <FaRegCreditCard className="h-5 w-5 cursor-pointer mr-4"/>,
        })
    }

    if(loading){
        return(
        <div className="spinDiv">
            <Spin size='middle' tip='Loading...' />
         </div>
        )
    }
    
    return (
      <>
        {isMobile ? (
          <>
            <div className="pt-4">
              {mobileCurrentSidebar === "" && (
                <>
                  {/* header */}
                  <div className="w-full flex items-center justify-between px-4">
                    <ChevronLeftIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={handleGoBack}
                    />

                    <div className="font-semibold text-lg">Settings</div>

                    <img
                      className="h-5 w-5"
                      src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/log-out.svg`}
                      alt="logout icon"
                      onClick={logout}
                    />
                  </div>

                  <hr className="h-[1px] border-[#E4E7EC] w-full mt-4" />

                  <div className="px-4">
                    {options?.map((item, i) => {
                      return (
                        <div key={i}>
                          <OptionComponent
                            item={item}
                            mobileCurrentSidebar={mobileCurrentSidebar}
                            setMobileCurrentSidebar={setMobileCurrentSidebar}
                            // handleOpenDeleteModal={handleOpenDeleteModal}
                            isMobile={isMobile}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* profile */}
              {mobileCurrentSidebar === "Profile" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <ProfileComponent user={user} isMobile={isMobile} />
                </>
              )}

              {/* AiProfile */}
              {mobileCurrentSidebar === "Profile Picture" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <AiProfile user={user} isMobile={isMobile} />
                </>
              )}

              {/* socials */}
              {mobileCurrentSidebar === "Socials" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <SocialComponent user={user} isMobile={isMobile} />
                </>
              )}

              {mobileCurrentSidebar === "AI Settings" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <AISettingPage user={user} isMobile={isMobile} />
                </>
              )}

              {/* display */}
              {mobileCurrentSidebar === "Display Settings" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <DisplaySettingComponent user={user} isMobile={isMobile} />
                </>
              )}

              {/* seo */}
              {mobileCurrentSidebar === "SEO" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <div>
                    <SEOModal
                      onSubmit={onSEOUpdate}
                      seoObj={user?.seo || null}
                      defaultImg={
                        user?.profilePhoto ||
                        `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`
                      }
                      isMobile={isMobile}
                      renderingPlace="profile"
                      loading={loadingSEO}
                      typeId={session.userId}
                      showAltInfo={
                        user?.coverPhoto?.type === "upload" ||
                        user?.coverPhoto?.type === "unsplash"
                      }
                      altInfo={
                        user?.coverPhoto?.altInfo ||
                        (user.firstname && user.lastname
                          ? `${user.firstname} ${user.lastname}`
                          : user.username)
                      }
                      type="user"
                    />
                  </div>
                </>
              )}

              {/* group */}
              {mobileCurrentSidebar === "Groups" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <TeamsComponent user={user} isMobile={isMobile} />
                </>
              )}

              {/* data */}
              {mobileCurrentSidebar === "Data" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <DataComponent
                    user={user}
                    isMobile={isMobile}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                  />
                </>
              )}
              {/* pricing page */}
              {mobileCurrentSidebar === "Billing" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <UserPricingComponent user={user} isMobile={isMobile} />
                </>
              )}

              {mobileCurrentSidebar === "Download" && (
                <>
                  <HeaderComponent
                    isMobile={isMobile}
                    mobileCurrentSidebar={mobileCurrentSidebar}
                    handleGoBackOptions={handleGoBackOptions}
                  />
                  <div className="p-3">
                    <DownloadComponent user={user} isMobile={isMobile} />
                  </div>
                </>
              )}
            </div>

            {openModal && (
              <DeleteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalType={modalType}
                setModalType={setModalType}
                loading={loadingModal}
                handleCancel={handleCancel}
                handleDeleteAccount={handleDeleteAccount}
              />
            )}
            {showExceedModal && <ExceedLimitModal />}
          </>
        ) : (
          <>
            <div className="px-16">
              <Layout style={{ minHeight: "100vh" }} className="ct-pure-white">
                <HeaderComponent handleGoBack={handleGoBack} />
                <Layout className="ct-pure-white">
                  <Sidebar
                    currentSidebar={currentSidebar}
                    setCurrentSidebar={setCurrentSidebar}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                    options={options}
                    logout={logout}
                  />
                  <Layout className="ct-pure-white">
                    <Content
                      style={{
                        // background:'white',
                        backgroundColor: "rgba(255,255,255,.8)",
                        padding: "16px",
                        paddingLeft: "216px",
                        paddingTop: "81px",
                      }}
                    >
                      {/* profile */}
                      {currentSidebar === "Profile" && (
                        <ProfileComponent user={user} />
                      )}

                      {/* AiProfile */}
                      {
                        currentSidebar === "Profile Picture" && (
                          <AiProfile user={user} />
                        )

                        // <EditProfilePicture user={user}/>
                      }

                      {/* socials */}
                      {currentSidebar === "Socials" && (
                        <SocialComponent user={user} />
                      )}

                      {/* group */}
                      {/* {
                        currentSidebar === 'Groups' && 
                        <GroupComponent
                        user={user}
                        />
                        } */}
                      {currentSidebar === "Groups" && (
                        <TeamsComponent user={user} />
                      )}

                      {/* display */}
                      {currentSidebar === "Display Settings" && (
                        <DisplaySettingComponent user={user} />
                      )}
                      {/* AI Settings */}
                      {currentSidebar === "AI Settings" && (
                        <AISettingPage user={user} isMobile={isMobile} />
                      )}
                      {/* pricing page */}
                      {currentSidebar === "Billing" && (
                        <UserPricingComponent user={user} />
                      )}

                      {/* seo */}
                      {currentSidebar === "SEO" && (
                        <SEOModal
                          onSubmit={onSEOUpdate}
                          seoObj={user?.seo || null}
                          defaultImg={
                            user?.profilePhoto ||
                            `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`
                          }
                          renderingPlace="profile"
                          loading={loadingSEO}
                          typeId={session.userId}
                          showAltInfo={
                            user?.coverPhoto?.type === "upload" ||
                            user?.coverPhoto?.type === "unsplash"
                          }
                          altInfo={
                            user?.coverPhoto?.altInfo ||
                            (user.firstname && user.lastname
                              ? `${user.firstname} ${user.lastname}`
                              : user.username)
                          }
                          type="user"
                        />
                      )}

                      {/* data */}
                      {currentSidebar === "Data" && (
                        <DataComponent
                          user={user}
                          handleOpenDeleteModal={handleOpenDeleteModal}
                        />
                      )}

                      {currentSidebar === "Download" && (
                        <DownloadComponent user={user} />
                      )}
                    </Content>
                  </Layout>
                  {!isExtensionExists && !isMobile && (
                    <div className="fixed z-50 right-4 bottom-4">
                      <DownloadExtension />
                    </div>
                  )}
                  <TransactionFailedPopup />
                </Layout>
              </Layout>
              {showExceedModal && <ExceedLimitModal />}
              {openModal && (
                <DeleteModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  modalType={modalType}
                  setModalType={setModalType}
                  loading={loadingModal}
                  handleCancel={handleCancel}
                  handleDeleteAccount={handleDeleteAccount}
                />
              )}
              {/* <CookieConsent /> */}
            </div>
          </>
        )}
      </>
    );
}

export default EditProfile;