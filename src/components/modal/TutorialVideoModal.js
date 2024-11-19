import { getTutorialVideoForMediaTypes } from "@utils/commonFunctions";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player/youtube'

const TutorialVideoModal = ({openTutorialVideoModal,setOpenTutorialVideoModal,isMobileView,selectedType}) => {
    const [url,setUrl] = useState('')

    useEffect(() => {
        if(selectedType?.name){
            setUrl(getTutorialVideoForMediaTypes(selectedType?.name))
        }
    },[selectedType])

    return(
        <>
        <Modal
          title={null}
          open={openTutorialVideoModal}
          footer={null}
          maskClosable={true}
          onCancel={() => setOpenTutorialVideoModal(false)}
          width={isMobileView ? "90%" : "450px"}
          bodyStyle={{
            padding:'0px'
          }}
          closable={false}
        >
          {
          url ?
          <ReactPlayer
            url={url} 
            playing={false}
            controls={true}
            width="100%"
          />
          :
          <div className="h-[300px]">
            <div className="font-medium flex items-center justify-center text-xl h-full">Video coming soon...</div>
          </div>
          }
      </Modal>
        </>
    )
}

export default TutorialVideoModal;