import { fetchPublicPromptGems, getBrandPrompts, getMyPrompts } from "@actions/ai-brands";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import { Button, Dropdown, message, Select, Spin, Switch, Tooltip, Typography }   from "antd";
import { useEffect, useState }     from "react";
import { BiInfoCircle, BiUser, BiUserVoice } from "react-icons/bi";
import { FaRobot } from "react-icons/fa6";
import { ImMagicWand } from "react-icons/im";
import { MdAlternateEmail, MdAttachFile, MdMoreVert, MdOutlineKeyboardVoice } from "react-icons/md";
import { useDispatch } from "react-redux";
import PromptList from "./PromptList";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { BsPencil, BsTrash } from "react-icons/bs";
import AddBookmark from "@components/drawers/AddBookmark";
import { deleteBookmark } from "@actions/bookmark";
import session from "@utils/session";
import SingleBookmarkDrawer from "@components/drawers/SingleBookmarkDrawer";
import { updateUser } from "@actions/user";
import { FaHashtag } from "react-icons/fa";
import { PROMPT_CATEGORY } from "@utils/ai-options";

const AIPromptsTab = ({ isMobile, user }) => {
    const dispatch                          = useDispatch();
    const [enableReading, setEnableReading] = useState(user?.ai_settings?.enableReading || false);
    const [enableWriting, setEnableWriting] = useState(user?.ai_settings?.enableWriting || false);
    const [enablePrompt, setEnablePrompt]   = useState(user?.ai_settings?.enablePrompts || false);
    const [enableOptText, setEnableOptText] = useState(user?.ai_settings?.enableOptText || false);
    const [enablePersonas, setEnablePersonas] = useState(user?.ai_settings?.enablePersona || false);
    const [enableIncludes, setEnableIncludes] = useState(user?.ai_settings?.enableIncludeOptions || false);
    const [enableVoice, setEnableVoice] = useState(user?.ai_settings?.enableBrandVoice || false);
    const [enableModels, setEnableModels] = useState(user?.ai_settings?.enableModels || false);
    const [enableLanguage, setEnableLanguage] = useState(user?.ai_settings?.enableLanguage || false);
    const [enableFileAttach, setEnableFileAttach] = useState(user?.ai_settings?.enableAttachFile || false);
    const [enableDictate, setEnableDictate] = useState(user?.ai_settings?.enableDictate || false);

    const [showAddPrompt, setShowAddPrompt] = useState(false);
    const [showEditPrompt, setShowEditPrompt] = useState(false);
    const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
    // const [isLoadingPublicPrompt, setIsLoadingPublicPrompt] = useState(false);
    const [myPrompts, setMyPrompts]         = useState([]);
    // const [publicPromptGems, setPublicPromptGems] = useState([]);
    // const [brandPrompts, setBrandPrompts]   = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [singleGemId, setSingleGemId]     = useState(null);
    const [selectedMediaType,
           setSelectedMediaType ]           = useState("Ai Prompt");  
    const [promptFilter, setPromptFilter]   = useState("All Prompt");          

    useEffect(() => {
        setIsLoadingPrompt(true);
        dispatch(getMyPrompts()).then(res => {
            setIsLoadingPrompt(false);
            if (res?.payload?.data?.data) {
                setMyPrompts(res.payload.data.data);
            }
        }) 

        // setIsLoadingPublicPrompt(true);
        // dispatch(getBrandPrompts()).then(res => {
        //     if (res?.payload?.data?.data) {
        //         setBrandPrompts(res.payload.data.data);
        //     }
        //     dispatch(fetchPublicPromptGems()).then(publicGemsRes => {
        //         setIsLoadingPublicPrompt(false);
        //         if (publicGemsRes?.payload?.data?.data) {
        //             setPublicPromptGems(publicGemsRes.payload.data.data);
        //         }
            
        //     })
        // })
    }, []);

    const onAddNewBookmarkClick = () => {
        setShowAddPrompt(true);
    }

    const onPromptDragEnd = (result) => {
        setMyPrompts(result);
    }

    const onEditComplete = (objArr) => {
        const updatedPromptIdx = myPrompts.findIndex(item => item.id === currentPrompt.id)
        if (updatedPromptIdx !== -1 && objArr.length > 0) {
            myPrompts[updatedPromptIdx] = { ...objArr[0] }
            setMyPrompts([...myPrompts])
        }
        setShowEditPrompt(false)
        setCurrentPrompt(null)
        setSingleGemId(null)
    }

    const onAddClose = () => {
        setShowAddPrompt(false)
    }

    const onEditClose = () => {
        setShowEditPrompt(false)
        setCurrentPrompt(null)
        setSingleGemId(null)
    }

    const onSaveAndClose = (obj) => {
        setShowAddPrompt(false)
        setMyPrompts([...myPrompts, obj])
    }

    const onChangeFlag = async (flag, value, callback) => {
        const newObj = {
            ...user,
            ai_settings: {
                ...user.ai_settings,
                [flag]: value
            }
        }
        const res    = await dispatch(updateUser(newObj))
        if (res.error === undefined) {
            callback(value)
            message.success("Settings updated successfully")
        }
        else {
            message.error("Failed to update settings")
        }
    }

    const renderPromptItem = (prompt) => {
        const defaultItems = [
            {
                label: "Edit",
                key: "edit",
                icon: <BsPencil className='h-4 w-4 mr-2' />
            },
            {
                label: "Delete",
                key: "delete",
                icon: <BsTrash className='h-4 w-4 mr-2' />,
                danger: true
            }
        ]
        const currentPromptDetails = prompt?.expander?.find(item => item.type === "prompt")?.plainText || prompt.description;
        return (
            <PromptList.Item key={prompt.id} id={prompt.id}>
                <PromptList.DragHandle />
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            {prompt?.metaData?.defaultIcon && <img src={prompt?.metaData?.defaultIcon} className="w-5 h-5 mr-2" />}
                            <Typography.Title level={5} className="text-[#4B4F5D]">{prompt.title}</Typography.Title>
                        </div>
                        <Tooltip title={currentPromptDetails}>
                            <Typography.Text type="secondary">{currentPromptDetails?.length > 100 ? currentPromptDetails?.slice(0, 100)?.concat("...") : currentPromptDetails}</Typography.Text>
                        </Tooltip>
                    </div>
                    <Dropdown menu={{
                        items: defaultItems,
                        onClick: async (e) => {
                            const { key } = e
                            if (key === "edit") {
                                setShowEditPrompt(true)
                                setCurrentPrompt(prompt)
                                setSingleGemId(prompt.id)
                            }
                            else if (key === "delete") {
                                const res = await dispatch(deleteBookmark(prompt.id))
                                if (res.error === undefined && res.payload.error === undefined) {
                                    message.success("Prompt deleted successfully")
                                    setMyPrompts(myPrompts.filter(item => item.id !== prompt.id))
                                }
                            }
                        }
                    }}>
                        <MdMoreVert className='h-5 w-5' />
                    </Dropdown>
                </div>
            </PromptList.Item>
        )
    }

    // const renderPublicPromptItem = (promptName, promptDesc, icon) => {
    //     return (
    //         <li className="ct-prompt-item">
    //             <div className="flex items-center justify-between w-full">
    //                 <div className="flex flex-col">
    //                     <div className="flex flex-row">
    //                         {icon && <img src={icon} className="w-5 h-5 mr-2" />}
    //                         <Typography.Title level={5} className="text-[#4B4F5D]">{promptName}</Typography.Title>
    //                     </div>
    //                     <Tooltip title={promptDesc}>
    //                         <Typography.Text type="secondary">{promptDesc?.length > 100 ? promptDesc?.slice(0, 100)?.concat("...") : promptDesc}</Typography.Text>
    //                     </Tooltip>
    //                 </div>
    //             </div>
    //         </li>
    //     )
    // }

    // const renderBrandPrompts = (brandPrompts) => {
    //     return brandPrompts.map((brandPrompt) => {
    //         return renderPublicPromptItem(brandPrompt.name, brandPrompt.description, brandPrompt.icon)
    //     })
    // }

    // const renderPublicPromptGems = (publicPromptGems) => {
    //     return publicPromptGems.map((publicPromptGem) => {
    //         const promptDetails = publicPromptGem?.expander?.find(item => item.type === "prompt")?.plainText || publicPromptGem.description;
    //         return renderPublicPromptItem(publicPromptGem.title, promptDetails, publicPromptGem?.metaData?.defaultIcon || null)
    //     })
    // }

    return (
        <div>
            <div className="flex items-center justify-between mt-4 mb-5">
                <div className="flex items-center justify-between w-[50%] mr-5">
                    <div className="flex items-center">
                        <Typography.Text className="text-[#4B4F5D]">Enable while reading</Typography.Text>
                        <Tooltip title="Enable while reading"><BiInfoCircle className="w-5 h-5 ml-2 text-[#347AE2]" /></Tooltip>
                    </div>
                    <div className="flex items-center">
                        <Switch style={{ background: enableReading ? "#1890ff" : "#00000040" }} checked={enableReading} onChange={(value) => onChangeFlag("enableReading", value, setEnableReading)} />
                    </div>
                </div>
                <div className="flex items-center justify-between w-[50%]">
                    <div className="flex items-center">
                        <Typography.Text className="text-[#4B4F5D]">Enable while writing</Typography.Text>
                        <Tooltip title="Enable while writing"><BiInfoCircle className="w-5 h-5 ml-2 text-[#347AE2]" /></Tooltip>
                    </div>
                    <div className="flex items-center">
                        <Switch style={{ background: enableWriting ? "#1890ff" : "#00000040" }} checked={enableWriting} onChange={(value) => onChangeFlag("enableWriting", value, setEnableWriting)} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between mt-4 mb-5">
                <label className="font-[16px] font-bold mb-3">AI Chatbot settings</label>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between w-[50%] mr-5">
                        <div className="flex items-center">
                            <MdAlternateEmail className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Prompts</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enablePrompt ? "#1890ff" : "#00000040" }} checked={enablePrompt} onChange={(value) => onChangeFlag("enablePrompts", value, setEnablePrompt)} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-[50%]">
                        <div className="flex items-center mr-[100px]">
                            <FaRobot className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">AI models</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableModels ? "#1890ff" : "#00000040" }} checked={enableModels} onChange={(value) => onChangeFlag("enableModels", value, setEnableModels)} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between w-[50%] mr-5">
                        <div className="flex items-center mr-[100px]">
                            <ImMagicWand className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Optimize text</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableOptText ? "#1890ff" : "#00000040" }} checked={enableOptText} onChange={(value) => onChangeFlag("enableOptText", value, setEnableOptText)} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-[50%]">
                        <div className="flex items-center mr-[100px]">
                            <GlobeAltIcon className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Language</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableLanguage ? "#1890ff" : "#00000040" }} checked={enableLanguage} onChange={(value) => onChangeFlag("enableLanguage", value, setEnableLanguage)} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between w-[50%] mr-5">
                        <div className="flex items-center mr-[100px]">
                            <BiUser className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Personas</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enablePersonas ? "#1890ff" : "#00000040" }} checked={enablePersonas} onChange={(value) => onChangeFlag("enablePersona", value, setEnablePersonas)} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-[50%]">
                        <div className="flex items-center mr-[100px]">
                            <MdAttachFile className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Attach files</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableFileAttach ? "#1890ff" : "#00000040" }} checked={enableFileAttach} onChange={(value) => onChangeFlag("enableAttachFile", value, setEnableFileAttach)} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between w-[50%] mr-5">
                        <div className="flex items-center mr-[100px]">
                            <BiUserVoice className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Brand voice</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableVoice ? "#1890ff" : "#00000040" }} checked={enableVoice} onChange={(value) => onChangeFlag("enableBrandVoice", value, setEnableVoice)} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-[50%]">
                        <div className="flex items-center mr-[100px]">
                            <MdOutlineKeyboardVoice className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Dictate</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableDictate ? "#1890ff" : "#00000040" }} checked={enableDictate} onChange={(value) => onChangeFlag("enableDictate", value, setEnableDictate)} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between w-[50%] mr-5">
                        <div className="flex items-center mr-[100px]">
                            <FaHashtag className="h-5 w-5 mr-2" />
                            <Typography.Text className="text-[#4B4F5D]">Include Options</Typography.Text>
                        </div>
                        <div className="flex items-center">
                            <Switch style={{ background: enableIncludes ? "#1890ff" : "#00000040" }} checked={enableIncludes} onChange={(value) => onChangeFlag("enableIncludeOptions", value, setEnableIncludes)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between mt-4 mb-5">
                <label className="font-[16px] font-bold text-[#347AE2] mb-3">My Prompts</label>
                <div className="flex items-center justify-between mb-5">
                    <Button type="primary" className="w-[200px] h-[40px] flex items-center justify-center ct-prompt-add-btn mb-3" onClick={onAddNewBookmarkClick}>+ Add new prompt</Button>
                    <Select value={promptFilter}
                            onChange={(val) => {
                                setPromptFilter(val);
                            }}
                            placeholder="Select prompt category"
                            className="w-[200px] h-[40px]"
                            options={["All Prompt", ...PROMPT_CATEGORY].map((item) => ({ label: item, value: item }))}
                    />    
                </div>
                <div className="flex mb-3">
                    {isLoadingPrompt 
                        ? <Spin /> 
                        : myPrompts?.filter((p) => {
                            if (promptFilter === "All Prompt") {
                                return true;
                            }
                            return p.prompt_category === promptFilter;
                        })?.length > 0 
                            ?   <PromptList myPrompts={myPrompts?.filter((p) => {
                                        if (promptFilter === "All Prompt") {
                                            return true;
                                        }
                                        return p.prompt_category === promptFilter;
                                    })} 
                                      onDragEnd={onPromptDragEnd} 
                                      renderItem={renderPromptItem} />
                            :   <div className="text-xl w-full flex justify-center items-center">
                                    <div className="relative mt-2">
                                        <img
                                            className="h-50 w-50 my-0 mx-auto"
                                            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                                            alt="Cloud ellipse icons"
                                        />
                                        <div className="justify-center w-full text-xs text-center text-gray-400">
                                            <p className="text-center">No prompts found</p>
                                        </div>
                                    </div>
                                </div>
                    }
                </div>
            </div>
            {/* <div className="flex flex-col justify-between mt-4 mb-5">
                <label className="font-[16px] font-bold text-[#347AE2] mb-3">Public Prompts</label>
                <div className="flex mb-3">
                    <ul className="ct-prompt-list">
                        {brandPrompts.length > 0 && renderBrandPrompts(brandPrompts)}
                        {publicPromptGems.length > 0 && renderPublicPromptGems(publicPromptGems)}
                        {isLoadingPublicPrompt ? <Spin /> : null}
                    </ul>
                </div>
            </div> */}
            {showAddPrompt && 
                <AddBookmark
                    open={showAddPrompt}
                    setOpen={setShowAddPrompt}
                    selectedMediaType={selectedMediaType}
                    setSelectedMediaType={setSelectedMediaType}
                    isLoggedIn={true}
                    onClose={onAddClose}
                    onSaveAndClose={onSaveAndClose}
                    isTypeAiPrompt={true}
                    page="prompt-page"
                />
            }
            {showEditPrompt && currentPrompt &&
                <SingleBookmarkDrawer
                    setOpenDrawer={setShowEditPrompt}
                    setGemSingleIdSingleId={setSingleGemId}
                    openDrawer={showEditPrompt}
                    gemSingleId={singleGemId}
                    submit={onEditComplete}
                    onClose={onEditClose}
                    // page="bookmark"
                    editPagesIn={
                        session ? session?.editPagesInSession : "side peek"
                    }
                />
            }
        </div>
    )
}

export default AIPromptsTab;