import ReactPlayer from "react-player";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@actions/user";

const WalkthroughVideo = () => {
  const dispatch = useDispatch();
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  ); 
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
          <TitleComponent
            title={"Let us give you a walkthrough 🤩"}
            subTitle={`Watch this tutorial to make the most out of Curateit`}
          />

          <OnboardProgress />

          <div className="my-4 flex items-center justify-center">
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=nhQz_JTNiQI"}
              controls={true}
            />
          </div>

          <OnboardNextButton handleStep={handleStep} />
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/walkthrough.png`}
          alt={"Access everything, everywhere, anytime | Curateit"}
          title={"Access everything, everywhere, anytime"}
          subTitle={
            "Download our apps to make the most of your Curation experience"
          }
          divCls={`pl-12`}
          titleCls="pb-6"
        />
      </div>
    </>
  );
};

export default WalkthroughVideo;
