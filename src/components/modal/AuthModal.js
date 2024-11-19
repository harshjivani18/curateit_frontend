import { enableTourSteps, fromWelcomeModal, openAuthModal, setIsMobileSideba, setIsMobileSidebar } from "@actions/app";
import CurateitLogo from "@components/common/CurateitLogo";
import InputWithIcon from "@components/common/InputWithIcon";
import SocialLoginOptions from "@components/common/SocialLoginOptions";
import { Modal, message } from "antd";
import Button                    from "@components/common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, setSocialLoginLoader,signup, 
         setUserInformation } from "@actions/membership";
import { FIELD_REQUIRED } from "@utils/messages";
import { Validator } from "@utils/validations";
import { TextMessage } from "@utils/constants";
import { configCollections, configlimitCollection } from "@actions/collection";
import session from "@utils/session";
import { socialLoginReferralTrack } from "@actions/user";

const AuthModal = ({openModal,page=''}) => {
    const navigate         = useRouter();
    const dispatch         = useDispatch()
    const { isMobileView,authModal } = useSelector((state) => state.app);

    //login states
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, 
           setPasswordError]        = useState("");
    const [loading, setLoading]     = useState(false);

    //register states
    const [emailRegister, setEmailRegister]           = useState("");
    const [passwordRegister, setPasswordRegister]     = useState("");
    const [emailRegisterError, 
            setEmailRegisterError]             = useState("");
    const [passwordRegisterError, 
            setPasswordRegisterError]          = useState("");
    const [fnameError, 
            setFnameError]             = useState("");
    const [lnameError, 
            setLnameError]             = useState("");
    const [firstname, 
            setFirstname]              = useState("");
    const [lastname, 
            setLastname]               = useState("");
    const [emailVerificationError, 
            setEmailVerificationError] = useState("")
    const [userName,
            setUserName]               = useState('')
    const [userNameError,
            setUserNameError]          = useState('')

    const uname = authModal?.extraInfo?.username;
    const id = authModal?.extraInfo?.id;
    const module = authModal?.extraInfo?.module;
    const trigger = authModal?.extraInfo?.trigger;
    const slug = authModal?.extraInfo?.slug;

    //login
    const handleUserChange = (val) => {
        setEmail(val);
    }
    const handlePasswordChange = (val) => {
        setPassword(val);
    }

    const submitData = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setUserError(email === "" ? FIELD_REQUIRED : "");
            setPasswordError(password === "" ? FIELD_REQUIRED : "");
            return
        }

        if (Validator.validate("email", email, null, null, true)){
            setUserError(Validator.validate("email", email, null, null, true))
            return;
        }

        setLoading(true);
        const res =await dispatch(login(email, password));
        // dispatch(fetchCollectionWiseCounts())
        const token = res?.payload?.data?.jwt
        const res1= await axios.post('/api/cookies', { messages: token })
        setLoading(false);
        if (res.error === undefined && res1?.data) {
            dispatch(setSocialLoginLoader(true))
            dispatch(configCollections())
            if (authModal?.extraInfo?.onRegistrationComplete) {
                authModal.extraInfo.onRegistrationComplete()
                dispatch(openAuthModal({
                    open: false,
                    action: 'login'
                }))
                return
            }
            dispatch(openAuthModal({
                open: false,
                action: 'login'
            }))
            message.success(TextMessage.LOGGED_IN)
        }
    }

    //register
    const handleEmailChange = (val) => {
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
        }

        if (Validator.validate("name", userName, null, null, true)){
            setUserNameError(Validator.validate("name", userName, null, null, true))
            return;
        }

        if(Validator.validate("name", firstname, null, null, true)){
            setFnameError(Validator.validate("name", firstname, null, null, true))
            return;
        }

        if(Validator.validate("name", lastname, null, null, true)){
            setLnameError(Validator.validate("name", lastname, null, null, true))
            return;
        }

        if(Validator.validate("email", emailRegister, null, null, true)){
            setEmailError(Validator.validate("email", emailRegister, null, null, true))
            return;
        }

        if(Validator.validate("password", passwordRegister, 6, 30, true)){
            setPasswordError(Validator.validate("password", passwordRegister, 6, 30, true))
            return;
        }
        
        setLoading(true)
        const ENV = process.env.NEXT_PUBLIC_ENV;
        if (ENV === "production") {
            const emailVerificationResult = await props.emailVerification(emailRegister)
            setLoading(false);
            if(emailVerificationResult && emailVerificationResult.payload.data && emailVerificationResult.payload.data.status === "invalid"){
                setEmailVerificationError("Please enter a valid email address. Domain name is not valid according to the standards")
                return
            }
        }

        const res       = await dispatch(signup(emailRegister, passwordRegister, userName, firstname, lastname, null, null, null, null, uname, id, module, trigger, slug))
        const token     = res?.payload?.data?.jwt
        const res1      = await axios.post('/api/cookies', { 
            messages: token,
            userId: res?.payload?.data?.user?.id,
            userName: res?.payload?.data?.user?.username,
        });
        setLoading(false)
        if (res.error === undefined && res1?.data) {
            dispatch(setSocialLoginLoader(true))
            await dispatch(setUserInformation())
            dispatch(configCollections())
            dispatch(setIsMobileSidebar(true))
            dispatch(configlimitCollection())
            if (authModal?.extraInfo?.onRegistrationComplete) {
                dispatch(enableTourSteps(true));
                dispatch(fromWelcomeModal(true));
                session.setIsNewlyRegistered(true)
                authModal.extraInfo.onRegistrationComplete()
                dispatch(openAuthModal({
                    open: false,
                    action: 'login'
                }))
                return
            }
            // dispatch(fetchCollectionWiseCounts())
            dispatch(openAuthModal({
                open: false,
                action: 'login'
            }))
            message.success(TextMessage.LOGGED_IN)
        }
    }

    const onSocialReferralComplete = async () => {
        const data = {
            code: uname,
            platform: module,
            id,
            trigger,
            slug
        }
        await dispatch(socialLoginReferralTrack(data))
    }

    return(
        <>
        <Modal
          title={null}
          open={openModal}
          footer={null}
          maskClosable={false}
          onCancel={() => {
            dispatch(openAuthModal({
                open: false,
                action: 'login'
            }))
          }}
          width={isMobileView ? "90%" : "450px"}
          bodyStyle={{
            padding:'0px'
          }}
        >
            {
            authModal?.action === 'login' ? 
            <div className="bg-white p-8 w-full max-w-md">
                {/* curateit logo */}
                <CurateitLogo isCentered={true} />
                {/* Social logins  */}
                <SocialLoginOptions page={page} extraInfo={authModal?.extraInfo} onSocialReferralComplete={onSocialReferralComplete} />
                <h6 className="text-sm text-center text-gray-500">
                    {" "}
                    or sign in with email{" "}
                </h6>
                {/* Form */}
                    <div className="py-4">
                        <div className="mb-4">
                            <InputWithIcon
                                value={email}
                                onChange={(val) => handleUserChange(val)}
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <span className="error-label">{userError}</span>
                        </div>
                        <InputWithIcon
                            value={password}
                            onChange={(val) => handlePasswordChange(val)}
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <span className="error-label">{passwordError}</span>
                    </div>
                    <div className="flex justify-between">
                            <button className="text-blue-500 text-sm" onClick={(e) => {
                                e.preventDefault()
                                dispatch(
                                    openAuthModal({
                                        open:true,
                                        action: 'signup',
                                        extraInfo: {
                                            trigger,
                                            username: uname,
                                            id,
                                            module,
                                            slug
                                        }
                                    })
                                )
                            }}>Create an account</button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate.push("/forgot-password")
                                return false
                            }}
                            className="text-blue-500 text-sm"
                        >
                            Forgot Password?
                        </Button>
                    </div>
                    <div className="mt-4 login-btn-container primary w-full">
                        <Button className="login-btn" 
                        onClick={submitData} 
                        disabled={loading}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </div>
                {/* footer */}
                <div className="mt-4 text-center">
                    <span className=" text-gray-500 text-xs">
                    &#169;{new Date().getFullYear()} Curateit.com
                    </span>
                </div>
            </div>
            : 
            
            <div className="bg-white p-8 w-full max-w-md">
                {/* curateit logo */}
                <CurateitLogo isCentered={true} />
                {/* Social logins  */}
                <SocialLoginOptions  page={page} extraInfo={authModal?.extraInfo} onSocialReferralComplete={onSocialReferralComplete} />
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
                        <InputWithIcon type="email" name="email" placeholder="Email" value={emailRegister} onChange={(val) => handleEmailChange(val)} />
                        <span className="error-label">{emailVerificationError.length > 0 ? emailVerificationError : emailRegisterError}</span>
                    </div>
                    <InputWithIcon type="password" name="password" placeholder="Password" value={passwordRegister} onChange={(val) => handlePasswordRegisterChange(val)} />
                    <span className="error-label">{passwordRegisterError}</span>
                </div>
                <Button variant="primary w-full btn-padding-12" disabled={loading} 
                onClick={submitDataRegister}
                >
                    {loading ? `Loading...` : "Sign Up"}</Button>
                <div className="flex items-center justify-center" onClick={(e) => {
                    e.preventDefault()
                    const obj = {
                        open:true,
                        action:'login'
                    }
                    if (authModal?.extraInfo) {
                        obj.extraInfo = authModal.extraInfo
                    }
                    dispatch(openAuthModal(obj))
                }}>
                    <button className="text-blue-500 text-sm text-center block mt-4">Already have an account? Sign in</button>
                </div>
            </div>
            }
        </Modal>
        </>
    )
}

export default AuthModal;