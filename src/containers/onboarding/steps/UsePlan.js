import CardSelection from "@components/onboarding/common/CardSelection";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import OthersTextArea from "@components/onboarding/common/OthersTextArea";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { useState } from "react";
import { UsePlanArray } from "@utils/onboardConstants";
import { updateUser } from "@actions/user";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { TextMessage } from "@utils/constants";

const UsePlan = () => {
  const dispatch = useDispatch()
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
  const onboardingCurrentStep = useSelector(
    (state) => state.app.onboardingCurrentStep
  );
  const [selectedUsePlan, setSelectedUsePlan] = useState(
    onboardingUserPreference?.preferences?.reason_using?.name || ""
  );

  const [othersInputValue, setOthersInputValue] = useState(
    onboardingUserPreference?.preferences?.reason_using?.text || ""
  );

  const updateFunctions = (stepValue, usePlanValue, othersValue) => {
    dispatch(setOnboardingCurrentStep(stepValue));
    const obj = {
      ...onboardingUserPreference,
      preferences: {
        ...onboardingUserPreference?.preferences,
        reason_using: {
          name: usePlanValue,
          text: usePlanValue === "Other" ? othersValue : "",
        },
        completed_steps: 3,
        current_step: 4,
      },
    };
    dispatch(setOnboardingUserPreference(obj));
    const payload = {
      preferences: {
        ...onboardingUserPreference?.preferences,
        reason_using: {
          name: usePlanValue,
          text: usePlanValue === "Other" ? othersValue : "",
        },
        completed_steps: 3,
        current_step: 4,
      },
    };
    dispatch(updateUser(payload));
  };

  const handleStep = (value,type='') => {
    if (type === "back") {
      updateFunctions(value, selectedUsePlan, othersInputValue);
      return;
    }
    if (
      !selectedUsePlan ||
      (selectedUsePlan === "Other" && !othersInputValue)
    ) {
      message.error(
        !selectedUsePlan
          ? TextMessage.ONBOARD_STEPS_ERROR_TEXT
          : TextMessage.ONBOARD_STEPS_OTHERS_ERROR_TEXT
      );
      return;
    }

    updateFunctions(value, selectedUsePlan, othersInputValue);
  };

  const handleOthersText = (e) => {
    setOthersInputValue(e.target.value);
  };

  const handleUsePlan = (value) => {
    setSelectedUsePlan(value);
    if (value && value !== "Other") {
      updateFunctions(onboardingCurrentStep + 1, value, othersInputValue);
    }
  };

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5">
        <div className="p-8 col-span-1 md:col-span-3">
          <TitleComponent
            title={"What do you plan to use Curateit for?"}
            subTitle={`Please help us answer a few questions to help with setting up your account!`}
          />

          <OnboardProgress />

          <div className="block md:hidden">
            <OnboardNextButton handleStep={handleStep} />
          </div>

          <CardSelection
            value={selectedUsePlan}
            items={UsePlanArray}
            onChange={handleUsePlan}
          />

          {selectedUsePlan === "Other" && (
            <OthersTextArea
              placeholder="What do you plan to use Curateit for"
              value={othersInputValue}
              setValue={handleOthersText}
            />
          )}

          <div className="hidden md:block">
            <OnboardNextButton handleStep={handleStep} />
          </div>
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/plan-new.png`}
          alt={
            "Unleash Productivity using Ai anywhere and Text expander features | Curateit"
          }
          title={
            "Unleash Productivity using Ai anywhere and Text expander features"
          }
          subTitle={
            "Over 300+ Ai prompt and text expander library to choose from"
          }
          divCls="pl-12"
          titleCls="pb-2"
        />
      </div>
    </>
  );
};

export default UsePlan;
