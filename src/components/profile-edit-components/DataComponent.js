import { deleteAllCollections, deleteEmptyCollections, fetchCollectionWiseCounts } from "@actions/collection";
import { deleteAllGems, fetchGemsFilters } from "@actions/gems";
import { deleteAllTags, deleteEmptyTags, fetchTagsWithGemsCount } from "@actions/tags";
import { changePassword, deleteAccount, deleteAllData } from "@actions/user";
import DeleteModal from "@components/modal/DeleteModal";
import { TextMessage } from "@utils/constants";
import { FIELD_REQUIRED } from "@utils/messages";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import session from '@utils/session';
import UploadBookmarkDrawer from "@components/drawers/UploadBookmarkDrawer";

const DataComponent = ({ user, isMobile = false, handleOpenDeleteModal =() => {}}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const handleCancel = () => {
    setOpenModal(false);
    setModalType(null);
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setCurrentPasswordError("");
  };

  const handleDeleteCollections = () => {
    setLoading(true);
    dispatch(deleteAllCollections()).then((res) => {
      if (res?.payload?.status === 200) {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.success(TextMessage.PROFILE_COLLECTIONS_DELETE);
        dispatch(fetchCollectionWiseCounts());
        dispatch(fetchGemsFilters());
        router.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.error(
          "An error occurred while deleting your. Please try again!"
        );
        router.push(`/u/${session.username}/all-bookmarks`);
      }
    });
  };

  const handleDeleteGems = () => {
    setLoading(true);
    dispatch(deleteAllGems()).then((res) => {
      if (res?.payload?.status === 200) {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.success(TextMessage.PROFILE_GEMS_DELETE);
        dispatch(fetchGemsFilters());
        dispatch(fetchTagsWithGemsCount());
        dispatch(fetchCollectionWiseCounts());
        router.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.error("An error occurred while deleting. Please try again!");
        router.push(`/u/${session.username}/all-bookmarks`);
      }
    });
  };

  const handleDeleteTags = () => {
    setLoading(true);
    dispatch(deleteAllTags()).then((res) => {
      if (res?.payload?.status === 200) {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.success(TextMessage.PROFILE_TAGS_DELETE);
        dispatch(fetchTagsWithGemsCount());
        dispatch(fetchGemsFilters());
        router.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.error("An error occurred while deleting. Please try again!");
        router.push(`/u/${session.username}/all-bookmarks`);
      }
    });
  };

  const handleDeleteEmptyCollections = () => {
    setLoading(true);
    dispatch(deleteEmptyCollections()).then((res) => {
      if (res?.payload?.status === 200) {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.success(TextMessage.PROFILE_ALL_DATA_DELETE);
        dispatch(fetchCollectionWiseCounts());
        router.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.error("An error occurred while deleting. Please try again!");
        router.push(`/u/${session.username}/all-bookmarks`);
      }
    });
  };

  const handleDeleteEmptyTags = () => {
    setLoading(true);
    dispatch(deleteEmptyTags()).then((res) => {
      if (res?.payload?.status === 200) {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.success(TextMessage.PROFILE_TAGS_DELETE);
        dispatch(fetchTagsWithGemsCount());
        router.push(`/u/${session.username}/all-bookmarks`);
      } else {
        setLoading(false);
        setModalType(null);
        setOpenModal(false);
        message.error("An error occurred while deleting. Please try again!");
        router.push(`/u/${session.username}/all-bookmarks`);
      }
    });
  };

  const handleDeleteAllData = async () => {
    setLoading(true);
    const res = await dispatch(deleteAllData());
    if (res?.payload?.status === 200) {
      setLoading(false);
      setModalType(null);
      setOpenModal(false);
      message.success(TextMessage.PROFILE_TAGS_DELETE);
      dispatch(fetchTagsWithGemsCount());
      dispatch(fetchGemsFilters());
      dispatch(fetchCollectionWiseCounts());
      router.push(`/u/${session.username}/all-bookmarks`);
    } else {
      setLoading(false);
      setModalType(null);
      setOpenModal(false);
      message.error("An error occurred while deleting. Please try again!");
      router.push(`/u/${session.username}/all-bookmarks`);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setNewPasswordError(newPassword === "" ? FIELD_REQUIRED : "");
      setConfirmPasswordError(confirmPassword === "" ? FIELD_REQUIRED : "");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Password must match");
      return;
    }

    setLoading(true);
    const data = {
      currentPassword: " ",
      password: newPassword,
      passwordConfirmation: confirmPassword,
    };

    const res = await dispatch(changePassword(data));

    if (res.error === undefined) {
      setLoading(false);
      handleCancel();
      message.success(TextMessage.PASSWORD_UPDATE);
    } else {
      setLoading(false);
      handleCancel();
      const msg = res?.error?.response?.data?.error?.message;
      message.error(msg || "Invalid Credentials");
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    dispatch(deleteAccount()).then((res) => {
      if (res?.payload?.status === 200) {
        setLoading(false);
        logout();
      } else {
        setLoading(false);
        message.error("An error occurred while deleting. Please try again!");
        router.push("/");
      }
    });
  };

  return (
    <>
      <div
        className={`mt-4 ${
          isMobile ? "px-4" : "flex flex-col items-center justify-center"
        }`}
      >
        {!isMobile && (
          <div className="flex justify-between items-center py-4 w-[50%]">
            <p className="font-medium text-lg">Data</p>
            <></>
          </div>
        )}

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Password</p>

          <Button
            className="rounded-md text-[#347AE2] bg-[#E5F0FF] hover:bg-[#E5F0FF] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2]"
            onClick={() => {
              setOpenModal(true);
              setModalType("password");
            }}
          >
            Change
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Import bookmarks html, text, csv</p>

          <Button
            className="rounded-md text-[#347AE2] bg-[#E5F0FF] hover:bg-[#E5F0FF] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2]"
            onClick={() => setOpen(true)}
          >
            Upload Bookmark
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Delete collections with gems</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              setOpenModal(true);
              setModalType("collections");
            }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Delete Tags with gems</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              setOpenModal(true);
              setModalType("tags");
            }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Delete All gems</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              setOpenModal(true);
              setModalType("gems");
            }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Delete Empty collection</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              setOpenModal(true);
              setModalType("empty_collections");
            }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">Delete Empty Tags</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              setOpenModal(true);
              setModalType("empty_tags");
            }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="">{"Delete all (Gems, Collections, Tags)"}</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              setOpenModal(true);
              setModalType("all_data");
            }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`flex justify-between items-center py-4 ${
            isMobile ? "w-full" : "w-[50%]"
          }`}
        >
          <p className="text-[#E23434]">Delete Account</p>

          <Button
            className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
            onClick={() => {
              // if (searchParams.get("billing") && item.title !== "Billing") {
              //   navigate.push(`/u/${session.username}/edit-profile`);
              // }
              handleOpenDeleteModal();
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {openModal && (
        <DeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalType={modalType}
          setModalType={setModalType}
          loading={loading}
          handleDeleteCollections={handleDeleteCollections}
          handleDeleteGems={handleDeleteGems}
          handleDeleteTags={handleDeleteTags}
          handleDeleteEmptyCollections={handleDeleteEmptyCollections}
          handleDeleteEmptyTags={handleDeleteEmptyTags}
          handleDeleteAllData={handleDeleteAllData}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          newPasswordError={newPasswordError}
          confirmPasswordError={confirmPasswordError}
          handleChangePassword={handleChangePassword}
          handleCancel={handleCancel}
          currentPasswordError={currentPasswordError}
          handleDeleteAccount={handleDeleteAccount}
        />
      )}

      {open && (
        <UploadBookmarkDrawer
          open={open}
          setOpen={setOpen}
          isMobile={isMobile}
          fromPage="profile"
        />
      )}
    </>
  );
};

export default DataComponent;