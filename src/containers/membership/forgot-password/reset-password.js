'use client';

import "../auth.css";

import React, { useState }                  from 'react'
import { useRouter, useSearchParams }       from 'next/navigation';
import { connect }                          from "react-redux";

import Button                               from "@components/common/Button"
import Input                                from "@components/common/InputWithIcon"
import CurateitLogo                         from "@components/common/CurateitLogo";
import { FIELD_REQUIRED }                   from "@utils/messages";
import { Validator }                        from "@utils/validations";
import { resetPassword }                    from "@actions/membership";
import CookieConsent from "@components/cookie/CookieConsent";

const ResetPassword = (props) => {
    const navigate                    = useRouter();
    const searchParams                = useSearchParams();
    const code                        = searchParams.get("code");
    const [password, setPassword]     = useState("");
    const [confirmPassword,
           setConfirmPassword]        = useState("");
    const [passwordError, 
           setPasswordError]          = useState("");
    const [confirmPasswordError,
           setConfirmPasswordError]   = useState("");
    const [loading, setLoading]       = useState(false)

    const isResetPasswordValid = (val) => {
        if (val === "" || !val) {
            return FIELD_REQUIRED;
        }
    
        return "";
    };
    
    const handlePasswordChange = (val) => {
        setPassword(val);
        isResetPasswordValid(val, 7, true);
        setPasswordError(Validator.validate("password", val, 6, 30, true));
    };

    const handleConfirmPassword = (val) => {
        setConfirmPassword(val);
        setConfirmPasswordError(
          Validator.validate("confirm", val, password, null, null, true)
        );
    };

    const submitData = async (e) => {

        e.preventDefault();
        if (confirmPasswordError !== "" || passwordError !== "" || confirmPassword === "" || password === "") {
            if (confirmPassword === "") {
                setConfirmPasswordError(FIELD_REQUIRED);
            } else {
                setConfirmPasswordError(confirmPasswordError);
            }
            if (password === "") {
                setPasswordError(Constants.FIELD_REQUIRED);
            }
            return;
        }

        setLoading(true);
        const res = await props.resetPassword(code, password, confirmPassword);
        setLoading(false);
        if (res.error === undefined) {
            navigate.push("/sign-in")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* curateit logo */}
                <CurateitLogo isCentered={true} />
                <div className='mainc w-full'>
                    <div className='py-0 md:py-4 w-full'>
                        <div className='mb-4'>
                            <Input value={password} onChange={(val) => handlePasswordChange(val)} type="password" name="password" placeholder="New Password" />
                            <span className="block error-label mt-2 ml-4">{passwordError}</span>
                        </div>
                        <Input value={confirmPassword} onChange={(val) => handleConfirmPassword(val)} type="password" name="confirm-password" placeholder="Confirm Password" />
                        <span className="block error-label mt-2 ml-4">{confirmPasswordError}</span>
                    </div>
                </div>
                <div className='mainbutton w-full'>
                    <div className='mt-4 w-full'>
                        <Button onClick={submitData} disabled={loading} variant="primary w-full px-6 py-4">
                            <span className='block text-md'>{loading ? `Loading...` : "Reset password"}</span>
                        </Button>
                    </div>
                </div>
            </div>
            <CookieConsent />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (code, password, confirmPassword) => dispatch(resetPassword(code, password, confirmPassword))
});

export default connect(null, mapDispatchToProps)(ResetPassword);