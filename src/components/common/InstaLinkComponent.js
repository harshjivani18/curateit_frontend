import { LinkIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { getDomainFromURL } from "@utils/constants"

const InstaLinkComponent = ({item,setCurrentItem,setShowModal,isOwnUser}) => {

    const renderMedia = (item) => {
        if(item.fileType === "IMAGE"){
            return(
                <div classsName='w-full' style={{position:'relative'}} onClick={(e) => {
                    e.stopPropagation()
                    window.open(item?.redirect_url, "_blank");
                }}>
                    <div className="instawall-gradient after:h-[50%] md:after:h-[0%] md:hover:after:h-[50%]">
                        <img
                            src={item?.S3_link[0]}
                            alt="Instagram Image"
                            />
                    </div>

                    <div className='bottom-[25px] text-sm px-1 opacity-100 md:opacity-0 group-hover:opacity-100 truncate md:px-2 font-medium md:text-base absolute md:bottom-[80px] right-0 text-white w-full'>
                        {item?.title}
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 px-2 instawall-description w-full absolute md:bottom-[40px] right-0 my-1">
                        {item?.description}
                    </div>

                    <div className="bottom-[5px] px-1 opacity-100 md:opacity-0 group-hover:opacity-100 w-full flex items-center  absolute md:bottom-[15px] right-0 md:px-2 truncate">
                        <LinkIcon className="text-[#EBEFF4] h-3 w-3 mr-1"/>
                        <div className="text-xs text-[#EBEFF4] underline truncate">{getDomainFromURL(item?.redirect_url)}</div>
                    </div>
                </div>
            )
        }

        if(item.fileType === "VIDEO"){
            return(
                <div classsName='w-full' style={{position:'relative'}} onClick={(e) => {
                    e.stopPropagation()
                    window.open(item?.redirect_url, "_blank")
                }}>
                    <div className="instawall-gradient after:h-[50%] md:after:h-[0%] md:hover:after:h-[50%]">
                        <video
                            controls
                            src={item?.S3_link[0]}
                            autoPlay
                            loop
                            muted
                            width={'100%'}
                            height={'fit-content'}
                        />
                    </div>

                    <div className='bottom-[25px] px-1 text-sm opacity-100 md:opacity-0 group-hover:opacity-100 truncate md:px-2 font-medium md:text-base absolute md:bottom-[80px] right-0 text-white w-full'>
                        {item?.title}
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 px-2 instawall-description w-full absolute md:bottom-[40px] right-0 my-1">
                        {item?.description}
                    </div>

                    <div className="bottom-[5px] px-1 opacity-100 md:opacity-0 group-hover:opacity-100 w-full flex items-center  absolute md:bottom-[15px] right-0 md:px-2 truncate">
                        <LinkIcon className="text-[#EBEFF4] h-3 w-3 mr-1"/>
                        <div className="text-xs text-[#EBEFF4] underline truncate">{getDomainFromURL(item?.redirect_url)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    return(
        <div className="group p-1 md:p-3 rounded-lg bg-white border border-solid border-[#ABB7C9] w-full h-fit hover:bg-[#00000066] relative">
            {renderMedia(item)}

            {isOwnUser && <div className={`cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 md:top-5 md:right-5`}>
                <div title="Edit"
                    className="bg-[#E5F0FF] border border-solid border-[#ABB7C9] rounded h-fit p-[2px] w-fit"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentItem(item);
                        setShowModal(true)
                    }}
                >
                    <PencilSquareIcon className="h-4 w-4 md:h-5 md:w-5 text-[#347AE2]"/>
                </div>
            </div>}

        </div>
    )
}

export default InstaLinkComponent;