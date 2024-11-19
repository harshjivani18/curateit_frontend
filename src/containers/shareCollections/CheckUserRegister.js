"use client";

import { Modal, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkCollectionExpiration,
  clearCollectionState,
  getSharedCollections,
  resetSharedCollections,
} from "@actions/collection";
// import Error from "../../components/common/Error"
import { clearAllTags } from "@actions/tags";
import { sidebarMenuClicked } from "@actions/app";
import Button from "@components/common/Button";
import InputWithIcon from "@components/common/InputWithIcon";
// import { TextMessage } from "@utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { login, disableMsg } from "@actions/membership";
import { Validator } from "@utils/validations";
import CurateitLogo from "@components/common/CurateitLogo";
import SocialLoginOptions from "@components/common/SocialLoginOptions";
import { FIELD_REQUIRED } from "@utils/messages";
import axios from "axios";
import session from "@utils/session";
import slugify from "slugify";

const CheckUserRegister = () => {
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("collectionId");
  const emailId = searchParams.get("email");
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingSessionCheck, setLoadingSessionCheck] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session && session?.emailAddress === emailId) {
      const getCall = async () => {
        setLoadingSessionCheck(true);
        const res1 = await dispatch(
          checkCollectionExpiration(emailId, collectionId)
        );

        if (res1.error === undefined && res1.payload.data.status === 200) {
          await dispatch(getSharedCollections());
          const cObj = res1?.payload?.data?.data?.[0];
          const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
          navigate.push(
            `/u/${session.username}/c/${cObj?.id}/${slug}`
          );
          setLoadingSessionCheck(false);
        } else {
          setLoadingSessionCheck(false);
          setError(res1?.payload?.data?.msg ||"Collection shared is expired. Please contact the owner")
        }
      };
      getCall();
      return;
    }
  }, []);

  const handleUserChange = (val) => {
    setEmail(val);
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
    } else {
      setUserError("");
      setPasswordError("");
    }

    if (Validator.validate("email", email, null, null, true)) {
      setUserError(Validator.validate("email", email, null, null, true));
      return;
    } else {
      setUserError("");
    }
    setLoading(true);
    const res = await dispatch(login(email, password));
    const token = res?.payload?.data?.jwt;
    await axios.post("/api/cookies", {
      messages: token,
      userId: res?.payload?.data?.user?.id,
      userName: res?.payload?.data?.user?.username,
    });

    if (res.error === undefined) {
      const res1 = await dispatch(
        checkCollectionExpiration(email, collectionId)
      );

      if (res1.error === undefined && res1.payload.data.status === 200) {
        await dispatch(getSharedCollections());
        setLoading(false);
        const cObj = res1?.payload?.data?.data?.[0];
        const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
        navigate.push(
          `/u/${session.username}/c/${cObj?.id}/${slug}`
        );
      } else {
        message.error(
          res1?.payload?.data?.msg ||
            "Collection shared is expired. Please contact the owner"
        );
        session.clear();
        dispatch(sidebarMenuClicked("all"));
        dispatch(clearCollectionState());
        dispatch(clearAllTags());
        dispatch(disableMsg());
        dispatch(resetSharedCollections());
        setLoading(false);
      }
    } else {
      // message.error(TextMessage.ERROR_TEXT);
      setLoading(false);
    }
  };

  if (!mounted) return <></>;

  if (loadingSessionCheck) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!loadingSessionCheck && session && session?.emailAddress === emailId && error)
    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
            <img className="h-50 w-50 my-0 mx-auto" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`} alt="Cloud ellipse icons" data-current-src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}></img>
            <p className="text-gray-600 text-lg">{error}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate.push(`/u/${session.username}/all-bookmarks`)}>Go Back</button>
        </div>
        </>
    );

  if (!loadingSessionCheck && session && session?.emailAddress !== emailId) {
    return (
      <>
        <Modal open={true} closable={false} footer={null}>
          {/* <PublicHearder /> */}
          <CurateitLogo isCentered={true} />

          <main className="px-16 mt-[14px]">
            <div className="border-b border-cyan-100">
              <nav
                className="-mb-px flex space-x-1 justify-around"
                aria-label="Tabs"
              >
                <span className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm w-[48%] text-center">
                  Login to access
                </span>
              </nav>
            </div>

            <div>
              {/* <SocialLogin  /> */}
              <SocialLoginOptions
                page="collection-mail"
                email={emailId}
                collectionId={collectionId}
              />
            </div>

            <h6 className="text-sm text-center text-gray-500">
              or sign in with email{" "}
            </h6>
            <>
              {/* <Error /> */}
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
              <div className="mt-4 login-btn-container">
                <Button
                  className="login-btn"
                  onClick={submitData}
                  disabled={loading}
                  variant="primary w-full"
                >
                  {loading ? `Loading...` : "Sign in"}
                </Button>
              </div>

              <div className="mt-4 text-center">
                <span className=" text-gray-500 text-xs">
                  &#169;{new Date().getFullYear()} Curateit.com
                </span>
              </div>
            </>
          </main>
        </Modal>
      </>
    );
  }
};

export default CheckUserRegister;
