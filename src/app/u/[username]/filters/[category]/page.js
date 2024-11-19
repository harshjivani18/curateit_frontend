import Filters from '@containers/filters'
import { cookies } from 'next/headers'
import { redirect }     from 'next/navigation'

export async function generateMetadata({searchParams}) {
  const name = searchParams.type
  
  return {
    title: `${name} | Curateit`,
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
  }
}

const getBk = async () => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
        return null
    }
    return true

}

const CategoryPage = async ({searchParams}) => {
    const type = searchParams.type
    const items =  await getBk()
    if(!items){
        redirect('/sign-in')
    }
    return(
        <>
        <Filters
            type={type}
        />
        </>
    )
}
 
export default CategoryPage;