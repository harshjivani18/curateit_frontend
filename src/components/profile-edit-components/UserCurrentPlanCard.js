import "./UserCurrentPlan.css"
import { useDispatch }             from "react-redux"
import { useEffect, useState }     from "react"
import { Avatar, Card, List, 
        Popover, 
        message}                   from "antd"
import { BiInfoCircle }            from "react-icons/bi"
import { useRouter }               from "next/navigation"
import moment                      from "moment"
import { IoIosArrowForward }       from "react-icons/io"

import PlanConfirmModal            from "@components/modal/PlanConfirmModal"
import TransactionModal            from "@components/modal/TransactionModal"
import { 
    GuestIcon, 
    DiamondIcon, 
    FolderIcon, 
    TagIcon, 
    EarthIcon, 
    SpeakerIcon, 
    FileIcon, 
    MemberIcon 
}                                  from "../pricing/PricingPlanIcons"
import session                     from "@utils/session"

import { cancelPlan, 
         changeBilledEmail, 
         fetchUpdatePaymentMethodTransaction, 
         getUserPlanDetails }      from "@actions/plan-service"
import BilledEmailChangeModal from "@components/modal/BilledEmailChangeModal"

const UserCurrentPlanCard = ({ onSetCurrentSubscription, paddle, isUsagePage=false }) => {

    const dispatch                          = useDispatch()  
    const navigate                          = useRouter()
    const [isLoading,
           setIsLoading]                    = useState(false)
    const [userPlanDetails,
           setUserPlanDetails]              = useState(null)
    const [showCancelBox,
           setShowCancelBox]                = useState(false)
    const [isMobile, setIsMobile]           = useState(false);
    const [showTransactionModal,
           setShowTransactionModal]         = useState(false)
    const [showBilledEmailChangeModal,
           setShowBilledEmailChangeModal]   = useState(false)
    const [isCancelingPlan,
           setIsCancelingPlan]              = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getUserPlanDetails()).then((res) => {
            setIsLoading(false)
            if (res?.payload?.data) {
                setUserPlanDetails(res?.payload?.data)
                onSetCurrentSubscription(res?.payload?.data)
            }
        })
        if (typeof window === 'undefined') return;
        function handleResize() {
            if (window.innerWidth <= 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const getPaymentMethodDetails = (transactions) => {
        const transactionSortArr = transactions?.length > 0 ? transactions.filter((t) => t.status === "paid").sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) }) : []
        const transaction        = transactionSortArr?.length > 0 ? transactionSortArr[0] : null
        const payemntDetails     = transaction?.payment_details?.length > 0 ? transaction.payment_details[0] : null
        const paymentType        = payemntDetails?.method_details?.type || null
        const paymentObj         = paymentType ? payemntDetails?.method_details[paymentType] : null
        return paymentObj && paymentType ? `${paymentType} - ${paymentObj?.type} ending with ${paymentObj?.last4}` : "-"
    } 

    const onHideModal = () => {
        setShowCancelBox(false)
    }

    const onPlanCancelClick = () => {
        setShowCancelBox(true)
    }

    const onPlanCancel = async () => {
        setIsCancelingPlan(true)
        const res = await dispatch(cancelPlan(userPlanDetails?.subscriptionDetails?.id))
        setShowCancelBox(false)
        setIsCancelingPlan(false)
        if (res?.payload?.data?.data?.scheduled_change?.action === "cancel") {
            message.success("Plan has been cancelled successfully. You will be moved to explorer plan immediately.")
            window.location.reload()
            // setIsLoading(true)
            // const res = await dispatch(getUserPlanDetails())
            // setIsLoading(false)
            // if (res?.payload?.data) {
            //     setUserPlanDetails(res?.payload?.data)
            //     onSetCurrentSubscription(res?.payload?.data)
            // }
            return
        }
        if (res?.error) {
            message.error("An error occurred while cancelling the plan. Please try again later.")
            return
        }
        message.error("An error occurred while cancelling the plan. Please try again later.")
    }

    const onUpdatePlanClick = () => {
        document.getElementById("ct-pricing-cards-container").scrollIntoView({ behavior: "smooth" })
    }

    const onPaymentMethodChange = async () => {
        if (userPlanDetails?.subscriptionDetails?.scheduled_change?.action === "cancel") {
            message.info("You have already cancelled the plan. You can't change the payment method now.")
            return
        }
        const res = await dispatch(fetchUpdatePaymentMethodTransaction(userPlanDetails?.subscriptionDetails?.id))

        if (res?.payload?.data?.error) {
            message.error("An error occurred while changing the payment method. Please try again later.")
            return
        }

        paddle.Checkout.open({
            transactionId: res?.payload?.data,
            settings: {
                successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?billing=true`,
            }
        })
    }

    const onResumePlanClick = (transaction) => {
        paddle.Checkout.open({
            transactionId: transaction?.transaction_id,
            settings: {
                successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?billing=true`,
            }
        })
    }

    if (isLoading) return (
        <div className='flex flex-row items-center justify-center'>
            <div className='w-6 h-6 border-2 border-t-[4px] border-gray-300 rounded-full animate-spin'></div>
        </div>
    )

    const userPlanList = [
        {
            label: "Members",
            isShowInfo: true,
            usedCounts: parseInt(userPlanDetails?.userPlan?.included_members) === 100000 ? "" : userPlanDetails?.userPlan?.included_members_used,
            totalCounts: parseInt(userPlanDetails?.userPlan?.included_members) === 100000 ? "Unlimited" : userPlanDetails?.userPlan?.included_members,
            Icon: MemberIcon,
            isCompareValue: parseInt(userPlanDetails?.userPlan?.included_members) !== 100000,
            info: "Team Members who gets same allowances and access to collaborate and work together throughout your workspace."
        },
        {
            label: "Guests",
            isShowInfo: true,
            usedCounts: userPlanDetails?.userPlan?.guest_users_used,
            totalCounts: userPlanDetails?.userPlan?.guest_users,
            Icon: GuestIcon,
            isCompareValue: true,
            info: "Guests users you can invite specific to collections and tags and collaborate on"
        },
        {
            label: "Gems",
            isShowInfo: true,
            usedCounts: userPlanDetails?.userPlan?.gem_used,
            totalCounts: userPlanDetails?.userPlan?.gem_limit,
            Icon: DiamondIcon,
            isCompareValue: true,
            info: "Any media type of link, note, prompt, etc stored is counted as a gem"
        },
        {
            label: "Collections",
            isShowInfo: true,
            usedCounts: userPlanDetails?.userPlan?.coll_used,
            totalCounts: userPlanDetails?.userPlan?.coll_limit,
            Icon: FolderIcon,
            isCompareValue: true,
            info: "Folders to organise your data"
        },
        {
            label: "Tags",
            isShowInfo: true,
            usedCounts: userPlanDetails?.userPlan?.tag_used,
            totalCounts: userPlanDetails?.userPlan?.tag_limit,
            Icon: TagIcon,
            isCompareValue: true,
            info: "Tags to organise your data giving you more flexibility on sharing it across multiple tags"
        },
        {
            label: "Public Collections",
            isShowInfo: true,
            usedCounts: userPlanDetails?.userPlan?.public_collection_and_tags_used,
            totalCounts: userPlanDetails?.userPlan?.public_collection_and_tags,
            Icon: EarthIcon,
            isCompareValue: true,
            info: "Make your page rank on google and get organic traffic"
        },
        {
            label: "Listen to articles",
            isShowInfo: true,
            usedCounts: `${parseInt(userPlanDetails?.userPlan?.speech_used) > 0 ? Math.floor((1388 * parseInt(userPlanDetails?.userPlan?.speech_used)) / 1000000) : 0} mins`,
            totalCounts: `${parseInt(userPlanDetails?.userPlan?.speech_limit) > 0 ? Math.floor((1388 * parseInt(userPlanDetails?.userPlan?.speech_limit))  / 1000000) : 0} mins`,
            Icon: SpeakerIcon,
            isCompareValue: true,
            info: "Text to speech"
        },
        {
            label: "File size limit",
            isShowInfo: true,
            usedCounts: "",
            totalCounts: (parseInt(userPlanDetails?.userPlan?.file_upload_size_limit) / 1024 / 1024) + " MB",
            Icon: FileIcon,
            isCompareValue: false,
            info: "upload file size limit"
        }
    ]

    const renderCardDetails = (label, details) => {
        return (
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-[#235197] font-[500] text-[16px] mb-1">{label}</span>
                    <span className="text-[#347AE2] font-[500] text-[12px]">{details}</span>
                </div>
                <IoIosArrowForward className="h-5 w-5 text-[#347AE2]" />
            </div>
        )
    }

    const renderCard = (label, details, onCardClick, isLink) => {
        return (
            <Card
                className="ct-pricing-cards cursor-pointer"
                onClick={!isLink ? onCardClick : null}
            >
                {isLink 
                    ? <a href={`mailto:${details}`} className="flex flex-row items-center justify-between w-full">
                      {renderCardDetails(label, details)}  
                      </a> 
                    : renderCardDetails(label, details)
                    
                }
            </Card>
        )
    }  

    const renderTransactionCards = () => {
        const transactionSortArr = userPlanDetails?.transactions?.length > 0 ? userPlanDetails.transactions.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) }) : []
        const transaction        = transactionSortArr?.length > 0 ? transactionSortArr[0] : null
        const transactionArr     = [
            {
                label: "Billing History",
                bottomText: isMobile ? `${userPlanDetails?.subscriptionDetails?.scheduled_change !== null ? "Expires" : "Renews"} ${moment(userPlanDetails?.subscriptionDetails?.end_at).format("DD MMM, YY")}` : `${userPlanDetails?.subscriptionDetails?.scheduled_change !== null ? "Expires" : "Renews"} on ${moment(userPlanDetails?.subscriptionDetails?.end_at).format("Do MMMM YYYY")}`,
                callback: () => { setShowTransactionModal(true) }
            },
            {
                label: "Payment Method",
                bottomText: getPaymentMethodDetails(userPlanDetails?.transactions),
                callback: onPaymentMethodChange
            },
            {
                label: "Billed to",
                bottomText: transaction?.email,
                callback: () => { 
                    if (userPlanDetails?.subscriptionDetails?.scheduled_change?.action === "cancel") {
                        message.info("You have already cancelled the plan. You can't change the email now.")
                        return
                    }
                    setShowBilledEmailChangeModal(true) 
                }
            },
            {
                label: "Contact Support",
                bottomText: "support@curateit.com",
                isLink: true,
                callback: () => { navigate.push(`/u/${session.username}/referral`) }
            }
        ]
        return (
            <>
                <div className="flex flex-row items-center justify-between mt-5 ct-plan-detail-divider"></div>
                <List className="mt-7"
                      dataSource={transactionArr}
                      grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 2,
                        md: 2,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                      }}
                      renderItem={(item) => {
                        return (
                            <List.Item>
                                {renderCard(item.label, item.bottomText, item.callback, item.isLink)}
                            </List.Item>
                        )
                      }} />
            </>
        )
    }

    const renderFreePlanDetails = () => {
        const currentDate       = moment()
        const addedTrialDate    = moment(userPlanDetails?.userPlan?.createdAt).add(14, "days")
        return (
            <div className="flex flex-col items-start lg:flex-row lg:items-center">
                <span className="text-[#347AE2] font-[700] text-[20px] lg:text-[26px]">{userPlanDetails?.userPlan?.related_plan?.display_name}</span>
                {userPlanDetails?.userPlan?.related_plan?.plan_id !== "free" && <div className="pricing-discount-section gap-4 font-[500] text-[10px] lg:ml-2 lg:text-[12px]">
                    {`${addedTrialDate.diff(currentDate, "days")} days left`}
                </div>}
            </div>
        )
    }

    const renderPopoverContent = (content) => {
        return (
            <div className="flex flex-wrap w-[150px]">
                {content}
            </div>
        )
    }

    const TEAM_LABELS = ["Members", "Guests"]
    const lastTransaction = userPlanDetails?.transactions?.length > 1 ? userPlanDetails.transactions.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })[0] : userPlanDetails?.transactions?.length > 0 ? userPlanDetails.transactions[0] : null
    return (
        <>
            <div className='mt-6 md:mt-9'>
                <div className='w-full'>
                    <div className='w-full flex flex-col justify-between border-[0.4px] rounded py-3 px-4 shadow-md md:py-5 md:px-6 md:rounded-xl  md:shadow-lg'>
                        {!isUsagePage && <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col">
                                <div className="flex flex-col mb-2 lg:mb-3">
                                    <span className="text-[#4B4F5D] font-[500] text-[16px] lg:text-[18px] leading-[15px]">Your current plan</span>
                                    {userPlanDetails?.userPlan?.plan === "free" 
                                        ? renderFreePlanDetails()
                                        : <span className="text-[#347AE2] font-[700] text-[20px] lg:text-[26px]">{userPlanDetails?.userPlan?.related_plan?.display_name}</span>
                                    }
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:mb-3 items-start">
                                    <span className="text-[#74778B] font-[500] mr-2 lg:mr-0 text-[16px] lg:text-[18px] leading-[15px]">{userPlanDetails?.userPlan?.plan === "free" && userPlanDetails?.userPlan?.related_plan?.plan_id !== "free" ? "Trial period" : userPlanDetails?.userPlan?.related_plan?.plan_id !== "free" ? `Billed ${userPlanDetails?.userPlan?.related_plan?.tenure?.toLowerCase()}` : ""}</span>
                                    {((userPlanDetails?.userPlan?.related_plan?.tenure === "Monthly" || userPlanDetails?.userPlan?.plan === "free") && (!lastTransaction || lastTransaction?.status !== "failed")) && <div className="pricing-discount-section gap-4 lg:ml-2 font-[500] mt-2 text-[8px] lg:text-[12px] lg:mt-0">
                                        {userPlanDetails?.userPlan?.plan === "free" ? "We will switch you to our free Explorer Plan after trial" : `Switch to a yearly plan and save upto 40% >`}
                                    </div>}
                                    {(lastTransaction?.status === "failed") && <div className="pricing-error-discount-section gap-4 lg:ml-2 font-[500] mt-2 text-[8px] lg:text-[12px] lg:mt-0">
                                        {`Your last transaction failed. Please try again to continue your subscritpion or just purchase a new plan`}
                                    </div>}
                                </div>
                            </div>
                            {lastTransaction?.status === "failed" && <div className="flex flex-col items-center">
                                <button type="button" className="pricing-solid-btn shadow-sm gap-[8px] mb-2" onClick={() => onResumePlanClick(lastTransaction)}>
                                    Resume plan
                                </button>
                            </div>}
                            {userPlanDetails?.userPlan?.related_plan?.plan_id !== "free" && !isUsagePage && userPlanDetails?.subscriptionDetails?.scheduled_change === null && <div className="flex flex-col items-center">
                                <button type="button" className="pricing-solid-btn shadow-sm gap-[8px] mb-2" onClick={onUpdatePlanClick}>
                                    Update plan
                                </button>
                                <button type="button" className="pricing-cancel-btn shadow-sm gap-[8px]" onClick={onPlanCancelClick}>
                                    Cancel plan
                                </button>
                            </div>}
                        </div>}
                        <List 
                            className="mt-7"
                            dataSource={userPlanList}
                            grid={{
                                gutter: 16,
                                xs: 2,
                                sm: 2,
                                md: 2,
                                lg: 4,
                                xl: 4,
                                xxl: 4,
                            }}   
                            renderItem={item => (
                                <List.Item>
                                    <div className="flex flex-row items-center">
                                        <Avatar shape="square" size={48} icon={<item.Icon />} className="ct-avatar-square flex items-center justify-center" />
                                        <div className="flex flex-col ml-3">
                                            <div className="flex flex-row items-center mb-1">
                                                <span className="text-[#74778B] font-[400] text-[10px] lg:text-[100%] lg:leading-[19.36px] leading-[12.1px]">{item.label}</span>
                                                {item.isShowInfo &&
                                                    <Popover content={renderPopoverContent(item.info)} trigger="hover" placement="top">
                                                        <BiInfoCircle className="text-[#347AE2] ml-2" />
                                                    </Popover> 
                                                }
                                            </div>
                                            {item.usedCounts === "" && !item.isCompareValue 
                                                ? <span className="text-[#292B38] font-[500] text-[12px] lg:text-[100%] lg:leading-[21.78px] leading-[14.52px]">{item.totalCounts}</span>
                                                : <span className="text-[#292B38] font-[500] text-[12px] lg:text-[100%] lg:leading-[21.78px] leading-[14.52px]">{userPlanDetails?.userPlan?.related_plan?.is_team_plan && TEAM_LABELS.indexOf(item.label) === -1 ? `${item.usedCounts} / ${item.totalCounts} per member` : `${item.usedCounts} / ${item.totalCounts}`}</span>
                                            }
                                        </div>
                                    </div>
                                </List.Item>
                            )}   
                        />
                        {userPlanDetails?.userPlan?.plan === "paid" && !isUsagePage && userPlanDetails?.transactions?.length > 0 && userPlanDetails?.subscriptionDetails && renderTransactionCards()}
                    </div>
                </div>
            </div>
            {showTransactionModal && <TransactionModal items={userPlanDetails?.transactions}
                                                       showTransactions={showTransactionModal}
                                                       onHideModal={() => setShowTransactionModal(false)}
                                                       isMobile={isMobile} />}
            {showBilledEmailChangeModal && <BilledEmailChangeModal 
                onChangeEmail={async (email) => {
                    const res = await dispatch(changeBilledEmail(userPlanDetails?.subscriptionDetails?.customer_id, email))
                    setShowBilledEmailChangeModal(false)
                    if (res.payload?.data?.data?.status === "active") {
                        const newTransactions = userPlanDetails?.transactions.map((transaction) => { return { ...transaction, email } })
                        setUserPlanDetails({ ...userPlanDetails, transactions: [...newTransactions] })
                        message.success(`Email has been changed successfully. Now onwards it will send all emails to ${email}`)
                        return
                    }
                    if (res?.payload?.data?.status === 400 && res?.payload?.data?.error?.code === "customer_already_exists") {
                        message.error("Email already allocated to another customer. Please try with another email.")
                        return
                    }
                    message.error("An error occurred while changing the email. Please try again later.")
                }} 
                existingEmail={userPlanDetails?.transactions?.length > 0 ? userPlanDetails?.transactions?.[0]?.email : ""} 
                visible={showBilledEmailChangeModal}
                onCancel={() => {
                    setShowBilledEmailChangeModal(false)
                }} 
            />}
            {showCancelBox && <PlanConfirmModal 
                title={"Cancel Plan"} 
                visible={showCancelBox}
                message={<p>{"Are you sure you want to cancel the plan? Because after that you will be move to explorer plan immediately and you will be no longer to use your current plan benefits."}</p>} 
                onOk={onPlanCancel}
                onCancel={onHideModal}
                confirmLoading={isCancelingPlan}  />}
        </>
    )
}

export default UserCurrentPlanCard