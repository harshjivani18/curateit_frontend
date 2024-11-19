import AiProfile from "@components/ai-profile/AiProfile";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const ProfileAiModal = ({
  open,
  setOpen,
  user,
  handleRemoved,
}) => {
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
        // bodyStyle={{ padding: "5px 0px" }}
        width={mobileScreen ? "90%" : "70%"}
        // closable={false}
        centered={true}
      >
        <AiProfile
          isMobile={mobileScreen}
          user={user}
          fromOnboarding={true}
          handleRemoved={handleRemoved}
          setOpenModal={setOpen}
        />
      </Modal>
    </>
  );
};

export default ProfileAiModal;
