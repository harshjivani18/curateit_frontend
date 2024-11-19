"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import session from "@utils/session";
import { useDispatch } from "react-redux";
import { getInstaAccessToken } from "@actions/login";
import { Spin } from "antd";

export default function Home() {
  const router = useRouter();
  const [authCode, setAuthCode] = useState("");
  // const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  useEffect(async () => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const instaAuthCode = queryParams.get("code");
    if (instaAuthCode) {
      localStorage.setItem("instaAuthCode", instaAuthCode);
      setAuthCode(instaAuthCode);
      const res = await dispatch(getInstaAccessToken(instaAuthCode));
      const instaAccessCode = res?.payload?.data?.access_token;
      const userId          = res?.payload?.data?.user_id
      if (instaAccessCode) {
        const winurl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/?isInstaWall=true`;
        fetch(
          `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_CLIENT_SECRET}&access_token=${instaAccessCode}`
        )
          .then((response) => response.json())
          .then((data) => {
            const longLivedCode = data?.access_token; // expires in 60 days
            localStorage.setItem("instaAccessCode", longLivedCode);
            localStorage.setItem("instaUserId", userId)
            // Redirect to the new URL
            window.location.href = winurl;
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }
      } else {
        setAuthCode("Not Available");
      }
  }, [router.query, router.pathname]);

  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <Spin className="mb-2" size="middle" />
      <span className="text-md text-blue-500">{"Transferring to main app..."}</span>
    </div>
  );
}
