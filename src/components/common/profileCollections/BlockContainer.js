import { useState }                 from "react";
import { 
    EllipsisHorizontalIcon, 
    PencilIcon, 
    PlayCircleIcon, 
    TrashIcon, 
    XMarkIcon 
}                                   from "@heroicons/react/24/outline";
import CodeMirror                   from '@uiw/react-codemirror';
import { javascript }               from '@codemirror/lang-javascript';
import { useDispatch }              from "react-redux";
import { 
    Button, 
    Input, 
    Tag, 
    message 
}                                   from "antd";
import { RiDragMove2Fill }          from "react-icons/ri";

import TestimonialCard              from "@components/views/card/TestimonialCard";
import FavIconComponent             from "../FavIconComponent";

import {  
    getDomainFromURL, 
    validateProperties 
}                                   from "@utils/constants";
import { updateShape }              from "@utils/find-collection-id";
import session                      from "@utils/session";
import { Validator }                from "@utils/validations";

import { updateGem }                from "@actions/collection";
import { addGem, deleteBookmark }   from "@actions/bookmark";
// import { IoColorPaletteOutline } from "react-icons/io5";
import { fetchProfileImage }        from "@actions/membership";

const BlockContainer = ({block,blocks,setBlocks,setOpenEditDrawer,setGemSingleIdSingleId,isMobile,selectedBlock,setSelectedBlock,setOpenMoreOptionModal,setSelectedItem,setOptionType,bioContactId}) => {
    const dispatch = useDispatch()

    const [inputValues, setInputValues] = useState(
       (block?.media_type === "Profile" && block?.media?.type === 'contact') ? block?.media?.bioContactFields?.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}) : ''
    );
    const handleInputChange = (key, value) => {
        setInputValues({ ...inputValues, [key]: value });
    };

    const handleSubmit = async() => {

        if(!validateProperties(inputValues)){

            let resData = ''
            if(inputValues?.email && !Validator.validate("email", inputValues?.email, null, null, true)){
                resData = await fetchProfileImage(inputValues.email);
            }else{
                message.error('Please enter valid email')
                return;
            }
        
            let subscriberDetails = "Subscriber details:\n";
            const keyMapping = {
                "firstName": "FirstName",
                "lastName": "LastName",
                "email": "Email",
                "phoneNumber": "Phone Number"
            };

            for (const key in inputValues) {
                if (inputValues.hasOwnProperty(key) && inputValues[key]) {
                    const readableKey = keyMapping[key] || key;
                    subscriberDetails += `${readableKey} - ${inputValues[key]},\n`;
                }
            }
            const finalObj = {
                title: `This is the bio contact subsription for ${block?.author?.username || block?.author?.firstname}`,
                description: subscriberDetails,
                media_type: 'Profile',
                author: block?.author?.id ? block?.author?.id : null,
                url: '',
                metaData: {
                    type: 'Profile',
                    title: 'Bio contact subsription',
                    icon: "",
                    defaultIcon: "",
                    url: '',
                    covers: [''],
                },
                collection_gems: bioContactId,
                remarks: '',
                tags: [],
                is_favourite: false,
                media:{
                covers: [''],
                type: 'subscriber',
                subscriber: {
                    ...inputValues,
                    profilePic: resData?.Image || ''
                }
                },
                collections: bioContactId,
            }

            dispatch(addGem({data : finalObj}))

            message.success(`You have successfully subscribed to ${block?.author?.username}`)
            
            setInputValues((block?.media_type === "Profile" && block?.media?.type === 'contact') ? block?.media?.bioContactFields?.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}) : '')
        }else{
            message.error('All Fields are required')
        }
        
    };

    const changeShape = (e, shape,item) => {
    e.stopPropagation();
    const data = updateShape(blocks,item.id,shape)
    setBlocks(data)
    
    const finalObj = {
            title: item?.title,
            description: item?.description,
            media_type: item.media_type,
            author: item?.author?.id,
            url: item.url,
            metaData: {
                ...item?.metaData,
            },
            collection_gems: Number(session.bio_collection_id),
            remarks: item.remarks,
            tags: item?.tags?.map((t) => { return t.id }),
            is_favourite: item.favorite,
            media : {...item.media, shape: shape}
    }
    dispatch(updateGem(item.id, { data: finalObj }))
    setSelectedBlock(null)
    };

  const handleDelete = (block) => {
    const data = blocks.filter(item => item.id !== block.id)
    setBlocks(data)
    dispatch(deleteBookmark(block.id))
  }

  const handleOpenEdit = (block) => {
    setGemSingleIdSingleId(block.id)
    setOpenEditDrawer(true)
  }

  const renderFollowButton = (platform) => {
    if(platform === 'YouTube'){
        return(
        <div className="mt-2">
            <Button className="rounded-full text-center font-bold text-xs bio-youtube-button"
            type="text"
            >Subscribe</Button>
        </div>
        )
    }
    if(platform === 'Instagram'){
        return(
        <div className="mt-2">
            <Button className="rounded-lg text-center font-bold bio-instagram-button text-xs"
            type="text"
            >Subscribe</Button>
        </div>
        )
    }
    if(platform === 'Twitter'){
        return(
        <div className="mt-2">
            <div className="bio-twitter-btn w-[70px]">
                Follow
            </div>
        </div>
        )
    }
    if(platform === 'Github'){
        return(
        <div className="mt-2">
            <div className="bio-github-button w-[80px]">
                Follow
            </div>
        </div>
        )
    }else{
        return(
        <div className="mt-2">
            <div className="bio-twitter-btn w-[70px]">
                Follow
            </div>
        </div>
        )
    }
  }

    const generateGridShape = (item,selectedBlock) => {
        const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
        if(item?.media_type === 'SocialFeed' && item?.media?.isWeb){
            const imgSrc = (item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : ''
            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')

            const html = item?.media?.html || null

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {
                    (!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>
                    }

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                    </div> : <></>
                    }

                    <div className={`drag-handle p-2 h-full overflow-hidden`}>
                        {
                        html ? <div dangerouslySetInnerHTML={{ __html: html }} className="drag-handle"/> :
                        <>
                        <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                            <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                        </div>

                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                        <div className="text-sm my-1">{item?.description.length > 110
                                        ? item?.description.slice(0, 110).concat("...")
                                        : item?.description}</div>
                        <div className="mt-1">
                        {
                            imgSrc && <img src={imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[170px] object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>
                        }
                        </div>
                        </>
                        }
                    </div>
                    </div>
                )
            }

        }

        if(item.media_type === 'Quote'){
            const title = item?.title || item?.media?.text || ''
            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>
                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                            {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2 flex flex-col justify-start h-full">
                        <div>
                        {
                        favIcon &&
                        <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                            <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                        </div>
                        }
                            
                            <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                        </div>

                        <div className="quote-container h-full w-full relative">
                            <p>{title || ''}</p>
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                    {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                    </div>
                )
            }
            
            if(item.media.shape === 'rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
               {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center h-full">
                    <div>
                    {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}

                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div className="quote-container h-full w-full ml-1">
                            <p>{title || ''}</p>
                        </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                    {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'pipe'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 h-full flex flex-col items-start justify-between">
                    <div>
                    {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}
                    
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div className="quote-container h-full w-full">
                        <p>{title || ''}</p>
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }
        }

        if(item.media_type === 'Note'){

            if(item?.media?.noteType === 'description'){
                if(item.media.shape === 'small-square'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2 break-words h-full flex flex-col"
                    style={{
                        textAlign: item?.media?.textAlign || 'left',
                        justifyContent: item?.media?.justifyContent || 'flex-start'
                    }}
                    >
                        <div>{item?.title?.length > 90
                                        ? item?.title.slice(0, 90).concat("...")
                                        : item?.title}
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId) && !isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>

                        <div className="cursor-pointer" 
                        onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                        }}
                        >
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                    </div> : <></>}

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?
                    <div className={`flex absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>

                        <div className="cursor-pointer" 
                        onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                        }}
                            >
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                    </div> : <></>}
                    </div>
                )
                }

                if(item.media.shape === 'square') {
                    return(
                        <div className="drag-handle cursor-grab h-full">
                        {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>
                        </div> : <></>}

                        {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                            <div className="bg-black drag-handle rounded-lg">
                                <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                            </div>

                            <div className="flex items-center bg-white drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>
                            </div>

                            <div className="drag-cancel bg-black rounded-lg">
                                <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock(null)
                                }}/>
                            </div>
                    </div> : <></>
                    }

                        <div className="p-2 break-words h-full flex flex-col"
                        style={{
                            textAlign: item?.media?.textAlign || 'left',
                            justifyContent: item?.media?.justifyContent || 'flex-start'
                        }}
                        >
                            <div>
                                {item.media.text.length > 600 ? item.media.text.substring(0, 600) + '...' : item.media.text}
                            </div>
                        </div>

                        {(!isMobile && item?.author?.id === Number(session?.userId) && !isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                            <div
                            className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                            onClick={(e) => changeShape(e, "small-square",item)}
                            >
                            <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                            onClick={(e) => changeShape(e, "small-rectangle",item)}
                            >
                            <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                            onClick={(e) => changeShape(e, "rectangle",item)}
                            >
                            <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                            onClick={(e) => changeShape(e, "pipe",item)}
                            >
                            <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                            >
                            <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                            </div>
                            <div className="cursor-pointer" 
                            onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            }}
                                >
                                <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                            </div>
                        </div> : <></>}
                        
                        {/* for mobile */}
                        {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                            <div
                            className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                            onClick={(e) => changeShape(e, "small-square",item)}
                            >
                            <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                            onClick={(e) => changeShape(e, "small-rectangle",item)}
                            >
                            <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                            onClick={(e) => changeShape(e, "rectangle",item)}
                            >
                            <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                            onClick={(e) => changeShape(e, "pipe",item)}
                            >
                            <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                            </div>
                            <div
                            className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                            >
                            <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                            </div>

                            <div className="cursor-pointer" onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            }}>
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                        </div> : <></>}

                        </div>
                    )
                }

                if(item.media.shape === 'small-rectangle'){
                return(
                    <div className="drag-handle cursor-grab h-full flex flex-col items-center justify-center">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                            <div className="bg-black drag-handle rounded-lg">
                                <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                            </div>

                            <div className="flex items-center bg-white drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>
                            </div>

                            <div className="drag-cancel bg-black rounded-lg">
                                <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock(null)
                                }}/>
                            </div>
                    </div> : <></>
                    }

                    <div className="p-2 break-words flex flex-col h-full"
                    style={{
                            textAlign: item?.media?.textAlign || 'left',
                            justifyContent: item?.media?.justifyContent || 'flex-start'
                        }}
                    >
                        <div>
                            {item?.title?.length > 50
                                        ? item?.title.slice(0, 50).concat("...")
                                        : item?.title}
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)  && !isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                            className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                            >
                            <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                                setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                                }}>
                                <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                            </div>
                    </div> : <></>}

                   
                    {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                            className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                            >
                            <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            }}>
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                    </div> : <></>}

                    </div>
                )
                }

                if(item.media.shape === 'rectangle'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                            <div className="bg-black drag-handle rounded-lg">
                                <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                            </div>

                            <div className="flex items-center bg-white drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>
                            </div>

                            <div className="drag-cancel bg-black rounded-lg">
                                <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock(null)
                                }}/>
                            </div>
                    </div> : <></>
                    }

                    <div className="p-2 break-words flex flex-col h-full"
                    style={{
                            textAlign: item?.media?.textAlign || 'left',
                            justifyContent: item?.media?.justifyContent || 'flex-start'
                        }}
                    >
                        <div>
                            {item.media.text.length > 250 ? item.media.text.substring(0, 250) + '...' : item.media.text}
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId) && !isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                }}>
                                <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                            </div>
                    </div> : <></>}

                   
                    {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            }}>
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                    </div> : <></>}
                   
                    </div>
                )
                }

                if(item.media.shape === 'pipe'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                            <div className="bg-black drag-handle rounded-lg">
                                <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                            </div>

                            <div className="flex items-center bg-white drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>
                            </div>

                            <div className="drag-cancel bg-black rounded-lg">
                                <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock(null)
                                }}/>
                            </div>
                    </div> : <></>
                    }

                    <div className="p-2 h-full break-words flex flex-col"
                    style={{
                            textAlign: item?.media?.textAlign || 'left',
                            justifyContent: item?.media?.justifyContent || 'flex-start'
                        }}
                    >
                            <div>
                                {item.media.text.length > 200 ? item.media.text.substring(0, 200) + '...' : item.media.text}
                            </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)  && !isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                                setSelectedItem(item)
                                setOpenMoreOptionModal(true)
                                }}>
                                <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                            </div>
                    </div> : <></>}

                   
                    {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            }}>
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                    </div> : <></>}

                    </div>
                )
                }
            }

            if(item?.media?.noteType === 'title'){
                if(item.media.shape === 'small-rectangle'){
                return(
                    <div className="drag-handle cursor-grab h-full flex flex-col items-center justify-center">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                            <div className="bg-black drag-handle rounded-lg">
                                <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                            </div>

                            <div className="flex items-center bg-white drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>
                            </div>

                            <div className="drag-cancel bg-black rounded-lg">
                                <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock(null)
                                }}/>
                            </div>
                    </div> : <></>
                    }

                    <div className="p-2 break-words flex flex-col h-auto w-full overflow-y-hidden hover:overflow-y-auto"
                    style={{
                            textAlign: item?.media?.textAlign || 'left',
                            fontWeight: item?.media?.fontWeight ? 'bold' : 'normal',
                            textDecoration: item?.media?.textUnderline ? 'underline' : 'none',
                            fontStyle: item?.media?.textItalic ? 'italic' : 'normal',
                            fontSize: item?.media?.fontSize || '14px'
                        }}
                    >
                        {item?.title}
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 z-[9999999] flex w-fit items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel left-[50%] translate-x-[-50%]`}>
                    
                    <div className="cursor-pointer" 
                        onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            setOptionType('titleAlign')
                        }}
                        >
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                </div> : <></>}
                            {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 z-[9999999] flex w-fit  items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel left-[50%] translate-x-[-50%]`}>
                    <div className="cursor-pointer" 
                        onClick={() => {
                            setSelectedItem(item)
                            setOpenMoreOptionModal(true)
                            setOptionType('titleAlign')
                        }}
                        >
                            <EllipsisHorizontalIcon className="h-5 w-5 text-white"/>
                        </div>
                </div> : <></>}
                    </div>
                )
                }
            }
        }

        if(item.media_type === 'Code'){
            const code = item?.media?.code
            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')

            if(item.media.shape === 'small-square'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2">
                        <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                        <div className="text-sm my-1">{item?.title?.length > 25
                                        ? item?.title.slice(0, 25).concat("...")
                                        : item?.title}
                        </div>
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}
                    {/* for mobile */}

                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}

                    </div>
                )
            }

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2">
                        <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                        <div className="text-sm my-1">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}</div>
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>

                        <div className="mt-1">
                        <CodeMirror value={code ? code.length > 300 ? code.substring(0, 300) + '...' : code : ''}
                                theme={"dark"}
                                editable={false}
                                readOnly={true}
                                extensions={[javascript()]}
                                className='mood-code-card cursor-default drag-cancel' />
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                    {/* for mobile */}

                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                    </div>
                )
            }

            if(item.media.shape === 'small-rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile &&  item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center h-full">
                    <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                    <div className="text-sm mx-2">
                        {item?.title?.length > 45
                                    ? item?.title.slice(0, 45).concat("...")
                                    : item?.title}
                    </div>
                </div>

                {(!isMobile &&  item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                {/* for mobile */}

                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center">
                    <div>
                    <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                    <div className="text-sm my-1">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}
                    </div>
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div className="ml-1">
                    <CodeMirror value={code ? code.length > 300 ? code.substring(0, 300) + '...' : code : ''}
                                theme={"dark"}
                                editable={false}
                                readOnly={true}
                                extensions={[javascript()]}
                                className='w-[150px] drag-cancel cursor-default'
                                />
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                        {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'pipe'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 h-full flex flex-col items-start justify-between">
                    <div>
                    <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>
                    <div className="text-sm my-1">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}</div>
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div className="w-[110px] overflow-y-hidden overflow-x-auto h-fit">
                    <CodeMirror value={code ? code.length > 300 ? code.substring(0, 300) + '...' : code : ''}
                                theme={"dark"}
                                editable={false}
                                readOnly={true}
                                extensions={[javascript()]}
                                className='w-[150px] drag-cancel cursor-default' />
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                {/* for mobile */}

                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }
        }

        if(item.media_type === 'Audio'){
            const imgSrc = (item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : ''
            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')

            const html = item?.media?.html || null

            if(item.media.shape === 'small-square'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>
                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2">
                        {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}

                        <div className="text-sm my-1 break-words">{item?.title?.length > 25
                                        ? item?.title.slice(0, 25).concat("...")
                                        : item?.title}
                        </div>
                        <div className="text-xs text-[#00000099] break-words">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}
                            {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}

                    </div>
                )
            }

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>
                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }
                    <div className={`drag-handle ${html ? 'h-full overflow-hidden' : 'p-2'}`}>
                        {
                        (html && item?.url?.includes('soundcloud')) ? <div dangerouslySetInnerHTML={{ __html: html }} className="drag-handle"/> :               
                        <div className="p-2">
                            {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                            <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                        </div>}

                            <div className="text-sm my-1 break-words">{item?.title?.length > 45
                                            ? item?.title.slice(0, 45).concat("...")
                                            : item?.title}</div>
                            <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>

                            <div className="mt-1 relative">
                                <img src={imgSrc ? imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/musical-note.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[180px] object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>
                            {imgSrc && <PlayCircleIcon className='h-10 w-10 absolute left-[50%] bottom-[40%] translate-x-[-50%] mood-invert-filter ' />}
                            </div>
                        </div>
                        }
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div>: <></>}
                    {/* for mobile */}

                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div>: <></>}
                    </div>
                )
            }

            if(item.media.shape === 'small-rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center h-full">
                    {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}

                    <div className="text-sm mx-2">
                        {item?.title?.length > 45
                                    ? item?.title.slice(0, 45).concat("...")
                                    : item?.title}
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className={`drag-handle ${html ? 'h-full overflow-hidden' : 'p-2'}`}>
                    {(html && item?.url?.includes('spotify')) ? <div dangerouslySetInnerHTML={{ __html: html }} className="drag-handle"/> :
                    <div className="p-2 flex items-center">
                        <div style={{flex:'0.6'}}>
                        {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                            <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                        </div>}

                        <div className="text-sm my-1 break-words">{item?.title?.length > 45
                                            ? item?.title.slice(0, 45).concat("...")
                                            : item?.title}
                        </div>
                        <div className="text-xs text-[#00000099] break-words">{getDomainFromURL(item.url) || ''}</div>
                        </div>

                        <div className="p-1 relative" style={{flex:'0.4'}}>
                        <img src={imgSrc ? imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/musical-note.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[120px] object-contain rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>

                        {imgSrc && <PlayCircleIcon className='h-10 w-10 absolute left-[50%] bottom-[30%] translate-x-[-50%] mood-invert-filter ' />}
                        </div>
                    </div>}
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                    {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'pipe'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 mr-2" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className={`drag-handle p-2`}>
                    <div className="p-2 h-full flex flex-col items-start justify-between">
                    <div>
                    {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}
                    <div className="text-sm my-1 break-words">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}</div>
                    <div className="text-xs text-[#00000099] break-words">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div className="relative">
                   <img src={imgSrc ? imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/musical-note.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-fit object-contain rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>
                    
                    {imgSrc && <PlayCircleIcon className='h-6 w-6 absolute left-[50%] bottom-[30%] translate-x-[-50%] mood-invert-filter ' />}
                    </div>
                </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}

                {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }
        }

        if(item.media_type === 'Citation'){
            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')

            if(item.media.shape === 'small-square'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2">
                        <div className={`${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'} rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                        <div className="text-sm my-1">{item?.title?.length > 25
                                        ? item?.title.slice(0, 25).concat("...")
                                        : item?.title}
                        </div>
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}
                            {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}

                    </div>
                )
            }

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2">
                        <div className={`${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'} rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                       
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>

                        <div className="mt-1">
                            <div className={`py-2 px-4 rounded-t-[5px] overflow-ellipsis overflow-hidden`}>
                        {item.media.citation.length > 250 ? item.media.citation.substring(0, 250) + '...' : item.media.citation}
                            </div>

                            <div className="px-4 my-2">
                                <div title="Citation style" className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit'>{item.media.citation_format.length > 30 ? item.media.citation_format.substring(0, 30) + '...' : item.media.citation_format}</div>
                            </div>
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}

                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                    </div>
                )
            }

            if(item.media.shape === 'small-rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center h-full">
                    <div className={`${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'} rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                    <div className="text-sm mx-2 ">
                        {item?.title?.length > 45
                                    ? item?.title.slice(0, 45).concat("...")
                                    : item?.title}
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                            {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center">
                    <div>
                    <div className={`${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'} rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                    
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div className="ml-1 break-words">
                        <div className={`ml-1 rounded-t-[5px] overflow-ellipsis overflow-hidden break-words`}>
                        {item.media.citation.length > 150 ? item.media.citation.substring(0, 150) + '...' : item.media.citation}
                            </div>

                            <div className="mt-1">
                                <div title="Citation style" className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit'>{item.media.citation_format.length > 30 ? item.media.citation_format.substring(0, 30) + '...' : item.media.citation_format}</div>
                            </div>
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'pipe'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 h-full flex flex-col items-start justify-between">
                    <div>
                    <div className={`${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'} rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    <div>
                        <div className={`py-2 px-4 rounded-t-[5px] overflow-ellipsis overflow-hidden`}>
                        {item.media.citation.length > 50 ? item.media.citation.substring(0, 50) + '...' : item.media.citation}
                            </div>

                            <div className="px-4 my-2">
                                <div title="Citation style" className='bg-[#e6e6e6] text-black text-xs py-[2px] px-[4px] rounded w-fit'>{item.media.citation_format.length > 30 ? item.media.citation_format.substring(0, 30) + '...' : item.media.citation_format}</div>
                            </div>
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }
        }

        if(item.media_type === 'Profile' && !item?.media?.type){
            const imgSrc = (item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : ''
            const description = item?.description ||''
            const platform = item?.platform || ''
            const title = item?.title ||''
            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')
            if(item.media.shape === 'small-square'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2">
                        <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                        <div className="text-sm my-1 break-words truncate w-full">{item?.title?.length > 25
                                        ? item?.title.slice(0, 25).concat("...")
                                        : item?.title}
                        </div>
                        {renderFollowButton(platform)}
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute  ${(platform === 'Github' || platform === 'YouTube' || platform === 'Instagram' || platform === 'Twitter') ? 'bottom-[-15px]' : 'bottom-0'} bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}
                            {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute ${(platform === 'Github' || platform === 'YouTube' || platform === 'Instagram' || platform === 'Twitter') ? 'bottom-[-15px]' : 'bottom-0'} right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>}

                    </div>
                )
            }

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                    </div> : <></>}

                    {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                    <div className="p-2 h-full flex flex-col justify-start items-start">
                        <div className="flex items-center justify-between w-full">
                            <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                                <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                            </div>
                            
                            {renderFollowButton(platform)}
                        </div>

                        <div className='flex flex-col items-center justify-center w-full'>
                            <img src={imgSrc ? platform === "Medium" ? imgSrc?.replace("resize:fill:24:24", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} 
                            className='h-[80px] w-[80px] rounded-[50%] object-cover rounded-lg'
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}
                            />

                            <div className='flex items-center'>
                                <div className='text-md font-medium'>{title}</div>
                            </div>
                            <div className='text-sm mt-1 w-full break-words'>{description.length > 250
                                        ? description.slice(0, 250).concat("...")
                                        : description}</div>
                        </div>
                    </div>

                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                                {/* for mobile */}
                    {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>}
                    </div>
                )
            }

            if(item.media.shape === 'small-rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center h-full">
                    <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                    <div className="mx-2">
                        <div className="text-sm">
                        {item?.title?.length > 45
                                    ? item?.title.slice(0, 45).concat("...")
                                    : item?.title}
                    </div>
                    <div className='text-sm'>{description.length > 20
                                        ? description.slice(0, 20).concat("...")
                                        : description}</div>
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                         {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 flex items-center">
                    <div style={{flex:'0.6'}}>
                        <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>

                        <div className='flex items-center my-1'>
                                    <div className='text-md font-medium w-full break-words'>{title.length > 40
                                            ? title.slice(0, 40).concat("...")
                                            : title}</div>
                        </div>

                        {renderFollowButton(platform)}
                    </div>

                    <div className="p-1 w-full" style={{flex:'0.4'}}>
                        <img src={imgSrc ? platform === "Medium" ? imgSrc?.replace("resize:fill:24:24", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"}
                            className="w-full h-[120px] object-cover rounded-lg"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}
                        />
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                                        {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

            if(item.media.shape === 'pipe'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>}

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                </div> : <></>
                }

                <div className="p-2 h-full flex flex-col items-start justify-between">
                    <div>
                    <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>
                    
                    {renderFollowButton(platform)}
                    </div>

                    <div className="flex flex-col items-center justify-center w-full">
                        <img src={imgSrc ? platform === "Medium" ? imgSrc?.replace("resize:fill:24:24", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} 
                            className='h-[80px] w-[80px] rounded-[50%] object-contain rounded-lg'
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}
                            />

                            <div className='flex items-center'>
                                <div className='text-md font-medium'>{title}</div>
                            </div>
                    </div>
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }
        }

        if(item.media_type === 'Profile' && item?.media?.type === 'contact'){
            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                    </div> : <></>}

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                            <div className="bg-black drag-handle rounded-lg">
                                <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                            </div>

                            <div className="flex items-center bg-white drag-cancel">
                                <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                    <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                                </div>

                                <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                    <PencilIcon className="h-5 w-5 cursor-pointer"/>
                                </div>

                                {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                    onClick={() => {
                                        setSelectedItem(item)
                                        setOpenMoreOptionModal(true)
                                        setOptionType('colorPicker')
                                    }}>
                                    <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                                </div> */}
                            </div>

                            <div className="drag-cancel bg-black rounded-lg">
                                <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock(null)
                                }}/>
                            </div>
                    </div> : <></>
                    }

                    <div className="p-2 h-full">
                        <center className="font-medium text-lg block">{item?.title || ''}</center>

                        <center className="text-xs font-medium mt-1 block">{item?.description || ''}</center>

                        {
                        item?.media?.bioContactFields?.map((item) => {
                            return(
                                <div className="my-2 bio-contact-input">
                                    <Input
                                        placeholder={item.name}
                                        className="w-full rounded-full bg-transparent"
                                        style={{border: '1px solid black'}}
                                        value={inputValues[item.key]}
                                        onChange={(e) => handleInputChange(item.key, e.target.value)}
                                    />
                                </div>
                            )
                        })
                        }

                        <div className="fixed w-[90%] bottom-[5px]">
                            <Button className="rounded-full w-full bg-[#347AE2] hover:bg-[#347AE2] border-[#347AE2] hover:border-[#347AE2]" type='primary'
                            onClick={handleSubmit} 
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    </div>
                )
            }
        }

        if(item.media_type === 'Link' || item.media_type === 'App' || item.media_type === 'Image' || item.media_type === 'Video' || item.media_type === 'PDF' || item.media_type === 'Movie' || item.media_type === 'Book' || item.media_type === 'Product' || item?.media_type === 'Article' || item?.mediaType === 'Testimonial'){
            const defaultImg = (item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`

            const imgSrc = (item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`

            const favIcon = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : (item?.metaData?.defaultIcon || '')

            const imgTypeSrc     = (item.media_type === "Image" || item.media_type === "Screenshot") && item.S3_link
                                    ? item.S3_link?.length > 0 
                                        ? item.S3_link[0] 
                                        : defaultImg
                                    : defaultImg

            const imgVideoSrc = (item?.media_type === 'Video' && item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-video.png`

            const pdfSrc        = item?.media?.pdfLink
            const pdfFileName   = pdfSrc && pdfSrc?.split('/')?.pop().split('?')?.[0].split('#')?.[0]

            const price = item?.media?.price || ''

            const mediaImgsrc = (item?.media && item?.media?.covers?.length > 0) ? item?.media?.covers[0] : ''

            const avatarImgSrc = (item?.metaData && item?.metaData?.covers?.length > 0) ? item?.metaData?.covers[0] : ''
            const iconImgSrc = (item?.metaData && item?.metaData?.icon) ? item?.metaData?.icon : ''
            const tagLine = item?.media?.tagLine || ''
            const author = item?.media?.author || ''
            const product = item?.media?.product || ''
            const attachImage = item?.media?.attachImage || ''
            const platform = item?.media?.platform || item?.platform
            const rating = item?.media?.rating || ''
            const date = item?.media?.date || ''
            const testimonial = item?.media?.testimonial || ''

            if(item.media.shape === 'small-square'){
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {
                    (!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                    </div> : <></>
                    }
                    
                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                    </div> : <></>
                    }

                    <div className="p-2">
                        {favIcon && <div className={`${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'} rounded-[10px] w-fit`}>
                            <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                        </div>}

                        <div className="text-sm my-1 break-words">{item?.title?.length > 25
                                        ? item?.title.slice(0, 25).concat("...")
                                        : item?.title}
                        </div>
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    {
                    (!isMobile && item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>
                    }

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                        <div
                        className={`rounded-md cursor-pointer p-1 bg-white hover:bg-white ct-small-square`}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-black p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                        onClick={(e) => changeShape(e, "square",item)}
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                        </div>
                    </div> : <></>
                    }
                    </div>
                )
            }

            if(item.media.shape === 'square') {
                return(
                    <div className="drag-handle cursor-grab h-full">
                    {
                    (!isMobile && item?.author?.id === Number(session?.userId)) ? <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                    </div> : <></>
                    }

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                    </div> : <></>
                    }

                    {item?.media_type === 'Article' ?
                    <>
                    <div className="flex items-center justify-between w-full">
                        {favIcon && <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit flex items-center justify-between w-full`}>
                                <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                        </div>}
                        {item?.media?.ribbon && item?.media?.ribbon?.text && <div className="ribbon-div">
                            <Tag color={item?.media?.ribbon?.color}>{item?.media?.ribbon?.text}</Tag>
                        </div>}
                    </div>
                    

                        <div className="text-sm my-1">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}</div>
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>

                    <div className="mt-1 relative">
                        <img src={mediaImgsrc ? mediaImgsrc?.replace("_SS135", "_SS500").replace("resize:fill:112:112", "resize:fit:2400").replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) ? imgSrc.replace("resize:fill:112:112", "resize:fit:2400").replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[180px] object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>  
                    </div>
                    </>
                    :
                    item?.media_type === 'Testimonial' ?

                    <TestimonialCard
                            avatar={avatarImgSrc || iconImgSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                            tagLine={tagLine || item?.title || ''}
                            author={author} product={product} attachImage={attachImage}
                            platform={platform} rating={rating} date={date} testimonial={testimonial}
                            metaData={item?.metaData}
                            showDetailsFull={false}
                            isBioPage={true}
                            shape={'square'}
                            />
                    :

                    <div className="p-2">
                        <div className="flex items-center justify-between w-full">
                            {favIcon && <div className="border border-solid shadow rounded-[10px] w-fit p-2">
                                <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                                
                            </div>}
                            {item?.media?.ribbon && item?.media?.ribbon?.text && <div className="ribbon-div">
                                <Tag color={item?.media?.ribbon?.color}>{item?.media?.ribbon?.text}</Tag>
                            </div>}
                        </div>
                        

                        <div className="text-sm my-1 break-words">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}</div>
                        <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>

                        <div className="mt-1 relative">
                            {item?.media_type === 'Product' && <div className="font-medium text-end mb-1">
                                {price}
                            </div>}
                            <img src={item?.media_type === 'Image' ? imgTypeSrc?.replace("_SS135", "_SS500")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : item?.media_type === 'Video' ? (imgVideoSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-video.png`) : item?.media_type === 'PDF' ? `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/pdf.png` : (imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[180px] object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>

                            {imgVideoSrc && item?.media_type === 'Video' && <PlayCircleIcon className='h-10 w-10 absolute left-[50%] bottom-[40%] translate-x-[-50%] mood-invert-filter' />}

                            {item?.media_type === 'PDF' && <div className="w-full text-center mt-1">{pdfFileName && pdfFileName.length > 50 ? pdfFileName.substring(0, 50) + '...' : pdfFileName}</div>}
                        </div>
                    </div>}

                    {
                    (!isMobile && item?.author?.id === Number(session?.userId)) ? <div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>
                    }

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className={`absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] items-center justify-around rounded-lg bg-black p-1 translate-x-[80px] group-hover:flex drag-cancel`}>
                        <div
                        className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                        onClick={(e) => changeShape(e, "small-square",item)}
                        >
                        <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                        onClick={(e) => changeShape(e, "small-rectangle",item)}
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                        onClick={(e) => changeShape(e, "rectangle",item)}
                        >
                        <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                        onClick={(e) => changeShape(e, "pipe",item)}
                        >
                        <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                        </div>
                        <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white cta-square p-1"
                        >
                        <div className="h-6 w-6 rounded border-2 border-solid border-black p-2"></div>
                        </div>
                    </div> : <></>
                    }
                    </div>
                )
            }

            if(item.media.shape === 'small-rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?
                <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>
                }

                    {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                    </div> : <></>
                    }

                <div className="p-2 flex items-center h-full">
                    {favIcon && <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}

                    <div className="text-sm mx-2 ">
                        {item?.title?.length > 45
                                    ? item?.title.slice(0, 45).concat("...")
                                    : item?.title}
                    </div>
                </div>

                {
                (!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>
                }

                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                        className="rounded-md cursor-pointer bg-white hover:bg-white ct-small-rectangle p-1"
                        >
                        <div className="h-2 w-6 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>
                }
                </div>
            )
            }

            if(item.media.shape === 'rectangle'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {
                (!isMobile && item?.author?.id === Number(session?.userId)) ?
                <div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>
                }

                {/* for mobile */}
                    {
                    (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                    </div> : <></>
                    }

                <div className="p-2 flex items-center">
                    <div style={{flex:'0.6'}}>
                    <div className="flex items-center justify-between">
                        {favIcon && <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}
                    {item?.media?.ribbon && item?.media?.ribbon?.text && <div className="ribbon-div">
                        <Tag color={item?.media?.ribbon?.color}>{item?.media?.ribbon?.text}</Tag>
                    </div>}
                    </div>


                    <div className="text-sm my-1">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}
                    </div>
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    {item?.media_type === 'Article' ? 
                    <div className="p-1" style={{flex:'0.4'}}>
                        <img src={mediaImgsrc ? mediaImgsrc.replace("resize:fill:112:112", "resize:fit:2400").replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : imgSrc ? imgSrc.replace("resize:fill:112:112", "resize:fit:2400").replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[120px] object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>
                    </div> : 
                    item?.media_type === 'Testimonial' ?
                    <TestimonialCard
                    avatar={avatarImgSrc || iconImgSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                    tagLine={tagLine || item?.title || ''}
                    author={author} product={product} attachImage={attachImage}
                    platform={platform} rating={rating} date={date} testimonial={testimonial}
                    metaData={item?.metaData}
                    showDetailsFull={false}
                    isBioPage={true}
                    shape={'rectangle'}
                    /> :
                    <div className="p-1 relative" style={{flex:'0.4'}}>
                        {item?.media_type === 'Product' && <div className="font-medium text-end">
                            {price}
                        </div>}
                        <img src={item?.media_type === 'Image' ? imgTypeSrc?.replace("_SS135", "_SS500")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : item?.media_type === 'Video' ? (imgVideoSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-video.png`) : item?.media_type === 'PDF' ? `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/pdf.png` : imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className={`w-full object-cover rounded-lg ${item?.media_type === 'PDF' ? 'h-[100px]' : 'h-[120px]'}`} onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>

                        {imgVideoSrc && item?.media_type === 'Video' && <PlayCircleIcon className='h-10 w-10 absolute left-[50%] bottom-[40%] translate-x-[-50%] mood-invert-filter' />}

                        {item?.media_type === 'PDF' && <div className="w-full text-center mt-1">{pdfFileName && pdfFileName.length > 50 ? pdfFileName.substring(0, 50) + '...' : pdfFileName}</div>}
                    </div>}
                </div>

                {
                (!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>
                }

                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`absolute bottom-[-15px] right-0 left-0 z-[9999999] flex w-[50%] translate-x-[80px] items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white ct-rectangle p-1"
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-black p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-pipe p-1"
                    onClick={(e) => changeShape(e, "pipe",item)}
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>
                }
                </div>
            )
            }

            if(item.media.shape === 'pipe'){
            return(
                <div className="drag-handle cursor-grab h-full">
                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className="bg-white cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-fit flex items-center group-hover:flex drag-cancel">
                        <div className="border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]" onClick={() => handleDelete(item)}>
                            <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                        </div>

                        <div className="border border-solid shadow rounded-md w-fit p-1 mx-2 hover:bg-[#f5f5f5]" onClick={() => handleOpenEdit(item)}>
                            <PencilIcon className="h-5 w-5 cursor-pointer"/>
                        </div>

                        {/* <div className='border border-solid shadow rounded-md w-fit p-1 hover:bg-[#f5f5f5]'
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                        </div> */}
                </div> : <></>}
                {/* for mobile */}
                {
                (isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ? <div className="bg-transparent cursor-pointer hidden absolute top-[-15px] left-[50%] translate-x-[-50%] z-[999999] w-full flex items-center justify-between group-hover:flex">

                        <div className="bg-black drag-handle rounded-lg">
                            <RiDragMove2Fill className="h-4 w-4 cursor-pointer text-white"/>
                        </div>

                        <div className="flex items-center bg-white drag-cancel">
                            <div className="border border-solid shadow rounded-md w-fit p-1" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer"/>
                            </div>

                            <div className="border border-solid shadow rounded-md w-fit p-1 mx-2" onClick={() => handleOpenEdit(item)}>
                                <PencilIcon className="h-5 w-5 cursor-pointer"/>
                            </div>

                            {/* <div className={`border border-solid shadow rounded-md w-fit p-1`}
                                onClick={() => {
                                    setSelectedItem(item)
                                    setOpenMoreOptionModal(true)
                                    setOptionType('colorPicker')
                                }}>
                                <IoColorPaletteOutline className="h-5 w-5 cursor-pointer"/>
                            </div> */}
                        </div>

                        <div className="drag-cancel bg-black rounded-lg">
                            <XMarkIcon className="h-4 w-4 cursor-pointer text-red-600 drag-cancel" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBlock(null)
                            }}/>
                        </div>
                    </div> : <></>
                }

                <div className="p-2 h-full flex flex-col items-start justify-between">
                    <div>
                    <div className="flex items-center justify-between">
                        {favIcon && <div className={`$${item?.media?.cardBgColor ? 'bg-transparent' : 'border border-solid shadow p-2'}  rounded-[10px] w-fit`}>
                        <FavIconComponent data={favIcon} isBlockPlace={true} defaultImgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}/>
                    </div>}
                    {item?.media?.ribbon && item?.media?.ribbon?.text && 
                    <div className="ribbon-div">
                        <Tag color={item?.media?.ribbon?.color}>{item?.media?.ribbon?.text}</Tag>
                    </div>
                    }
                    </div>
                    <div className="text-sm my-1 break-words">{item?.title?.length > 45
                                        ? item?.title.slice(0, 45).concat("...")
                                        : item?.title}</div>
                    <div className="text-xs text-[#00000099]">{getDomainFromURL(item.url) || ''}</div>
                    </div>

                    {item?.media_type === 'Article' ? <div>
                        <img src={mediaImgsrc ? mediaImgsrc.replace("resize:fill:112:112", "resize:fit:2400").replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : imgSrc ? imgSrc.replace("resize:fill:112:112", "resize:fit:2400").replace("resize:fill:140:140", "resize:fit:2400")?.replace("resize:fill:40:40", "resize:fit:2400")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-fit object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>
                    </div> : 
                    item?.media_type === 'Testimonial' ? <div>
                        <TestimonialCard
                    avatar={avatarImgSrc || iconImgSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                    tagLine={tagLine || item?.title || ''}
                    author={author} product={product} attachImage={attachImage}
                    platform={platform} rating={rating} date={date} testimonial={testimonial}
                    metaData={item?.metaData}
                    showDetailsFull={false}
                    isBioPage={true}
                    shape={'pipe'}
                    />
                    </div> :
                    <div className="relative">
                        {item?.media_type === 'Product' && <div className="font-medium text-end">
                            {price}
                        </div>}

                        <img src={item?.media_type === 'Image' ? imgTypeSrc?.replace("_SS135", "_SS500")?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : item?.media_type === 'Video' ? (imgVideoSrc || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/default-video.png`) : item?.media_type === 'PDF' ? `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/pdf.png` : imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`)} alt={item?.altInfo || item?.title || item?.description || item?.gemInfo || "Curateit - Curate, Save, Search gems of web, 10x your productivity"} className="w-full h-[150px] object-cover rounded-lg" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src=item?.metaData?.fallbackURL ? item?.metaData?.fallbackURL : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
                            }}/>

                        {imgVideoSrc && item?.media_type === 'Video' && <PlayCircleIcon className='h-10 w-10 absolute left-[50%] bottom-[40%] translate-x-[-50%] mood-invert-filter' />}

                        {item?.media_type === 'PDF' && <div className="w-full text-center mt-1">{pdfFileName && pdfFileName.length > 50 ? pdfFileName.substring(0, 50) + '...' : pdfFileName}</div>}
                    </div>}
                </div>

                {(!isMobile && item?.author?.id === Number(session?.userId)) ?<div className={`hidden absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}

                {/* for mobile */}
                {(isMobile && item?.author?.id === Number(session?.userId) && selectedBlock?.id === item.id) ?<div className={`absolute bottom-0 right-0 left-0 z-[9999999] flex w-auto items-center justify-around rounded-lg bg-black p-1 group-hover:flex drag-cancel`}>
                    <div
                    className="rounded-md cursor-pointer p-1 hover:bg-blue-600 ct-small-square"
                    onClick={(e) => changeShape(e, "small-square",item)}
                    >
                    <div className="h-4 w-4 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-small-rectangle p-1"
                    onClick={(e) => changeShape(e, "small-rectangle",item)}
                    >
                    <div className="h-2 w-6 rounded border-2 border-solid border-white p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 ct-rectangle p-1"
                    onClick={(e) => changeShape(e, "rectangle",item)}
                    >
                    <div className="h-4 w-7 rounded border-2 border-solid border-white p-1"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer bg-white hover:bg-white cta-pipe p-1"
                    >
                    <div className="h-6 w-3 rounded border-2 border-solid border-black p-0"></div>
                    </div>
                    <div
                    className="rounded-md cursor-pointer hover:bg-blue-600 cta-square p-1"
                    onClick={(e) => changeShape(e, "square",item)}
                    >
                    <div className="h-6 w-6 rounded border-2 border-solid border-white p-2"></div>
                    </div>
                </div> : <></>}
                </div>
            )
            }

        }
    }

    return(
        <>
        {generateGridShape(block,selectedBlock)}
        </>
    )
}

export default BlockContainer;