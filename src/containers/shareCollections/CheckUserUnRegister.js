"use client"

import { Modal, message } from "antd"
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { disableMsg, emailVerification, signup, setUserInformation } from "@actions/membership";
import { Validator } from "@utils/validations";
// import SigninError from "../../components/common/signinerror";
import { checkCollectionExpiration, clearCollectionState, getSharedCollections, resetSharedCollections, updateUnRegisteredUser } from "@actions/collection"
import { sidebarMenuClicked } from "@actions/app"
import { clearAllTags } from "@actions/tags"
import slugify from "slugify"
import { useRouter, useSearchParams } from "next/navigation";
import CurateitLogo from "@components/common/CurateitLogo";
import SocialLoginOptions from "@components/common/SocialLoginOptions";
import Button from "@components/common/Button";
import InputWithIcon from "@components/common/InputWithIcon";
import { FIELD_REQUIRED, LESS_THAN_15_CHARS, NO_SPACES, NO_SPECIAL_CHARS } from "@utils/messages";
import { TextMessage } from "@utils/constants";
import axios from "axios";
import session from "@utils/session";
import { checkUserNameExists } from "@actions/user";

const CheckUserUnRegister = () => {
    const searchParams = useSearchParams()
    const tokenId = searchParams.get('token')
    const collectionId = searchParams.get('collectionId')
    const emailId = searchParams.get('email')
    const dispatch = useDispatch();
    const navigate = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [emailVerificationError, setEmailVerificationError] = useState("")

    const [userName,setUserName] = useState('')
    const [userNameError,setUserNameError] = useState('')

    const [loading, setLoading] = useState(false)

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleEmailChange = (val) => {
        setEmail(val)
    };
    const handlePasswordChange = (val) => {
        setPassword(val);
    };
    const handleUserNameChange = (val) => {
        setUserName(val)
    };
    const handleFnameChange = (val) => {
        setFirstname(val)
    }
    const handleLnameChange = (val) => {
        setLastname(val)
    }

    const submitData = async (e) => {
        e.preventDefault();
        if(email === '' || userName === '' || password === '' || firstname === '' || lastname === ''){
        setEmailError(email === '' ? FIELD_REQUIRED : '')
        setUserNameError(userName === '' ? FIELD_REQUIRED : '')
        setPasswordError(password === '' ? FIELD_REQUIRED : '')
        setFnameError(firstname === '' ? FIELD_REQUIRED : '')
        setLnameError(lastname === '' ? FIELD_REQUIRED : '')
        return;
        }else{
        setEmailError('')
        setUserNameError('')
        setPasswordError('')
        setFnameError('')
        setLnameError('')
        }

        if (userName.includes(" ")) {
          setUserNameError(NO_SPACES);
          return;
        }
        if (/[^a-zA-Z0-9]/.test(userName)) {
          // This regex checks for any character that is not a letter or a number
          setUserNameError(NO_SPECIAL_CHARS);
          return;
        }
        if (userName.length >= 15) {
          setUserNameError(LESS_THAN_15_CHARS);
          return;
        }

        if(Validator.validate("name", userName, null, null, true)){
        setUserNameError(Validator.validate("name", userName, null, null, true))
        return;
        }else{
        setUserNameError('')
        }

        if(Validator.validate("name", firstname, null, null, true)){
        setFnameError(Validator.validate("name", firstname, null, null, true))
        return;
        }else{
        setFnameError('')
        }

        if(Validator.validate("name", lastname, null, null, true)){
        setLnameError(Validator.validate("name", lastname, null, null, true))
        return;
        }else{
        setLnameError('')
        }

        if(Validator.validate("email", email, null, null, true)){
        setEmailError(Validator.validate("email", email, null, null, true))
        return;
        }else{
        setEmailError('')
        }

        if(Validator.validate("password", password, 6, 30, true)){
        setPasswordError(Validator.validate("password", password, 6, 30, true))
        return;
        }else{
        setPasswordError('')
        }

        const isUserNameExists = await dispatch(checkUserNameExists(userName))

        if(isUserNameExists?.payload?.data?.status === 400){
          setUserNameError(TextMessage.USERNAME_ERROR_TEXT)
          return;
        }else{
            setUserNameError('')
        }

        const { NEXT_PUBLIC_ENV } = process.env;
        if (NEXT_PUBLIC_ENV === "production") {
          const emailVerificationResult = await dispatch(emailVerification(email))
          if(emailVerificationResult && emailVerificationResult.payload.data && emailVerificationResult.payload.data.status === "invalid"){
            setEmailVerificationError("Please enter a valid email address.")
            setLoading(false);
            return;
          }
        }
        setLoading(true)
        const res = await dispatch(signup(email, password,userName,firstname,lastname));
        const token = res?.payload?.data?.jwt
        await axios.post('/api/cookies', { messages: token, userId: res?.payload?.data?.user?.id, userName: res?.payload?.data?.user?.username });

        if(res.error === undefined){
            const expirationDetails = await dispatch(checkCollectionExpiration(emailId,collectionId))
            setLoading(false)
            if (expirationDetails.error === undefined) {
                setLoading(false)
                await dispatch(setUserInformation())
                const cObj = expirationDetails?.payload?.data?.data?.[0]
                navigate.push(`/u/${session.username}/c/${cObj?.id}/${cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
                await dispatch(updateUnRegisteredUser(tokenId,collectionId))
                await dispatch(getSharedCollections())
                return
            }
            
            session.clear();
            dispatch(sidebarMenuClicked("all"))
            dispatch(clearCollectionState());
            dispatch(clearAllTags());
            dispatch(disableMsg())
            dispatch(resetSharedCollections())
            message.error(expirationDetails?.payload?.data?.msg || TextMessage.ERROR_TEXT)
        }else{
            setLoading(false)
            message.error(res?.payload?.data?.msg || TextMessage.ERROR_TEXT)
        }
        
    };

    if (!mounted) return <></>;

    return(
        <>
        <Modal
        open={true}
        closable={false}
        footer={null}
        >
        {/* <PublicHearder /> */}
        <CurateitLogo isCentered={true} />

        <main className='px-16 mt-[14px]'>
            <div className="border-b border-cyan-100">
            <nav className="-mb-px flex space-x-1 justify-around" aria-label="Tabs">
                <span className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm w-[48%] text-center">Register to access</span>
            </nav>
            </div>

            <div>
                {/* <SocialLogin  /> */}
                <SocialLoginOptions page='collection-mail' email={emailId} collectionId={collectionId} isNew={true} tokenId={tokenId}/>
            </div>

            <h6 className='text-sm text-center text-gray-500'>or create your account</h6>
            {/* <SigninError /> */}
           <div className='py-4'>

            <div className='mb-4'>
          <InputWithIcon type="text" name="last_name" placeholder="User Name" value={userName} onChange={(val) => handleUserNameChange(val)} />
          <span className="error-label">{userNameError}</span>
            </div>
            <div className='mb-4'>
            <InputWithIcon type="text" name="f_name" placeholder="First Name" value={firstname} onChange={(val) => handleFnameChange(val)} />
            <span className="error-label">{fnameError}</span>
            </div>
            <div className='mb-4'>
            <InputWithIcon type="text" name="l_name" placeholder="Last Name" value={lastname} onChange={(val) => handleLnameChange(val)} />
            <span className="error-label">{lnameError}</span>
            </div>
            <div className='mb-4'>
            <InputWithIcon type="email" name="email" placeholder="Email" value={email} onChange={(val) => handleEmailChange(val)} />
            <span className="error-label">{emailVerificationError.length > 0 ? emailVerificationError : emailError}</span>
            </div>
            <InputWithIcon type="password" name="password" placeholder="Password" value={password} onChange={(val) => handlePasswordChange(val)} />
            <span className="error-label">{passwordError}</span>
            </div>
            <Button variant="primary w-full btn-padding-12" disabled={loading} onClick={submitData}>{loading ? `Loading...` : "Sign Up"}</Button>
            <div className="mt-4 text-center">
            <span className=" text-gray-500 text-xs">
                &#169;{new Date().getFullYear()} Curateit.com
            </span>
        </div>
        </main>

    </Modal>
        </>
    )
}

export default CheckUserUnRegister