import "./UserPricingComponent.css";
import { useEffect, useState }      from "react"
import { useDispatch }              from "react-redux";
import { initializePaddle }         from "@paddle/paddle-js";

import session                      from "@utils/session";

import PricingCards                 from "@components/pricing/PricingCards"
import PricingTenureSwitch          from "@components/pricing/PricingTenureSwitch";

import { fetchPlans }               from "@actions/plans";
import PricingComparison from "@components/pricing/PricingComparison";
import { SolidRoundedButton, SolidRoundedButtonSm } from "@components/pricing/PricingButtons";
import AffiliateBlock from "@components/common/AffiliateBlock";
import UserCurrentPlanCard from "./UserCurrentPlanCard";

const UserPricingComponent = ({ user, isMobile }) => {
    const dispatch                  = useDispatch();
    const [isYearly, 
           setIsYearly]             = useState(true);
    const [paddle, setPaddle]       = useState(null);
    const [plans, setPlans]         = useState([]);
    const [currentSubscription, 
          setCurrentSubscription]   = useState(null);

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
            // eventCallback: (event) => {
            //     if (event.name === "checkout.loaded") {
            //         const iframe = document.querySelector(".paddle-frame-overlay")
            //         console.log("Iframe ===>", iframe.contentWindow.document)
            //         const doc = iframe.contentDocument || iframe.contentWindow.document
            //         if (doc) {
            //             const elem   = doc.querySelector("div[data-testid='quantity-row']")
            //             console.log("Elem ===>", elem)
            //             if (elem) {
            //                 elem.style.display = "none" 
            //             }
            //         }
            //     }
            // }

        }).then((paddleInstance) => {
            setPaddle(paddleInstance);
        });
    }, [])

    const renderCurrentPlanDetails = () => {
        return (
            <UserCurrentPlanCard user={user} paddle={paddle} onSetCurrentSubscription={(obj) => {
                setCurrentSubscription(obj)
                if (obj?.userPlan?.related_plan?.tenure) {
                    setIsYearly(obj?.userPlan?.related_plan?.tenure === 'Yearly')
                }
            }} />
        )
    }

    const renderEarnCredit = () => {
        return (
            <div className='mt-6 md:mt-9'>
                <div className='w-full'>
                    <div className='w-full flex flex-row items-center justify-between border-[0.4px] rounded py-3 px-4 shadow-md md:py-5 md:px-6 md:rounded-xl  md:shadow-lg'>
                        <p className='hidden md:block md:text-xl md:text-grey-light md:font-medium md:leading-[38px]'>
                            Want to earn free credits? Check out ways to earn
                        </p>
                        <p className='text-xs font-medium text-grey-light leading-[14.52px] md:hidden'>
                            Want to earn free credits?
                        </p>

                        <div className='hidden md:block'>
                            <SolidRoundedButton
                                title='Earn cerdits'
                                className=''
                                url={session.token ? `/u/${session.username}/referral` : `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`}
                            />
                        </div>

                        <div className='block md:hidden'>
                            <SolidRoundedButtonSm
                                title='Earn cerdits'
                                className=''
                                url={session.token ? `/u/${session.username}/referral` : `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`}
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const renderPricingCards = () => {
        return (
            <>
                <PricingTenureSwitch isYearly={isYearly} onChangeTenure={() => setIsYearly(!isYearly)} />
                <PricingCards plans={plans} 
                              paddle={paddle} 
                              isYearly={isYearly} 
                              isPricingPage={false} 
                              currentSubscription={currentSubscription} />
            </>
        )
    }

    const renderAffiliateBlock = () => {
        return (
            <AffiliateBlock />
        )
    }

    return (
        <>
            <div className="px-5">
                {renderCurrentPlanDetails()}
                {renderPricingCards()}
                <PricingComparison />
                {renderEarnCredit()}
                {renderAffiliateBlock()}
            </div>
        </>
    )
}

export default UserPricingComponent;