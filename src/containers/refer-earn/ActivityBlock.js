'use client'

import Progress from "@components/Progress/Progress";
import { useState } from 'react'
import { PiClub, PiRocketLaunch, PiMaskHappy, PiTarget, PiStar, PiChatCenteredText, PiStarFour, PiChecks, PiNewspaper, PiFrameCorners, PiFilmStrip, PiImage, PiLinkedinLogo, PiInfo, PiGift, PiPuzzlePiece, PiBrowsers, PiVideo, PiImages, PiTerminalWindow, PiNote, PiShapes, PiSelectionAll, PiGlobeSimple, PiSidebar, PiVinylRecord, PiConfetti, PiCrownSimple, PiSketchLogo, PiFolders, PiHandshake, PiCheckCircleFill, PiCaretRight } from 'react-icons/pi'
import InstallDialogDesktop from './InstallDialogDesktop'
import { Col, Row } from 'antd'


const ActivityBlock = ({
    category,
    img,
    title,
    subTitle,
    blob,
    progress,
    progressText,
    icon,
    iconType,
    colours,
    key
}) => {

    const [installDialog, setInstallDialog] = useState(false)

    const images = {
        PiMaskHappy: PiMaskHappy,
        PiTarget: PiTarget,
        PiClub: PiClub,
        PiRocketLaunch: PiRocketLaunch,
        PiStar: PiStar,
        PiChatCenteredText: PiChatCenteredText,
        PiStarFour: PiStarFour,
        PiChecks: PiChecks,
        PiNewspaper: PiNewspaper,
        PiFrameCorners: PiFrameCorners,
        PiFilmStrip: PiFilmStrip,
        PiImage: PiImage,
        PiLinkedinLogo: PiLinkedinLogo,
        PiGift: PiGift,
        PiPuzzlePiece: PiPuzzlePiece,
        PiBrowsers: PiBrowsers,
        PiVideo: PiVideo,
        PiImages: PiImages,
        PiTerminalWindow: PiTerminalWindow,
        PiNote: PiNote,
        PiShapes: PiShapes,
        PiSelectionAll: PiSelectionAll,
        PiGlobeSimple: PiGlobeSimple,
        PiSidebar: PiSidebar,
        PiVinylRecord: PiVinylRecord,
        PiConfetti: PiConfetti,
        PiCrownSimple: PiCrownSimple,
        PiSketchLogo: PiSketchLogo,
        PiFolders: PiFolders,
        PiHandshake: PiHandshake
    }

    const ImageComponent = images[img]

    const primary = category + '-primary'


    return (
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
            xl={{ span: 8 }}
            xxl={{ span: 8 }}
            key={key}
        >
            <div
                className={`flex group h-full w-full ${(progressText?.toLocaleLowerCase().includes('disabled') ? '' : 'cursor-pointer')}`}
                onClick={() => setInstallDialog(!installDialog)}
            >
                <div className={`border-[0.4px] border-[#ABB7C9] rounded-xl group-hover:drop-shadow-md flex grow flex-row items-stretch p-2 md:p-4 xl:p-5 gap-2 md:gap-0 ${(progressText?.toLocaleLowerCase().includes('disabled')) ? 'bg-Disabled' : (progressText?.toLocaleLowerCase().includes('claimed')) ? `bg-Claimed` : 'bg-white'}`}>
                    <div id='icon-section' className='hidden md:flex flex-row items-center '>
                        <div className={`hidden md:flex p-1 lg:p-2 xl:p-3 rounded-full border-[4px] flex-row my-auto items-center justify-center ${(progressText?.toLocaleLowerCase().includes('claimed')) ? `border-Claimed bg-Claimed` : (progressText?.toLocaleLowerCase().includes('disabled')) ? `border-Disabled bg-white` : `border-${category} bg-${category}`}`}>
                            <ImageComponent className={`text-3xl xl:text-4xl ${(progressText?.toLocaleLowerCase().includes('claimed')) ? `text-Claimed` : (progressText?.toLocaleLowerCase().includes('disabled')) ? `text-Disabled` : `text-${category}`}`} loading='lazy'/>
                        </div>
                    </div>

                    <div id='text-section' className={`md:px-4 flex flex-col justify-center grow `}>
                        <div className='flex flex-row items-start justify-start gap-2'>
                            <p className={`text-base md:text-base xl:text-xl font-semibold leading-7 ${(progressText?.toLocaleLowerCase().includes('claimed')) ? `text-Claimed` : (progressText?.toLocaleLowerCase().includes('disabled')) ? `text-Disabled` : `text-primary-blue`}`}>{title}</p>
                            <div className={`py-[5px] px-4 rounded-[59px] hidden md:block group-hover:opacity-0  ${(progressText?.toLocaleLowerCase().includes('disabled')) ? `bg-[#DFE4EC]` : `bg-${category}`}`}>
                                <p className={`text-sm font-medium ${(progressText?.toLocaleLowerCase().includes('disabled')) ? `text-Disabled` : `text-${category}`}`}>{blob}</p>
                            </div>
                        </div>

                        <p className='text-xs md:text-sm text-[#74778B] mt-1'>{subTitle}</p>

                        <div className='flex flex-row items-center justify-start gap-2 mt-1'>
                            {
                                !progressText?.toLocaleLowerCase().includes('disabled') &&
                                <>
                                    <div className='hidden xl:block'>
                                        <Progress
                                            completed={progress}
                                            colour={(progressText?.toLocaleLowerCase().includes('claimed')) ? '#3DAC74' : '#347AE2'}
                                            height='5px'
                                            width='130px'
                                        />
                                    </div>
                                    <div className='hidden md:block xl:hidden'>
                                        <Progress
                                            completed={progress}
                                            colour={(progressText?.toLocaleLowerCase().includes('claimed')) ? '#3DAC74' : '#347AE2'}
                                            height='5px'
                                            width='100px'
                                        />
                                    </div>
                                    <div className='block md:hidden'>
                                        <Progress
                                            completed={progress}
                                            colour={(progressText?.toLocaleLowerCase().includes('claimed')) ? '#3DAC74' : '#347AE2'}
                                            height='5px'
                                            width='160px'
                                        />
                                    </div>
                                </>
                            }
                            {
                                progressText?.toLocaleLowerCase().includes('disabled')
                                    ?
                                    <p className='text-sm text-[#74778B] bg-white py-2 px-3 rounded-[59px]'>Unlocks in premium</p>
                                    :
                                    <p className={`text-xs leading-[14.52px] ${(progressText?.toLocaleLowerCase().includes('claimed')) ? `text-Claimed` : 'text-grey-text'}`}>
                                        {progressText}
                                    </p>
                            }
                        </div>
                    </div>

                    <button>
                        <PiInfo className={`text-[20px] md:text-[32px] block lg:hidden  ${(progressText?.toLocaleLowerCase().includes('claimed')) ? `text-Claimed` : `text-primary-blue lg:icon-${category}`}`} />
                    </button>

                    {
                        (progressText?.toLocaleLowerCase().includes('claimed')) &&
                        <div className='flex lg:hidden flex-row items-center w-max-[15%] w-min-[10px] ml-5'>
                            <PiCheckCircleFill className='text-[40px] text-Claimed' />
                        </div>
                    }

                    <button className={`block ml-5 lg:hidden py-1 px-3 text-xs h-max rounded-[59px] my-auto ${(progressText?.toLocaleLowerCase().includes('completed')) ? 'bg-primary-blue text-white' : (!progressText?.toLocaleLowerCase().includes('claimed')) ? 'text-[#74778B] bg-[#DFE4EC] ' : 'text-white bg-primary-blue hidden'}`}>
                        claim
                    </button>

                    <button
                        id='icon-section'
                        className='hidden lg:flex outline-0 grow flex-row items-start justify-center '
                    >
                        {
                            (!progressText?.toLocaleLowerCase().includes('disabled') && !progressText?.toLocaleLowerCase().includes('disabled')) &&
                            <PiInfo className={`text-[20px] md:text-[32px] opacity-0 group-hover:opacity-100  ${(progressText?.toLocaleLowerCase().includes('claimed')) ? `text-Claimed` : `icon-${category}`}`} />
                        }
                    </button>
                </div>
            </div>
            <InstallDialogDesktop
                open={installDialog}
                setIsOpen={setInstallDialog}
                claimed={false}
            />
        </Col>
    )

}

export default ActivityBlock