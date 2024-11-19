import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Avatar, Button } from "antd"
import MoodboardMediaTypeCard from "../MoodboardMediaTypeCard"
// import { getDomainFromURL } from "@utils/constants"

const ApproveRejectCard = ({item, onEditClick, isMobileView='',currentTab,handleApprove=()=>{},handleReject=()=>{},loading='',}) => {
    const imgSrc = (item?.metaData && item?.metaData?.covers?.length !== 0) ? (item?.metaData?.covers?.[0] || item?.metaData?.app_screenshot) : ''

    const favSrc = (item?.metaData && item?.metaData.length !== 0) ? typeof item?.metaData?.icon === 'string' ?    item?.metaData?.icon : (typeof item?.metaData?.icon === 'object' &&  item?.metaData?.icon?.type === 'image') ? item?.metaData?.icon?.icon : item?.metaData?.defaultIcon ? item?.metaData?.defaultIcon : '' : ''

    const mediaImgsrc = (item?.media && item?.media?.covers && item?.media?.covers?.length !== 0) ? item?.media?.covers[0] : ''

    const s3Src = (item?.media_type === "Image" || item?.media_type === "Screenshot") && (item?.S3_link && item?.S3_link?.length !== 0) ? item?.S3_link[0]  : null

    const renderCardImage = (imgSrc, favSrc, altInfo,) => {
        return(
            <div>
                <div className="flex items-center py-2 px-4">
                    <Avatar
                    size={'small'}
                    style={{
                        color: 'white',
                        backgroundColor:  (currentTab === 'pending') || (currentTab === 'resolved' && !item?.isApproved) ? '#347ae2' : '#575C70',
                    }}
                    >
                        {item?.author ? item?.author?.firstname?.charAt(0)?.toUpperCase() : 'A'}
                    </Avatar>
                    <div className={`ml-1 font-medium ${(currentTab === 'pending') || (currentTab === 'resolved' && !item?.isApproved) ? 'text-[#344054]' : 'text-[#575C70]'}`}>
                        {item?.author ? item?.author?.username : 'Anonymous'}
                    </div>
                </div>
                {/* { 
                    (item?.media_type !== "Ai Prompt" && item?.media_type !== "Text Expander") && <div className="flex items-center justify-center">
                        {
                        imgSrc ?
                            <img alt={altInfo}
                                className={`object-scale-down h-[150px] max-w-[100%] object-center w-[100%]`}
                                src={imgSrc ? imgSrc : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                style={{
                                    filter:  (currentTab === 'pending') || (currentTab === 'resolved' && !item?.isApproved) ? 'grayscale(0)' : 'grayscale(1)'
                                }}
                            />
                            : <img alt={altInfo}
                                className={` object-scale-down h-[150px]`}
                                src={favSrc ? favSrc : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`}
                                style={{
                                    filter:  (currentTab === 'pending') || (currentTab === 'resolved' && !item?.isApproved) ? 'grayscale(0)' : 'grayscale(1)'
                                }}
                            />
                        }
                </div>
                } */}
            </div>
        )
    }


    const openGemInWindow = (item) => {
        window.open(item?.url || '', "_blank");
    }

    const renderAITextExpander = (item) => {
        if (item?.media_type === "Ai Prompt" || item?.media_type === "Text Expander") {
            let text = item?.expander && item?.expander.filter(ex => ex.type === 'expander' || ex.type === 'prompt')[0]?.text
            let textWithoutSpaces = text;
            textWithoutSpaces = textWithoutSpaces?.replace(/(\()([\w\s]+)(\))/g, '<span class="variable-container"><span placeholder="$1" id="variable__$1" class="variable-input" list="$1"></span><datalist id="$1"></datalist></span>')
                            .replace(/(\{)([\w\s]+)(\})/g, '<span class="variable-container"><span placeholder="$2" id="variable__$2" class="variable-input" list="$2"></span><datalist id="$2"></datalist></span>');
    
            return (
              <div className='w-full p-2' style={{position:'relative',background:'white'}}>
                  <div className="mood-word-wrap" dangerouslySetInnerHTML={{__html: textWithoutSpaces}} />
              </div>
            )
        } else {
            return (
                <div>
                    <span className={`font-medium block ${((currentTab === 'pending') || currentTab === 'resolved' && item?.isApproved) ? 'text-[#575C70]' : 'text-[#347AE2]'}`}>{item?.title?.length > 100
                        ? item?.title?.slice(0, 100)?.concat("...")
                        : (item?.title || '')}</span>
    
                    <span className={`block ${((currentTab === 'pending') || currentTab === 'resolved' && item?.isApproved) ? 'text-[#7C829C]' : 'text-[#062046]'}`}>{item?.description?.length > 150
                        ? item?.description?.slice(0, 150)?.concat("...")
                        : (item?.description || '')}</span>
                </div>
            );
        }
    }

    return(
        <>
        {/* <Card
            cover={renderCardImage(s3Src || imgSrc || mediaImgsrc, favSrc, item?.altInfo || item?.title || item?.description || "")}
            className={'border border-solid border-[#DADEE8] group hover:border-2 relative my-2'}
            style={{
                height: '100%', cursor: 'pointer',
            }}
            >
            <div
                className={`p-1 absolute top-0 right-0 flex ${item.media_type === "Ai Prompt" ?  "justify-end" : "justify-between" } h-full w-full ${isMobileView ? 'opacity-100' : 'opacity-0'} ${!isMobileView && 'transition-opacity  group-hover:opacity-100 group-hover:shadow-xl shadow-gray-700'}`}>
                    <div></div>
                    {item.media_type === "Ai Prompt" && <div className="bg-white border border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1 mr-1" title="Open in new tab"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation();
                                onEditClick && onEditClick(item.id)
                            }}
                        >
                        <PencilSquareIcon className="h-5 w-5" />
                    </div>}
                    <div className="bg-white border border-solid border-[#DFE4EC] rounded-[2px] shadow w-fit h-fit p-1" title="Open in new tab"
                            onClick={(e) => {
                                e.stopPropagation();
                                openGemInWindow(item)
                            }}
                        >
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </div>
            </div>

            { 
                renderAITextExpander(item)
            }
            
            {
            currentTab === 'pending' &&
            <>
            <div className="mt-2 w-full flex items-center justify-end">
                <Button type="primary" className={`border-[#347AE2] !bg-[#B8D4FE] hover:bg-[#B8D4FE] hover:border-[#347AE2] rounded-full mr-2 text-[#347AE2] hover:text-[#347AE2]`}
                onClick={() => handleReject(item)}
                disabled={loading}
                >Reject</Button>
            
                <Button type="primary" className={`border-[#105FD3] !bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded-full`}
                onClick={() => handleApprove(item,currentTab)}
                disabled={loading}
                >Approve</Button>

                <span className="block text-[#323543]">{item?.processAt}</span>
                
            </div>
            </>
            }

            {
            currentTab === 'resolved' &&
            <>
            <div className="mt-2 w-full flex items-center justify-end">

                {!item?.isApproved &&
                <Button type="primary" className={`border-[#105FD3] !bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded-full`}
                onClick={() => handleApprove(item,currentTab)}
                disabled={loading}
                >Approve</Button>}

                {
                currentTab === 'resolved' && item?.isApproved &&
                <span className="block text-[#323543]">{item?.processAt}</span>
                }
            </div>
            </>
            }
        </Card> */}

        <div className="bg-white rounded-md py-2 px-3 group border border-solid border-[#ABB7C9] shadow my-4">

        <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
                    <Avatar
                    size={'small'}
                    style={{
                        color: 'white',
                        backgroundColor:  (currentTab === 'pending') || (currentTab === 'resolved' && !item?.isApproved) ? '#347ae2' : '#575C70',
                    }}
                    >
                        {item?.author ? item?.author?.firstname?.charAt(0)?.toUpperCase() : 'A'}
                    </Avatar>
                    <div className={`ml-1 font-medium ${(currentTab === 'pending') || (currentTab === 'resolved' && !item?.isApproved) ? 'text-[#344054]' : 'text-[#575C70]'}`}>
                        {item?.author ? item?.author?.username : 'Anonymous'}
                    </div>
            </div>

            {currentTab === 'pending' && <div title="Edit"
                className="cursor-pointer bg-white border border-solid border-[#DFE4EC] rounded h-fit p-[2px]"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation();
                    onEditClick && onEditClick(item.id)
                }}
            >
                <PencilSquareIcon className="h-5 w-5"/>
            </div>}
        </div>
        
        <div className="my-2">
            <MoodboardMediaTypeCard
            item={item}
            page='approve-reject'
            />
        </div>

        <div>
            {
            currentTab === 'pending' &&
            <>
            <div className="mt-2 w-full flex items-center justify-end">
                <Button type="primary" className={`border-[#347AE2] !bg-[#B8D4FE] hover:bg-[#B8D4FE] hover:border-[#347AE2] rounded-full mr-2 text-[#347AE2] hover:text-[#347AE2]`}
                onClick={() => handleReject(item)}
                disabled={loading}
                >Reject</Button>
            
                <Button type="primary" className={`border-[#105FD3] !bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded-full`}
                onClick={() => handleApprove(item,currentTab)}
                disabled={loading}
                >Approve</Button>

                <span className="block text-[#323543]">{item?.processAt}</span>
                
            </div>
            </>
            }

            {
            currentTab === 'resolved' &&
            <>
            <div className="mt-2 w-full flex items-center justify-end">

                {!item?.isApproved &&
                <Button type="primary" className={`border-[#105FD3] !bg-[#105FD3] hover:bg-[#105FD3] hover:border-[#105FD3] rounded-full`}
                onClick={() => handleApprove(item,currentTab)}
                disabled={loading}
                >Approve</Button>}

                {
                currentTab === 'resolved' && item?.isApproved &&
                <span className="block text-[#323543]">{item?.processAt}</span>
                }
            </div>
            </>
            }
        </div>

        </div>
        </>
    )
}

export default ApproveRejectCard;