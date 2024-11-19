"use client"

import { useEffect, useState } from "react";
import { Modal, Spin, message } from "antd";
import axios from "axios";
import { FIELD_REQUIRED } from "@utils/messages";
import { TextMessage } from "@utils/constants";
import CurateitLogo from "@components/common/CurateitLogo";
import { useRouter, useSearchParams } from "next/navigation";
import session from "@utils/session";
import { Validator } from "@utils/validations";
import Button from "@components/common/Button";
import Input from "@components/collectionCombobox/Input";
import slugify from "slugify";

const CheckUserPublic = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('inviteId')
    const collectionId = searchParams.get('collectionId')
    const navigate = useRouter()

    const [loading,setLoading] = useState(false)
    const [buttonLoading,setButtonLoading] = useState(false)

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordProvided,setPasswordProvided] = useState(null)
    const [collectionData,setCollectionData] = useState('')

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const getCall = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/collection-public?inviteId=${token}&collectionId=${collectionId}`)
        
                if(res?.data?.data[0]?.collectionPassword){
                setPasswordProvided(res?.data?.data[0]?.collectionPassword || null)
                setCollectionData(res.data.data[0])
                setLoading(false)
                return;
                }
                else{
                    const cObj = res?.data?.data?.[0];
                    const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
                    navigate.push(`/u/${res.data.data[0]?.author?.username || 'default'}/c/${collectionId}/${slug}?public=true`)
                    setLoading(false)
                }
            }
            catch (err) {
                if (err.response?.data?.error?.status === 403) {
                    navigate.push("/403")
                    return
                }
            }
        }

        getCall()
    },[token,collectionId,navigate])

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(Validator.validate("title", e.target.value, null, null, true));
    };

    const handleSubmit = async() => {
        if(!password){
            setPasswordError(FIELD_REQUIRED)
            return;
        }
        setButtonLoading(true)

        const formData = new FormData();

        formData.append('password',password)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/collection/${collectionId}/check-password`,formData)
        if(res.error === undefined && res.data?.status === 200){
            session.setIsPublicPasswordValidate(true)
            const slug = collectionData?.slug || slugify(collectionData?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
            navigate.push(`/u/${collectionData?.author?.username || 'default'}/c/${collectionData?.id}/${slug}?public=true`)
            setButtonLoading(false)
        }else{
            setButtonLoading(false)
            message.error(res.data?.msg || TextMessage.ERROR_TEXT)
        }
    }

    if (!mounted) return <></>;

    return(
        <>
            {/* <Modal
            open={true}
            closable={false}
            footer={null}
            >
            <PublicHearder />

            <main className='px-16 mt-[14px]'>
                <div className="border-b border-cyan-100">
                <nav className="-mb-px flex space-x-1 justify-around" aria-label="Tabs">
                    <span className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm w-[48%] text-center">Enter password to access</span>
                </nav>
                </div>
                <>
                <div className='py-4'>
                    <Input value={password} onChange={(val) => handlePasswordChange(val)} type="password" name="password" placeholder="Password" />
                    <span className="error-label">{passwordError}</span>
                </div>
                <div className='mt-4 login-btn-container' >
                    <Button className="login-btn" onClick={handleSubmit} disabled={loading} variant="primary w-full">{loading ? `Loading...` : "Submit"}</Button>
                </div>
            </>
            </main>

            </Modal> */}

        {
        (loading && !passwordProvided) ? 
        <div className="h-screen w-full flex items-center justify-center">
            <Spin tip={'Loading...'} size="large"/>
        </div>
         : 
        (passwordProvided && !loading) ?
         <>
         <Modal
            open={true}
            closable={false}
            footer={null}
            >
            <CurateitLogo isCentered={true}/>

            <main className='px-16 mt-[14px]'>
                <div className="border-b border-cyan-100">
                <nav className="-mb-px flex space-x-1 justify-around" aria-label="Tabs">
                    <span className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm w-[48%] text-center">Enter password to access</span>
                </nav>
                </div>
                <>
                <div className='py-4'>
                    <Input value={password} onChange={(val) => handlePasswordChange(val)} type="password" name="password" placeholder="Password" size="w-full" />
                    <span className="error-label">{passwordError}</span>
                </div>
                <div className='mt-4 login-btn-container' >
                    <Button className="login-btn" onClick={handleSubmit} disabled={buttonLoading} variant="primary w-full">{buttonLoading ? `Loading...` : "Submit"}</Button>
                </div>
            </>
            </main>

        </Modal>
         </>
         :
         <>
         </>
        }
        </>
    )
}

export default CheckUserPublic;