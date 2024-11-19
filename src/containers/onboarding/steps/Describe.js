import CardSelection from "@components/onboarding/common/CardSelection";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import OthersTextArea from "@components/onboarding/common/OthersTextArea";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { useState } from "react";
import { DescribeArray } from "@utils/onboardConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@actions/user";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { message } from "antd";
import { TextMessage } from "@utils/constants";

const Describe = () => {
  const dispatch = useDispatch()
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  ); 
  const onboardingCurrentStep = useSelector(
    (state) => state.app.onboardingCurrentStep
  );
  const [selectedDescribe, setSelectedDescribe] = useState(
    onboardingUserPreference?.preferences?.role?.name || ""
  );

  const [othersInputValue, setOthersInputValue] = useState(
    onboardingUserPreference?.preferences?.role?.text || ""
  );

  const updateFunctions = (stepValue,describeValue,othersValue) => {
    dispatch(setOnboardingCurrentStep(stepValue));
    const obj = {
      ...onboardingUserPreference,
      preferences: {
        ...onboardingUserPreference?.preferences,
        role: {
          name: describeValue,
          text: describeValue === "Other" ? othersValue : "",
        },
        completed_steps: 1,
        current_step: 2,
      },
    };
    dispatch(setOnboardingUserPreference(obj));
    const payload = {
      preferences: {
        ...onboardingUserPreference?.preferences,
        role: {
          name: describeValue,
          text: describeValue === "Other" ? othersValue : "",
        },
        completed_steps: 1,
        current_step: 2,
      },
    };
    dispatch(updateUser(payload));
  }

  const handleStep = (value,type='') => {
    if (!selectedDescribe || (selectedDescribe === 'Other' && !othersInputValue)){
      message.error(
        !selectedDescribe
          ? TextMessage.ONBOARD_STEPS_ERROR_TEXT
          : TextMessage.ONBOARD_STEPS_OTHERS_ERROR_TEXT
      );
      return;
    }
    updateFunctions(value,selectedDescribe,othersInputValue)
  };

  const handleOthersText = (e) => {
    setOthersInputValue(e.target.value);
  }

  const handleDescribe = (value) => {
    setSelectedDescribe(value);
    if(value && value !== 'Other'){
      updateFunctions(
        onboardingCurrentStep + 1,
        value,
        othersInputValue
      );
    }
  }

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5">
        <div className="p-8 col-span-1 md:col-span-3">
          <TitleComponent
            title={"Welcome to Curateit! - Select your role"}
            subTitle={`Please help us answer a few questions to help with setting up your account!`}
          />

          <OnboardProgress />

          <div className="block md:hidden">
            <OnboardNextButton handleStep={handleStep} />
          </div>

          <CardSelection
            value={selectedDescribe}
            items={DescribeArray}
            onChange={handleDescribe}
          />

          {selectedDescribe === "Other" && (
            <OthersTextArea
              placeholder="Enter a role that describes you best"
              value={othersInputValue}
              setValue={handleOthersText}
            />
          )}

          <div className="hidden md:block">
            <OnboardNextButton handleStep={handleStep} />
          </div>
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_cover/onboarding-images/describe-new.png`}
          alt={
            "Beautiful boards to collect, organize, and present anything. | Curateit"
          }
          title={"Beautiful boards to collect, organize, and present anything."}
          subTitle={
            "Organise you content with tags, collections and categories"
          }
          divCls={`pl-12`}
          titleCls="pb-6"
        />
      </div>
    </>
  );
};

export default Describe;
