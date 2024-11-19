import { Button } from "antd";

const BioServiceComponent = ({item,index,type='',setSelectedMediaType,setOpenDrawer,setOpenModal,setSelectedNoteType=() => {},setSelectedFileType=() => {},setSelectedPlatform=() => {},setSelectedProfileType=()=>{}}) => {

    const handleSelectMediaType = (item) => {
        if(type === 'services' && item?.name === 'Pinterest' || item?.name === 'Soundcloud' || item?.name === 'Spotify' || item?.name === 'Youtube' || item?.name === 'Vimeo' || item?.name === 'Apple Music'){
            setSelectedFileType('url')
        }
        if(type === 'services' && item?.name === 'X' || item?.name === 'Instagram' || item?.name === 'TikTok' || item?.name === 'Facebook' || item?.name === 'Medium' || item?.name === 'Github' || item?.name === 'Threads' || item?.name === 'LinkedIn' || item?.name === 'Reddit' || item?.name === 'Snapchat' || item?.name === 'Gitlab' || item?.name === 'Mastodon'){
            setSelectedPlatform(item?.platform)
        }
        if(type === 'media_type' && item?.media_type === 'Note'){
            setSelectedNoteType(item?.noteType)
        }

        if(type === 'profile'){
            setSelectedPlatform(item?.platform)
        }

        if(type === 'contact'){
            setSelectedProfileType('contact')
            setSelectedPlatform('Twitter')
        }
        setOpenModal(false)
        setSelectedMediaType(item?.media_type)
        setOpenDrawer(true)
    }
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return(
        <>
        <div className="flex items-center group hover:bg-[#f3f3f1] p-4 cursor-pointer rounded-lg" key={index}
        onClick={() => handleSelectMediaType(item)}
        >
            <div className={`border border-solid shadow w-fit p-2 rounded-md`}
            style={{
                backgroundColor: type === 'media_type' ? item?.bgColor : 'white'
            }}
            >
                {
                item?.type === 'logo' ?
                <img className='w-6 h-6 object-contain' src={item?.imgSrc ? item?.imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/24x24_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`} alt={item.name || item.description || "Bio service icon"} /> : item.icon
                }
            </div>

            <div className="flex items-center ml-4 w-full justify-between">
                <div className="flex flex-col">
                    <p className="font-medium text-base">{item.name}</p>
                    <p className="mt-1 text-sm text-[#676b5f]">{item.description}</p>
                </div>

                <Button className="ml-2 text-[#347AE2] rounded-[50%] bg-transparent font-medium hover:text-[#347AE2] group-hover:bg-white" type="text" onClick={() => handleSelectMediaType(item)}>
                    Add
                </Button>
            </div>
        </div>
        </>
    )
}

export default BioServiceComponent;