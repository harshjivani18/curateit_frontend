import CardSelection from "@components/onboarding/common/CardSelection";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import OthersTextArea from "@components/onboarding/common/OthersTextArea";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { useState } from "react";
import { DiscoverArray } from "@utils/onboardConstants";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { updateUser } from "@actions/user";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { TextMessage } from "@utils/constants";

const Discover = () => {
  const dispatch = useDispatch()
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
  const onboardingCurrentStep = useSelector(
    (state) => state.app.onboardingCurrentStep
  );
  const [selectedDiscover, setSelectedDiscover] = useState(
    onboardingUserPreference?.preferences?.discover_from?.name || ""
  );
  const [othersInputValue, setOthersInputValue] = useState(
    onboardingUserPreference?.preferences?.discover_from?.text || ""
  );

  const updateFunctions = (stepValue, discoverValue, othersValue) => {
    dispatch(setOnboardingCurrentStep(stepValue));
    const obj = {
      ...onboardingUserPreference,
      preferences: {
        ...onboardingUserPreference?.preferences,
        discover_from: {
          name: discoverValue,
          text: discoverValue === "Other" ? othersValue : "",
        },
        completed_steps: 2,
        current_step: 3,
      },
    };
    dispatch(setOnboardingUserPreference(obj));
    const payload = {
      preferences: {
        ...onboardingUserPreference?.preferences,
        discover_from: {
          name: discoverValue,
          text: discoverValue === "Other" ? othersValue : "",
        },
        completed_steps: 2,
        current_step: 3,
      },
    };
    dispatch(updateUser(payload));
  };

  const handleStep = (value,type='') => {
    if (type === "back") {
      updateFunctions(value, selectedDiscover, othersInputValue);
      return;
    }
    if (
      !selectedDiscover ||
      (selectedDiscover === "Other" && !othersInputValue)
    ) {
      message.error(
        !selectedDiscover
          ? TextMessage.ONBOARD_STEPS_ERROR_TEXT
          : TextMessage.ONBOARD_STEPS_OTHERS_ERROR_TEXT
      );
      return;
    }
    updateFunctions(value, selectedDiscover, othersInputValue);
  };

  const handleOthersText = (e) => {
    setOthersInputValue(e.target.value);
  };

  const handleDiscover = (value) => {
    setSelectedDiscover(value);
    if (value && value !== "Other") {
      updateFunctions(onboardingCurrentStep + 1, value, othersInputValue);
    }
  };

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5">
        <div className="p-8 col-span-1 md:col-span-3">
          <TitleComponent
            title={"How did you discover us?"}
            subTitle={`Please help us answer a few questions to help with setting up your account!`}
          />

          <OnboardProgress />

          <div className="block md:hidden">
            <OnboardNextButton
              handleStep={handleStep}
              value={othersInputValue}
              setValue={handleOthersText}
            />
          </div>

          <CardSelection
            value={selectedDiscover}
            items={DiscoverArray}
            onChange={handleDiscover}
          />

          {selectedDiscover === "Other" && (
            <OthersTextArea
              placeholder="How did you discover us"
              value={othersInputValue}
              setValue={handleOthersText}
            />
          )}

          <div className="hidden md:block">
            <OnboardNextButton
              handleStep={handleStep}
              value={othersInputValue}
              setValue={handleOthersText}
            />
          </div>
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_cover/onboarding-images/discover-new.png`}
          alt={
            "Listen to articles, Create text or audio notes using Ai | Curateit"
          }
          title={"Listen to articles, Create text or audio notes using Ai"}
          subTitle={
            "Distraction free Reading or Listen to full article or summary in any language. Transform Your thoughts into clear text notes using Ai"
          }
          titleCls="pl-8 pb-6"
          divCls="pr-6"
        />
      </div>
    </>
  );
};

export default Discover;
