import CardSelection from "@components/onboarding/common/CardSelection";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { useState } from "react";
import { FeaturesArray } from "@utils/onboardConstants";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { updateUser } from "@actions/user";

const Features = () => {
  const dispatch = useDispatch();
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
  const [selectedFeatures, setSelectedFeatures] = useState(
    onboardingUserPreference?.preferences?.selected_feature || []
  );

  const handleStep = (value) => {
    dispatch(setOnboardingCurrentStep(value));
    const obj = {
      ...onboardingUserPreference,
      preferences: {
        ...onboardingUserPreference?.preferences,
        selected_feature: selectedFeatures,
        completed_steps: 4,
        current_step: 5,
      },
    };
    dispatch(setOnboardingUserPreference(obj));
    const payload = {
      preferences: {
        ...onboardingUserPreference?.preferences,
        selected_feature: selectedFeatures,
        completed_steps: 4,
        current_step: 5,
      },
    };
    dispatch(updateUser(payload));
  };

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5">
        <div className="p-8 col-span-1 md:col-span-3">
          <TitleComponent
            title={"Over 25+ features, Pick all your top ones"}
            subTitle={`Select features that’s relevant to you`}
          />

          <OnboardProgress />

          <div className="block md:hidden">
            <OnboardNextButton handleStep={handleStep} />
          </div>

          <CardSelection
            value={selectedFeatures}
            setValue={setSelectedFeatures}
            items={FeaturesArray}
            type="array"
          />

          <div className="hidden md:block">
            <OnboardNextButton handleStep={handleStep} />
          </div>
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_cover/onboarding-images/invite-new.png`}
          alt={
            "Share your gems, collections, blogs with colleagues, teams or publish on web for the world | Curateit"
          }
          title={
            "Share your gems, collections, blogs with colleagues, teams or publish on web for the world"
          }
          subTitle={
            "Discover how to share collections with friends, make your content public, and publish your site, blogs, collections on Google."
          }
          titleCls="pb-6"
          divCls="pl-12"
        />
      </div>
    </>
  );
};

export default Features;
