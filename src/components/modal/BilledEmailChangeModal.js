import { useState }             from 'react';
import { Modal, Input, 
         message }              from 'antd';
import { useDispatch }          from 'react-redux';

import { emailVerification }    from '@actions/login';
import { EMAIL_PATTERN }        from '@utils/patterns';
import { EMAIL_NOT_VALID }      from '@utils/messages';

const BilledEmailChangeModal = ({ visible, onCancel, onChangeEmail, existingEmail }) => {
    const dispatch                  = useDispatch()
    const [email, setEmail]         = useState(existingEmail)
    const [emailErr, setEmailErr]   = useState("")

    const onEmailChange = (e) => {
        const { value } = e.target
        setEmail(value)
        if (value.match(EMAIL_PATTERN) === null) {
            setEmailErr(EMAIL_NOT_VALID)
        }
        else {
            setEmailErr("")
        }
    }

    const onSubmit = async () => {
        if (emailErr !== "") return
        const ENV = process.env.NEXT_PUBLIC_ENV;
        if (ENV === "production") {
            const emailVerificationResult = await dispatch(
                emailVerification(inputValue)
            );
            const invalidStatuses = ["invalid", "disposable", "disabled"];
            const status = emailVerificationResult?.payload?.data?.status;

            if (invalidStatuses.includes(status)) {
                message.error("Please enter a valid email address");
                return;
            }
        }
        onChangeEmail && onChangeEmail(email)
    }

    return (
        <Modal
            title="Change Billed Email"
            open={visible}
            onCancel={onCancel}
            onOk={onSubmit}
            okText="Change Email"
            okButtonProps={{
                className: "bg-[#347AE2]"
            }}
        >
            <div className="flex flex-col items-start justify-center">
                <p className="text-sm text-gray-500">Change the email address where you want to receive the bills</p>
                <Input className="w-full mt-2" placeholder="Enter new email" value={email} onChange={onEmailChange} />
                {emailErr !== "" && <p className="text-red-500 text-sm mt-1">{emailErr}</p>}
            </div>
        </Modal>
    )
}

export default BilledEmailChangeModal;