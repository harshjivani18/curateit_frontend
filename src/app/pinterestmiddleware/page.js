"use client";
import session from "@utils/session";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";

const Home = () => {
  const [seconds, setSeconds] = useState(3);
  const router = useRouter();
  const [authCode, setAuthCode] = useState("");
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  useEffect(async () => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const pinterestAuthCode = queryParams.get("code");
    if (pinterestAuthCode) {
      setAuthCode(pinterestAuthCode);
    } else {
      setAuthCode("Not Available");
    }
  }, [router.query, router.pathname]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      redirectToProfile();
    }
  }, [seconds]);

  const redirectToProfile = () => {
    window.location.href = `https://${window.location.hostname}/u/${session.username}`;
  };

  const handleButtonClick = () => {
    const url = `https://${window.location.hostname}/u/${session.username}`;
    window.location.href = url;
  };

  return (
    <div className="h-full w-full text-center text-xl mt-2 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl">Pinterest Auth Middleware</h1>
      <h2>Authorizing your Pinterest Account</h2>
      {seconds > 0 ? (
        <h2>Redirecting to Profile in {seconds} Seconds</h2>
      ) : (
        <h2>Redirecting to Profile...</h2>
      )}
      <span>
        Or{" "}
        <button
          className="bg-[#FF2C2C] p-2 rounded-md text-white"
          onClick={handleButtonClick}
        >
          Click Here
        </button>{" "}
        To Go back to Profile
      </span>
    </div>
  );
};

export default Home;
