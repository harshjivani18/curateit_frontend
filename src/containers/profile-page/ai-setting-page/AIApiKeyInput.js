import { useEffect, useState }                 from "react";
import { Typography, Input,
         Button,
         Tooltip }                  from "antd";
import { FaRegEye, FaRegEyeSlash }  from "react-icons/fa";
import { FiExternalLink }           from "react-icons/fi";
import { PiCopy }                   from "react-icons/pi";

const AIApiKeyInput = ({ apiKey, onOpenAPIKey, onSaveAPIKey, label }) => {
    const [showKey, setShowKey]     = useState(false)
    const [isTyping, setIsTyping]   = useState(false)
    const [key, setKey]             = useState(apiKey)
    // const [isCopying, 
    //        setIsCopying]        = useState(false)
    
    useEffect(() => {
        if (apiKey && apiKey !== "" && (key === null || key === "")) {
            setKey(apiKey)
        }
    }, [apiKey])

    // const onCopyKey = () => {
    //     navigator.clipboard.writeText(key)
    //     setIsCopying(true)
    //     setTimeout(() => {
    //         setIsCopying(false)
    //     }, 1000)
    // }

    const onChangeAPIKey = (e) => {
        const { value } = e.target;
        setKey(value)   
        setIsTyping(true)
    }

    const onBlurAPIKey = () => {
        onSaveAPIKey && onSaveAPIKey(key)
        setIsTyping(false)
        setShowKey(false)
    }

    return (
        <div className="ct-ai-api-key-input-container mb-4">
            <Typography.Text className="ct-ai-api-key-label">{label}</Typography.Text>
            <Input className="ct-ai-api-key-input"
                   value={key === "" || key === null ? "" : showKey || isTyping ? key : Array.from(key)?.map((c, index) => index < 5 ? c : "*").join("")}
                   onChange={onChangeAPIKey}
                   onBlur={onBlurAPIKey}
                //    onFocus={onFocusAPIKey}
                   placeholder={`Insert the ${label.toLowerCase()} api key`}
                   suffix={<>
                            {/* <Tooltip title={isCopying ? "Copied" : "Copy API key"}>
                                <PiCopy onClick={onCopyKey} style={{ color: "rgba(0,0,0,.25)" }} />
                            </Tooltip> */}
                          {showKey 
                            ? <FaRegEyeSlash onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setShowKey(!showKey)
                                return false
                            }} style={{ color: "rgba(0,0,0,.25)" }} />
                            : <FaRegEye onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setShowKey(!showKey)
                                return false
                            }} style={{ color: "rgba(0,0,0,.25)" }} />}
                   </>}
            />
            <Button type="text" onClick={onOpenAPIKey} className="p-0">
                <div className="ct-ai-api-key-button">
                    <span>Get API Key</span>
                    <FiExternalLink className="h-4 w-4 ml-2" />
                </div>
            </Button>
        </div>
    )
}

export default AIApiKeyInput;