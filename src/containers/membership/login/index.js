"use client";

import "../auth.css";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

import InputWithIcon from "@components/common/InputWithIcon";
import CurateitLogo from "@components/common/CurateitLogo";
import SocialLoginOptions from "@components/common/SocialLoginOptions";
import { FIELD_REQUIRED } from "@utils/messages";
import { Validator } from "@utils/validations";
import session from "@utils/session";

import { login, setSocialLoginLoader } from "@actions/membership";
import { showEmailVerficationModal } from "@actions/app";
import { message } from "antd";
// import { TextMessage } from "@utils/constants";
import CheckBox from "@components/common/Checkbox";
import { configCollections } from "@actions/collection";
import CookieConsent from "@components/cookie/CookieConsent";
import ImageCarousel from "@components/common/ImageCarousel";

const SignIn = (props) => {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState("");

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

  useEffect(() => {
    // Retrieve the stringified user data from localStorage
    const userString = localStorage.getItem("userInfo");

    if (userString) {
      // Parse the stringified data back into an object
      const user = JSON.parse(userString);
      if (user) {
        // Access the email and password, ensuring they are not null or undefined
        const { email, password } = user;
        if (email && password) {
          setEmail(email);
          setPassword(password);
        } else {
          // console.log("User data is incomplete");
        }
      } else {
        // console.log("User not found");
      }
    } else {
      // console.log("No user data found");
    }
  }, []);

  useEffect(() => {
    props.setSocialLoginLoader(false);
  }, []);

  const handleUserChange = (val) => {
    setEmail(val);
  };
  const handleCheckbox = (e) => {
    setIsChecked(!isChecked);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setUserError(email === "" ? FIELD_REQUIRED : "");
      setPasswordError(password === "" ? FIELD_REQUIRED : "");
      return;
    }

    if (Validator.validate("email", email, null, null, true)) {
      setUserError(Validator.validate("email", email, null, null, true));
      return;
    }

    setLoading(true);
    const res = await props.login(email, password);
    if (res?.error === undefined) {
      const user = { email, password };
      const userString = JSON.stringify(user);

      localStorage.setItem("userInfo", userString);
      const token = res?.payload?.data?.jwt;
      const res1 = await axios.post("/api/cookies", {
        messages: token,
        userId: res?.payload?.data?.user?.id,
        userName: res?.payload?.data?.user?.username,
      });
      if (res1?.data) {
        setLoading(false);
        props.setSocialLoginLoader(true);
        // if (res?.payload?.data?.user?.confirmed === false) {
        //   props.showEmailVerficationModal(true);
        // }
        navigate.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setLoading(false);
        // message.error(TextMessage.ERROR_TEXT);
      }
      props.configCollections()
    } else {
      setLoading(false);
      message.error(
        res?.error?.response?.data?.error?.message ||
          "Invalid identifier or password"
      );
    }
  };

  if (props.showSocialLoader) {
    return (
      <div className="spinnerLoaderWrapper">
        <div className="spinnerLoader"></div>
      </div>
    );
  }

  return (
    <>
      {/*  Sign Up Form  */}
      <div className="h-full grid grid-cols-1 md:grid-cols-5 overflow-y-hidden">
        <div className="bg-gray-50 col-span-1 md:col-span-3 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            {/* curateit logo */}
            <CurateitLogo isCentered={true} />
            {/* Social logins  */}
            <SocialLoginOptions />
            <h6 className="text-sm text-center text-gray-500">
              {" "}
              or sign in with email{" "}
            </h6>
            {/* Form */}
            <form onSubmit={submitData}>
              <div className="py-4">
                <div className="mb-4">
                  <InputWithIcon
                    value={email}
                    onChange={(val) => handleUserChange(val)}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <span className="error-label">{userError}</span>
                </div>
                <InputWithIcon
                  value={password}
                  onChange={(val) => handlePasswordChange(val)}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span className="error-label">{passwordError}</span>
              </div>
              <div className="flex flex-col gap-4">
                <CheckBox
                  value={isChecked}
                  onChange={handleCheckbox}
                  name="remember"
                  label="Remember Me"
                />
                <div className="flex justify-between">
                  <div
                    className="text-blue-500 text-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate.push("/sign-up");
                    }}
                  >
                    Create an account
                  </div>

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      navigate.push("/forgot-password");
                    }}
                    className="text-blue-500 text-sm cursor-pointer"
                  >
                    Forgot Password?
                  </div>
                </div>
              </div>
              <div className="mt-4 login-btn-container primary w-full">
                <button className="login-btn" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
            </form>
            {/* footer */}
            <div className="mt-4 text-center">
              <span className=" text-gray-500 text-xs">
                &#169;{new Date().getFullYear()} Curateit.com
              </span>
            </div>
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

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  setSocialLoginLoader: (val) => dispatch(setSocialLoginLoader(val)),
  showEmailVerficationModal: (val) => dispatch(showEmailVerficationModal(val)),
  configCollections: () => dispatch(configCollections())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
