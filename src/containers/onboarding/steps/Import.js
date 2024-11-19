import CardSelection from "@components/onboarding/common/CardSelection";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { useState } from "react";
import { ImportArray } from "@utils/onboardConstants";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { updateUser } from "@actions/user";

const Import = () => {
  const imagesArr = [
    {
      src: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/import-new-1.png`,
      alt: "Get Site Insights, Traffic, SEO details and customise your sidebar | Curateit",
    },
    {
      src: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/import-new-2.png`,
      alt: "Get Site Insights, Traffic, SEO details and customise your sidebar | Curateit",
    },
  ];

  const dispatch = useDispatch();
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
    const [selectedImport, setSelectedImport] = useState(
      onboardingUserPreference?.preferences?.selected_imports || []
    );

    const handleStep = (value) => {
      dispatch(setOnboardingCurrentStep(value));
      const obj = {
        ...onboardingUserPreference,
        preferences: {
          ...onboardingUserPreference?.preferences,
          selected_imports: selectedImport,
          completed_steps: 5,
          current_step: 6,
        },
      };
      dispatch(setOnboardingUserPreference(obj));
      const payload = {
        preferences: {
          ...onboardingUserPreference?.preferences,
          selected_imports: selectedImport,
          completed_steps: 5,
          current_step: 6,
        },
      };
      dispatch(updateUser(payload));
    };
    return (
      <>
        <div className="h-full grid grid-cols-1 md:grid-cols-5 overflow-y-hidden">
          <div className="p-8 col-span-1 md:col-span-3">
            <TitleComponent
              title={"What would you like to import today?"}
              subTitle={`Select all that applies and use extension to import it`}
            />

            <OnboardProgress />

            <div className="block md:hidden">
              <OnboardNextButton handleStep={handleStep} />
            </div>

            <CardSelection
              value={selectedImport}
              setValue={setSelectedImport}
              items={ImportArray}
              type="array"
            />

            <div className="hidden md:block">
              <OnboardNextButton handleStep={handleStep} />
            </div>
          </div>

          <OnboardingRightImage
            title={
              "Get Site Insights, Traffic, SEO details and customise your sidebar"
            }
            subTitle={
              "Uncover Comprehensive Site Insights, Analyse Your Web Traffic, Unravel Detailed SEO Information and Personalise Your Website's Sidebar to Your Liking"
            }
            titleCls="pb-6"
            divCls="pl-12"
            isCarousel={true}
            imagesArr={imagesArr}
          />
        </div>
      </>
    );
};

export default Import;
