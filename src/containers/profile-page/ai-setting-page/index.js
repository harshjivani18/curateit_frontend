import "./AISettingPage.css";

import { Segmented, Typography }    from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState }                 from "react";

import AIGeneralTab                 from "./AIGeneralTab";
import AIPromptsTab                 from "./AIPromptsTab";
import AITriggersTab                from "./AITriggersTab";

const AISettingPage = ({ isMobile }) => {
    const dispatch                      = useDispatch();
    const [currentTab, setCurrentTab]   = useState("General");
    const [user, setUser]               = useState(null);
    const [loading, setLoading]         = useState(false);
    const loggedInUser                  = useSelector((state) => state?.users?.userData);

    useEffect(() => {
        if (!loggedInUser || (Array.isArray(loggedInUser) && loggedInUser.length === 0)) {
            setLoading(true)
            dispatch(getUserDetails()).then(res => {
                const userDetails = res?.payload?.data
                if (userDetails) {
                    setUser(userDetails)
                }
                setLoading(false)
            })
        }
        else if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [loggedInUser])

    return (
        <div className="mr-10 ml-10">
            <Typography.Title level={3}>AI Settings</Typography.Title>
            <Segmented options={["General", "Prompts", "Platform"]} 
                onChange={(value) => {
                    setCurrentTab(value);
                }}
                className="ct-main-segment"
                style={{ width: isMobile ? "100%" : 380 }}
            />
            {currentTab === "General" && <AIGeneralTab isMobile={isMobile} user={user} />}
            {currentTab === "Prompts" && <AIPromptsTab isMobile={isMobile} user={user} />}
            {currentTab === "Platform" && <AITriggersTab isMobile={isMobile} user={user} />}
        </div>
    );
}

export default AISettingPage;