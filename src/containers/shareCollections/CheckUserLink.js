"use client"

import { Modal, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { disableMsg, emailVerification, login, signup,
         setUserInformation } from "@actions/membership";
import { useDispatch } from "react-redux";
import { checkCollectionViaLink, clearCollectionState, getSharedCollections, resetSharedCollections } from "@actions/collection";
import { sidebarMenuClicked } from "@actions/app";
import { clearAllTags } from "@actions/tags";
import session from "@utils/session";
import { FIELD_REQUIRED, LESS_THAN_15_CHARS, NO_SPACES, NO_SPECIAL_CHARS } from "@utils/messages";
import CheckBox from "@components/common/Checkbox";
import InputWithIcon from "@components/common/InputWithIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { Validator } from "@utils/validations";
import CurateitLogo from "@components/common/CurateitLogo";
import SocialLoginOptions from "@components/common/SocialLoginOptions";
import Button from "@components/common/Button";
import { TextMessage } from "@utils/constants";
import axios from "axios";
import slugify from "slugify";


const defaultTabs = [
    { name: 'Sign in', href: '#', current: true },
    { name: 'Sign up', href: '#', current: false }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CheckUserLink = () => {
    const searchParams = useSearchParams()
    const inviteId = searchParams.get('inviteId')
    const collectionId = searchParams.get('collectionId')

    const [tabs, setTabs] = useState(defaultTabs);

    //register
    const dispatch = useDispatch();
    const navigate = useRouter();

    //register
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [emailRegisterError, setEmailRegisterError] = useState("");
    const [passwordRegisterError, setPasswordRegisterError] = useState("");
    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [emailVerificationError, setEmailVerificationError] = useState("")

    const [userName,setUserName] = useState('')
    const [userNameError,setUserNameError] = useState('')

    const [loading, setLoading] = useState(false)

    const [mounted, setMounted] = useState(false);
    const [loadingSessionCheck, setLoadingSessionCheck] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if(session && session?.userId && inviteId){
            const getCall = async () => {
                setLoadingSessionCheck(true)
                const res1 = await dispatch(checkCollectionViaLink(inviteId,collectionId))

                if(res1.error === undefined && res1.payload.data.status === 200){
                    await dispatch(getSharedCollections())
                    const cObj = res1?.payload?.data?.data?.[0]
                    const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
                    navigate.push(`/u/${session.username}/c/${cObj?.id}/${slug}`)
                    setLoadingSessionCheck(false)
                    setError(false)
                }else{
                    setError(res1?.payload?.data?.msg || TextMessage.ERROR_TEXT)
                    setLoadingSessionCheck(false);
                }
            }

            getCall()
        }
    },[])

    const handleEmailRegisterChange = (val) => {
        setEmailRegister(val)
    };
    const handlePasswordRegisterChange = (val) => {
        setPasswordRegister(val);
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

    const submitDataRegister = async (e) => {
        e.preventDefault();
        if(emailRegister === '' || userName === '' || passwordRegister === '' || firstname === '' || lastname === ''){
        setEmailRegisterError(emailRegister === '' ? FIELD_REQUIRED : '')
        setUserNameError(userName === '' ? FIELD_REQUIRED : '')
        setPasswordRegisterError(passwordRegister === '' ? FIELD_REQUIRED : '')
        setFnameError(firstname === '' ? FIELD_REQUIRED : '')
        setLnameError(lastname === '' ? FIELD_REQUIRED : '')
        return;
        }else{
        setEmailRegisterError('')
        setUserNameError('')
        setPasswordRegisterError('')
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

        if(Validator.validate("email", emailRegister, null, null, true)){
        setEmailRegisterError(Validator.validate("email", emailRegister, null, null, true))
        return;
        }else{
        setEmailRegisterError('')
        }

        if(Validator.validate("password", passwordRegister, 6, 30, true)){
        setPasswordRegisterError(Validator.validate("password", passwordRegister, 6, 30, true))
        return;
        }else{
        setPasswordRegisterError('')
        }

        setLoading(true);

        const { NEXT_PUBLIC_ENV } = process.env;
        if (NEXT_PUBLIC_ENV === "production") {
          const emailVerificationResult = await dispatch(emailVerification(email))
          if(emailVerificationResult && emailVerificationResult.payload.data && emailVerificationResult.payload.data.status === "invalid"){
            setEmailVerificationError("Please enter a valid email address.")
            setLoading(false);
            return;
          }
        }

        const res = await dispatch(signup(emailRegister, passwordRegister,userName, firstname,lastname));
        const token = res?.payload?.data?.jwt
        await axios.post('/api/cookies', { messages: token, userId: res?.payload?.data?.user?.id, userName: res?.payload?.data?.user?.username });

        if(res.error === undefined){
            await dispatch(setUserInformation())
            const res1 = await dispatch(checkCollectionViaLink(inviteId,collectionId))
            if(res1.error === undefined && res1?.payload?.data?.status === 200){
                const cObj = res1?.payload?.data?.data?.[0]
                const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
                navigate.push(`/u/${session.username}/c/${cObj?.id}/${slug}`)
                await dispatch(getSharedCollections())
                setLoading(false)
            }else{
                navigate.push(`/u/${session.username}/all-bookmarks`)
                message.error(`You are not authorized to access that linked collection but your account has been created successfully.`)
                setLoading(false)
            }
        }else{
            setLoading(false)
        }
      
    };

    const registerFormUI = () => {
        return(
            <>
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
                <InputWithIcon type="email" name="email" placeholder="Email" value={emailRegister} onChange={(val) => handleEmailRegisterChange(val)} />
                <span className="error-label">{emailVerificationError.length > 0 ? emailVerificationError : emailRegisterError}</span>
                </div>
                <InputWithIcon type="password" name="password" placeholder="Password" value={passwordRegister} onChange={(val) => handlePasswordRegisterChange(val)} />
                <span className="error-label">{passwordRegisterError}</span>
            </div>
            <Button variant="primary w-full btn-padding-12" disabled={loading} onClick={submitDataRegister}>{loading ? `Loading...` : "Sign Up"}</Button>
            </>
        )
    }

    //login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isChecked, setIsChecked] = useState("");

    useEffect(() => {
        if (session.checkbox) {
        setIsChecked(session.checkbox);
        const user = localStorage.getItem("user");
        setEmail(user);
        setPassword(session.password);
        }
    }, []);

    const handleCheckbox = (e) => {
        setIsChecked(!isChecked)
    };
    
    const handleUserChange = (val) => {
        setEmail(val)
    };
    const handlePasswordChange = (val) => {
        setPassword(val);
    };


    const submitData = async (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setUserError(email === '' ? FIELD_REQUIRED : '')
            setPasswordError(password === '' ? FIELD_REQUIRED : '')
            return;
        }else{
            setUserError('')
            setPasswordError('')
        }

        if(Validator.validate("email", email, null, null, true)){
            setUserError(Validator.validate("email", email, null, null, true))
            return;
        }else{
            setUserError('')
        }

        setLoading(true);
        const res =await dispatch(login(email, password));
        const token = res?.payload?.data?.jwt
        await axios.post('/api/cookies', { messages: token, userId: res?.payload?.data?.user?.id, userName: res?.payload?.data?.user?.username });

        if(res.error === undefined){
            const res1 = await dispatch(checkCollectionViaLink(inviteId,collectionId))

            if(res1.error === undefined && res1.payload.data.status === 200){
                await dispatch(getSharedCollections())
                setLoading(false);
                const cObj = res1?.payload?.data?.data?.[0]
                const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
                navigate.push(`/u/${session.username}/c/${cObj?.id}/${slug}`)
            }else{
                message.error(res1?.payload?.data?.msg || TextMessage.ERROR_TEXT)
                session.clear();
                dispatch(sidebarMenuClicked("all"))
                dispatch(clearCollectionState());
                dispatch(clearAllTags());
                dispatch(disableMsg())
                dispatch(resetSharedCollections())
                setLoading(false);
            }

        }else{
            // message.error(TextMessage.ERROR_TEXT)
            setLoading(false);
        }
    };

    const loginFormUI = () => {
        return(
        <>
        {/* <Error /> */}
        <div className='py-4'>
            <div className='mb-4'>
            <InputWithIcon value={email} onChange={(val) => handleUserChange(val)} type="email" name="email" placeholder="Email" />
            <span className="error-label">{userError}</span>
            </div>
            <InputWithIcon value={password} onChange={(val) => handlePasswordChange(val)} type="password" name="password" placeholder="Password" />
            <span className="error-label">{passwordError}</span>
        </div>
        <div className='flex justify-between'>
            <CheckBox value={isChecked} onChange={handleCheckbox} name="remember" label="Remember Me" />
            <Button  onClick={() => navigate.push("/forgot-password")}className='text-blue-500 text-sm'>Forgot Password?</Button>
        </div>
        <div className='mt-4 login-btn-container' >
            <Button className="login-btn" onClick={submitData} disabled={loading} variant="primary w-full">{loading ? `Loading...` : "Sign in"}</Button>
        </div>
        </>
        )
    }

    const activateTab = (name) => {
        const newTabs = tabs.map(t => {
            if (t.name === name) {
                return { ...t, current: true }
            } else {
                return { ...t, current: false }
            }
        });

        setTabs(newTabs);
    }

    if (!mounted) return <></>;

    if (loadingSessionCheck) {
        return (
        <div className="w-full h-screen flex items-center justify-center">
            <Spin/>
        </div>
        );
    }

    if(!loadingSessionCheck && error){
        return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
            <img className="h-50 w-50 my-0 mx-auto" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`} alt="Cloud ellipse icons" data-current-src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}></img>
            <p className="text-gray-600 text-lg">{error}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate.push(`/u/${session.username}/all-bookmarks`)}>Go Back</button>
        </div>
        </>
    );
    }

    if(!loadingSessionCheck && !error){
        return(
        <>
        <Modal
        open={true}
        closable={false}
        footer={null}
        >

        <CurateitLogo isCentered={true}/>

        <main className='px-16 mt-[14px]'>
        <div className="border-b border-cyan-100">
        <nav className="-mb-px flex space-x-1 justify-around" aria-label="Tabs">
            {tabs.map((tab) => (
                <span
                onClick={() => activateTab(tab.name)}
                key={tab.name}
                // href={tab.href}
                className={classNames(
                            tab.current
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm w-[48%] text-center cursor-pointer'
                            )}
                aria-current={tab.current ? 'page' : undefined}
                >
                    {tab.name}
                </span>
                ))}
        </nav>
        </div>
    
        <div>
            <SocialLoginOptions page='collection-link' inviteId={inviteId} collectionId={collectionId}/>
        </div>
        <h6 className='text-sm text-center text-gray-500'>{tabs.filter(t => t.current === true)[0].name === "Sign in" ? 'or sign in with email' : 'or create your account'}</h6>
            {tabs.filter(t => t.current === true)[0].name === "Sign in" ? loginFormUI() : registerFormUI()}
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
}

export default CheckUserLink;