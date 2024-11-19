import React, { useState, useEffect, useMemo } from 'react'
import { Collapse, DatePicker, Input, Spin, message } from 'antd'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { AtSymbolIcon, ChevronDownIcon, ChevronUpIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/24/outline';
import { FileUploader } from 'react-drag-drop-files';
import { FiUpload } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import moment from 'moment';

import { updateUser, uploadProfileImage } from '@actions/user';
import { deleteImageFromS3 } from '@actions/collection';
import session from '@utils/session';
import { Validator } from '@utils/validations';
import { rendeProfilePlatfromLogo } from '@utils/commonFunctions'

const { Panel } = Collapse

const GENDER = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

const FILETYPES = ["JPG", "PNG", "JPEG"];

const EditProfileComponent = ({ user, setLoading }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const options = useMemo(() => countryList().getData(), []);
    const [firstName, setFirstName] = useState(user?.firstname || "");
    const [lastName, setLastName] = useState(user?.lastname || "");
    const [username, setUsername] = useState(user?.username || "");
    const [gender, setGender] = useState(user?.gender ? GENDER.filter(opt => opt.label === user?.gender)[0] : {});
    const [dob, setDob] = useState(user?.dob || "");
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
    const [bio, setBio] = useState(user?.about || new Date());
    const [socials, setSocials] = useState(user?.socialLinks || {});
    const [country, setCountry] = useState(user?.country ? options.filter(opt => opt.label === user?.country)[0] : "")
    const [error, setError] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setFirstName(user?.firstname || "");
        setLastName(user?.lastname || "");
        setUsername(user?.username || "");
        setBio(user?.about || "");
        setSocials(user?.socialLinks || {});
        setDob(user?.dob || null);
        setGender(user?.gender ? GENDER.filter(opt => opt.label === user?.gender)[0] : {});
        setProfilePhoto(user?.profilePhoto || "");
        if (user?.country) {
            const countryOpt = options.filter(opt => opt.label === user?.country)[0];
            if (countryOpt) {
                setCountry(countryOpt);
            }
        }
    }, [user, options])

    const handleFileChange = (file) => {
        setUploading(true);
        const oldProfile = profilePhoto
        const formData = new FormData()
        formData.append("files", file);
        dispatch(uploadProfileImage(formData)).then(res => {
            if (res?.payload?.data?.media && Array.isArray(res?.payload?.data?.media) && res?.payload?.data?.media.length > 0) {
                setProfilePhoto(res?.payload?.data?.media[0]);
                dispatch(updateUser({ profilePhoto: res?.payload?.data?.media[0] })).then((res) => {
                    if (res?.payload?.data?.profilePhoto) {
                        //Remove old profile photo
                        if (oldProfile) {
                            dispatch(deleteImageFromS3(oldProfile))
                        }
                        session.setUserProfileImage(res?.payload?.data?.profilePhoto);
                        router.push(`/u/${username}`);
                    }
                    setUploading(false)
                })
            }
            setUploading(false);
        });
    }

    const handleFirstName = (val) => {
        setFirstName(val)
        setError({ ...error, firstName: "" })
    }
    const handleLastName = (val) => {
        setLastName(val)
        setError({ ...error, lastName: "" })
    }

    const handleUsername = (val) => {
        setUsername(val)
        setError({ ...error, username: "" })
    }

    const changeCountryHandler = value => {
        setCountry(value)
    }


    const changeGenderHandler = value => {
        setGender(value)
    }

    const submitData = () => {
        if (Validator.validate("namewithoutspace", firstName, null, null, true)) {
            setError({
                firstName: Validator.validate(
                    "namewithoutspace",
                    firstName,
                    null,
                    null,
                    true
                ),
            })
        } else if (Validator.validate("namewithoutspace", lastName, null, null, true)) {
            setError({
                lastName: Validator.validate(
                    "namewithoutspace",
                    lastName,
                    null,
                    null,
                    true
                ),
            })
        } else {
            setLoading(true)
            const data = {
                firstname: firstName,
                lastname: lastName,
                gender: gender?.value,
                dob: dob ? dob : undefined,
                about: bio,
                country: country.label,
                profilePhoto,
                socialLinks: socials
            }


            dispatch(updateUser(data)).then((res) => {
                setLoading(false)
            })
        }
    }

    return (
        <div>
            <Collapse
                bordered={true}
                defaultActiveKey={['1']}
                expandIcon={(status) => {
                    return (
                        <div>
                            {status.isActive ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                    )
                }}
                expandIconPosition="end"
            >
                <Panel
                    header={
                        <div className='pl-2'>
                            <h2 className="font-bold text-gray-600">EDIT PROFILE</h2>
                        </div>
                    }
                    key="1"
                >
                    <div className=' flex flex-col gap-4 p-2'>

                        <div className='flex justify-center'>
                            <FileUploader className="outline-none" handleChange={handleFileChange} name="file" types={FILETYPES} onTypeError={(err) => message.error(err)}>
                                <div className='bg-white my-0 mx-auto w-60 h-60  border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center rounded-full'>
                                    {uploading ? (
                                        <Spin size='middle' tip='Uploading...' />
                                    )
                                        : (<>
                                            {profilePhoto ? (
                                                <div className='w-60 h-60  object-cover rounded-full flex justify-center items-center'
                                                    style={{ backgroundImage: `url(${profilePhoto})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}
                                                >

                                                    <button className='bg-[#c3c3c3a4] hover:bg-[#347AE2] p-2 mt-2 rounded-lg text-white'>Browse Image</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <FiUpload className='h-6 w-6 text-gray-500 my-0 mx-auto mb-2' />
                                                    <span>Drag & drop to upload Image</span>
                                                    <div className='flex justify-center items-center gap-2 mt-2'>
                                                        <hr className='w-12' />
                                                        <span className='text-gray-500'>OR</span>
                                                        <hr className='w-12' />
                                                    </div>
                                                    <button className='bg-[#347AE2] p-2 mt-2 rounded-lg text-white'>Browse Image</button>
                                                </div>
                                            )}
                                        </>)}
                                </div>
                            </FileUploader>
                        </div>

                        <div className='md:grid md:grid-cols-2 gap-y-2 md:gap-5'>
                            <div className="flex-1 md:flex-[0.5] w-full md:mb-[10px] mb-4">
                                <Input
                                    className="outline-none "
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => handleFirstName(e.target.value)}
                                    prefix={
                                        <UserIcon className="h-4 w-4 text-[#667085] cursor-pointer" />
                                    }
                                />
                                {error?.firstName && <span className='text-red-500'>{error.firstName}</span>}
                            </div>
                            <div className="flex-1 md:flex-[0.5] w-full md:mb-[10px] mb-4">
                                <Input
                                    className="outline-none "
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => handleLastName(e.target.value)}
                                    prefix={
                                        <UserIcon className="h-4 w-4 text-[#667085] cursor-pointer" />
                                    }
                                />
                                {error?.lastName && <span className='text-red-500'>{error.lastName}</span>}
                            </div>
                            <div className="flex-1 md:flex-[0.5] w-full md:mb-[10px] mb-4">
                                <Input
                                    className="outline-none "
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => handleUsername(e.target.value)}
                                    prefix={
                                        <UserIcon className="h-4 w-4 text-[#667085] cursor-pointer" />
                                    }
                                />
                                {error?.username && <span className='text-red-500'>{error.username}</span>}
                            </div>
                            <div className="flex-1 md:flex-[0.5] w-full md:mb-[10px] mb-4">
                                <Select placeholder="Select gender" options={GENDER} value={gender} onChange={changeGenderHandler} />
                            </div>
                            <div className="flex-1 md:flex-[0.5] w-full md:mb-[10px] mb-4">
                                <DatePicker
                                    className='w-full'
                                    showToday={false}
                                    format={"YYYY-MM-DD"}
                                    placeholder='Select your date of birth'
                                    allowClear={false}
                                    value={!dob ? dob : moment(dob, "YYYY-MM-DD")}
                                    onChange={(date, dateStirng) => setDob(dateStirng)}
                                    placement="bottomLeft"
                                />
                            </div>
                            <div className="flex-1 md:flex-[0.5] w-full md:mb-[10px] mb-4">
                                <Select placeholder="Select country" options={options} value={country} onChange={changeCountryHandler} />
                            </div>
                        </div>
                        <div className='border rounded-lg px-2 py-2 border-gray-300'>
                            <textarea
                                className='w-full  outline-none focus:outline-none'
                                placeholder='Write about yourself'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}>
                            </textarea>
                            {error?.bio && <span className='text-red-500'>{error.bio}</span>}
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Twitter",socials?.twitter?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="twitter username"
                                value={socials?.twitter?.username}
                                size="large"
                                onChange={(e) => setSocials({ ...socials, twitter: { ...socials.twitter, username: e.target.value } })}
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("LinkedIn",socials?.linkedin?.username)}
                            <Input
                                className="ml-2 rounded-lg"
                                placeholder="Linkedin profile url"
                                value={socials?.linkedin?.username}
                                onChange={(e) => setSocials({ ...socials, linkedin: { ...socials.linkedin, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Facebook",socials?.facebook?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="facebook username"
                                value={socials?.facebook?.username}
                                size="large"
                                onChange={(e) => setSocials({ ...socials, facebook: { ...socials.facebook, username: e.target.value } })}
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Instagram",socials?.instagram?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Instagram username"
                                value={socials?.instagram?.username}
                                onChange={(e) => setSocials({ ...socials, instagram: { ...socials.instagram, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Github",socials?.github?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Github username"
                                value={socials?.github?.username}
                                onChange={(e) => setSocials({ ...socials, github: { ...socials.github, username: e.target.value } })}
                                size="large"
                            />
                        </div>
                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("YouTube",socials?.youtube?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Youtube channel"
                                value={socials?.youtube?.username}
                                onChange={(e) => setSocials({ ...socials, youtube: { ...socials.youtube, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Tiktok",socials?.tiktok?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Tiktok username"
                                value={socials?.tiktok?.username}
                                onChange={(e) => setSocials({ ...socials, tiktok: { ...socials.tiktok, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Medium",socials?.medium?.username)}
                            <Input
                                className="ml-2 rounded-lg"
                                placeholder="Medium profile url"
                                value={socials?.medium?.username}
                                onChange={(e) => setSocials({ ...socials, medium: { ...socials.medium, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Producthunt",socials?.producthunt?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Producthunt username"
                                value={socials?.producthunt?.username}
                                onChange={(e) => setSocials({ ...socials, producthunt: { ...socials.producthunt, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Substack",socials?.substack?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Substack username"
                                value={socials?.substack?.username}
                                onChange={(e) => setSocials({ ...socials, substack: { ...socials.substack, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Pinterest",socials?.pinterest?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Pinterest username"
                                value={socials?.pinterest?.username}
                                onChange={(e) => setSocials({ ...socials, pinterest: { ...socials.pinterest, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Twitch",socials?.twitch?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Twitch username"
                                value={socials?.twitch?.username}
                                onChange={(e) => setSocials({ ...socials, twitch: { ...socials.twitch, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Threads",socials?.threads?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Threads username"
                                value={socials?.threads?.username}
                                onChange={(e) => setSocials({ ...socials, threads: { ...socials.threads, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Reddit",socials?.reddit?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Reddit username"
                                value={socials?.reddit?.username}
                                onChange={(e) => setSocials({ ...socials, reddit: { ...socials.reddit, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Discord",socials?.discord?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Discord username"
                                value={socials?.discord?.username}
                                onChange={(e) => setSocials({ ...socials, discord: { ...socials.discord, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Whatsapp",socials?.whatsapp?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Whatsapp mobile number"
                                value={socials?.whatsapp?.username}
                                onChange={(e) => setSocials({ ...socials, whatsapp: { ...socials.whatsapp, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Telegram",socials?.telegram?.username)}
                            <Input
                                className="ml-2 rounded-lg"
                                placeholder="Telegram mobile number"
                                value={socials?.telegram?.username}
                                onChange={(e) => setSocials({ ...socials, telegram: { ...socials.telegram, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Gitlab",socials?.gitlab?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Gitlab username"
                                value={socials?.gitlab?.username}
                                onChange={(e) => setSocials({ ...socials, gitlab: { ...socials.gitlab, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Tumblr",socials?.tumblr?.username)}
                            <Input
                                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                                className="ml-2 rounded-lg"
                                placeholder="Tumblr username"
                                value={socials?.tumblr?.username}
                                onChange={(e) => setSocials({ ...socials, tumblr: { ...socials.tumblr, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Steam",socials?.steam?.username)}
                            <Input
                                className="ml-2 rounded-lg"
                                placeholder="Steam profile url"
                                value={socials?.steam?.username}
                                onChange={(e) => setSocials({ ...socials, steam: { ...socials.steam, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Goodreads",socials?.goodreads?.username)}
                            <Input
                                className="ml-2 rounded-lg"
                                placeholder="Goodreads profile url"
                                value={socials?.goodreads?.username}
                                onChange={(e) => setSocials({ ...socials, goodreads: { ...socials.goodreads, username: e.target.value } })}
                                size="large"
                            />
                        </div>

                        <div className='flex items-center'>
                            {rendeProfilePlatfromLogo("Mastodon",socials?.mastodon?.username)}
                            <Input
                                className="ml-2 rounded-lg"
                                placeholder="Mastodon profile url"
                                value={socials?.mastodon?.username}
                                onChange={(e) => setSocials({ ...socials, mastodon: { ...socials.mastodon, username: e.target.value } })}
                                size="large"
                            />
                        </div>
                        
                        <div>
                            <Input
                                className="outline-none "
                                placeholder="Website"
                                value={socials?.website?.username}
                                onChange={(e) => setSocials({ ...socials, website: { ...socials.website, username: e.target.value } })}
                                prefix={
                                    <GlobeAltIcon className="h-4 w-4 text-[#667085] cursor-pointer" />
                                }
                            />
                        </div>
                        {/* <div>
                            <Select placeholder="Select country" options={options} value={country} onChange={changeCountryHandler} />
                        </div> */}
                        <div className='flex justify-center items-center'>
                            <button className='bg-blue-500 text-white rounded-md px-8 py-2' onClick={submitData}>Update</button>
                        </div>
                    </div>

                </Panel>
            </Collapse>
        </div>
    )
}

export default EditProfileComponent;