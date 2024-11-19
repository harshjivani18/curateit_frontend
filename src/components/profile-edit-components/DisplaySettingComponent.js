import { updateUser } from "@actions/user";
import SettingType from "@components/displaySettings/SettingType";
import { TextMessage } from "@utils/constants";
import { Select, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux"

const Option = Select;

const DisplaySettingComponent = ({user,isMobile=false}) => {
    const dispatch = useDispatch();
    const [showImage, setShowImage] = useState(user?.preferences?.show_image_option || false)
    const [showCode, setShowCode] = useState(user?.preferences?.show_code_option)
    const [sidebarPosition, setSidebarPosition] = useState(user?.preferences?.sidebar_position)
    const [sidebarView, setSidebarView] = useState(user?.preferences?.sidebar_view === 'auto_hide' ? false : true)
    const [profileType, setProfileType] = useState(user?.isPublic ? "public" : "private");

    const handleShowImageChange = async (checked) => {
    setShowImage(checked)
    const newState = {
      preferences: { ...user?.preferences, show_image_option: checked },
    }
    await dispatch(updateUser(newState))
    message.success(TextMessage.PROFILE_DISPLAY_UPDATE)
  }

    const handleSidebarViewChange = async (checked) => {
        if(checked === false){
            setSidebarView(checked)
            const newState = {
            preferences: { ...user?.preferences, sidebar_view: 'auto_hide' },
            }
            await dispatch(updateUser(newState))
            message.success(TextMessage.PROFILE_DISPLAY_UPDATE)
            return;
        }else{
            setSidebarView(checked)
            const newState = {
            preferences: { ...user?.preferences, sidebar_view: 'pinned' },
            }
            await dispatch(updateUser(newState))
            message.success(TextMessage.PROFILE_DISPLAY_UPDATE)
        }
  };

  const handleShowCodeChange = async (checked) => {
    setShowCode(checked)
     const newState = {
       preferences: {
         ...user?.preferences,
         show_code_option: checked,
       },
     }
    await dispatch(updateUser(newState))
    message.success(TextMessage.PROFILE_DISPLAY_UPDATE)
  }

  const handleProfileType = async (type) => {
    setProfileType(type);
    let newData = user
    if(type === "public"){
      newData = { isPublic: true }
    }else{
      newData = { isPublic: false }
    }
    await dispatch(updateUser(newData))
    message.success(TextMessage.PROFILE_DISPLAY_UPDATE)
  }

  const handleSidebarPosition = async (type) => {
    setSidebarPosition(type);
     const newState = {
       preferences: {
         ...user?.preferences,
         sidebar_position: type,
       },
     }
    await dispatch(updateUser(newState))
    message.success(TextMessage.PROFILE_DISPLAY_UPDATE)
  }

    return(
        <div className={`mt-4 ${isMobile ? 'px-4' : 'flex flex-col items-center justify-center'}`}>
            
                {!isMobile && <div className="flex justify-between items-center py-4 w-[50%]">
                    <p className="font-medium text-lg">Display Settings</p>
                    <></>
                </div>}

                <div className={`flex justify-between items-center py-4 ${isMobile ? 'w-full' : 'w-[50%]'}`}>
                    <p className="">Profile</p>
                    <Select
                        className=""
                        placeholder="Select"
                        value={profileType}
                        onChange={(value) => handleProfileType(value)}
                    >
                        <Option value={"public"}>Public</Option>
                        <Option value={"private"}>Private</Option>
                    </Select>
                </div>

                <div className={`flex justify-between items-center py-4 ${isMobile ? 'w-full' : 'w-[50%]'}`}>
                    <p className="">Sidebar position</p>
                    <Select
                        className="ml-3"
                        placeholder="Select"
                        value={sidebarPosition}
                        onChange={(value) => handleSidebarPosition(value)}
                    >
                        <Option value={"left"}>Left</Option>
                        <Option value={"right"}>Right</Option>
                    </Select>
                </div>

                <div className={`flex justify-between items-center py-4 ${isMobile ? 'w-full' : 'w-[50%]'}`}>
                    <SettingType
                        title="Pinned sidebar"
                        enableMenu={sidebarView}
                        handleChange={handleSidebarViewChange}
                    />
                </div>

                <div className={`flex justify-between items-center py-4 ${isMobile ? 'w-full' : 'w-[50%]'}`}>
                    <SettingType
                        title="Show image options"
                        enableMenu={showImage}
                        handleChange={handleShowImageChange}
                    />
                </div>

                <div className={`flex justify-between items-center py-4 ${isMobile ? 'w-full' : 'w-[50%]'}`}>
                    <SettingType
                        title="Show code options"
                        enableMenu={showCode}
                        handleChange={handleShowCodeChange}
                    />
                </div>

        </div>
    )
}

export default DisplaySettingComponent;