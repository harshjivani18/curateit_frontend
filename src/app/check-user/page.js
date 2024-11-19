import { redirect } from "next/navigation"

const checkUserDetails = async (token,collectionId) => {
    try {
            const res = await fetch(`${process.env.API_URL}/api/check-user/${token}/${collectionId}`)

            const status = await res.json()
            return status

        } catch (error) {
            return null
        }

}

const CheckUserPage = async ({searchParams}) => {
    const token = searchParams.token
    const collectionId = searchParams.collectionId
    const email = searchParams.email
    const status =  await checkUserDetails(token,collectionId)

    if(status && status.status === 200){
        redirect(`/check-user/register?collectionId=${collectionId}&email=${email}`)
    }else{
        redirect(`/check-user/un-register?token=${token}&collectionId=${collectionId}&email=${email}`)
    }
}
 
export default CheckUserPage;