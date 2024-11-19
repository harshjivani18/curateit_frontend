"use client";

import "../auth.css";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { connect, useDispatch } from "react-redux";

// import Button from "@components/common/Button";
import Input from "@components/common/InputWithIcon";
import CurateitLogo from "@components/common/CurateitLogo";
import SocialLoginOptions from "@components/common/SocialLoginOptions";
import { FIELD_REQUIRED } from "@utils/messages";
import { Validator } from "@utils/validations";
import {
  signup,
  emailVerification,
  setSocialLoginLoader,
  setUserInformation,
  fetchProfileImage,
} from "@actions/membership";
import { setIsMobileSidebar, setWelcomeModalStatus, showEmailVerficationModal } from "@actions/app";
import Link from "next/link";
import axios from "axios";
import session from "@utils/session";
// import { Spin } from "antd";
import { configCollections, configlimitCollection } from "@actions/collection";
import { TextMessage } from "@utils/constants";
import { checkUserNameExists } from "@actions/user";
import CookieConsent from "@components/cookie/CookieConsent";
import ImageCarousel from "@components/common/ImageCarousel";

const RegisterForm = (props) => {
  const navigate = useRouter();

  const searchParams = useSearchParams()
  const code = searchParams.get("c");
  const platform = searchParams.get("p");
  const team = searchParams.get("t");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailVerificationError, setEmailVerificationError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  const imagesArr = [
    {
      src: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/describe-new.png`,
      alt: "Beautiful boards to collect, organize, and present anything. | Curateit",
      title: "Beautiful boards to collect, organize, and present anything.",
      subTitle: "Organise you content with tags, collections and categories",
    },
    {
      src: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/invite-new.png`,
      alt: "Share your gems, collections, blogs with colleagues, teams or publish on web | Curateit",
      title:
        "Share your gems, collections, blogs with colleagues, teams or publish on web",
      subTitle:
        "Discover how to share collections with friends, make your content public, and publish your site, blogs, collections on Google.",
    },
    {
      src: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/walkthrough.png`,
      alt: "Access everything, everywhere, anytime | Curateit",
      title: "Access everything, everywhere, anytime",
      subTitle:
        "Download our apps to make the most of your Curation experience",
    },
    {
      src: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/import-new-1.png`,
      alt: "Get Site Insights, Traffic, SEO details and customise your sidebar | Curateit",
      title:
        "Get Site Insights, Traffic, SEO details and customise your sidebar",
      subTitle:
        "Uncover Comprehensive Site Insights, Analyse Your Web Traffic, Unravel Detailed SEO Information and Personalise Your Website's Sidebar to Your Liking",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    props.setSocialLoginLoader(false);
  }, []);

  const handleEmailChange = (val) => {
    setEmail(val);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
  };

  const handleUserNameChange = (val) => {
    setUserName(val);
  };

  const handleFnameChange = (val) => {
    setFirstname(val);
  };

  const handleLnameChange = (val) => {
    setLastname(val);
  };

    const submitData = async (e) => {
        e.preventDefault();
        if(email === '' || userName === '' || password === '' || firstname === '' || lastname === ''){
            setEmailError(email === '' ? FIELD_REQUIRED : '')
            setUserNameError(userName === '' ? FIELD_REQUIRED : '')
            setPasswordError(password === '' ? FIELD_REQUIRED : '')
            setFnameError(firstname === '' ? FIELD_REQUIRED : '')
            setLnameError(lastname === '' ? FIELD_REQUIRED : '')
            return;
        }

        if (Validator.validate("name", userName, null, null, true)){
            setUserNameError(Validator.validate("name", userName, null, null, true))
            return;
        }

        if(Validator.validate("name", firstname, null, null, true)){
            setFnameError(Validator.validate("name", firstname, null, null, true))
            return;
        }

        if(Validator.validate("name", lastname, null, null, true)){
            setLnameError(Validator.validate("name", lastname, null, null, true))
            return;
        }

        if(Validator.validate("email", email, null, null, true)){
            setEmailError(Validator.validate("email", email, null, null, true))
            return;
        }

        if(Validator.validate("password", password, 6, 30, true)){
            setPasswordError(Validator.validate("password", password, 6, 30, true))
            return;
        }

        const isUserNameExists = await props.checkUserNameExists(userName)

        if(isUserNameExists?.payload?.data?.status === 400){
          setUserNameError(TextMessage.USERNAME_ERROR_TEXT)
          return;
        }else{
          setUserNameError('')
        }

        setLoading(true);

        const ENV = process.env.NEXT_PUBLIC_ENV;
        if (ENV === "production") {
            const emailVerificationResult = await dispatch(emailVerification(email));
            setLoading(false);
            const invalidStatuses = ["invalid", "disposable", "disabled"];
            const status = emailVerificationResult?.payload?.data?.status;

            if (invalidStatuses.includes(status)) {
                setEmailVerificationError("Please enter a valid email address");
                return;
            }
        }

        const resData = await fetchProfileImage(email);
        const profileImage = resData?.Image;
        // setProfilePhoto(profileImage)

        const res = await props.signup(
            email,
            password,
            userName,
            firstname,
            lastname,
            profileImage,
            code,
            platform,
            team
        );
        const token = res?.payload?.data?.jwt;
        const res1 = await axios.post("/api/cookies", {
            messages: token,
            userId: res?.payload?.data?.user?.id,
            userName: res?.payload?.data?.user?.username,
        });
        setLoading(false);
        if (res.error === undefined && res1?.data) {
            props.setSocialLoginLoader(true);
            // if (res?.payload?.data?.user?.confirmed === false) {
            //   props.showEmailVerficationModal(true);
            // }
            await props.setUserInformation();
            navigate.push(`/onboarding`);
            props.configCollections()
            props.setIsMobileSidebar(true)
            props.configlimitCollection()
        }
    }

  if (props.showSocialLoader) {
    return (
      <div className="spinnerLoaderWrapper">
        <div className="spinnerLoader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-5 overflow-y-hidden">
        <div className="col-span-1 md:col-span-3 flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            {/* curateit logo */}
            <CurateitLogo isCentered={true} />
            {/* Social logins  */}
            <SocialLoginOptions />
            <form onSubmit={submitData}>
              <div className="py-4">
                <div className="mb-4">
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="User Name"
                    value={userName}
                    onChange={(val) => handleUserNameChange(val)}
                  />
                  <span className="error-label">{userNameError}</span>
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="f_name"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(val) => handleFnameChange(val)}
                  />
                  <span className="error-label">{fnameError}</span>
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="l_name"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(val) => handleLnameChange(val)}
                  />
                  <span className="error-label">{lnameError}</span>
                </div>
                <div className="mb-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(val) => handleEmailChange(val)}
                  />
                  <span className="error-label">
                    {emailVerificationError.length > 0
                      ? emailVerificationError
                      : emailError}
                  </span>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(val) => handlePasswordChange(val)}
                />
                <span className="error-label">{passwordError}</span>
              </div>
              <button
                className="w-full btn-padding-12 button primary"
                disabled={loading}
                type="submit"
              >
                {loading ? `Loading...` : "Sign Up"}
              </button>
            </form>
            <Link href="/sign-in" className="flex items-center justify-center">
              <button className="text-blue-500 text-sm text-center block mt-4">
                Already have an account? Sign in
              </button>
            </Link>
          </div>
          <CookieConsent />
        </div>

        <div
          className={`relative hidden md:block bg-[#E5F0FF] md:col-span-2 inline-flex flex-col items-start pt-4 pl-12`}
        >
          <ImageCarousel images={imagesArr} isLogin={true} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showSocialLoader: state.user.showSocialLoader,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
  signup: (email, password, firstname, lastname, userName, profilePhoto, code, platform, team) =>
    dispatch(
      signup(email, password, firstname, lastname, userName, profilePhoto, code, platform, team)
    ),
  emailVerification: (email) => dispatch(emailVerification(email)),
  setUserInformation: () => dispatch(setUserInformation()),
  // setWelcomeModalStatus: (status) => dispatch(setWelcomeModalStatus(status)),
  setSocialLoginLoader: (val) => dispatch(setSocialLoginLoader(val)),
  showEmailVerficationModal: (val) => dispatch(showEmailVerficationModal(val)),
  checkUserNameExists: (userName) => dispatch(checkUserNameExists(userName)),
  setIsMobileSidebar: (status) => dispatch(setIsMobileSidebar(status)),
  configlimitCollection: () => dispatch(configlimitCollection()),
  configCollections: () => dispatch(configCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
