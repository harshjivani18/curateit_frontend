"use client"
import React                   from 'react'
import {  Button, Modal }                    from 'antd'
import { useDispatch, useSelector }                          from "react-redux"
import { toggleExceedPopup}        from "@actions/app"
import { useRouter } from 'next/navigation'
import session from '@utils/session'
// import store from '@store/index'

const ExceedLimitModal = () => {
    let {showExceedModal, 
           exceedMessage}      = useSelector( state => state.app)
    const dispatch             = useDispatch()
    const navigate             = useRouter()

    const onHideModal = () => {
        dispatch(toggleExceedPopup(false, ""))
    }

    const goPricingPage = () => {
        navigate.push(`${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?billing=true`)
        dispatch(toggleExceedPopup(false, ""))
    }

    const goReferalPage = () => {
        navigate.push(`${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/referral`)
        dispatch(toggleExceedPopup(false, ""))
    }

    return (
        <Modal open={showExceedModal}
               title={"Plan Limit Exceeded"}
               footer={[
                <Button type="primary" className='bg-[#347AE2]' onClick={goReferalPage}>Earn</Button>,
                <Button type="primary" className='bg-[#347AE2]' onClick={goPricingPage}>Upgrade</Button>,
                <Button type="ghost" onClick={onHideModal}>Cancel</Button>
               ]}
               onCancel={onHideModal}
               className="welcome-modal-container"
               width={800}
               height={600}
               destroyOnClose>
            <p>{exceedMessage ? exceedMessage : "Your current plan limit is exceed you need to upgrade your plan or earn some credits"}</p>
        </Modal>
    )
}

export default ExceedLimitModal