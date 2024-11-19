"use client"
import "./EmailVerificationModal.css"
import React, { useState }                  from 'react'
import { Button, Modal, Spin, message }     from 'antd'
import { useDispatch, useSelector }         from "react-redux"
import { PiWarning }                        from "react-icons/pi"
import { MdMarkEmailRead }                  from "react-icons/md"

import session                              from "@utils/session"
import { resendVerification }               from "@actions/membership"
import { showEmailVerficationModal }        from "@actions/app"

const EmailVerificationModal = () => {
    const {showEmailModal}          = useSelector( state => state.app)
    const dispatch                  = useDispatch()
    const [resendingEmail, 
           setResendingEmail]       = useState(false)
    const [showMainContent,
           setShowMainContent]      = useState(true)

    const onHideModal = () => {
        dispatch(showEmailVerficationModal(false))
    }

    const onResendVerification = async () => {
        setResendingEmail(true)
        const res = await dispatch(resendVerification(session.emailAddress))
        setResendingEmail(false)
        if (res.error !== undefined) {
            setShowMainContent(true)
            message.error("Error while sending email. Please try again.")
        }
        else {
            setShowMainContent(false)
        }
    }

    return (
        <Modal open={showEmailModal}
               title={null}
               footer={null}
               onCancel={onHideModal}
               bodyStyle={{ padding: 0 }}
               className="welcome-modal-container"
               width={500}
               height={500}
               destroyOnClose>
            {showMainContent && <div className="flex flex-col items-center justify-center text-center p-5">
                <PiWarning className="verification-icon-size text-red-500 mb-3" />
                <div className="text-lg font-bold mb-3">Warning</div>
                <p className="text-xs mb-3">We have sent an email on your <b>{session.emailAddress}</b> email address. Please check and verify it. Thanks. </p>
                <Button type="primary" className="bg-[#40a9ff] border-[#40a9ff]" onClick={onResendVerification}>Resend</Button>
            </div>}
            {!showMainContent && resendingEmail 
                ? <Spin size="large" tip="Sending ...." className="text-[#000000] flex items-center justify-center" /> 
                : !showMainContent ? <div className="flex flex-col items-center justify-center text-center p-5">
                    <MdMarkEmailRead className="text-[#54C882] verification-icon-size mb-3" />
                    <p className="text-lg font-bold text-[#062046] mb-4">Email send successfully! Please check and verified it. Thanks.</p>
                    <Button type="ghost" onClick={onHideModal}>Close</Button>
                  </div> : null
                }
        </Modal>
    )
}

export default EmailVerificationModal