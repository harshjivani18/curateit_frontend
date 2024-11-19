import AllBookmarks     from "@containers/all-bookmarks";
import { cookies }      from 'next/headers'
import { redirect }     from "next/navigation";

export const metadata = {
    title: 'All Bookmarks | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const getBk = async () => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
        return null;
    }
    try {
        const res = await fetch(`${process.env.API_URL}/api/get-all-bookmark?perPage=20&page=1`,{
            headers: {Authorization: `Bearer ${cookie.value}`},
            compress: true,
            next: {
                revalidate: 0
            }
        })
        const data = await res.json();

        if(!data){
            return {
                data: [],
                count: 0,
                hasMore: false
            }
        }
        // return data?.data?.bookmark 
        return {
            count : data?.totalBookmark,
            data: data?.data?.bookmark,
            hasMore: ((data?.totalBookmark === 0) || (data?.totalBookmark === data?.data?.bookmark?.length)) ? false : true
        }
    } catch (error) {
        return null
    }
}

const AllBookmarksPage = async () => {
    const items =  await getBk()
    if(!items){
        redirect('/sign-in')
    }
    return (
    <AllBookmarks 
        items={items?.data || []} pageNumber={1}
        count={items?.count || 0}
        hasMoreValue={items?.hasMore}
        />
        );
}
 
export default AllBookmarksPage;