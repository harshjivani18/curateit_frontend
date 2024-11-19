import { Switch } from "antd";

const PricingTenureSwitch = ({ isYearly, onChangeTenure }) => {
    return (
        <div className="flex justify-center items-center mt-5">
            <div className="flex items-center">
                {/* Adding antd switch with two labels monthly and yearly the color would be changed according to the checked value with grey and blue color */}
                <label className={`text-md font-light ${!isYearly ? "pricing-switch-label-blue" : "pricing-switch-label-grey"}`}>Monthly</label>
                <Switch
                    checked={isYearly}
                    onChange={onChangeTenure}
                    style={{ background: isYearly ? "#347AE2" : "#4B4F5D" }}
                    className="ml-2 mr-2 w-[20px]" />
                <label className={`text-md font-light ${isYearly ? "pricing-switch-label-blue" : "pricing-switch-label-grey"}`}>{`Annual (Upto 40% off)`}</label>
            </div>
        </div>
    )
}

export default PricingTenureSwitch;