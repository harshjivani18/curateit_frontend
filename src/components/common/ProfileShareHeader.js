import CurateitLogo from "@components/common/CurateitLogo";
import UserActions from "@components/userActions/UserAction";

const ProfileShareHeader = ({ isMobile, user, handleFollowAction,setOpenContactDrawer=()=>{} }) => {
  return (
    <>
      <div
        className="flex justify-between items-center py-1 px-4 md:px-6 fixed w-full top-0 bg-white left-0"
        style={{ zIndex: "98" }}
      >
        <div className="flex md:pl-[16px]">
          {isMobile ? (
            <CurateitLogo />
          ) : (
            <>
              {" "}
              {/* <Button
                icon={<HiOutlineChevronLeft className="h-5 w-5" />}
                className="text-sm  font-medium text-gray-900 border-none outline-none flex flex-row"
              >
                Back
              </Button> */}
            </>
          )}
        </div>
        <UserActions
          isMobile={isMobile}
          user={user}
          handleFollowAction={handleFollowAction}
          setOpenContactDrawer={setOpenContactDrawer}
        />
      </div>
    </>
  );
};

export default ProfileShareHeader;
