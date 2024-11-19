import { redirect } from "next/navigation"

const checkUserDetails = async (token,tagId) => {
    try {
            const res = await fetch(`${process.env.API_URL}/api/check-user-tag/${token}/${tagId}`)
            const status = await res.json()
            return status

        } catch (error) {
            return null
        }

}

const CheckUserTagPage = async ({searchParams}) => {
    const token = searchParams.token
    const tagId = searchParams.tagId
    const email = searchParams.email
    const status =  await checkUserDetails(token,tagId)

    if(status && status.status === 200){
        redirect(`/check-user-tags/register?tagId=${tagId}&email=${email}`)
    }else{
        redirect(`/check-user-tags/un-register?token=${token}&tagId=${tagId}&email=${email}`)
    }
}
 
export default CheckUserTagPage;