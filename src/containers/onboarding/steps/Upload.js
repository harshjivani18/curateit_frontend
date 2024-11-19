import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { useEffect, useState } from "react";
import { setOnboardingCurrentStep, setOnboardingUserPreference, setPercentageData, setSyncingCollection } from "@actions/app";
import { useDispatch, useSelector } from "react-redux";
import BookmarkUpload from "@components/common/BookmarkUpload";
import ImportProgressBar from "@components/common/ImportProgressBar";
import { updateUser } from "@actions/user";
import { message } from "antd";

const Upload = () => {
    const dispatch = useDispatch()
    const onboardingUserPreference = useSelector(
      (state) => state.app.onboardingUserPreference
    ); 
    const onboardingCurrentStep = useSelector(
      (state) => state.app.onboardingCurrentStep
    );
    const isSyncing = useSelector((state) => state.app.isSyncing);
    const percentage = useSelector((state) => state.app.percentage);

    useEffect(() => {
      if (percentage && percentage >= 100) {
        dispatch(setSyncingCollection(false));
        dispatch(setPercentageData(0));
        message.success("Import Successful");
        dispatch(setOnboardingCurrentStep(onboardingCurrentStep + 1));
        const obj = {
          ...onboardingUserPreference,
          preferences: {
            ...onboardingUserPreference?.preferences,
            completed_steps: 6,
            current_step: 7,
          },
        };
        dispatch(setOnboardingUserPreference(obj));
        const payload = {
          preferences: {
            ...onboardingUserPreference?.preferences,
            completed_steps: 6,
            current_step: 7,
          },
        };
        dispatch(updateUser(payload));
      }
    }, [percentage]);

    const handleStep = (value) => {
      dispatch(setOnboardingCurrentStep(value));
      const obj = {
        ...onboardingUserPreference,
        preferences: {
          ...onboardingUserPreference?.preferences,
          completed_steps: 6,
          current_step: 7,
        },
      };
      dispatch(setOnboardingUserPreference(obj));
      const payload = {
        preferences: {
          ...onboardingUserPreference?.preferences,
          completed_steps: 6,
          current_step: 7,
        },
      };
      dispatch(updateUser(payload));
    };
  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5">
        <div className="p-8 col-span-1 md:col-span-3">
          <div className="mb-1">
            {isSyncing && (
              <div className="flex flex-col">
                <ImportProgressBar />
              </div>
            )}
          </div>
          <TitleComponent
            title={
              "Update your bookmarks → See your links in Visual Moodboard, Simply Upload your bookmarks!"
            }
            subTitle={`Import your bookmarks here and download extension to import from all other platforms!`}
          />

          <OnboardProgress />

          <div>
            <div>
              <BookmarkUpload fromOnboarding={true} />
            </div>
          </div>

          <OnboardNextButton handleStep={handleStep} />
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/upload-new.png`}
          alt={
            "Synchronize and keep all your bookmarks in one place | Curateit"
          }
          title={""}
          subTitle={""}
          titleCls=""
          cls="h-full cursor-pointer"
          isRedirect={true}
        />
      </div>
    </>
  );
};

export default Upload;
