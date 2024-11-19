'use client';

import "../auth.css";

import React, { useState }                  from 'react'
import { useRouter }                        from 'next/navigation';
import { connect }                          from "react-redux";
import Link                                 from "next/link";

import Button                               from "@components/common/Button"
import Input                                from "@components/common/InputWithIcon"
import CurateitLogo                         from "@components/common/CurateitLogo";
import { FIELD_REQUIRED }                   from "@utils/messages";
import { Validator }                        from "@utils/validations";
import { forgotPassword }                   from "@actions/membership";
import CookieConsent from "@components/cookie/CookieConsent";

const ForgotPassword = (props) => {
    const navigate                    = useRouter();
    
    const [email, setEmail]           = useState("");
    const [emailError, 
           setEmailError]             = useState("");
    const [loading, setLoading]       = useState(false)

    const handleEmailChange = (val) => {
        setEmail(val)
    };

    const submitData = async (e) => {
        e.preventDefault();

        if (emailError !== "") {
            return;
        }
        if(email === ''){
            setEmailError(FIELD_REQUIRED)
            return;
        }

        if(Validator.validate("email", email, null, null, true)){
            setEmailError(Validator.validate("email", email, null, null, true))
            return;
        }

        setLoading(true)
        const res      = await props.forgotPassword(email)
        setLoading(false)
        if (res.error === undefined) {
            navigate.push("/forgot-password-success")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* curateit logo */}
                <CurateitLogo isCentered={true} />
                <div className="py-4 description-text">
                    Please send an email to request a password reset. We will send you an email with instructions on how to reset your password.
                </div>
                <div className='mb-4'>
                    <Input type="email" name="email" placeholder="Email" value={email} onChange={(val) => handleEmailChange(val)} />
                    <span className="error-label">{emailError}</span>
                </div>
                <Button variant="primary w-full btn-padding-12" disabled={loading} onClick={submitData}>{loading ? `Loading...` : "Send a request"}</Button>
                <Link href="/sign-in" className="flex items-center justify-center">
                    <Button variant="tertiary text-center w-full btn-padding-12">Back to login</Button>
                </Link>
            </div>
            <CookieConsent />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    forgotPassword: (email) => dispatch(forgotPassword(email))
});

export default connect(null, mapDispatchToProps)(ForgotPassword);