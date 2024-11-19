import "./PricingCards.css"
import { useEffect, useState }         from 'react';
import { useDispatch }      from 'react-redux';
import { FaCircleCheck }    from 'react-icons/fa6';
import { GoArrowRight }     from 'react-icons/go';
import { message, Spin }          from 'antd';
import { useRouter }        from 'next/navigation';

import Dropdown             from './PricingDropdown'
// import PlanConfirmModal     from '@components/modal/PlanConfirmModal';
import session              from '@utils/session';

import { openAuthModal }    from '@actions/app';
import { changePlan, 
         fetchSubscriptionPricePerview }       from '@actions/plan-service';
import moment from "moment";
import SwitchPlanModal from "@components/modal/SwitchPlanModal";

const curatorFeatures = [
  '1 Member',
  '10 guest users',
  '6000 Gems',
  '50 Collections',
  '50 Tags',
  '5 Public tags & collections',
  '300 mins listen to articles',
  '20 mins audio note limit',
  '50 mb file upload limit',
  'Link in bio',
  'Unlimited Visitors',
];

const InfluencerFeatures = [
  '1 Member',
  '10 guest users',
  '12000 Gems',
  '150 Collections',
  '500 Tags',
  '100 Public tags & collections',
  '300 mins listen to articles',
  '60 mins audio note limit',
  '250 mb file upload limit',
  'Link in bio',
  'Unlimited Visitors',
  'Custom fields',
  'Blog Publishing',
  'Analytics',
];

const TeamFeatures = [
    '10 Guests per member',
    '15000 Gems per member',
    '250 Collections per member',
    '1000 per member Tags',
    '250 Public tags & collections per member',
    '300 mins listen to articles',
    '60 mins audio note limit',
    '250 mb file upload limit',
    'Link in bio',
    'Unlimited Visitors',
    'Custom fields',
    'Blog Publishing',
    'Analytics',
];

const TEAM_PLAN_ALLOCATIONS = {
    5: "Team S",
    10: "Team M",
    25: "Team L",
    500: "Team XL"
}

const calculatePrice = (teamSize, plans, isYearly) => {
    if (plans.length === 0) return 0 
    if (isYearly) {
        const plan              = plans.find((p) => p?.attributes?.display_name?.trim() === TEAM_PLAN_ALLOCATIONS[parseInt(teamSize)]?.trim() && p?.attributes?.tenure === "Yearly")
        const perMonthPlanCost  = (parseInt(plan?.attributes?.price) / 12)
        return (perMonthPlanCost / parseInt(teamSize)).toFixed(2)
    }

    const plan              = plans.find((p) => p?.attributes?.display_name?.trim() === TEAM_PLAN_ALLOCATIONS[parseInt(teamSize)]?.trim() && p?.attributes?.tenure === "Monthly")
    return (parseInt(plan?.attributes?.price) / parseInt(teamSize)).toFixed(2)
}

const getKeyeAccordingPlan = (plan) => {
    if (!plan) return 5
    return parseInt(Object.keys(TEAM_PLAN_ALLOCATIONS).find((k) => TEAM_PLAN_ALLOCATIONS[k] === plan))
}

const PricingCards = ({ plans, paddle, isYearly, isPricingPage, currentSubscription=null }) => {
    const dispatch                          = useDispatch(); 
    const navigate                          = useRouter();
    const [currentTeam, setCurrentTeam]     = useState(getKeyeAccordingPlan(currentSubscription?.userPlan?.related_plan?.display_name?.trim()) || 5);
    const [showChangePlan, 
           setShowChangePlan]               = useState(false)
    const [selectedPlan,
           setSelectedPlan]                 = useState(null)
    const [currentTeamPrice,
           setCurrentTeamPrice]             = useState(calculatePrice(5, plans, isYearly))
    const [currentSelectedSubscription,
           setCurrentSelectedSubscription]  = useState(null)
    const [isFetchinPreview,
           setIsFetchingPreview]            = useState(false)
    const [isSwitchingPlan,
           setIsSwitchingPlan]              = useState(false)
    const [isShowUpgradeForTeam,
          setIsShowUpgradeForTeam]          = useState(null)

    useEffect(() => {
        if (plans.length > 0 && currentTeamPrice === 0) {
            setCurrentTeamPrice(calculatePrice(5, plans, isYearly))
        }
    }, [plans])

    useEffect(() => {
        setCurrentTeamPrice(calculatePrice(currentTeam, plans, isYearly))
        setIsShowUpgradeForTeam(null)
        setCurrentTeam(getKeyeAccordingPlan(currentSubscription?.userPlan?.related_plan?.display_name?.trim()) || 5)
    }, [isYearly])

    useEffect(() => {
        setCurrentTeam(getKeyeAccordingPlan(currentSubscription?.userPlan?.related_plan?.display_name?.trim()) || 5)
    }, [currentSubscription])

    const onCheckout = (priceId, successUrl=`${window.location.origin}/u/${session.username}/all-bookmarks`) => {
        if (paddle) {
            paddle?.Checkout.open({
                items: [{ priceId, quantity: null }],
                customer: {
                    email: session.emailAddress,
                    name: session.firstname && session.lastname ? `${session.firstname} ${session.lastname}` : session.username
                },
                customData: {
                    user: {
                        email: session.emailAddress,
                        id: session.userId,
                        username: session.username,
                        price_id: priceId
                    }
                },
                settings: {
                    successUrl,
                }
            });
        }
        
    }

    const onStartPlan = async (priceId, plan=null) => {
        if (isPricingPage && !session.token) {
            dispatch(openAuthModal({
                open: true,
                action: "signup",
                extraInfo: {
                    onRegistrationComplete: () => onCheckout(priceId),
                    priceId
                }
            }))
            return
        }

        if (!currentSubscription?.subscriptionDetails && currentSubscription?.userPlan?.plan === "free") {
            onCheckout(priceId, `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?billing=true`)
            return
        }

        if (currentSubscription?.subscriptionDetails && currentSubscription?.userPlan?.plan === "paid" && session.token && plan) {
            setShowChangePlan(true)
            setIsFetchingPreview(true)
            const res = await dispatch(fetchSubscriptionPricePerview(currentSubscription.subscriptionDetails.subscription_id, {
                customerId: currentSubscription.subscriptionDetails?.customer_id,
                newPriceId: plan?.attributes?.price_id
            }))
            setIsFetchingPreview(false)
            if (res?.payload?.data?.data) {
                setSelectedPlan(plan)
                setCurrentSelectedSubscription(res?.payload?.data?.data)
            } 
            else {
                message.error("Failed to fetch subscription preview. Please try again later.")
            }
            return
        }
    }

    const onSelectTeamPlan = async () => {
        if (isPricingPage && !session.token) {
            const teamTitle     = getTeamTitle();
            const teamPlanIdx   = plans.findIndex((p) => { 
                return p?.attributes?.display_name === teamTitle && p?.attributes?.tenure === (isYearly ? 'Yearly' : 'Monthly')
            })
            if (teamPlanIdx !== -1) {
                const plan = plans[teamPlanIdx];
                dispatch(openAuthModal({
                    open: true,
                    action: "signup",
                    extraInfo: {
                        onRegistrationComplete: () => onCheckout(plan.price_id),
                        priceId: plan.price_id
                    }
                }))
            }
            return
        }

        let   plan          = null;
        const teamTitle     = getTeamTitle();
        const teamPlanIdx   = plans.findIndex((p) => { 
            return p?.attributes?.display_name.trim() === teamTitle.trim() && p?.attributes?.tenure === (isYearly ? 'Yearly' : 'Monthly')
        })
        
        if (teamPlanIdx !== -1) {
            plan = plans[teamPlanIdx];
        }

        if (!currentSubscription?.subscriptionDetails && currentSubscription?.userPlan?.plan === "free" && plan) {
            onCheckout(plan?.attributes?.price_id, `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?billing=true`)
            return
        }

        if (currentSubscription?.subscriptionDetails && currentSubscription?.userPlan?.plan === "paid" && session.token && plan) {
            setShowChangePlan(true)
            setIsFetchingPreview(true)
            const res = await dispatch(fetchSubscriptionPricePerview(currentSubscription.subscriptionDetails.subscription_id, {
                customerId: currentSubscription.subscriptionDetails?.customer_id,
                newPriceId: plan?.attributes?.price_id
            }))
            setIsFetchingPreview(false)
            if (res?.payload?.data?.data) {
                setSelectedPlan(plan)
                setCurrentSelectedSubscription(res?.payload?.data?.data)
            } 
            else {
                message.error("Failed to fetch subscription preview. Please try again later.")
            }
            return
        }
    }

    const onHideModal = () => {
        setShowChangePlan(false)
        setCurrentSelectedSubscription(null)
        setSelectedPlan(null)
    }

    const onPlanSwitch = async () => {
        if (selectedPlan && currentSubscription?.subscriptionDetails?.id) {
            setIsSwitchingPlan(true)
            const res       = await dispatch(changePlan(currentSubscription.subscriptionDetails.id, selectedPlan.id))
            setIsSwitchingPlan(false)
            if (res?.payload?.data?.data) {
                const {data}    = res?.payload?.data
                if (data?.status === "active" && data?.items?.length > 0 && data?.custom_data?.user?.price_id === selectedPlan?.attributes?.price_id) {
                    message.success(`You have successfully switched to ${selectedPlan?.attributes?.display_name} plan.`)
                    onHideModal()
                    window.location.reload()
                    // navigate.push(`/u/${session.username}/edit-profile?billing=true`)
                }
            }
            else if (res?.payload?.data?.error?.code === "subscription_payment_declined") {
                message.error("Failed to switch plan. Payment declined. Please try to update payment method and try to switch plan again.")
                onHideModal()
            }
            return
        }
    }

    const onTeamSizeChange = (value) => {
        setCurrentTeam(value)
        setCurrentTeamPrice(calculatePrice(value, plans, isYearly))
        const planKey = getKeyeAccordingPlan(currentSubscription?.userPlan?.related_plan?.display_name?.trim())
        if (currentSubscription?.subscriptionDetails?.scheduled_change !== null) {
            setIsShowUpgradeForTeam(null)
            return 
        }
        if (value !== planKey && value < planKey && currentSubscription?.userPlan?.related_plan?.is_team_plan && currentSubscription?.userPlan?.related_plan?.tenure === "Monthly" && !isYearly) {
            setIsShowUpgradeForTeam("Downgrade")
            return
        }
        if (value === planKey && currentSubscription?.userPlan?.related_plan?.is_team_plan) {
            setIsShowUpgradeForTeam(null)
        }
        if (value !== planKey && value > planKey && currentSubscription?.userPlan?.related_plan?.is_team_plan && currentSubscription?.userPlan?.related_plan?.tenure === (isYearly ? 'Yearly' : 'Monthly')) {
            setIsShowUpgradeForTeam("Upgrade")
        }
        else {
            setIsShowUpgradeForTeam(null)
        }
    }
    
    // ? Method to render the Features List
    const renderFeatures = (featuresList) => {
        return featuresList.map((feature, index) => {
        return (
            <div
            key={`free-feature-${index}`}
            id={`free-feature-${index}`}
            className='leading-[25px] flex gap-2 items-center text-sm text-grey-light font-normal'
            >
            <FaCircleCheck className='text-primary-blue !text-lg !w-[20px] !h-[20px]' />
            {feature}
            </div>
        );
        });
    };

    const renderMonthlyPrice = (price, extraText, perMonthAmountText, perMonthExtraText, discount, discountExtraText, isShowAnnual) => {
        return (
            <div
                className='flex flex-col items-center justify-between gap-2 mt-2'
            >
                <div className='flex flex-row items-center justify-center'>
                    <p className='text-[#235197] text-3xl mr-3'>{`$${price}`}</p>
                    <p className='text-center text-[#97A0B5] font-light text-[16px]'>
                        {extraText ? extraText : "per month"}
                        <br />
                        {/* <span className='hidden lg:block'>billed anually</span> */}
                    </p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 flex-wrap w-full'>
                    <div className='flex flex-col mr-3'>
                        <p className='text-[12px] text-[#347AE2] font-medium mt-2 text-center flex flex-row items-center gap-2'>
                            {perMonthExtraText && <span className='text-[#74778B] text-[12px]'>{perMonthExtraText}</span>}
                            {`$${perMonthAmountText} per month`}
                        </p>
                        <span className='pricing-switch-label-grey text-[12px]'>{`Billed ${isShowAnnual ? "annually" : "monthly"}`}</span>
                    </div>
                    <p className='hidden lg:block bg-[#EFFCF6] py-1 px-2 rounded-xl text-[10px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start mt-3'>
                        {`Save ${discount}% ${discountExtraText ? discountExtraText : ''}`}
                    </p>
                </div>
            </div>
        )
    }

    const renderYearlyPrice = (strikeAmount, mainAmount, discount, perMonthExtraText, perMonthDiscountText, extraText) => {
        return (
            <div
                className='flex flex-col items-center justify-between gap-2 mt-2'
            >
                <div className='flex items-center justify-center'>
                    <p className='hidden lg:block bg-[#EFFCF6] py-1 px-2 rounded-xl text-[10px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start mt-3'>
                        {`Save ${discount}%`}
                    </p>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <p className='text-[#97A0B5] text-3xl mr-2'><strike>{`$${strikeAmount}`}</strike></p>
                    <p className='text-[#235197] text-3xl mr-2'>{`$${mainAmount}`}</p>
                    {extraText && <p className='text-[16px] text-[#97A0B5] font-light'>{extraText ? extraText : "per month"}</p>}
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-center text-[#347AE2] font-semibold text-[12px] flex'>
                        {perMonthExtraText && <p className='text-[#74778B] mr-1'>{perMonthExtraText}</p>}
                        {perMonthDiscountText ? `${perMonthDiscountText} per month`: "per month"}
                    </p>
                    <span className='pricing-switch-label-grey text-[12px]'>Billed annually</span>
                </div>
            </div>
        )
    }

    const renderChangeSubscriptionMessage = (planName, currentPreview) => {
        if (isFetchinPreview) return (
            <div className='flex flex-col gap-2 items-center justify-center'>
                <Spin tip="Fetching updated subscription details" />
            </div>
        )
        if (!currentPreview && !isFetchinPreview) return (
            <div className='flex flex-col gap-2'>
                {"Sorry not able to fetch updated subscriptions details"}
            </div>
        )
        return (
            <div className='flex flex-col gap-2'>
                {`Are you sure you want to switch and ${isYearly ? "upgrade" : "downgrage/upgrade"} your plan? Your planned will be changed immediately and your credits on existing plans will be changed according to new plan with updated renew date based on selected plan.`}
                <p className='text-[12px] text-[#74778B] font-bold'>
                    {`You are switching to ${planName} plan`}
                </p>
                <p>
                    {`Your totalPrice will be ${currentPreview?.currency_code} ${parseInt(currentPreview?.immediate_transaction?.details?.totals?.total) / 100}`}
                </p>
                <p>
                    {`Your billing cycle will be ${moment(currentPreview?.immediate_transaction?.billing_period?.starts_at).format("DD MMM YYYY")} - ${moment(currentPreview?.immediate_transaction?.billing_period?.ends_at).format("DD MMM YYYY")}`}
                </p>
            </div>
        )
    }

    const getTeamTitle = () => {
        if (currentTeam === 5) {
            return "Team S";
        }
        if (currentTeam === 10) {
            return "Team M";
        }
        if (currentTeam === 25) {
            return "Team L";
        }
        if (currentTeam === 500) {
            return "Team XL";
        }
        return "Team"
    }

    const getMonthlyPrice = () => {
        const monthlyPlan = (parseInt(plans.find((p) => { return p?.attributes?.display_name?.trim() === getTeamTitle().trim() && p?.attributes?.tenure === "Monthly"})?.attributes?.price) / currentTeam)
        return monthlyPlan.toFixed(2)
    }

    const curatorMonthlyPlan    = plans.find((plan) => plan?.attributes?.display_name === 'Curator' && plan?.attributes?.tenure === 'Monthly');
    const influencerMonthPlan   = plans.find((plan) => plan?.attributes?.display_name === 'Influencer' && plan?.attributes?.tenure === 'Monthly');
    const curatorYearPlan       = plans.find((plan) => plan?.attributes?.display_name === 'Curator' && plan?.attributes?.tenure === 'Yearly');
    const influencerYearPlan    = plans.find((plan) => plan?.attributes?.display_name === 'Influencer' && plan?.attributes?.tenure === 'Yearly');
    const relatedPlan           = currentSubscription?.userPlan?.related_plan || null;
    const isRelatedPlanFree     = currentSubscription?.userPlan?.plan === "free"
    const isRelatedPlanYearly   = relatedPlan?.tenure === "Yearly"
    const isRelatedPlanMonthly  = relatedPlan?.tenure === "Monthly"
    const isCuratorActive       = ((relatedPlan?.id === curatorMonthlyPlan?.id) || (relatedPlan?.id === curatorYearPlan?.id)) && currentSubscription?.userPlan?.plan !== "free"
    const isInfluencerActive    = ((relatedPlan?.id === influencerMonthPlan?.id) || (relatedPlan?.id === influencerYearPlan?.id)) && currentSubscription?.userPlan?.plan !== "free"
    const isTeamActive          = (relatedPlan?.id === plans.find((plan) => plan?.attributes?.display_name?.trim() === getTeamTitle()?.trim() && plan?.attributes?.tenure === (isYearly ? 'Yearly' : 'Monthly'))?.id) && currentSubscription?.userPlan?.plan !== "free"
    const currentTenure         = isYearly ? 'Yearly' : 'Monthly';

    const renderCuratorButton = (onClick) => {
        if (isRelatedPlanFree || isPricingPage) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Get Started
                </button>
            )
        }
        if (currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel") return null
        if (isYearly && relatedPlan?.id === curatorYearPlan?.id) return null
        if (!isYearly && relatedPlan?.id === curatorMonthlyPlan?.id) return null
        if (isRelatedPlanYearly && !isYearly) return null
        if (isRelatedPlanMonthly && isYearly) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Upgrade
                </button>
            )
        }
        if (((isInfluencerActive || isTeamActive) || (!isTeamActive && isShowUpgradeForTeam !== null)) && isRelatedPlanMonthly && !isYearly) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Downgrade
                </button>
            )
        }
        return null
    }

    const renderTeamButton = (onClick) => {
        if (isShowUpgradeForTeam) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    {isShowUpgradeForTeam}
                </button>
            )
        }
        if (isRelatedPlanFree || isPricingPage) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Get Started
                </button>
            )
        }
        const plan          = plans.filter((p) => p?.attributes?.display_name?.trim() === getTeamTitle()?.trim())
        const tMonthPlan    = plan.find((p) => p?.attributes?.tenure === "Monthly")
        const tYearPlan     = plan.find((p) => p?.attributes?.tenure === "Yearly")
        if (currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel") return null
        if (isYearly && relatedPlan?.id === tYearPlan?.id) return null
        if (!isYearly && relatedPlan?.id === tMonthPlan?.id) return null
        if (isRelatedPlanYearly && !isYearly) return null
        if ((isRelatedPlanMonthly && isYearly) || isCuratorActive || isInfluencerActive) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Upgrade
                </button>
            )
        }
        return null
    }

    const renderInfluencerButton = (onClick) => {
        if (isRelatedPlanFree || isPricingPage) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Get Started
                </button>
            )
        }
        if (currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel") return null
        if (isYearly && relatedPlan?.id === influencerYearPlan?.id) return null
        if (!isYearly && relatedPlan?.id === influencerMonthPlan?.id) return null
        if (isRelatedPlanYearly && !isYearly) return null
        if (isCuratorActive || (isRelatedPlanMonthly && isYearly)) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Upgrade
                </button>
            )
        }
        if (((isTeamActive && relatedPlan?.tenure === currentTenure) || (!isTeamActive && isShowUpgradeForTeam !== null)) && isRelatedPlanMonthly && !isYearly) {
            return (
                <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                        onClick={onClick}>
                    Downgrade
                </button>
            )
        }
        return null
    }

    const getSubPrice = () => {
        const planTitle = getTeamTitle();
        switch (planTitle) {
            case "Team S":
                return 50
            case "Team M":
                return 80
            case "Team L":
                return 160
            case "Team XL":
                return 500
            default:
                return 50
        }
    }

    return (
        <>
            <div className='mt-14' id="ct-pricing-cards-container">
                <div className='w-full flex flex-col gap-10 items-start justify-between lg:flex-row lg:items-start lg:justify-between'>
                    <div className={`w-full lg:w-[32%] border ${isCuratorActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change === null 
                                                                    ? "border-2 ct-active-border-color relative" 
                                                                    : isCuratorActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel" 
                                                                        ? "border-2 ct-cancel-border-color  relative" 
                                                                        : "border-[0.4px]"} rounded-xl p-6 shadow-lg flex flex-col items-center jusitify-start`}>
                        {isCuratorActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change === null && <div className='px-9 py-2 font-normal text-white text-sm rounded-lg absolute -top-6 ct-active-plan-container'>
                            <p>Active plan</p>
                        </div>}
                        {isCuratorActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel" && <div className='px-9 py-2 font-normal text-white text-sm rounded-lg absolute -top-6 ct-cancel-plan-container'>
                            <p>{`Expiring on ${moment(currentSubscription?.subscriptionDetails?.scheduled_change?.effective_at).format("DD-MM-YYYY")}`}</p>
                        </div>}
                        <p className='bg-blue-200 py-1 px-3 rounded-xl text-[10px] text-primary-blue font-medium w-max flex flex-col items-center jusitify-start'>
                        Beginner Friendly
                        </p>
                        <p className='text-black text-[32px] font-semibold leading-[38.72px] mt-3'>
                        Curator
                        </p>
                        <p className='text-[12px] text-[#74778B] font-normal leading-[25px] mt-3 text-center'>
                        For the web's finest gem collectors 💎
                        </p>

                        {isYearly ? renderYearlyPrice(4.5, 3, 33, "", "", "") : renderMonthlyPrice(4.5, "", 3, "", 33, "", true)}

                        <div>
                        {renderCuratorButton(() => onStartPlan(isYearly ? curatorYearPlan?.attributes?.price_id : curatorMonthlyPlan?.attributes?.price_id, isYearly ? curatorYearPlan : curatorMonthlyPlan))}
                        {/* {(isRelatedPlanFree || (!isCuratorActive || relatedPlan?.tenure !== (isYearly ? "Yearly" : "Monthly"))) && <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                                onClick={() => onStartPlan(isYearly ? curatorYearPlan?.attributes?.price_id : curatorMonthlyPlan?.attributes?.price_id, isYearly ? curatorYearPlan : curatorMonthlyPlan)}>
                            {/* <a
                            className='text-white text-sm font-semibold leading-5 min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='/'
                            target='_blank'
                            > */}
                            {/* {isRelatedPlanFree 
                                ? "Get Started"
                                : isYearly && isRelatedPlanMonthly && !isRelatedPlanFree
                                    ? "Upgrade"
                                    : isInfluencerActive || isTeamActive 
                                        ? "Downgrade"
                                        : "Get Started"
                            } */}
                            {/* </a> 
                        </button>} */}
                        </div>

                        <div className='w-full my-4 border border-[#F0F4F8]' />

                        <div className='w-full flex flex-col items-start justify-start gap-3'>
                        {renderFeatures(curatorFeatures)}
                        </div>

                        <button
                            className='flex lg:hidden flex-row items-center justify-center gap-2 mt-5 w-[212px] h-[40px] border border-primary-blue rounded-lg bg-blue-200 text-primary-blue text-[14px] leading-[20px] font-medium'
                            onClick={() => navigate.push("/plan-compare")}
                        >
                            See full feature list <GoArrowRight className='text-xl'/>
                        </button>

                    </div>
                    <div className={`w-full lg:w-[32%] relative border border-2 ${isInfluencerActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change === null
                                            ? "ct-active-border-color" 
                                                : isInfluencerActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel" 
                                                    ? "ct-cancel-border-color"
                                                    : "border-primary-blue"} rounded-xl p-6 shadow-lg flex flex-col items-center jusitify-start`}>
                        {isInfluencerActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change === null
                            ? <div className='px-9 py-2 ct-active-plan-container font-normal text-white text-sm rounded-lg absolute -top-6'>
                                <p>Active plan</p>
                              </div>
                            : isInfluencerActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel" 
                                ? <div className='px-9 py-2 font-normal text-white text-sm rounded-lg absolute -top-6 ct-cancel-plan-container'>
                                    <p>{`Expiring on ${moment(currentSubscription?.subscriptionDetails?.scheduled_change?.effective_at).format("DD-MM-YYYY")}`}</p>
                                  </div>
                                : <div className='px-9 py-2 bg-primary-blue font-normal text-white text-sm rounded-lg absolute -top-6'>
                                    <p>Recommended</p>
                                  </div>
                        }
                        <p className='bg-blue-200 py-1 px-3 rounded-xl text-[10px] text-primary-blue font-medium w-max'>
                        Try it Free for 14 days
                        </p>
                        <p className='text-black text-[32px] font-semibold leading-[38.72px] mt-3'>
                        Influencer
                        </p>

                        <p className='text-[12px] text-[#74778B] font-normal leading-[25px] mt-3 text-center'>
                        For content creators who love all things productivity, sharing and Earning
                        </p>

                        {isYearly ? renderYearlyPrice(13, 9, 30, "", "", "") : renderMonthlyPrice(13, "", "9", "", 30, "", true)}

                        <div>
                            {renderInfluencerButton(() => onStartPlan(isYearly ? influencerYearPlan?.attributes?.price_id : influencerMonthPlan?.attributes?.price_id, isYearly ? influencerYearPlan : influencerMonthPlan))}
                        {/* {(isRelatedPlanFree || (!isInfluencerActive || relatedPlan?.tenure !== (isYearly ? "Yearly" : "Monthly"))) && <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                                onClick={() => onStartPlan(isYearly ? influencerYearPlan?.attributes?.price_id : influencerMonthPlan?.attributes?.price_id, isYearly ? influencerYearPlan : influencerMonthPlan)}>
                            {/* <a
                            className='text-white text-sm font-semibold leading-5 min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='/'
                            target='_blank'
                            > */}
                            {/* {isCuratorActive
                                    ? "Upgrade"
                                    : isTeamActive
                                        ? "Downgrade"
                                        : isYearly && isRelatedPlanMonthly && !isRelatedPlanFree
                                                ? "Upgrade"
                                                : "Get Started"} */}
                            {/* </a> 
                        </button>} */}
                        </div>

                        <div className='w-full my-4 border border-[#F0F4F8]' />

                        <div className='w-full flex flex-col items-start justify-start gap-3'>
                        {renderFeatures(InfluencerFeatures)}
                        </div>

                        <button
                            className='flex lg:hidden flex-row items-center justify-center gap-2 mt-5 w-[212px] h-[40px] border border-primary-blue rounded-lg bg-blue-200 text-primary-blue text-[14px] leading-[20px] font-medium'
                            onClick={() => navigate.push("/plan-compare")}
                        >
                            See full feature list <GoArrowRight className='text-xl'/>
                        </button>

                    </div>
                    <div className={`w-full lg:w-[32%] border ${isTeamActive && relatedPlan?.tenure === currentTenure  && currentSubscription?.subscriptionDetails?.scheduled_change === null
                                        ? "border-2 ct-active-border-color relative" 
                                            : isTeamActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel" 
                                                ? "border-2 ct-cancel-border-color relative" 
                                                : "border-[0.4px]"} rounded-xl p-6 shadow-lg flex flex-col items-center jusitify-start`}>
                        {isTeamActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change === null && <div className='px-9 py-2 ct-active-plan-container font-normal text-white text-sm rounded-lg absolute -top-6 ct-active-plan-container'>
                            <p>Active plan</p>
                        </div>}
                        {isTeamActive && relatedPlan?.tenure === currentTenure && currentSubscription?.subscriptionDetails?.scheduled_change?.action === "cancel" && <div className='px-9 py-2 font-normal text-white text-sm rounded-lg absolute -top-6 ct-cancel-plan-container'>
                            <p>{`Expiring on ${moment(currentSubscription?.subscriptionDetails?.scheduled_change?.effective_at).format("DD-MM-YYYY")}`}</p>
                        </div>}
                        <p className='bg-blue-200 py-1 px-3 rounded-xl text-[10px] text-primary-blue font-bold w-max'>
                        Unlimited plan
                        </p>
                        <p className='text-black text-[32px] font-semibold leading-[38.72px] mt-3'>
                        {getTeamTitle()}
                        </p>

                        <p className='text-[12px] text-[#74778B] font-normal leading-[25px] mt-3 text-center'>
                        For Productive Collaborative teams curating and sharing web's finest gems
                        </p>

                        {isYearly ? renderYearlyPrice(getMonthlyPrice(), currentTeamPrice, 34, "Total ", `$${getSubPrice()}`, "seat / month") : renderMonthlyPrice(currentTeamPrice, "seat / month", getSubPrice(), "Total ", 34, "annually", false)}
                        
                        <div className='flex flex-row items-center gap-4 py-3'>
                        <p className='text-[12px] text-[#4B4F5D]'>Team size</p>{' '}
                        <Dropdown currentValue={currentTeam} onChange={onTeamSizeChange} />
                        </div>

                        <div>
                            {renderTeamButton(onSelectTeamPlan)}
                        {/* {(isRelatedPlanFree || (!isTeamActive || relatedPlan?.tenure !== (isYearly ? "Yearly" : "Monthly"))) && <button className='bg-primary-blue w-full w-[239px] text-white text-sm font-semibold leading-5 flex h-full grow flex-row items-center justify-center lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'
                                onClick={onSelectTeamPlan}>
                            {/* <a
                            className='text-white text-sm font-semibold leading-5 min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='/'
                            target='_blank'
                            > */}
                            {/* {isInfluencerActive || isCuratorActive 
                                    ? "Upgrade"
                                    : !isYearly && isRelatedPlanYearly && !isRelatedPlanFree
                                        ? "Downgrade"
                                        : isYearly && isRelatedPlanMonthly && !isRelatedPlanFree
                                            ? "Upgrade"
                                            : "Get Started"} */}
                            {/* Get Started */}
                            {/* </a> 
                        </button>} */}
                        </div>

                        <div className='w-full my-4 border border-[#F0F4F8]' />

                        <div className='w-full flex flex-col items-start justify-start gap-3'>
                        {renderFeatures(TeamFeatures)}
                        </div>

                        <button
                            className='flex lg:hidden flex-row items-center justify-center gap-2 mt-5 w-[212px] h-[40px] border border-primary-blue rounded-lg bg-blue-200 text-primary-blue text-[14px] leading-[20px] font-medium'
                            onClick={() => navigate.push("/plan-compare")}
                        >
                            See full feature list <GoArrowRight className='text-xl'/>
                        </button>
                    </div>
                </div>
            </div>
            {showChangePlan && <SwitchPlanModal 
                visible={showChangePlan}
                fetchingPreview={isFetchinPreview}
                obj={currentSelectedSubscription}
                currentPlan={currentSubscription?.userPlan?.related_plan?.display_name}
                newPlan={selectedPlan?.attributes?.display_name}
                onSubmit={onPlanSwitch}
                onCancel={onHideModal}
                confirmLoading={isSwitchingPlan}  />}
        </>
    );
};

export default PricingCards;

