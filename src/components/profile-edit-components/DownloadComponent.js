import BrowserLogoComponent from "@components/common/BrowserLogoComponent";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { copyText, download_options_browsers } from "@utils/constants";
import session from "@utils/session";
import { Button, Input } from "antd";
import { useState } from "react";
import { PiAndroidLogoFill, PiAppleLogo, PiAppleLogoFill, PiBookmark, PiLinuxLogo, PiWindowsLogo } from "react-icons/pi";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const username = session.username;

const DownloadComponent = ({user,isMobile}) => {
    const [showInstructions,setShowInstructions] = useState(true)

    const bookmarkletHref = `javascript:(function(){open('${baseUrl}/u/${username}/all-bookmarks?url=' + encodeURIComponent(window.location.href))})()`;

    const handleCopyBookmarklet = () => {
      copyText(`${bookmarkletHref}`, "Code copied to clipboard");
    }
    return (
      <>
        <div className="border border-solid border-[#DFE4EC] rounded-2xl p-3 md:p-5">
          <div className="flex flex-col items-start gap-2 mb-4">
            <div className="font-medium text-[#292B38] text-xl">
              Curateit Browser Extension
            </div>

            <div className="text-sm text-[#74778B]">
              CurateIt is your AI-powered gateway to effortless content
              curation, saving, and sharing. Take control of your digital life
              today and create a smarter, personalized web space effortlessly.
            </div>
          </div>

          <div className="py-4 px-4 md:py-[56px] md:px-[100px] rounded-xl border border-solid border-[#DFE4EC] flex flex-col items-center justify-center gap-[56px] mb-5">
            <div className="block md:hidden flex items-center justify-center gap-4 flex-wrap">
              {download_options_browsers?.map((item) => (
                <BrowserLogoComponent item={item} />
              ))}
            </div>

            <div className="hidden md:flex items-center justify-center gap-[56px]">
              {download_options_browsers.slice(0, 5)?.map((item) => (
                <BrowserLogoComponent item={item} />
              ))}
            </div>

            <div className="hidden md:flex items-center justify-center gap-[56px]">
              {download_options_browsers.slice(5, 10)?.map((item) => (
                <BrowserLogoComponent item={item} />
              ))}
            </div>

            <div className="hidden md:flex items-center justify-center gap-[56px]">
              {download_options_browsers.slice(10)?.map((item) => (
                <BrowserLogoComponent item={item} />
              ))}
            </div>
          </div>

          {/* bookmarklet */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-[0.875px] border-solid border-[#DFE4EC] rounded-lg p-[3px] h-[48px] w-[48px] shadow flex items-center justify-center">
                <PiBookmark className="h-5 w-5" />
              </div>

              <div>
                <div className="text-base text-[#292B38] font-medium">
                  Bookmarklet
                </div>
                <div className="text-xs md:text-base text-[#74778B]">
                  Add web documents to Curateit with a special bookmark.
                </div>
              </div>
            </div>

            {showInstructions ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <span className="text-sm font-medium block mr-1 text-[#4B4F5D]">
                  Hide instructions
                </span>
                <ChevronUpIcon className="h-4 w-4 text-[#4B4F5D]" />
              </div>
            ) : (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <span className="text-sm font-medium block mr-1 text-[#4B4F5D]">
                  Show instructions
                </span>
                <ChevronDownIcon className="h-4 w-4 text-[#4B4F5D]" />
              </div>
            )}
          </div>

          {showInstructions && (
            <div className="pl-1 md:pl-[60px] mt-5">
              <div className="mb-2">
                <div className="text-base font-medium text-[#292B38]">
                  Installing
                </div>
                <div className="text-sm text-[#74778B]">
                  Drag and drop the link to your bookmarks folder.
                </div>
              </div>

              <a
                className="font-medium text-[#292B38] text-sm border border-solid border-[#DFE4EC] bg-white rounded-[35px] flex items-center justify-center py-2 px-3 w-[150px] cursor-grab"
                href={bookmarkletHref}
              >
                Add to Curateit
              </a>

              <div className="mt-3">
                <div className="text-sm text-[#74778B]">
                  Or, to install manually, create a new bookmark and paste the
                  following into the URL field
                </div>

                <div className="flex items-center gap-4 mt-1">
                  <Input
                    className="border-[0.4px] border-solid border-[#ABB7C9] rounded-lg bg-white text-[#575C70] text-sm flex-1"
                    onClick={handleCopyBookmarklet}
                    value={bookmarkletHref}
                    disabled={true}
                  />
                  <div
                    className="rounded-[35px] bg-[#E5F0FF] border border-solid border-[#DFE4EC] flex items-center justify-center gap-2 py-2 px-5 text-[#347AE2] font-medium text-sm cursor-pointer"
                    onClick={handleCopyBookmarklet}
                  >
                    Copy
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* mobile apps */}
        <div className="my-6 border border-solid border-[#DFE4EC] rounded-2xl p-3 md:p-5">
          <div className="text-[#292B38] text-xl font-medium mb-5">
            Mobile Apps
          </div>

          <div className="flex items-center justify-between md:justify-start">
            <div className="mr-0 md:mr-[170px]">
              <div className="flex items-center">
                <PiAndroidLogoFill className="h-5 w-5" />
                <span className="block text-sm md:text-base text-[#4B4F5D] font-medium ml-2">
                  CurateIt for Android
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#74778B] block mt-1">
                Coming soon...
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <PiAppleLogoFill className="h-5 w-5" />
                <span className="block text-sm md:text-base text-[#4B4F5D] font-medium ml-2">
                  CurateIt for iOS
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#74778B] block mt-1">
                Coming soon...
              </div>
            </div>
          </div>
        </div>

        {/* desktop apps */}
        <div className="my-6 border border-solid border-[#DFE4EC] rounded-2xl p-3 md:p-5">
          <div className="text-[#292B38] text-xl font-medium mb-5">
            Desktop Apps
          </div>

          <div className="flex items-center justify-evenly md:justify-between flex-wrap gap-4">
            <div className="">
              <div className="flex items-center mb-2">
                <PiWindowsLogo className="h-5 w-5" />
                <span className="block text-sm md:text-base text-[#4B4F5D] font-medium md:ml-2">
                  CurateIt for Windows
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#74778B] block mt-1">
                Coming soon...
              </div>
            </div>

            <div className="">
              <div className="flex items-center mb-2">
                <PiAppleLogo className="h-5 w-5" />
                <span className="block text-sm md:text-base text-[#4B4F5D] font-medium md:ml-2">
                  CurateIt for MacOS
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#74778B] block mt-1">
                Coming soon...
              </div>
            </div>

            <div className="">
              <div className="flex items-center mb-2">
                <PiLinuxLogo className="h-5 w-5" />
                <span className="block text-sm md:text-base text-[#4B4F5D] font-medium md:ml-2">
                  CurateIt for Linux
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#74778B] block mt-1">
                Coming soon...
              </div>
            </div>
          </div>
        </div>

        {/* integrations */}
        <div className="my-6 border border-solid border-[#DFE4EC] rounded-2xl p-3 md:p-5 flex items-center justify-between">
          <div>
            <div className="text-[#292B38] text-xl font-medium mb-1">
              Integrations
            </div>
            <div className="text-sm text-[#74778B]">
              Manage your connections to external services
            </div>
          </div>
          <div className="text-xs md:text-sm text-[#74778B] block mt-1">
            Coming soon...
          </div>
        </div>

        {/* public apis */}
        <div className="my-6 border border-solid border-[#DFE4EC] rounded-2xl p-3 md:p-5 flex items-center justify-between">
          <div>
            <div className="text-[#292B38] text-xl font-medium mb-1">
              Public API
            </div>
            <div className="text-sm text-[#74778B]">
              You can save new documents as well as fetch your data using
              Curateit API
            </div>
          </div>
          <div className="text-xs md:text-sm text-[#74778B] block mt-1">
            Coming soon...
          </div>
        </div>
      </>
    );
}

export default DownloadComponent;