"use client"

import React, { useEffect, useRef, 
    useState }                              from 'react'
import { CheckBadgeIcon, 
      ExclamationCircleIcon }               from '@heroicons/react/24/outline';
import { ColorRing }                        from 'react-loader-spinner';
import { useSearchParams }                  from 'next/navigation';
import { useDispatch }                      from 'react-redux';

import { getRaindropHighlights }            from '@utils/collections';
import session                              from '@utils/session';

import { getRaindropAccessToken,
      uploadRaindropHighlights }            from '@actions/raindrop';

const Raindrop = () => {
    const code                          = useSearchParams().get('code');
    const auth_token                    = session.token
    const unfiltered_collection         = session.unfiltered_collection_id;
    const dispatch                      = useDispatch();
    const shouldCallApi                 = useRef(true);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState(false);
    const [success, setSuccess]         = useState(false);
    const [currentStatus,
            setCurrentStatus]           = useState("Importing data from Raindrop....")

    useEffect(() =>{
        if(shouldCallApi.current){
            shouldCallApi.current = false;
            (async () => {
                setLoading(true);
                setCurrentStatus("Fetching raindrop access token....")
                const res = await dispatch(getRaindropAccessToken(code));
                if (res?.payload?.data?.access_token) {
                    const { access_token }   = res.payload.data;
                    const allHighlights      = [];
                    const color              = {
                        id:4,
                        border: "border-l-yellow-200",
                        bg: "#FFFAB3",
                        text: "text-yellow-200",
                        colorCode: '#FFFAB3',
                        className: "yellow-hl"
                    }
                    setCurrentStatus("Fetching raindrop highlights....")
                    const raindropHighlights = await getRaindropHighlights(access_token);
                    raindropHighlights.forEach((h) => {
                        const newLink       = (h.link && h.link.endsWith('/')) ? h.link?.slice(0, -1): h.link
                        allHighlights.push({
                            notes: h.note,
                            color,
                            text: h.text,
                            title: h.text,
                            description: "",
                            link:  newLink,
                            collections: unfiltered_collection,
                            tags: [],
                            type: "Highlight",
                            box: null,
                            _id: h._id,
                            details: null,
                            styleClassName: color.className,
                            is_favourite: false,
                            metaData: {
                                covers: [`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/raindrop.png`],
                                icon: { "type": "image", "icon": `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/raindrop.png`},
                                defaultIcon: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/raindrop.png`,
                                defaultThumbnail:  `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/raindrop.png`,
                                docImages: [`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/raindrop.png`]
                            }
                        })
                    })
                    setCurrentStatus("Storing raindrop highlights....")
                    const highlightsRes            = await dispatch(uploadRaindropHighlights(allHighlights, auth_token))
                    if (highlightsRes.error === undefined) {
                        setLoading(false)
                        setSuccess(true)
                        setError(false)
                        setCurrentStatus("")
                    }
                    else {
                        setLoading(false)
                        setSuccess(true)
                        setError(false)
                        setCurrentStatus("")
                    }
                }
                else {
                    setLoading(false);
                    setError(true);
                    setSuccess(false);
                    setCurrentStatus("")
                }
            })();
        }
    },[dispatch])

    return (
        <div className='w-[100%] pt-[30vh] flex justify-center items-center'>
            <div className='flex flex-col justify-start items-center'>
                {loading && (
                    <>
                        <ColorRing
                            visible={true}
                            height="140"
                            width="140"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#4E89FF', '#36BFFF', '#1e3a8a']}
                        />
                        <h1 className='font-semibold text-lg text-gray-600'>{currentStatus}</h1>
                    </>
                )}
                {!loading && success && (
                    <>
                        <CheckBadgeIcon className='w-[10rem] h-[10rem] text-green-600' />
                        <h1 className='font-semibold text-lg text-gray-600'>Data imported successfull</h1>
                    </>
                )}
                {!loading && error && (
                    <>
                        <ExclamationCircleIcon className='w-[10rem] h-[10rem] text-red-500' />
                        <h1 className='font-semibold text-lg text-gray-600'>Couldn't import data from Raindrop</h1>
                    </>
                )}
            </div>
        </div>
    )
}

export default Raindrop