// Note: This is the landing page for the application
"use client";

import "./theme.css";
import "./main-site.css";

import React, { useEffect, 
                useState }            from "react";
import { useRouter }                  from "next/navigation";
import Link                           from "next/link";
import axios                          from "axios";
import { HiOutlineMenu, HiOutlineX }  from "react-icons/hi";
import { Dropdown }                   from "antd";

import session                        from "@utils/session";

const MainPage = () => {
  const navigate = useRouter();
  const STATIC_IMAGES_CDN = process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN;
  const WEBSITE_DOMAIN = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const getCall = async () => {
      const queryParams = window.location.search.split("?access_token=");
      const accessToken = queryParams.length > 1 ? queryParams[1] : null;
      if (accessToken) {
        session.setLoginDetails(accessToken);
        const userDetails = JSON.parse(window.atob(accessToken));
        if (userDetails.jwt) {
          await axios.post("/api/cookies", { messages: userDetails.jwt, userId: userDetails?.user?.id, userName: userDetails?.user?.username });
        }
        navigate.push(`/u/${session.username}/all-bookmarks`);
      } else if (session.token && session.username) {
        await axios.post("/api/cookies", { messages: session.token, userId: session.userId, userName: session.username });
        navigate.push(`/u/${session.username}/all-bookmarks`);
      }
    };

    getCall();
  }, [navigate])

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const renderMenuPage = () => {
    return (
      <>
        <Link href={`${WEBSITE_DOMAIN}/pricing`}>
          <p className="notion-link hyper-link"> Pricing </p>
        </Link>
        <Link href={`${WEBSITE_DOMAIN}/use-cases`}>
          <p className="notion-link hyper-link"> Use Cases </p>
        </Link>
        <Link href={`${WEBSITE_DOMAIN}/features`}>
          <p className="notion-link hyper-link"> Features </p>
        </Link>
        <Link href={`${WEBSITE_DOMAIN}/blog`}>
          <p className="notion-link hyper-link"> Blog </p>
        </Link>
      </>
    );
  };

  const dropdownRenderMenuUI = () => {
    return (
      <div className="bg-white z-50 p-3 relative -top-8 text-lg rounded-lg shadow-lg border-[0.5px] cursor-pointer flex flex-col mx-2 gap-y-4">
        <div className="flex justify-between items-center">
          <Link href="/sign-in">
            <p className="notion-link hyper-link "> Sign in </p>
          </Link>
          <div className="cursor-pointer" onClick={()=>setOpenMenu(false)}>
            <HiOutlineX className="h-5 w-5" />
          </div>
        </div>
        {renderMenuPage()}
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className="super-navbar__actions ">
        <div className="super-navbar__actions super-navbar__actions-tag ">
          {renderMenuPage()}
        </div>
        <div className="super-navbar__actions">
          <Link href="/sign-in" className="hidden lg:block">
            <p className="notion-link signin"> Sign in </p>
          </Link>
          <Link href="/sign-up">
            <button className="notion-link">
              <div className="super-navbar__cta">Sign Up</div>
            </button>
          </Link>
          <div className="ml-4 lg:hidden">
            <Dropdown
              overlayStyle={{ width: "100%", position:"absolute"  }}
              trigger={["click"]}
              placement="topLeft"
              open={openMenu}
              onOpenChange={handleOpenMenu}
              dropdownRender={() => dropdownRenderMenuUI()}
            >
              <button onClick={(e) => e.preventDefault()}>
                <HiOutlineMenu className="h-5 w-5" />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id="__next" className="theme-light main-landing-html">
        <div id="page-index" className="super-root page__index">
          {/*  Navbar Section starts from Here */}
          <div className="super-navbar simple" style={{ position: " sticky" }}>
            <nav
              aria-label="Main"
              data-orientation="horizontal"
              dir="ltr"
              className="super-navbar__content"
            >
              <a className="notion-link super-navbar__logo" href="/">
                <div
                  className="super-navbar__logo-image"
                  style={{ width: "180px" }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      overflow: "hidden",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                  >
                    <img
                      alt="Logo"
                      sizes="100vw"
                      src={`${STATIC_IMAGES_CDN}/webapp/logo.png`}
                      decoding="async"
                      data-nimg="fill"
                      width={500}
                      height={500}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        boxSizing: "border-box",
                        padding: 0,
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: 0,
                        height: 0,
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        objectPosition: "left",
                      }}
                    />
                  </span>
                </div>
              </a>
              {renderMenu()}
            </nav>
          </div>
          {/*  Hero Section starts from Here */}
          <div className="super-content-wrapper">
            <div className="super-content max-width has-footer">
              <article
                id="block-0ed95ff29d1c4f38a306d43b84960678"
                className="notion-root"
              >
                <div
                  id="block-980c3467508d459fbe975f3505766d37"
                  className="notion-column-list"
                >
                  <div
                    id="block-a6e74dc68d774a1aa06d30d94ee31d7a"
                    className="notion-column"
                    style={{
                      width:
                        "calc((100% - var(--column-spacing) * 1) * 0.4999999999999999)",
                    }}
                  >
                    <div
                      id="block-ef0ab3fce5e14e3099f9e1ed57a43101"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string">
                          <span> </span>
                        </span>
                      </p>
                    </div>
                    <h1
                      id="block-a49b0ef6f3c34e628a1a7a745ac7f720"
                      className="notion-heading"
                    >
                      <span
                        className="notion-heading__anchor"
                        id="a49b0ef6f3c34e628a1a7a745ac7f720"
                      ></span>
                      <span className="notion-semantic-string">
                        <span>Curate, Save, Search, Share gems of web</span>
                      </span>
                    </h1>
                    <div
                      id="block-961f1e5df8f14e5fb858439e1f20b249"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string"></span>
                      </p>
                    </div>
                    <div
                      id="block-0cea2f247d6d483a9f67d8beac807642"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string">
                          <span>
                            Access everything everywhere anytime with anyone and
                            10x your productivity with with Curateit, built for
                            power users of the web!
                          </span>
                        </span>
                      </p>
                    </div>
                    <div
                      id="block-29bd373362a34035bc6f0069ce447ddf"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string"></span>
                      </p>
                    </div>
                    <div
                      id="block-01088ee7cb30453082ef9670204558da"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string">
                          <span>
                            <strong>
                              <a
                                href="https://link.curateit.com/SignUpExtension"
                                className="notion-link link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download Extension - its free →{" "}
                              </a>
                            </strong>
                          </span>
                        </span>
                      </p>
                    </div>
                    <div
                      id="block-a444fe9c3a6442eeb64a6eb84477e6c5"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string"></span>
                      </p>
                    </div>
                    <div
                      id="block-6345171a112844e9a2f08e34b2d2a65e"
                      className="notion-text"
                    >
                      <p className="notion-text__content">
                        <span className="notion-semantic-string"></span>
                      </p>
                    </div>
                  </div>
                  <div
                    id="block-80af9a0efeff4f2a829bdb03e6634aed"
                    className="notion-column"
                    style={{
                      width:
                        "calc((100% - var(--column-spacing) * 1) * 0.5000000000000001)",
                      marginInlineStart: "var(--column-spacing)",
                    }}
                  >
                    <div
                      id="block-890d40a8df224eaabe8953f4b31160f8"
                      className="notion-image align-start page-width"
                    >
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "block",
                          overflow: "hidden",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            boxSizing: "border-box",
                            display: "block",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: 1,
                            border: 0,
                            margin: 0,
                          }}
                        ></span>
                        <img
                          alt="Extension Demo"
                          width={500}
                          height={500}
                          src={`${STATIC_IMAGES_CDN}/webapp/ext-demo.png`}
                        />
                        {/* <img alt="Extension Demo" sizes="100vw" src={'/images/extDemo.png'} /> */}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/*  Footer Section ends here */}
          <div className="super-footer corners">
            <a className="notion-link super-footer__logo" href="/">
              <div className="super-footer__logo-image" style={{ width: 180 }}>
                <span
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    overflow: "hidden",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <img
                    alt="Logo"
                    src={`${STATIC_IMAGES_CDN}/webapp/logo.png`}
                    decoding="async"
                    data-nimg="fill"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      boxSizing: "border-box",
                      padding: 0,
                      border: "none",
                      margin: "auto",
                      display: "block",
                      width: 0,
                      height: 0,
                      minWidth: "100%",
                      maxWidth: "100%",
                      minHeight: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      objectPosition: "left",
                    }}
                    width={500}
                    height={500}
                  />
                </span>
              </div>
            </a>
            <div className="super-footer__icons">
              <a
                href="https://twitter.com/CurateitHQ"
                className="notion-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <title>Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/curateit/"
                className="notion-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/curateithq"
                className="notion-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <title>Instagram</title>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                </svg>
              </a>
            </div>
            <div className="super-footer__links">
              <a
                className="notion-link super-footer__link"
                href={`${WEBSITE_DOMAIN}/pricing`}
              >
                <p>Pricing</p>
              </a>
              <a
                className="notion-link super-footer__link"
                href={`${WEBSITE_DOMAIN}/app-comparison`}
              >
                <p>App Comparison</p>
              </a>
              <a
                className="notion-link super-footer__link"
                href={`${WEBSITE_DOMAIN}/whats-new`}
              >
                <p>Whats New?</p>
              </a>
              <a
                className="notion-link super-footer__link"
                href={`${WEBSITE_DOMAIN}/careers`}
              >
                <p>Careers</p>
              </a>
              <a
                className="notion-link super-footer__link"
                href={`${WEBSITE_DOMAIN}/the-team`}
              >
                <p>Team</p>
              </a>
              <a
                className="notion-link super-footer__link"
                href={`${WEBSITE_DOMAIN}/privacy-terms`}
              >
                <p>Privacy Terms</p>
              </a>
            </div>
            <p className="super-footer__footnote">© Curateit Inc. 2023</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
