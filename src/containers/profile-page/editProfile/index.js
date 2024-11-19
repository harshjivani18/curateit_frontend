
"use client"

import { useState, useEffect } from 'react'
import { Button, Modal, Spin, message, Collapse } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux'
import SEOModal from '@components/modal/SEOModal'
// import PublicLayout from '../../components/layout/PublicLayout'
import { deleteAccount, getUserDetails, updateUser } from '@actions/user'
import session from '@utils/session';
import { clearCollectionState, deleteAllCollections, resetSharedCollections } from '@actions/collection';
import EditProfileComponent from '@components/profileSetting/EditProfileComponent';
import DisplaySetting from '@components/displaySettings/DisplaySettings';
import DataShortcuts from '@components/dataShortcuts/DataShortcuts';
import OtherSetting from '@components/otherSetting/OtherSetting';
import { deleteAllGems } from '@actions/gems';
import { clearAllTags } from '@actions/tags';
import { disableMsg } from '@actions/membership';
import { sidebarMenuClicked, resetPageTitle } from '@actions/app';
import { TextMessage } from '@utils/constants'

const { Panel } = Collapse

const EditProfile = () => {
    const searchParams  = useSearchParams()
    const userId = searchParams.get('userId')
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state?.users?.userData);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [modelMessage, setModalMessage] = useState("")
    const [deleteType, setDeleteType] = useState("")
    
    
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

    const onSEOUpdate = async (data) => {
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
        // const seoRes = await dispatch(updateUser({ seo: data, coverPhoto: { ...user?.coverPhoto, altInfo: data?.seo?.altInfo } }));
        if (seoRes?.payload?.data?.status === 200) {
          message.success("Profile SEO updated successfully");
        }
    }

    const handleDeleteAccount = () => {
        setDeleteType("account")
        setModalMessage("Are you sure you want to delete your account?")
        setShowModal(true)
    }

    const handleDeleteCollections = () => {
        setDeleteType("collections")
        setModalMessage("Are you sure you want to delete all collections?")
        setShowModal(true)
    }

    const handleDeleteGems = () => {
        setDeleteType("gems")
        setModalMessage("Are you sure you want to delete all gems?")
        setShowModal(true)
    }

    const onDeleteModal = () => {
        if (deleteType === "account") {
            deleteUerAccount();
            onCloseModal();
        } else if (deleteType === "gems") {
            deleteAllGemsRequest();
            onCloseModal();
        } else if (deleteType === "collections") {
            deleteAllCollectionsRequest()
            onCloseModal();
        } else {
            onCloseModal();
        }
    }

    const onCloseModal = () => {
        setDeleteType("")
        setModalMessage("")
        setShowModal(false)
    }

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

    const deleteUerAccount = () => {
        setLoading(true)
        dispatch(deleteAccount()).then((res) => {
            if (res?.payload?.status === 200) {
                setLoading(false)
                logout()
            } else {
                setLoading(false);
                message.error("An error occurred while deleting. Please try again!")
                router.push("/search-bookmark")
            }
        })
    }

    const deleteAllGemsRequest = () => {
        setLoading(true)
        dispatch(deleteAllGems()).then(res => {
            if (res?.payload?.status === 200) {
                setLoading(false)
                router.push('/');
            } else {
                setLoading(false)
                message.error(
                    "An error occurred while deleting. Please try again!"
                )
                router.push("/")
            }
        })
    }

    const deleteAllCollectionsRequest = () => {
        setLoading(true)
        dispatch(deleteAllCollections()).then(res => {
            if (res?.payload?.status === 200) {
                setLoading(false)
                router.push('/');
            } else {
                setLoading(false)
                message.error(
                    "An error occurred while deleting your. Please try again!"
                )
                router.push("/")
            }
        })
    }

    const goBack = () => {
        router.push(`/u/${session.username}`)
    }

    const renderSEOPanel = () => {
        return (
            <Collapse
                bordered={true}
                expandIcon={(status) => {
                return (
                    <div>
                    {status.isActive ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                    </div>
                )
                }}
                expandIconPosition="end"
            >
                <Panel
                header={
                    <div className='pl-2'>
                    <h2 className="font-bold text-gray-600">Profile SEO</h2>
                    </div>
                }
                key="1"
                >

                    <SEOModal 
                            onSubmit={onSEOUpdate} 
                            seoObj={user?.seo || null}
                            typeId={session.userId}
                            type="user"
                            showAltInfo={user?.coverPhoto?.type === "upload" || user?.coverPhoto?.type === "unsplash"}
                            altInfo={user?.coverPhoto?.altInfo || (user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.username)}
                            defaultImg={user?.profilePhoto || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`} />
                </Panel>
            </Collapse>
        )
    }

    return (
        <>
         {/* <PublicLayout> */}
            {loading ?
                <div className="spinDiv">
                    <Spin size='middle' tip='Loading...' />
                </div> :
                (<section className='px-2 md:px-16 lg:px-80 flex flex-col gap-4 py-8'>
                    <div className='flex justify-start items-center  gap-2'>
                        <ArrowLeftIcon className='h-5 w-5 cursor-pointer' onClick={goBack} />
                        <h2 className='text-2xl font-bold'>Settings</h2>
                    </div>
                    <EditProfileComponent user={user} setLoading={setLoading} />
                    {/* <AccountType /> */}
                    <DisplaySetting />
                    <DataShortcuts
                        deleteCollections={handleDeleteCollections}
                        deleteGems={handleDeleteGems}
                    />
                    {renderSEOPanel()}
                    <OtherSetting handleDeleteAccount={handleDeleteAccount} />
                </section>
                )}

            <Modal
                title="Confirm"
                open={showModal}
                // icon: <ExclamationCircleOutlined />
                onOk={onDeleteModal}
                onCancel={onCloseModal}
                okText="Yes"
                cancelText="No"
                okButtonProps={<Button type="primary"></Button>}
            >
                <p>{modelMessage}</p>
            </Modal>
        {/*  </PublicLayout> */}
        </>
    )
}

export default EditProfile;