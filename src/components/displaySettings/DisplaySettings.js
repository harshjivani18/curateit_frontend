
import { Collapse } from "antd"
import SettingType from '@components/displaySettings/SettingType'
import "./style.css";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import ButtonToggleSetting from '@components/displaySettings/ButtonToggle';
import { BiDotsVertical } from 'react-icons/bi';
import { BsPinAngle } from 'react-icons/bs';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/user';

const { Panel } = Collapse

const PROFILE_OPTIONS = [
  {
    id: 1,
    value: "public",
    text: "Public"
  },
  {
    id: 2,
    value: "private",
    text: "Private"
  },
]

const SIDEBAR_OPTIONS = [
  {
    id: 1,
    value: "left",
    text: "Left"
  },
  {
    id: 2,
    value: "right",
    text: "Right"
  },
]

const SIDEBAR_VIEW_OPTIONS = [
  {
    id: 1,
    value: "auto_hide",
    text: "Auto hide",
    icon: <BiDotsVertical className="w-4 h-4" />,
  },
  {
    id: 2,
    value: "pinned",
    text: "Pinned",
    icon: <BsPinAngle className="w-4 h-4" />,
  },
]

const DisplaySetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.userData);
  const [showImage, setShowImage] = useState(user?.preferences?.show_image_option)
  const [showCode, setShowCode] = useState(user?.preferences?.show_code_option)
  const [sidebarPosition, setSidebarPosition] = useState(user?.preferences?.sidebar_position)
  const [sidebarView, setSidebarView] = useState(user?.preferences?.sidebar_view)
  const [profileType, setProfileType] = useState(user?.isPublic ? "public" : "private");

  const handleShowImageChange = async (checked) => {
    setShowImage(checked)
    const newState = {
      preferences: { ...user?.preferences, show_image_option: checked },
    }
    await dispatch(updateUser(newState))
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
  }

  const handleSidebarView = async (type) => {
    setSidebarView(type)
    const newState = {
      preferences: { ...user?.preferences, sidebar_view: type },
    }
    await dispatch(updateUser(newState))
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
  }


  return (
    <div>
      <Collapse
        bordered={true}
        expandIcon={(status) => {
          return (
            <div>
              {status.isActive ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          )
        }}
        expandIconPosition="end"
      >
        <Panel
          header={
            <div className='pl-2'>
              <h2 className="font-bold text-gray-600">DISPLAY SETTINGS</h2>
            </div>
          }
          key="1"
        >
          <div className='p-2'>
            {/* <SettingType title="Show sidebar" enableMenu={true} /> */}
            <SettingType
              title="Show image options"
              enableMenu={showImage}
              handleChange={handleShowImageChange}
            />
            <SettingType
              title="Show code options"
              enableMenu={showCode}
              handleChange={handleShowCodeChange}
            />
            {/* <SettingType title="Side bar view" enableMenu={true} /> */}
            <ButtonToggleSetting
              title="Sidebar Position"
              options={SIDEBAR_OPTIONS}
              mode={sidebarPosition}
              handleModeChange={handleSidebarPosition}
            />
            <ButtonToggleSetting
              title="Profile"
              options={PROFILE_OPTIONS}
              mode={profileType}
              handleModeChange={handleProfileType}
            />
            <ButtonToggleSetting
              title="Sidebar View"
              options={SIDEBAR_VIEW_OPTIONS}
              mode={sidebarView}
              handleModeChange={handleSidebarView}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default DisplaySetting;