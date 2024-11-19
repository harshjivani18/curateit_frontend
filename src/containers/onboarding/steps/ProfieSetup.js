import OnboardNextButton from "@components/onboarding/common/OnboardNextButton";
import OnboardProgress from "@components/onboarding/common/OnboardProgress";
import OnboardingRightImage from "@components/onboarding/common/OnboardingRightImage";
import TitleComponent from "@components/onboarding/common/TitleComponents";
import { PiPencilSimple, PiUserList } from "react-icons/pi";
import TextEditorComponent from "@components/profile-edit-components/TextEditorBio";
import { useEffect, useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { Input, Spin, message } from "antd";
import { rendeProfilePlatfromLogo } from "@utils/commonFunctions";
import { FileUploader } from "react-drag-drop-files";
import { TextMessage } from "@utils/constants";
import { FiUpload } from "react-icons/fi";
import { setOnboardingCurrentStep, setOnboardingUserPreference } from "@actions/app";
import { useDispatch, useSelector } from "react-redux";
import { deleteImageFromS3 } from "@actions/collection";
import session from "@utils/session";
import { updateUser, uploadProfileImage } from "@actions/user";
import ProfileAiModal from "@components/modal/ProfileAiModal";
import axios from "axios";

const FILETYPES = ["JPG", "PNG", "JPEG"];

const ProfileSetup = () => {
  const dispatch = useDispatch();
  const onboardingUserPreference = useSelector(
    (state) => state.app.onboardingUserPreference
  );
  const [bio, setBio] = useState(onboardingUserPreference?.about || "");
  const [socials, setSocials] = useState(
    onboardingUserPreference?.socialLinks || {}
  );
  const [profilePhoto, setProfilePhoto] = useState(
    onboardingUserPreference?.profilePhoto || ""
  );
  const [uploading, setUploading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setProfilePhoto(onboardingUserPreference?.profilePhoto);
  }, [onboardingUserPreference?.profilePhoto]);

  const fetchData = async (img) => {
    const formData = new FormData();
    formData.append("output_type", "cutout");
    formData.append("format", "PNG");
    formData.append("image_url", img);
    try {
      const response = await axios.post(
        "https://api.picsart.io/tools/1.0/removebg",
        formData,
        {
          headers: {
            "x-picsart-api-key": process.env.NEXT_PUBLIC_PICSART_API_KEY,
          },
        }
      );

      const noBgImageUrl = response.data.data.url;
      return noBgImageUrl;
    } catch (error) {
      console.error(error);
    }
  };


  const handleFileChange = async (file) => {
    setUploading(true);
    const oldProfile = profilePhoto;
    const formData = new FormData();
    formData.append("files", file);

    const res = await dispatch(uploadProfileImage(formData));

    if (res?.payload?.data?.media) {
      setProfilePhoto(res?.payload?.data?.media[0]);
      const img = await fetchData(res?.payload?.data?.media[0]);
      dispatch(
        updateUser({
          ...onboardingUserPreference,
          profilePhoto: res?.payload?.data?.media[0],
          preferences: {
            ...onboardingUserPreference?.preferences,
            userProfilePreferences: {
              ...onboardingUserPreference?.preferences?.userProfilePreferences,
              bgRemovedProfilePhoto: img,
              backupProfilePhoto: res?.payload?.data?.media[0],
            },
          },
        })
      ).then((res) => {
        if (res?.payload?.data?.profilePhoto) {
          //Remove old profile photo
          if (oldProfile) {
            dispatch(deleteImageFromS3(oldProfile));
          }
          session.setUserProfileImage(res?.payload?.data?.profilePhoto);
          message.success(TextMessage.PROFILE_PIC_UPDATE);
          const obj = {
            ...onboardingUserPreference,
            profilePhoto: res?.payload?.data?.profilePhoto,
            preferences: {
              ...onboardingUserPreference?.preferences,
              userProfilePreferences: {
                ...onboardingUserPreference?.preferences
                  ?.userProfilePreferences,
                bgRemovedProfilePhoto: img,
                backupProfilePhoto: res?.payload?.data?.profilePhoto,
              },
            },
          };
          dispatch(setOnboardingUserPreference(obj));
        }
        setUploading(false);
      });
    }
    setUploading(false);
  };

  const handleStep = (value) => {
    dispatch(setOnboardingCurrentStep(value));
    const obj = {
      ...onboardingUserPreference,
      about: bio,
      socialLinks: socials,
      profilePhoto: profilePhoto,
      preferences: {
        ...onboardingUserPreference?.preferences,
        completed_steps: 5,
        current_step: 6,
      },
    };
    dispatch(setOnboardingUserPreference(obj));
    const payload = {
      ...onboardingUserPreference,
      socialLinks: socials,
      about: bio,
      profilePhoto: profilePhoto,
      preferences: {
        ...onboardingUserPreference?.preferences,
        completed_steps: 5,
        current_step: 6,
      },
    };
    dispatch(updateUser(payload));
  };

  const handleRemoved = () => {
    setOpenModal(false)
    setProfilePhoto(null)
    const obj = {
      ...onboardingUserPreference,
      profilePhoto: null,
      preferences: {
        ...onboardingUserPreference?.preferences,
        userProfilePreferences: {
          ...onboardingUserPreference?.preferences?.userProfilePreferences,
          bgRemovedProfilePhoto: null,
        },
      },
    };
    dispatch(setOnboardingUserPreference(obj));
  }

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5">
        <div className="p-8 col-span-1 md:col-span-3">
          <TitleComponent
            title={"Setup your profile"}
            subTitle={`Please help us with few questions to help with setting up your account!`}
          />

          <OnboardProgress />

          <div className="block md:hidden mb-2">
            <OnboardNextButton handleStep={handleStep} />
          </div>

          <div>
            <div className={`relative flex w-fit m-auto`}>
              <FileUploader
                className="outline-none"
                handleChange={handleFileChange}
                name="file"
                types={FILETYPES}
                onTypeError={(err) => message.error(err)}
              >
                <div className="bg-white my-0 mx-auto w-[200px] h-[200px]  border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center rounded-full">
                  {uploading ? (
                    <Spin size="middle" tip="Uploading..." />
                  ) : (
                    <>
                      {profilePhoto ? (
                        <>
                          <div
                            className="w-[200px] h-[200px]  object-cover rounded-full flex justify-center items-center"
                            style={{
                              backgroundImage: `url(${profilePhoto})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          >
                            <button className="bg-[#c3c3c3a4] hover:bg-[#347AE2] p-2 mt-2 rounded-lg text-white">
                              Browse Image
                            </button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <FiUpload className="h-6 w-6 text-gray-500 my-0 mx-auto mb-2" />
                          <span>Drag & drop to upload Image</span>
                          <div className="flex justify-center items-center gap-2 mt-2">
                            <hr className="w-12" />
                            <span className="text-gray-500">OR</span>
                            <hr className="w-12" />
                          </div>
                          <button className="bg-[#347AE2] p-2 mt-2 rounded-lg text-white">
                            Browse Image
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </FileUploader>
              {profilePhoto && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModal(true);
                  }}
                  className="p-2 absolute bottom-[35px] z-2 right-[-10px] rounded-full bg-white border border-solid border-[#ABB7C9]"
                >
                  <PiPencilSimple className="h-7 w-7 cursor-pointer text-[#347AE2]" />
                </div>
              )}
            </div>

            <div className="flex my-4 items-center">
              {rendeProfilePlatfromLogo(
                "Instagram",
                socials?.instagram?.username
              )}
              <Input
                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                className="ml-2 rounded-lg"
                placeholder="Instagram username"
                value={socials?.instagram?.username}
                onChange={(e) =>
                  setSocials({
                    ...socials,
                    instagram: {
                      ...socials.instagram,
                      username: e.target.value,
                    },
                  })
                }
                size="large"
              />
            </div>

            <div className="flex mb-4 items-center">
              {rendeProfilePlatfromLogo(
                "LinkedIn",
                socials?.linkedin?.username
              )}
              <Input
                className="ml-2 rounded-lg"
                placeholder="Linkedin profile url"
                value={socials?.linkedin?.username}
                onChange={(e) =>
                  setSocials({
                    ...socials,
                    linkedin: { ...socials.linkedin, username: e.target.value },
                  })
                }
                size="large"
              />
            </div>

            <div className="flex mb-4 items-center">
              {rendeProfilePlatfromLogo("Twitter", socials?.twitter?.username)}
              <Input
                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                className="ml-2 rounded-lg"
                placeholder="twitter username"
                value={socials?.twitter?.username}
                size="large"
                onChange={(e) =>
                  setSocials({
                    ...socials,
                    twitter: { ...socials.twitter, username: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex mb-4 items-center">
              {rendeProfilePlatfromLogo("Tiktok", socials?.tiktok?.username)}
              <Input
                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                className="ml-2 rounded-lg"
                placeholder="Tiktok username"
                value={socials?.tiktok?.username}
                onChange={(e) =>
                  setSocials({
                    ...socials,
                    tiktok: { ...socials.tiktok, username: e.target.value },
                  })
                }
                size="large"
              />
            </div>

            <div className="flex mb-4 items-center">
              {rendeProfilePlatfromLogo("YouTube", socials?.youtube?.username)}
              <Input
                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400" />}
                className="ml-2 rounded-lg"
                placeholder="Youtube channel"
                value={socials?.youtube?.username}
                onChange={(e) =>
                  setSocials({
                    ...socials,
                    youtube: { ...socials.youtube, username: e.target.value },
                  })
                }
                size="large"
              />
            </div>

            <div className="mb-[50px] flex mt-4 md:mb-4 profile-bio-editor-onboard">
              <PiUserList className="h-5 w-5 text-[#347AE2] mr-4" />

              <TextEditorComponent bio={bio} setBio={setBio} />
            </div>
          </div>

          <div className="hidden md:block md:mt-[60px]">
            <OnboardNextButton handleStep={handleStep} />
          </div>
        </div>

        <OnboardingRightImage
          imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_cover/onboarding-images/profile-setup-new.png`}
          alt={"Build your personal brand with our link in bio | Curateit"}
          cls="overflow-y-hidden"
          title={"Build your personal brand with our link in bio"}
          subTitle={"Let millions of people discover you and your collections"}
          divCls={`pl-12 pb-9`}
          titleCls="pb-6"
        />
      </div>

      {openModal && (
        <ProfileAiModal
          open={openModal}
          setOpen={setOpenModal}
          user={onboardingUserPreference}
          handleRemoved={handleRemoved}
        />
      )}
    </>
  );
};

export default ProfileSetup;
