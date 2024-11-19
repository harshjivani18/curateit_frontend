'use client'

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Describe from "./steps/Describe";
import session from "@utils/session";
import { getOtherUserDetails } from "@actions/user";
import { useEffect, useState } from "react";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { Spin, message } from "antd";
import { TextMessage } from "@utils/constants";

const Discover = dynamic(() => import("./steps/Discover"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const UsePlan = dynamic(() => import("./steps/UsePlan"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const ProfileSetup = dynamic(() => import("./steps/ProfieSetup"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const Features = dynamic(() => import("./steps/Features"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const Import = dynamic(() => import("./steps/Import"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const Upload = dynamic(() => import("./steps/Upload"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const WalkthroughVideo = dynamic(() => import("./steps/WalkthroughVideo"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const PopupModal = dynamic(() => import("./steps/PopupModal"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const Invite = dynamic(() => import("./steps/Invite"), {
  ssr: false,
  loading: () => (
    <div className="spinnerLoaderWrapper">
      <div className="spinnerLoader"></div>
    </div>
  ),
});

const Onboarding = () => {
    const dispatch = useDispatch()
    const [initLoad,setInitLoad] = useState(false)

    const onboardingCurrentStep = useSelector(
      (state) => state.app.onboardingCurrentStep
    ); 

    useEffect(() => {
      if (session?.username) {
        setInitLoad(true);
        dispatch(getOtherUserDetails(session?.username)).then((res) => {
          if (res?.payload?.data?.status === 200) {
            dispatch(
              setOnboardingUserPreference(res?.payload?.data?.userDetails)
            );
            dispatch(
              setOnboardingCurrentStep(
                res?.payload?.data?.userDetails?.preferences?.current_step || 1
              )
            );
            setInitLoad(false);
          } else {
            message.error(TextMessage.ERROR_TEXT);
            setInitLoad(false);
          }
        });
      }
    }, [session?.username]);

    if(initLoad){
      return (
        <div className="spinDiv">
          <Spin size="middle" tip="Loading..." />
        </div>
      );
    }

    switch (onboardingCurrentStep) {
      case 1:
        return <Describe />;
      case 2:
        return <Discover/>;
      case 3:
        return <UsePlan />;
      case 4:
        return <ProfileSetup />;
      case 5:
        return <Features />;
      case 6:
        return <Import />;
      case 7:
        return <Upload/>;
      case 8:
        return <WalkthroughVideo />;
      case 9:
        return <PopupModal />;
      case 10:
        return <Invite />;
    }

    return(
        <>
        <div>Onboarding</div>
        </>
    )
}

export default Onboarding