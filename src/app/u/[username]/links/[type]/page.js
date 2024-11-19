import BrokenDuplicate from '@containers/broken-duplicate'
import { cookies }      from 'next/headers'
import { redirect }     from 'next/navigation'

export async function generateMetadata({params}) {
  const name = params.type
  const capitalized = name?.charAt(0)?.toUpperCase() + name?.slice(1)
  
  return {
    title: capitalized.includes("| Curateit") ? capitalized : `${capitalized} | Curateit`,
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
  }
}

const getBkDuplicate = async () => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
        return null
    }
    return true
}

const BrokenDuplicatePage = async ({params}) => {
    const type = params.type
    const items =  await getBkDuplicate() 
    if(!items){
        redirect('/sign-in')
    }
    return(
        <>
        <BrokenDuplicate
        type={type}
        />
        </>
    )
}
 
export default BrokenDuplicatePage;