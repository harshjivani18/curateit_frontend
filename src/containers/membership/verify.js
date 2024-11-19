"use client";

import { useState, 
         useEffect }        from "react";
import { useDispatch }      from "react-redux";
import { useSearchParams, 
         useRouter }        from "next/navigation";
import { Spin, message }    from "antd";

import { verifyEmail }      from "@actions/membership";
import ErrorPage            from "@components/error/ErrorPage";

const EmailVerify = () => {
    const dispatch          = useDispatch();
    const navigate          = useRouter()
    const [verifying,
           setVerifying]    = useState(false);
    const [isError,
           setIsError]      = useState(false);
    const searchParams      = useSearchParams()
    const code              = searchParams.get('confirmation');

    useEffect(() => {
        if (!code) {
            message.error("Verification code not found");
        }
        else {
            setVerifying(true);
            dispatch(verifyEmail(code)).then((res) => {
                setVerifying(false);
                if (res?.error) {
                    setIsError(true);
                }
                else if (res?.payload?.data?.ok) {
                    navigate.push("/email-verified");
                }
            })
        }
    }, [code])

    return (
        verifying 
            ? <div className="flex justify-center items-center w-full h-full"><Spin size="large" /></div> 
            : isError ? <ErrorPage message={"Email verification failed"} />
            : <></>
    )
}

export default EmailVerify;