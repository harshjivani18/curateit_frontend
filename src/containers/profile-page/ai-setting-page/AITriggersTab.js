import { updateUser } from "@actions/user";
import { BiInfoCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";

const { AI_DEFAULT_TRIGGER, AI_TRIGGERS } = require("@utils/ai-options");
const { Tooltip, Switch, message } = require("antd")

const AITriggersTab = ({ user }) => {

    const dispatch = useDispatch();

    const onTriggerChange = async (trigger, checked) => {
        const index = user?.ai_settings?.triggers?.findIndex((t) => t === trigger);
        if (index !== -1 && !checked && user?.ai_settings) {
            let triggerArr = [...user?.ai_settings?.triggers];
            triggerArr.splice(index, 1);
            triggerArr     = [ ...triggerArr ]
            const res = await dispatch(updateUser({ ...user, ai_settings: { ...user.ai_settings, triggers: triggerArr } }));
            if (res.error === undefined) {
                message.success("Trigger disabled successfully");
            }
            else {
                message.error("Failed to disable trigger");
            }
        }
        else if (index === -1 && checked && user?.ai_settings) {
            const triggerArr = [...user?.ai_settings?.triggers, trigger];
            const res        = await dispatch(updateUser({ ...user, ai_settings: { ...user.ai_settings, triggers: triggerArr } }));
            if (res.error === undefined) {
                message.success("Trigger enabled successfully");
            }
            else {
                message.error("Failed to enable trigger");
            }
        }
    }
    const renderItem = (item) => {
        const enableItem = user?.ai_settings?.triggers?.findIndex((t) => t === item.value) !== -1;
        return (
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center justify-content">
                    <div className="flex items-center">
                        <label className="ct-ai-trigger-label">{item?.label}</label>
                        <Tooltip title={item?.info}>
                            <BiInfoCircle className="ml-2 text-[#347AE2] w-5 h-5" />
                        </Tooltip>
                    </div>
                </div>
                <div>
                    <Switch checked={enableItem}
                            onChange={(checked) => onTriggerChange(item.value, checked)}
                            style={{ background: enableItem ? "#1890ff" : "#00000040" }} />
                </div>
            </div>
        )
    }

    return (
        <div className="mt-5">
            <div className="mb-5">
                {renderItem(AI_DEFAULT_TRIGGER)}
            </div>
            <div className="mb-5">
                {AI_TRIGGERS.map((item) => {
                    return (
                        <div key={item.value} className="mb-3">
                            {renderItem(item)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AITriggersTab;