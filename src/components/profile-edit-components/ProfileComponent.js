import { Button, DatePicker, Input, Spin, message, } from "antd";
import moment from "moment";
import { useMemo, useState } from "react";
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { FileUploader } from "react-drag-drop-files";
import { FiUpload } from "react-icons/fi";
import { updateUser, uploadProfileImage } from "@actions/user";
import { useDispatch } from "react-redux";
import { deleteImageFromS3 } from "@actions/collection";
import session from "@utils/session";
import { FIELD_REQUIRED } from "@utils/messages";
import { Validator } from "@utils/validations";
import { TextMessage } from "@utils/constants";
import TextEditorComponent from "./TextEditorBio";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { MdOutlineRefresh } from "react-icons/md";
const GENDER = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

const FILETYPES = ["JPG", "PNG", "JPEG"];

const ProfileComponent = ({user,isMobile=false}) => {
    const dispatch = useDispatch()
    const options = useMemo(() => countryList().getData(), []);

    const [firstName, setFirstName] = useState(user?.firstname || "");
    const [lastName, setLastName] = useState(user?.lastname || "");
    const [username, setUsername] = useState(user?.username || "");
    const [gender, setGender] = useState(user?.gender ? GENDER.filter(opt => opt.label === user?.gender)[0] : '');
    const [dob, setDob] = useState(user?.dob || null);
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
    const [restorePhoto, setRestorePhoto] = useState(user?.preferences?.userProfilePreferences?.backupProfilePhoto || "");
    const [bio, setBio] = useState(user?.about || '');
    const [country, setCountry] = useState(user?.country ? options.filter(opt => opt.label === user?.country)[0] : "")

    const [uploading, setUploading] = useState(false);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [loading, setLoading] = useState(false);

    const changeCountryHandler = value => {
        setCountry(value)
    }

    const changeGenderHandler = value => {
        setGender(value)
    }

    const fetchData = async (img) => {
      const formData = new FormData();
      formData.append("output_type", "cutout");
      formData.append("format", "PNG");
      formData.append("image_url", img);
      try {
        const response = await axios.post(
          "https://api.picsart.io/tools/1.0/removebg",
          formData,
          {
            headers: {
              "x-picsart-api-key": process.env.NEXT_PUBLIC_PICSART_API_KEY,
            },
          }
        );

        const noBgImageUrl = response.data.data.url;
        return noBgImageUrl;
      } catch (error) {
        console.error(error);
      }
    };

    const handleFileChange = async(file) => {
        setUploading(true);
        const oldProfile = profilePhoto
        const formData = new FormData()
        formData.append("files", file);
        const res = await dispatch(uploadProfileImage(formData));

        if (res?.payload?.data?.media) {
        setProfilePhoto(res?.payload?.data?.media[0]);
        setRestorePhoto(res?.payload?.data?.media[0]);
        const img = await fetchData(res?.payload?.data?.media[0]);
        dispatch(
          updateUser({
            ...user,
            profilePhoto: res?.payload?.data?.media[0],
            preferences: {
              ...user?.preferences,
              userProfilePreferences: {
                ...user?.preferences?.userProfilePreferences,
                bgRemovedProfilePhoto: img,
                backupProfilePhoto: res?.payload?.data?.media[0],
              },
            },
          })
        ).then((res) => {
          if (res?.payload?.data?.profilePhoto) {
            //Remove old profile photo
            if (oldProfile) {
              dispatch(deleteImageFromS3(oldProfile));
            }
            session.setUserProfileImage(res?.payload?.data?.profilePhoto);
            message.success(TextMessage.PROFILE_PIC_UPDATE);
            // router.push(`/u/${username}`);
          }
          setUploading(false);
        });
        }
        setUploading(false);
    }

    const handleRestoreProfilePhoto = async () => {
        setProfilePhoto(restorePhoto)
        dispatch(
          updateUser({
            ...user,
            profilePhoto: restorePhoto,
            preferences: {
              ...user?.preferences,
              userProfilePreferences: {
                ...user?.preferences?.userProfilePreferences,
                backupProfilePhoto: restorePhoto,
              },
            },
          })
        );
    }
    
    const submitData = async (e) => {
        e.preventDefault()
        if(username === '' || firstName === '' || lastName === ''){
            setUsernameError(username === '' ? FIELD_REQUIRED : '')
            setFirstNameError(firstName === '' ? FIELD_REQUIRED : '')
            setLastNameError(lastName === '' ? FIELD_REQUIRED : '')
            return;
        }

        // if (Validator.validate("name", username, null, null, true)){
        //     setUsernameError(Validator.validate("name", username, null, null, true))
        //     return;
        // }else{
        //     setUsernameError('')
        // }

        if(Validator.validate("name", firstName, null, null, true)){
            setFirstNameError(Validator.validate("name", firstName, null, null, true))
            return;
        }else{
            setFirstNameError('')
        }

        if(Validator.validate("name", lastName, null, null, true)){
            setLastNameError(Validator.validate("name", lastName, null, null, true))
            return;
        }else{
            setLastNameError('')
        }

        // if(username !== session?.username){
        //     const isUserNameExists = await dispatch(checkUserNameExists(username))

        //     if(isUserNameExists?.payload?.data?.status === 400){
        //         setUsernameError(TextMessage.USERNAME_ERROR_TEXT)
        //         return;
        //     }
        // }
        
        const data = {
            firstname: firstName,
            lastname: lastName,
            gender: gender?.value,
            dob: dob ? dob : null,
            about: bio,
            country: country.label,
            profilePhoto,
            username: username
        }

        setLoading(true)
        const res = await dispatch(updateUser(data))
        if(res.error === undefined){
            setLoading(false)
            message.success(TextMessage.PROFILE_UPDATE)
        }else{
            setLoading(false)
            message.error(TextMessage.ERROR_TEXT)
        }
    }

    const handleDeleteProfilePhoto = () => {
        dispatch(deleteImageFromS3(profilePhoto))
        dispatch(
          updateUser({
            profilePhoto: null,
            preferences: {
              ...user?.preferences,
              userProfilePreferences: {
                ...user?.preferences?.userProfilePreferences,
                bgRemovedProfilePhoto: null,
              },
            },
          })
        );
        setProfilePhoto('')
        session.setUserProfileImage(null);
        message.success(TextMessage.PROFILE_DELETE)
    }

    return (
      <>
        <div
          className={`${
            isMobile
              ? "px-4 flex flex-col-reverse"
              : "flex flex-row flex-wrap user-setting-profile-wrapper"
          }`}
        >
          <div className={`${isMobile ? "" : "flex-[0.6]"}`}>
            <div className="py-3 flex items-center w-full">
              <div style={{ flex: "0.5" }}>
                <label className="font-medium block mb-1">First Name</label>
                <Input
                  className="rounded-md"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span className="error-label block">{firstNameError}</span>
              </div>

              <div className={`ml-2`} style={{ flex: "0.5" }}>
                <label className="font-medium block mb-1">Last Name</label>
                <Input
                  className="rounded-md"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span className="error-label block">{lastNameError}</span>
              </div>
            </div>

            <div className="py-3 flex items-center w-full">
              <div style={{ flex: "0.5" }}>
                <label className="font-medium block mb-1">User Name</label>
                <Input
                  className="rounded-md"
                  placeholder="User Name"
                  value={username}
                  // onChange={handleUserName}
                  // onChange={(e) => setUsername(e.target.value)}
                  disabled={true}
                />
                <span className="error-label block">{usernameError}</span>
              </div>

              <div className={`ml-2`} style={{ flex: "0.5" }}>
                <label className="font-medium block mb-1">Email</label>
                <Input
                  className="rounded-md"
                  placeholder="User Name"
                  value={user?.email}
                  disabled={true}
                />
              </div>
            </div>

            <div className="py-3 profile-bio-editor">
              <label className="font-medium block mb-1">About yourself</label>
              <TextEditorComponent bio={bio} setBio={setBio} />
            </div>

            <div className="py-3">
              <label className="font-medium block mb-1">Date of birth</label>
              <DatePicker
                className="w-full"
                // onChange={changeDobHandler}
                showToday={false}
                format={"YYYY-MM-DD"}
                placeholder="Select your date of birth"
                // value={dob ? dob : null}
                allowClear={false}
                value={!dob ? dob : moment(dob, "YYYY-MM-DD")}
                onChange={(date, dateStirng) => setDob(dateStirng)}
                placement="bottomLeft"
              />
            </div>

            <div className="py-3">
              <label className="font-medium block mb-1">Gender</label>
              <Select
                placeholder="Select gender"
                options={GENDER}
                value={gender}
                onChange={changeGenderHandler}
              />
            </div>

            <div className="py-3">
              <label className="font-medium block mb-1">
                Country or region
              </label>
              <Select
                placeholder="Select country"
                options={options}
                value={country}
                onChange={changeCountryHandler}
              />
            </div>

            <div
              className={`${
                isMobile ? "py-4 flex items-center justify-center" : "mt-4"
              }`}
            >
              <Button
                type="primary"
                className={`${
                  isMobile ? "rounded-full w-[80%]" : "rounded-md"
                }  bg-[#347AE2] hover:bg-[#347AE2] border-[#347AE2] hover:border-[#347AE2]`}
                onClick={submitData}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          <div
            className={`${
              isMobile
                ? "py-4"
                : "flex-[0.4] flex justify-end ml-2 h-[fit-content]"
            } relative`}
          >
            <FileUploader
              className="outline-none"
              handleChange={handleFileChange}
              name="file"
              types={FILETYPES}
              onTypeError={(err) => message.error(err)}
            >
              <div className="bg-white my-0 mx-auto w-60 h-60  border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center rounded-full">
                {uploading ? (
                  <Spin size="middle" tip="Uploading..." />
                ) : (
                  <>
                    {profilePhoto ? (
                      <>
                        <div
                          className="w-60 h-60  object-cover rounded-full flex justify-center items-center"
                          style={{
                            backgroundImage: `url(${profilePhoto})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <button className="bg-[#c3c3c3a4] hover:bg-[#347AE2] p-2 mt-2 rounded-lg text-white">
                            Browse Image
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <FiUpload className="h-6 w-6 text-gray-500 my-0 mx-auto mb-2" />
                        <span>Drag & drop to upload Image</span>
                        <div className="flex justify-center items-center gap-2 mt-2">
                          <hr className="w-12" />
                          <span className="text-gray-500">OR</span>
                          <hr className="w-12" />
                        </div>
                        <button className="bg-[#347AE2] p-2 mt-2 rounded-lg text-white">
                          Browse Image
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </FileUploader>
            {profilePhoto && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProfilePhoto();
                }}
                className="absolute top-0 z-2 right-[55px]"
              >
                <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
              </div>
            )}
            {profilePhoto && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestoreProfilePhoto();
                }}
                className="absolute top-0 z-2 left-[80px] md:left-[200px]"
              >
                <MdOutlineRefresh className="h-5 w-5 cursor-pointer text-black" />
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default ProfileComponent;