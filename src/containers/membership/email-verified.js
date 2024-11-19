"use client";

import { useEffect }        from "react";
import { CheckBadgeIcon }   from "@heroicons/react/24/outline"
import { useRouter }        from "next/navigation";

import CurateitLogo         from "@components/common/CurateitLogo";
import Button               from "@components/common/Button";
import PlainLayoutFooter    from "@components/common/PlainLayoutFooter";
import session              from "@utils/session";
import CookieConsent from "@components/cookie/CookieConsent";

const EmailVerified = () => {
    const navigate = useRouter();

    useEffect(() => {
        session.setIsUserConfirmed(true)
    }, []);

    return (
        <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
            <div className='radial-grad-down py-4'>
                <div className="flex items-center justify-center">
                    <CurateitLogo />
                </div>
                <div className='flex justify-center py-16'>
                    <CheckBadgeIcon className='text-[#54C882] h-[95px] ' />
                </div>
                <div className='text-center mb-16'>
                    <h5 className='text-lg font-bold text-[#062046] text-center mb-4'>Email verified successfully!</h5>
                    <Button variant="tertiary text-center" onClick={() => navigate.push("/")}>
                        Back to home
                    </Button>
                </div>
                <PlainLayoutFooter />
            </div>
            <CookieConsent />
        </div>
    )
}

export default EmailVerified;