"use client";
import { useEffect, useState }        from "react";
import { useDispatch }                from "react-redux";
import { Disclosure }                 from "@headlessui/react";
import { PuzzlePieceIcon }            from "@heroicons/react/20/solid";
import { BiSolidPin }                 from "react-icons/bi";
import ReactPlayer                    from "react-player";

import { getSuperAdminConfiguration } from "@actions/app";

const DEFAULT_CONFIG = {
    ext_video_url: null,
    ext_embed_video: null
}
const ExtensionOnboarding = () => {
    const dispatch              = useDispatch();
    const [config, setConfig]   = useState(DEFAULT_CONFIG);

    useEffect(() => {
        dispatch(getSuperAdminConfiguration()).then((response) => {
            if (response.error === undefined && response.payload?.data?.data?.length > 0) {
                const dbConfig = response.payload.data.data[0]?.attributes
                if (dbConfig) {
                    setConfig({
                        ext_video_url: dbConfig.extension_onboarding_video_url,
                        ext_embed_video: dbConfig.extension_onboarding_embed_video
                    })
                }
            }
        });
    }, [dispatch])

    return (
        <div>
            <Disclosure as={"header"}>
                <div className="px-5 lg:px-10 bg-white rounded-[2rem] flex justify-between items-center h-[fit-content]">
                    <div>
                        <a href="/">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo.png`}
                            alt="curateit logo"
                            className="h-[1.5rem] md:h-[2rem]"
                        />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex flex-col bg-[#FBE39D] h-auto p-3 max-width-[fit-content]">
                            <h6 className="font-bold mb-2">3 Steps to complete</h6>
                            <ol className="font-medium">
                                <li className="flex">1. Click <PuzzlePieceIcon className="w-5 h-5 mr-1 ml-1 mb-2" /> Chrome Extension.</li>
                                <li className="flex">2. Find <img className="w-5 h-5 mr-1 ml-1 mb-2" alt="curateit" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} /> Curateit.</li>
                                <li className="flex">3. Click <BiSolidPin className="w-5 h-5 mr-1 ml-1" /> to pin extension.</li>
                            </ol>
                        </div>
                        <div>
                            <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curved-arrow1.webp`} alt="curved arrow" className="w-[3rem] h-[3rem] ml-5" />
                        </div>
                    </div>
                </div>
            </Disclosure>
            <div className="px-5 lg:px-10 flex justify-center items-center flex-col">
                <h6 className="font-bold">Please spend 2 mins to watch this video to 10x your productivity</h6>
                <div className="border-1 border-color-[#E5E5E5] w-full mt-2 flex justify-center">
                    {config.ext_video_url && 
                        <ReactPlayer url={config.ext_video_url} controls={true} width={700} height={500} />
                    }
                    {config.ext_embed_video && 
                        <div className="w-[700px] h-[500px]">
                            <div dangerouslySetInnerHTML={{__html: config.ext_embed_video}} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExtensionOnboarding;