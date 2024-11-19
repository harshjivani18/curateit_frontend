"use client";

import "./Pricing.css"
 
import React, { useState,
       useEffect }          from "react"
import { useDispatch, 
         useSelector }      from "react-redux"
import { initializePaddle } from '@paddle/paddle-js';

import session              from "@utils/session";

import DefaultFooter        from "@components/footer/DefaultFooter"
import CustomNav            from "@components/landingPageTabs/CustomNav"
import PricingTitle         from "@components/pricing/PricingTitle";
import PricingTryout        from "@components/pricing/PricingTryout";
import PricingComparison    from "@components/pricing/PricingComparison";
import PricingUnlimited     from "@components/pricing/PricingUnlimited";
import PricingFreeCard      from "@components/pricing/PricingFreeCard";
import PricingCards         from "@components/pricing/PricingCards";
import ReportBugsModal      from "@components/report-bugs-modal/ReportBugsModal";
import PricingTenureSwitch  from "@components/pricing/PricingTenureSwitch";
import AuthModal            from "@components/modal/AuthModal";

import { fetchPlans }       from "@actions/plans";

const PricingPage = () => {
    const dispatch               = useDispatch();
    const [showReportBug, 
           setShowReportBug]     = useState(false);
    const [isYearly, 
           setIsYearly]          = useState(true);
    const [paddle, setPaddle]    = useState(null);
    const [plans, setPlans]      = useState([]);

    const { authModal }          = useSelector((state) => state.app);

    useEffect(() => {
        // fetch plans
        dispatch(fetchPlans()).then((res) => {
            setPlans(res?.payload?.data?.data)
        })

        initializePaddle({ 
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV, 
            token: process.env.NEXT_PUBLIC_PADDLE_TOKEN,
            pwCustomer: {
                email: session.emailAddress || ""
            },
            eventCallback: (event) => {
                // console.log("Event ===>", event)
                if (event.name === "checkout.loaded") {
                    const iframe = document.querySelector(".paddle-frame-overlay")
                    // console.log("Iframe ===>", iframe.contentWindow.document)
                    const doc = iframe.contentDocument || iframe.contentWindow.document
                    if (doc) {
                        const elem   = doc.querySelector("div[data-testid='quantity-row']")
                        // console.log("Elem ===>", elem)
                        if (elem) {
                            elem.style.display = "none" 
                        }
                    }
                }
            }
        }).then((paddleInstance) => {
            setPaddle(paddleInstance);
        });
    }, [])

    // console.log("Modal ===>", authModal)
    return (
        <>
            <CustomNav setShowReportBug={setShowReportBug} />
            <div className="page-layout py-5 md:py-9">
                <PricingTitle />
                <PricingTryout />
                <PricingTenureSwitch isYearly={isYearly} onChangeTenure={(checked) => setIsYearly(checked)} />   
                <PricingCards plans={plans} paddle={paddle} isYearly={isYearly} isPricingPage={true} />
                <PricingComparison />
                <PricingUnlimited />
                <PricingFreeCard />
            </div>
            <DefaultFooter />
            {showReportBug && <ReportBugsModal showPopup={showReportBug} onCancel={() => setShowReportBug(false)} />}
            {authModal?.open && <AuthModal
                  openModal={authModal?.open}
                  page={'single-gem-public'}
            />}
        </>
    )
}

export default PricingPage