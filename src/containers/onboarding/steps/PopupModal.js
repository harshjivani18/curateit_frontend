import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enableTourSteps, fromWelcomeModal, setOnboardingCurrentStep, setWelcomeModalStatus } from "@actions/app";
import { IoMdClose } from "react-icons/io";
import { PiCalendarCheck, PiCheckCircle, PiFolders, PiUserCirclePlusLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateUser } from "@actions/user";
import session from "@utils/session";
import { HiMiniChevronRight } from "react-icons/hi2";

import ReactPlayer from "react-player";
import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { fetchCollectionWiseCounts, getFollowByMeCollection } from "@actions/collection";
import { fetchGemsFilters } from "@actions/gems";
import { fetchTagsWithGemsCount } from "@actions/tags";

const PopupModal = () => {
  const navigate = useRouter()
  const dispatch = useDispatch();
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        if (window.innerWidth <= 600) {
          setMobileScreen(true);
        } else {
          setMobileScreen(false);
        }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleStep = () => {
    const payload = {
      preferences: {
        ...onboardingUserPreference?.preferences,
        completed_steps: 9,
        current_step: 10,
      },
    };
    dispatch(updateUser(payload));
    dispatch(setOnboardingCurrentStep(10));
  };

  const handleNavigate = async () => {
    const payload = {
      preferences: {
        ...onboardingUserPreference?.preferences,
        completed_steps: 9,
        current_step: 10,
      },
    };
    dispatch(updateUser(payload));
    await dispatch(fetchGemsFilters());
    await dispatch(fetchTagsWithGemsCount());
    dispatch(fetchCollectionWiseCounts())
    dispatch(getFollowByMeCollection())
    dispatch(enableTourSteps(true));
    dispatch(fromWelcomeModal(true));
    navigate.push(`/u/${session.username}/all-bookmarks`)
  }

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
          alt={"Publish your collections on the Internet | Curateit"}
          title={"Publish your collections on the Internet"}
          subTitle={"Share your finds with the world."}
          divCls={`pl-12`}
          titleCls="pb-6"
        />
      </div>

      <Modal
        open={true}
        title={""}
        footer={null}
        bodyStyle={{
          padding: mobileScreen ? "20px" : "48px 64px",
          background: "#eff6ff",
          borderRadius: mobileScreen ? "" : "32px",
        }}
        width={mobileScreen ? "90%" : "70%"}
        closable={false}
        centered={true}
        maskClosable={false}
        className={mobileScreen ? "" : "onboard-popup"}
      >
        <div className="relative flex flex-col items-center justify-center text-center">
          <IoMdClose
            className="h-5 w-5 absolute top-0 right-0 cursor-pointer text-[#105FD3]"
            onClick={handleNavigate}
          />
          <div className="text-[32px] md:text-[56px] font-semibold mb-1 text-[#062046]">
            Kickstart your Curation Adventure
          </div>

          <div className="text-base md:text-2xl text-[#4B4F5D] text-center">
            Your Personalized space on the web - Create, Curate, Discover &
            Share ✨
          </div>

          <div className="my-6">
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between mb-4">
              <div
                className="cursor-pointer flex items-center justify-between border-[1.4px] border-solid border-[#DFE4EC] rounded-lg w-[300px] px-4 py-2"
                onClick={handleNavigate}
              >
                <PiCheckCircle className="text-[#347AE2] h-5 w-5" />
                <span className="text-lg text-[#292B38] block mx-1 text-nowrap">
                  Create your first collection
                </span>
                <HiMiniChevronRight className="text-[#347AE2] h-5 w-5" />
              </div>

              <div
                className="cursor-pointer flex items-center justify-between border-[1.4px] border-solid border-[#DFE4EC] rounded-lg w-[300px] px-4 py-2"
                onClick={() => {
                  const payload = {
                    preferences: {
                      ...onboardingUserPreference?.preferences,
                      completed_steps: 9,
                      current_step: 10,
                    },
                  };
                  dispatch(updateUser(payload));
                  navigate.push(`/u/${session.username}`);
                }}
              >
                <PiUserCirclePlusLight className="text-[#347AE2] h-5 w-5" />
                <span className="text-lg text-[#292B38] block mx-1 text-nowrap">
                  Create your Link in bio
                </span>
                <HiMiniChevronRight className="text-[#347AE2] h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center gap-6 justify-between flex-col md:flex-row">
              <a
                className="cursor-pointer flex items-center justify-between border-[1.4px] border-solid border-[#DFE4EC] rounded-lg w-[300px] px-4 py-2"
                href="https://www.curateit.com/u/curateit.com/c/3223/curateit"
                rel="noreferrer"
                target="_blank"
              >
                <PiFolders className="text-[#347AE2] h-5 w-5" />
                <span className="text-lg text-[#292B38] block mx-1 text-nowrap">
                  Explore trending collections
                </span>
                <HiMiniChevronRight className="text-[#347AE2] h-5 w-5" />
              </a>

              <a
                className="cursor-pointer flex items-center justify-between border-[1.4px] border-solid border-[#DFE4EC] rounded-lg w-[300px] px-4 py-2 block"
                href="https://cal.com/curateit/15min"
                rel="noreferrer"
                target="_blank"
              >
                <PiCalendarCheck className="text-[#347AE2] h-5 w-5" />
                <span className="text-lg text-[#292B38] block mx-1 text-nowrap">
                  Let us help onboard you
                </span>
                <HiMiniChevronRight className="text-[#347AE2] h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="text-[#292B38] text-base w-full text-center">
            Access it anywhere
          </div>

          <div className="flex items-center my-3 w-full justify-evenly flex-col md:flex-row">
            <div
              className="flex items-center cursor-pointer block"
              onClick={() => {
                const payload = {
                  preferences: {
                    ...onboardingUserPreference?.preferences,
                    completed_steps: 9,
                    current_step: 10,
                  },
                };
                dispatch(updateUser(payload));
                navigate.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?download=true`
                );
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/platforms.png`}
                alt={"upload bookmark"}
                priority={true}
                width={100}
                height={50}
              />
              <HiMiniChevronRight className="text-[#347AE2] ml-2 h-5 w-5" />
            </div>

            <div className="block md:hidden my-2 flex justify-center items-center gap-2">
              <hr className="h-[1px] w-[40px]" />
              <span className="text-base font-medium text-[#7C829C] mx-1">
                OR
              </span>
              <hr className="h-[1px] w-[40px]" />
            </div>

            <a
              className="flex items-center cursor-pointer block"
              href="https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/browsers.png`}
                alt={"upload bookmark"}
                priority={true}
                width={100}
                height={50}
                // style={{
                //   width: "100%",
                // }}
              />
              <HiMiniChevronRight className="text-[#347AE2] ml-2 h-5 w-5" />
            </a>
          </div>

          <div className="text-[#74778B] text-base w-full text-center my-2">
            Connect with us
          </div>

          <div className="flex items-center justify-center gap-3">
            <a
              className="flex items-center text-[#4B4F5D] hover:text-gray-800 cursor-pointer text-lg"
              target="_blank"
              href="https://curateitcreators.slack.com/archives/C06R9F68ZFF"
              rel="noreferrer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/slack.png`}
                alt={"Slack | Curateit"}
                height={20}
                width={20}
                className="mr-2"
              />
            </a>

            <a
              className="flex items-center text-[#4B4F5D] hover:text-gray-800 cursor-pointer text-lg"
              target="_blank"
              href="https://www.instagram.com/curateithq"
              rel="noreferrer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/instagram.png`}
                alt={"Instagram | Curateit"}
                height={20}
                width={20}
                className="mr-2"
              />
            </a>

            <a
              className="flex items-center text-[#4B4F5D] hover:text-gray-800 cursor-pointer text-lg"
              target="_blank"
              href="https://www.youtube.com/@curateit"
              rel="noreferrer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/youtube.png`}
                alt={"Youtube | Curateit"}
                height={20}
                width={20}
                className="mr-2"
              />
            </a>

            <a
              className="flex items-center text-[#4B4F5D] hover:text-gray-800 cursor-pointer text-lg"
              target="_blank"
              href="https://x.com/CurateitHQ"
              rel="noreferrer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/twitter.png`}
                alt={"X | Curateit"}
                height={20}
                width={20}
                className="mr-2 h-[22px] w-[22px]"
              />
            </a>

            <a
              className="flex items-center text-[#4B4F5D] hover:text-gray-800 cursor-pointer text-lg"
              target="_blank"
              href="https://www.linkedin.com/company/curateit"
              rel="noreferrer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/linkedin.png`}
                alt={"Linkedin | Curateit"}
                className="mr-2"
                height={20}
                width={20}
              />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PopupModal;