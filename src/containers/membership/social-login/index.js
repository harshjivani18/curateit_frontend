"use client"
import { useEffect, useState }      from "react"
import { useDispatch }              from "react-redux"
import { useParams,
         useSearchParams }          from "next/navigation"
import { Spin }                     from "antd"

import { callSocialLoginCallback }  from "@actions/membership"  

const SocialLoginCallback = () => {
    const dispatch                      = useDispatch()
    const params                        = useParams()
    const searchParams                  = useSearchParams()
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading]     = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(callSocialLoginCallback(params.provider, searchParams.toString())).then((response) => {
            setIsLoading(false)
            if (response.error === undefined) {
                const { data } = response.payload
                if (data) {
                    setUserDetails(data)
                    if (window.opener) {
                        window.opener.postMessage(JSON.stringify({ userDetails: JSON.stringify(data), isSignedIn: true }), window.name)
                    }
                }
            }
            window.close()
        })
    }, [])
    
    return isLoading 
            ? <div className="flex justify-center items-center h-screen"><Spin tip="Validating and Logging in" /></div>
            : <pre className="whitespace-wrap hidden">{userDetails ? JSON.stringify(userDetails) : ""}</pre>
}

export default SocialLoginCallback