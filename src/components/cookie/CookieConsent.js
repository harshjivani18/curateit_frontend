"use client";
import "./CookieConsent.css";
import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent !== "accepted" && consent !== "rejected") {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowConsent(false);
  };

  if (!showConsent) return null;
  
  return (
    <div className="fixed right-0 bottom-0 z-50 flex items-center justify-center px-4 py-6 ct-cookie-main-container">
      <div className="bg-white p-6 rounded-2xl shadow-xl z-50 max-w-[300px] w-full relative">
        <button
          onClick={handleDecline}
          className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-800"
        >
          <img
            className="x-icon pointer"
            title="Close"
            loading="lazy"
            src="https://d3jrelxj5ogq5g.cloudfront.net/icons/x_xawx75.svg"
            alt="Close icon"
          />
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-col">
            <div className="rounded-full p-2">
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9 16H9.01M12 11H12.01M7 10H7.01M15 16H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C12 5.76142 13.7909 8 16 8C16 10.2091 18.2386 12 21 12Z"
                    stroke="#317be2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="ml-4 text-center">
              <p className="text-lg font-semibold text-gray-800">
                Cookies Consent
              </p>
              <p className="text-gray-600">
                This website use cookies to ensure you get the best experience
                on our website.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAccept}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Accept all
          </button>
          <button
            onClick={handleDecline}
            className="text-blue-500 px-6 py-2 rounded-lg border border-blue-500 hover:bg-blue-100 transition-colors"
          >
            Decline all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
