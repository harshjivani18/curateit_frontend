"use client"

import ReferralComponent from "@components/Referrals/ReferEarn/refer"
import CommonLayout from "@components/layouts/CommonLayout"

const Referral = () => {
    
    return (
        <CommonLayout showSecondarySidebar={false}>
            <ReferralComponent />
        </CommonLayout>
    )
}

export default Referral