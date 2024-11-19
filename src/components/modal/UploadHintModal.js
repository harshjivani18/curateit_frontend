import { Modal } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

const UploadHintModal = ({ open, setOpen }) => {
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        if (window.innerWidth <= 600) {
          setMobileScreen(true);
        } else {
          setMobileScreen(false);
        }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <>
      <Modal
        open={open}
        title={""}
        footer={null}
        onCancel={() => setOpen(false)}
        width={mobileScreen ? "90%" : "70%"}
        closable={false}
        centered={true}
      >
        <div>
          <div className="flex items-center gap-6 justify-evenly">
            <div>
              <span className="text-[#347AE2] text-xl block">Step 1:</span>
              <span className="text-base text-[#4B4F5D] block my-1">
                On your computer, open Chrome. At the top right, select more.
              </span>

              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/upload-1.png`}
                alt={"Bookmark upload"}
                priority={true}
                width={420}
                height={240}
              />
            </div>

            <div>
              <span className="text-[#347AE2] text-xl block">Step 2:</span>
              <span className="text-base text-[#4B4F5D] block my-1">
                Go to Bookmarks and lists, then select Bookmark Manager.
              </span>

              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/upload-2.png`}
                alt={"Bookmark upload"}
                priority={true}
                width={420}
                height={240}
              />
            </div>
          </div>

          <div className="flex items-center justify-center my-1 w-full">
            <div>
              <span className="text-[#347AE2] text-xl block">Step 3:</span>
              <span className="text-base text-[#4B4F5D] block my-1">
                At the top, select More and then click on Export bookmarks
              </span>

              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/upload-3.png`}
                alt={"Bookmark upload"}
                priority={true}
                width={420}
                height={240}
              />
            </div>
          </div>

          <div
            className="flex items-center rounded-[35px] bg-[#347AE2] p-2 w-fit justify-center cursor-pointer mx-auto my-0"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="mr-1 h-4 w-4 text-white" />
            <span className="text-white block">Close</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadHintModal;