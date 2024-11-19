import { useEffect, useState }                  from "react";
import { useDispatch, useSelector }             from "react-redux";

import AIDropDown                               from "./AIDropDown";
import AIAntSelect                              from "./AIAntSelect";
import AIBrandModal                             from "./AIBrandModal";
import AIApiKeyInput                            from "./AIApiKeyInput";
import { 
    CHATGPT_LANG, 
    CLOUDE_LANG, 
    DEFAULT_AI_OPTIONS, 
    DEMO_VOICE_TEXT, 
    GEMINI_LANG, 
    LISTEN_VOICES, 
    PERSONA_BRAND_TYPE, 
    VOICE_BRAND_TYPE 
}                                               from "@utils/ai-options";

import { deleteBrand, fetchChatAudio, fetchPersonas, fetchVoices }           from "@actions/ai-brands";
import { updateUser } from "@actions/user";
import { message } from "antd";

const AIGeneralTab = ({ user }) => {
    const dispatch                      = useDispatch();
    const { personas, voices }          = useSelector(state => state.aiBrands);
    // const user                  = useSelector((state) => state?.users?.userData);                 
    const [showModal, setShowModal]     = useState(false);
    // const [loading, setLoading]         = useState(false);
    const [currentBrand,
           setCurrentBrand]             = useState(null);
    const [brandType,
           setBrandType]                = useState(PERSONA_BRAND_TYPE);
    const [currentAction,
           setCurrentAction]            = useState("create");
    const [defaultAI, setDefaultAI]     = useState(user ? user?.ai_settings?.defaultAI : "");
    const [defaultAIVoice, 
           setDefaultAIVoice]           = useState(user ? user?.ai_settings?.defaultAIVoice : "");
    const [currentLang, setCurrentLang] = useState(user ? user?.ai_settings?.defaultLanguage : "");
    const [brandVoice, setBrandVoice]   = useState(user ? user?.ai_settings?.defaultBrandVoiceId : null);
    const [persona, setPersona]         = useState(user ? user?.ai_settings?.defaultBrandPersona : null);
    const [openApiKey, setOpenApiKey]   = useState(user ? user?.ai_settings?.openAIKey : null);
    const [claudeApiKey, 
           setClaudeApiKey]             = useState(user ? user?.ai_settings?.claudeAPIKey : null);
    const [geminiApiKey,
           setGeminiApiKey]             = useState(user ? user?.ai_settings?.geminiAPIKey : null);
    const [isAudioLoading,
        setIsAudioLoading]              = useState(false);
    
    useEffect(() => {
        dispatch(fetchPersonas())
        dispatch(fetchVoices())
    }, [])

    useEffect(() => {
        if (user) {
            setDefaultAI(user?.ai_settings?.defaultAI)
            setCurrentLang(user?.ai_settings?.defaultLanguage)
            setBrandVoice(user?.ai_settings?.defaultBrandVoiceId)
            setPersona(user?.ai_settings?.defaultBrandPersona)
            setDefaultAIVoice(user?.ai_settings?.defaultAIVoice)
            setOpenApiKey(user?.ai_settings?.openAIKey)
            setClaudeApiKey(user?.ai_settings?.claudeAPIKey)
            setGeminiApiKey(user?.ai_settings?.geminiAPIKey)
        }
    }, [user])

    // useEffect(() => {
    //     if (!loggedInUser || (Array.isArray(loggedInUser) && loggedInUser.length === 0)) {
    //         setLoading(true)
    //         dispatch(getUserDetails()).then(res => {
    //             const userDetails = res?.payload?.data
    //             if (userDetails) {
    //                 setDefaultAI(userDetails.ai_settings?.defaultAI)
    //                 setCurrentLang(userDetails.ai_settings?.defaultLanguage)
    //                 setBrandVoice(userDetails.ai_settings?.defaultBrandVoiceId)
    //                 setPersona(userDetails.ai_settings?.defaultBrandPersona)
    //                 setOpenApiKey(userDetails.ai_settings?.openAIKey)
    //                 setClaudeApiKey(userDetails.ai_settings?.claudeAPIKey)
    //                 setGeminiApiKey(userDetails.ai_settings?.geminiAPIKey)
    //             }
    //             setLoading(false)
    //         })
    //     }
    //     else if (loggedInUser) {
    //         setDefaultAI(loggedInUser?.ai_settings?.defaultAI)
    //         setCurrentLang(loggedInUser?.ai_settings?.defaultLanguage)
    //         setBrandVoice(loggedInUser?.ai_settings?.defaultBrandVoiceId)
    //         setPersona(loggedInUser?.ai_settings?.defaultBrandPersona)
    //         setOpenApiKey(loggedInUser?.ai_settings?.openAIKey)
    //         setClaudeApiKey(loggedInUser?.ai_settings?.claudeAPIKey)
    //         setGeminiApiKey(loggedInUser?.ai_settings?.geminiAPIKey)
    //     }
    // }, [loggedInUser])

    const onCancelModal = () => {
        setShowModal(false)
        setCurrentBrand(null)
        setCurrentAction("create")
        setBrandType(PERSONA_BRAND_TYPE)
    }

    const onCreateNewVoice = () => {
        setShowModal(true)
        setCurrentAction("create")
        setBrandType(VOICE_BRAND_TYPE)
    }

    const onCreateNewPersona = () => {
        setShowModal(true)
        setCurrentAction("create")
        setBrandType(PERSONA_BRAND_TYPE)
    }

    const onEditItemClick = (item) => {
        setShowModal(true)
        setCurrentBrand(item)
        setCurrentAction("edit")
        setBrandType(item.brand_type)
    }

    const onDeleteItemClick = async (item) => {
        if (item.id) {
            const res = await dispatch(deleteBrand(item.id))
            if (res?.error === undefined) {
                message.success("Brand deleted successfully")
            }
        }
    }

    const onSaveOpenAIKey = async (key) => {
        if (user) {
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    openAIKey: key
                }
            }))
            if (res.error === undefined) {
                message.success("Open AI key updated successfully")
            }
        }
    }

    const onSaveClaudeAIKey = async (key) => {
        if (user) {
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    claudeAPIKey: key
                }
            }))
            if (res.error === undefined) {
                message.success("Claude AI key updated successfully")
            }
        }
    }

    const onSaveGeminiAIKey = async (key) => {
        if (user) {
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    geminiAPIKey: key
                }
            }))
            if (res.error === undefined) {
                message.success("Gemini AI key updated successfully")
            }
        }
    }

    const onChangePersona = async (value) => {
        const persona = personas.find((p) => p.id === parseInt(value))
        if (user && persona) {
            setPersona(persona.id)
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    defaultBrandPersona: persona.id,
                    defaultBrandPersonaName: persona.name
                }
            }))
            if (res.error === undefined) {
                message.success("Brand persona updated successfully")
            }
        }
    }

    const onChangeBrandVoice = async (value) => {
        const voice = voices.find((v) => v.id === parseInt(value))
        if (user && voice) {
            setBrandVoice(voice.id)
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    defaultBrandVoiceId: voice.id,
                    defaultBrandVoiceName: voice.name
                }
            }))
            if (res.error === undefined) {
                message.success("Brand voice updated successfully")
            }
        }
    }

    const onDefaultLangChange = async (lang) => {
        setCurrentLang(lang.label)
        if (user) {
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    defaultLanguage: lang.label
                }
            }))
            if (res.error === undefined) {
                message.success("Default language updated successfully")
            }
        }
    }

    const onDemoVoiceClick = async (obj, callback) => {
        console.log(obj)
        const audioURL = `${process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL}/common/chat-responses/demos/${obj.value}.mp3`
        const audio    = new Audio(audioURL)
        audio.onloadedmetadata = () => {
            callback && callback(null)
        }
        audio.onerror  = async () => {
            setIsAudioLoading(true);
            const res  = await dispatch(fetchChatAudio(DEMO_VOICE_TEXT, obj.value, true))
            if (res?.payload?.data?.data) {
                setIsAudioLoading(false)
                audio.src = res?.payload?.data?.data
                audio.play()
                callback && callback(null)
            }
        }
        audio.play()
    }

    const onDefaultAIVoiceChange = async (obj) => {
        setDefaultAIVoice(obj.value)
        if (user) {
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    defaultAIVoice: obj.value
                }
            }))
            if (res.error === undefined) {
                message.success("Default AI Voice updated successfully")
            }
        }
    }

    const onDefaultAIChange = async (obj) => {
        if (obj.name !== "Curateit AI" && obj.platform === 'Open AI' && (!openApiKey || openApiKey === "")) {
            message.error("Please add Open AI key to use this AI model")
            return
        }
        if (obj.name !== "Curateit AI" && obj.platform === 'Claude' && (!claudeApiKey || claudeApiKey === "")) {
            message.error("Please add Claude AI key to use this AI model")
            return
        }
        if (obj.name !== "Curateit AI" && obj.platform === 'Gemini' && (!geminiApiKey || geminiApiKey === "")) {
            message.error("Please add Gemini AI key to use this AI model")
            return
        }
        setDefaultAI(obj.name)
        if (user) {
            const res = await dispatch(updateUser({ 
                ...user,
                ai_settings: {
                    ...user.ai_settings,
                    defaultAI: obj.name,
                    defaultModel: obj.model
                }
            }))
            if (res.error === undefined) {
                message.success("Default AI model updated successfully")
            }
        }
    }

    const onOpenAPIKeyWindow = () => {
        window.open("https://platform.openai.com/settings/", "_blank")
    }

    const onClaudeAPIKeyWindow = () => {
        window.open("https://console.anthropic.com/settings/keys", "_blank")
    }

    const onGeminiAPIKeyWindow = () => {
        window.open("https://aistudio.google.com/app/u/2/apikey", "_blank")
    }

    return (
        <>
            <div className="mt-10">
                <AIDropDown items={DEFAULT_AI_OPTIONS.map((f) => f.name)}
                            originalOptions={DEFAULT_AI_OPTIONS}
                            currentValue={defaultAI}
                            onItemChange={onDefaultAIChange}
                            isEnableIcon={true}
                            label={"Default AI"} />
                <AIDropDown items={LISTEN_VOICES.map((f) => f.name)}
                            originalOptions={LISTEN_VOICES}
                            currentValue={LISTEN_VOICES.find((v) => v.value === defaultAIVoice)?.name || ""}
                            onItemChange={onDefaultAIVoiceChange}
                            onDemoClick={onDemoVoiceClick}
                            isAudioLoading={isAudioLoading}
                            label={"Default AI Voice"} />
                <AIDropDown showSearch={true}
                            items={(defaultAI.toLowerCase("curateit")|| defaultAI.toLowerCase("gpt")) 
                                    ? CHATGPT_LANG.map(f => f.label) 
                                    : defaultAI.toLowerCase("claude")
                                        ? CLOUDE_LANG.map(f => f.label)
                                        : defaultAI.toLowerCase("gemini")
                                            ? GEMINI_LANG.map(f => f.label)
                                            : []}
                            currentValue={currentLang}
                            onItemChange={onDefaultLangChange}
                            originalOptions={(defaultAI.toLowerCase("curateit")|| defaultAI.toLowerCase("gpt")) 
                                ? CHATGPT_LANG 
                                : defaultAI.toLowerCase("claude")
                                    ? CLOUDE_LANG
                                    : defaultAI.toLowerCase("gemini")
                                        ? GEMINI_LANG
                                        : []}
                            label={"Output Language"}
                            isEnableIcon={true}
                            isCountryFlag={true} />
                <label className="block text-sm font-medium mb-1">Brand voices</label>
                <AIAntSelect items={[ ...voices ]}
                            value={brandVoice}
                            onChange={onChangeBrandVoice}  
                            newItemLabel={"+ Create new brand voice"}
                            onNewItemCreate={onCreateNewVoice}
                            onEditClick={onEditItemClick}
                            onDeleteClick={onDeleteItemClick}
                            type="voices" />
                <label className="block text-sm font-medium mb-1">Personas</label>
                <AIAntSelect items={[ ...personas ]}
                            value={persona}
                            onChange={onChangePersona} 
                            onEditClick={onEditItemClick}
                            onDeleteClick={onDeleteItemClick} 
                            newItemLabel={"+ Create new brand persona"}
                            onNewItemCreate={onCreateNewPersona}
                            type="personas" />
                <label className="block text-sm font-medium mb-1">API Keys</label>
                <AIApiKeyInput apiKey={openApiKey}
                               onOpenAPIKey={onOpenAPIKeyWindow}
                               onSaveAPIKey={onSaveOpenAIKey}
                               label={"Open API Key"} />
                <AIApiKeyInput apiKey={claudeApiKey}
                               onOpenAPIKey={onClaudeAPIKeyWindow}
                               onSaveAPIKey={onSaveClaudeAIKey}
                               label={"Claude API Key"} />
                <AIApiKeyInput apiKey={geminiApiKey}
                               onOpenAPIKey={onGeminiAPIKeyWindow}
                               onSaveAPIKey={onSaveGeminiAIKey}
                               label={"Gemini API Key"} />
            </div>
            {showModal && currentAction === "create" && brandType === "Persona" && <AIBrandModal visible={showModal}
                                        onCancel={onCancelModal}
                                        action={currentAction}
                                        title={"Create new brand persona"}
                                        type={brandType}
                                        currentName=""
                                        currentDescription=""
                                        onSubmit={(id) => {
                                            setPersona(id)
                                        }}
                                        currentId={null} />}
            {showModal && currentAction === "create" && brandType === "Voice" && <AIBrandModal visible={showModal}
                                        onCancel={onCancelModal}
                                        action={currentAction}
                                        title={"Create new brand voice"}
                                        type={brandType}
                                        currentName=""
                                        currentDescription=""
                                        onSubmit={(id) => {
                                            setBrandVoice(id)
                                        }}
                                        currentId={null} />}
            {showModal && currentAction === "edit" && brandType === "Persona" && currentBrand && <AIBrandModal visible={showModal}
                                        onCancel={onCancelModal}
                                        action={currentAction}
                                        title={"Edit brand persona"}
                                        type={brandType}
                                        currentName={currentBrand.name}
                                        currentDescription={currentBrand.description}
                                        currentId={currentBrand.id} />}
            {showModal && currentAction === "edit" && brandType === "Voice" && currentBrand && <AIBrandModal visible={showModal}
                                        onCancel={onCancelModal}
                                        action={currentAction}
                                        title={"Edit brand voice"}
                                        type={brandType}
                                        currentName={currentBrand.name}
                                        currentDescription={currentBrand.description}
                                        currentId={currentBrand.id} />}
        </>
    )
}

export default AIGeneralTab;