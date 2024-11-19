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
    const tagId = searchParams.get('tagId')
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
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tag-public-link?tagId=${tagId}`)
        
                if(res?.data?.data[0]?.tagPassword){
                setPasswordProvided(res?.data?.data[0]?.tagPassword || null)
                setCollectionData(res.data.data[0])
                setLoading(false)
                return;
                }
                else{
                    const tObj = res?.data?.data?.[0]
                    const slug = tObj?.slug || slugify(tObj?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
                    navigate.push(`/u/${res.data.data[0]?.author?.username || 'default'}/tags/${tObj?.id}/${slug}?public=true`)
                    setLoading(false)
                }
            }
            catch (err) {
                navigate.push("/403")
                return
            }
        }

        getCall()
    },[token,tagId,navigate])

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
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tag/${tagId}/check-password`,formData)

        if(res.error === undefined && res.data?.status === 200){
            session.setIsTagPublicPasswordValidate(true)
            const tObj = collectionData
            const slug = tObj?.slug || slugify(tObj?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })
            navigate.push(`/u/${collectionData?.author?.username || 'default'}/tags/${tObj?.id}/${slug}?public=true`)
            setButtonLoading(false)
        }else{
            setButtonLoading(false)
            message.error(res.data?.msg || TextMessage.ERROR_TEXT)
            setPassword('')
        }
    }

    if (!mounted) return <></>;

    return(
        <>
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
                <div className='py-4 flex justify-center'>
                    <div>
                        <Input value={password} onChange={(val) => handlePasswordChange(val)} type="password" name="password" placeholder="Password"/>
                        <span className="error-label block">{passwordError}</span>
                    </div>
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