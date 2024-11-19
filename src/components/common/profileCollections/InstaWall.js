"use client";
import {
  // getInstaAccessToken,
  getInstaWallData,
  saveInstaWallData,
} from "@actions/login";
import { checkIsImgValid } from "@utils/equalChecks";
import session from "@utils/session";
import { Spin } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InstaLinkComponent from "../InstaLinkComponent";
import { Modal,Button, message } from "antd";

const Popup = ({ initialUrl, onSave, onCancel }) => {
  const [url, setUrl] = useState(initialUrl || "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <div className="flex justify-between">
          <button
            onClick={() => onSave(url)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginComp = ({ isLoggedIn, setIsLoggedIn, instaUserInfo }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove 'instaAccessCode' from localStorage
    localStorage.removeItem("instaAccessCode");
    localStorage.removeItem("instaUserId");
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow m-auto">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {/* Dropdown menu */}
        <div
          id="dropdown"
          className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/insta-logo-modified.png`}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900"></h5>
        <span className="text-sm text-gray-500"></span>
        {!isLoggedIn ? (
          <div className="flex mt-4 md:mt-6">
            <a
              target="_blank"
              href={`https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Login using Instagram
            </a>
          </div>
        ) : (
          <div className="flex items-center flex-col justify-center md:mt-6">
            {instaUserInfo ? (
              <>
                <h5 className="mb-3 text-xl font-medium text-gray-900">
                  {instaUserInfo?.username}
                </h5>
                <span className="text-sm text-gray-500 mb-5">{`${instaUserInfo?.media_count} Posts`}</span>
              </>
            ) : null}
            <button
              onClick={() => handleLogout()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function generateUniqueName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  // Concatenating all the parts to form a unique name
  const uniqueName = `File_${year}${month}${day}_${hours}${minutes}${seconds}${milliseconds}`;

  return uniqueName;
}

const InstaWall = ({isMobile,isOwnUser}) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const [instaUserInfo, setInstaUserInfo] = useState(null);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const instaAccessCode = localStorage.getItem("instaAccessCode");
      const instaUserId = localStorage.getItem("instaUserId");
      if (instaAccessCode && instaUserId && !instaUserInfo) {
        try {
          const response = await axios.get(
            `https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${instaAccessCode}`
          );
          const userRes = response.data;
          setInstaUserInfo({ ...userRes });
        } catch (error) {
          console.error(error);
        }
      }
      if (instaAccessCode) {
        try {
          const mediaResponse = await axios.get(
            `https://graph.instagram.com/me/media?fields=media_url,media_type&access_token=${instaAccessCode}`
          );
          const initialItems = mediaResponse?.data?.data || [];

          const reStructuredItems = await Promise.all(
            initialItems.map(async (item) => {
              const isImgValidSrc = await checkIsImgValid(item.media_url);
              return {
                fileUrl: isImgValidSrc
                  ? isImgValidSrc
                  : "https://d3jrelxj5ogq5g.cloudfront.net/webapp/curateit-logo.png",
                redirect_url: "https://curateit.com/", // No value provided in the original array
                fileName:
                  item.media_type === "VIDEO"
                    ? `${generateUniqueName()}.mp4`
                    : `${generateUniqueName()}.jpg`, // Example naming based on media_type
                fileType: item.media_type,
                title: "Imported from Instagram",
                id: item.id,
                description: "Test Desc",
              };
            })
          );

          // Save to database
          await dispatch(saveInstaWallData(reStructuredItems));

          // Fetch from database
          fetchMediaItemsFromDB();
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (itemId, newUrl) => {
    if(!newUrl){
      message.error('Url is required')
      return;
    }
    setLoading(true)
    const res = await iframelyRes(newUrl);
    let title = res?.meta?.title;
    const updatedItems = mediaItems.map((item) =>
      item.id === itemId
        ? { ...item, redirect_url: newUrl, title: title }
        : item
    );
    setMediaItems(updatedItems);
    const reStructuredItems = updatedItems.map((item) => ({
      fileUrl: item.url,
      redirect_url: item.redirect_url || "https://curateit.com/",
      fileName: item.FileName,
      fileType: item.fileType,
      title: item.title,
      id: item.item_id,
      description: item.description,
    }));

    await dispatch(saveInstaWallData(reStructuredItems));
    setShowModal(false);
    setLoading(false)
  };

  // Mock function to fetch media items from database
  const fetchMediaItemsFromDB = async () => {
    try {
      const getInstaWallDataRes = await dispatch(getInstaWallData());
      const itemsArr = getInstaWallDataRes?.payload?.data?.data?.gems || [];
      setMediaItems(itemsArr);
    } catch (error) {
      console.error("Error fetching items from database:", error);
    }
  };

  async function iframelyRes(link) {
    const token = session.token;
    const iframelyApi = process.env.NEXT_PUBLIC_IFRAMELY_API_KEY;

    try {
      const response = await axios.get(
        `https://.iframe.ly/api/iframely/?url=${link}&api_key=${iframelyApi}&iframe=1&omit_script=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    const instaAccessCode = localStorage.getItem("instaAccessCode");
    if (instaAccessCode) {
      setIsLoggedIn(true);
    }
  }, []);

  // Render media items
  const renderMediaItems = () => {
    if (!mediaItems || mediaItems.length === 0) {
      return <div>Could Not fetch Data, Please Re-Login</div>;
    }

    return (
      <div className="grid-insta-wall gap-1 md:gap-4 pb-4">
          {
            mediaItems.map((item,i) => {
                return (
                  <div key={i}>
                    <InstaLinkComponent item={item}
                    setCurrentItem={setCurrentItem}
                    setShowModal={setShowModal}
                    isOwnUser={isOwnUser}
                    />
                  </div>
                )
          })}
      </div>
    );
  };

  return (
    <div className="text-xl flex justify-center font-semibold items-center flex-col">
      {!isLoggedIn && (
        <LoginComp
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          instaUserInfo={instaUserInfo}
        />
      )}
      {isLoggedIn && (!mediaItems || mediaItems.length === 0) ? (
        <Spin />
      ) : (
        <></>
      )}
      {isLoggedIn ? (
        <>
          {renderMediaItems()}
          {showModal && currentItem && (
            <EditRedirectUrlModal
              item={currentItem}
              onSave={handleSave}
              onClose={() => setShowModal(false)}
              loading={loading}
              isMobile={isMobile}
            />
          )}
        </>
      ) : (
        <div>Please log in to view media items.</div>
      )}
    </div>
  );
};

const EditRedirectUrlModal = ({ item, onSave, onClose,loading,isMobile }) => {
  const [redirectUrl, setRedirectUrl] = useState(item.redirect_url);

  return (
    <Modal
          title={null}
          open={true}
          footer={null}
          maskClosable={true}
          onCancel={onClose}
          width={"fit-content"}

          bodyStyle={{
            width: isMobile ? 'fit-content' : '350px',
            borderRadius:'8px'
          }}
          closable={false}
          centered={true}
        >

        <div className="">
          <div className="text-center font-medium text-xl">Add your link</div>

            <input
                type="text"
                placeholder="https://www.example.com"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
                className="border border-solid border-[#97A0B5] p-2 rounded my-4 w-full"
              />

            <div className="flex items-center justify-center">
              <Button className="rounded-md text-[#347AE2] bg-[#E5F0FF] hover:bg-[#E5F0FF] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2] mr-4"
                      onClick={onClose}
                    disabled={loading}
                      >
                          Cancel
            </Button>
            <Button className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => onSave(item.id, redirectUrl)}
            disabled={loading}
              >
              Save
            </Button>
            </div>

        </div>
        
        </Modal>
  );
};
export default InstaWall;
