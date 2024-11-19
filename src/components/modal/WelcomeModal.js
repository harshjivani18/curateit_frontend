"use client"
import "./WelcomeModal.css"
import Script                               from 'next/script'
import React, { useEffect,
       useState }                           from 'react'
import { Button, Modal }                    from 'antd'
import { useDispatch, useSelector }         from "react-redux"
import { useRouter }                        from 'next/navigation'
import { PuzzlePieceIcon }                  from '@heroicons/react/24/outline'
import ReactPlayer                          from 'react-player'

import session                              from "@utils/session"
import { setWelcomeModalStatus,
         getSuperAdminConfiguration,
         enableTourSteps,
         fromWelcomeModal}        from "@actions/app"
// import { getFollowByMeCollection }          from "@actions/collection"

const { NEXT_PUBLIC_STATIC_IMAGES_CDN } = process.env
const DEFAULT_CONFIG = {
    video_url: `${NEXT_PUBLIC_STATIC_IMAGES_CDN}/images/Curateit+-+Curate%2C+Save%2C+Search+gems+of+web%2C+10x+your+productivity+-+14+August+2023.mp4`,
    thumbnail_url: `${NEXT_PUBLIC_STATIC_IMAGES_CDN}/images/image+(24).png`,
    extension_url: "https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk",
    embed_code: null
}

const WelcomeModal = () => {
    const {showWelcomeModal,
           welcomeModalContext }    = useSelector( state => state.app)
    const dispatch                  = useDispatch()
    const navigate                  = useRouter()
    const [config,
           setConfig]               = useState(DEFAULT_CONFIG)

    useEffect(() => {
        dispatch(getSuperAdminConfiguration()).then((response) => {
            if (response.error === undefined && response.payload?.data?.data?.length > 0) {
                const config = response.payload.data.data[0]?.attributes
                if (config) {
                    setConfig({
                        video_url: config.tutorial_video_url,
                        thumbnail_url: config.tutorial_video_thumbnail,
                        extension_url: config.extension_url,
                        embed_code: config.tutorial_video_embed_code
                    })
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onHideModal = () => {
        if (welcomeModalContext === "") {
            navigate.push(`/u/${session.username}`)
        }
        dispatch(setWelcomeModalStatus(false, ""))
        dispatch(enableTourSteps(true))
        dispatch(fromWelcomeModal(true))
    }

    const onDownloadExtension = () => {
        window.open(config.extension_url, "_blank")
    }

    const onSubmit = () => {
        window.open(config.extension_url, "_blank")
        dispatch(setWelcomeModalStatus(false, ""))
        dispatch(enableTourSteps(true))
        dispatch(fromWelcomeModal(true))
        // dispatch(getFollowByMeCollection()).then((res) => {
        //     if (res?.payload?.data?.data) {
        //         const followedCollections = res?.payload?.data?.data
        //         const followCollectionIdx = followedCollections?.findIndex((c) => { return c.name === "Curateit" })
        //         if (followCollectionIdx !== -1) {
        //             const followCollection = followedCollections[followCollectionIdx]
        //             navigate.push(`/u/${followCollection?.author?.username}/c/${followCollection?.id}/${followCollection?.slug}`)
        //         }
        //     }
        // })
    }

    const renderTutorialVideo = () => {
        return (
            <Modal open={showWelcomeModal}
               title={welcomeModalContext !== "" ? "Tutorial" : "Welcome to the app"}
               footer={null}
               onCancel={onHideModal}
               bodyStyle={{ padding: 0 }}
               className="welcome-modal-container"
               width={800}
               height={600}
               destroyOnClose>
                <div className="modal-ext-btn-container">
                    <Button className='modal-ext-btn' icon={<PuzzlePieceIcon className="h-5 w-5" />} onClick={onDownloadExtension}>
                        Download Extension
                    </Button>
                </div>
                {config.video_url 
                    ? <ReactPlayer url={config.video_url} />
                    : <div dangerouslySetInnerHTML={{ __html: config.embed_code }}></div>
                }
            </Modal>
        )
    }

    if (welcomeModalContext !== "") return renderTutorialVideo()

    return (
        <>
            <Script
                id="tally-js"
                src="https://tally.so/widgets/embed.js"
                onLoad={() => {
                    Tally.openPopup('wvAgb0', {
                        layout: 'modal', // Open as a centered modal
                        width: 800, // Set the width of the modal
                        emoji: {
                            text: "👋",
                            animation: 'wave'
                        },
                        hiddenFields: {
                            ref: 'email',
                            email: session.emailAddress
                        },
                        onSubmit: (payload) => {
                            onSubmit()
                            Tally.closePopup('wvAgb0');
                        },
                        onClose: () => {
                            dispatch(enableTourSteps(true))
                            dispatch(fromWelcomeModal(true))
                        }
                    });
                }}
            />
        </>
    )
}

export default WelcomeModal