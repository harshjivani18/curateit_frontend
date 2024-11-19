import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { Drawer, } from "antd"

const BookmarkPreviewDrawer = ({isPreviewVisible,setIsPreviewVisible,previewBookmark,setPreviewBookmark}) => {

    return(
        <>
        <Drawer 
            width={typeof window !== "undefined" ? window.innerWidth * 0.6 : 0}
            title={
                <div className="flex items-center justify-between">
                    <div>Preview Gem</div>

                    <div title="Open in new tab" onClick={() => {
                            window.open(previewBookmark?.url || '', "_blank");
                        }}>
                        <ArrowTopRightOnSquareIcon className="h-5 w-5 cursor-pointer"/>
                    </div>
                </div>
            }
            placement="right" 
            onClose={() => {
                setIsPreviewVisible(false)
                setPreviewBookmark('')
            }} 
            open={isPreviewVisible}
            maskClosable={false}
            >
                <iframe type="text/html" title={previewBookmark?.title || 'Preview'} src={previewBookmark?.url} style={{ width: '100%', height: '100%' }} />
            </Drawer>
        </>
    )
}

export default BookmarkPreviewDrawer;