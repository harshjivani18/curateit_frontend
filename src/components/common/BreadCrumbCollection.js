import { findFolderAndRoot } from "@utils/find-collection-id"
import session from "@utils/session"
import { Breadcrumb } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import slugify from "slugify"

const BreadCrumbCollection = ({id,fromPage='',parentData=[],type='',title,page=''}) => {
    const navigate = useRouter()

    const importCollections = useSelector((state) => state.collections.collectionsAndItsCount)
    const sharedCollections = useSelector((state) => state.collections.sharedCollections)
    const followedCollections = useSelector((state) => state.collections.followedCollections)

    const {tagsWithGemsCount,sharedTags} = useSelector(state => state.tags)

    const [result,setReult] = useState(null)

    useEffect(() => {
        if(page === 'collection'){
            const fc = Array.isArray(followedCollections) ? followedCollections : [];
            const ic = Array.isArray(importCollections) ? importCollections : [];
            const sc = Array.isArray(sharedCollections) ? sharedCollections : [];
            const data = findFolderAndRoot([...fc,...ic,...sc],id)
            setReult(data)
        }

        if(page === 'tags'){
            const ot = Array.isArray(tagsWithGemsCount) ? tagsWithGemsCount : [];
            const st = Array.isArray(sharedTags) ? sharedTags : [];
            const data = findFolderAndRoot([...ot,...st],id)
            setReult(data)
        }
    },[id,page])

    const handleNavigate = (item) => {
        if(page === 'collection'){
            const slugifiedName = item?.slug || slugify(item?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g });

            if(item?.isFollowerCollection || item?.isShareCollection){
                return navigate.push(`/u/${item?.author?.username}/c/${item?.id}/${slugifiedName}`)
            }

            return navigate.push(`/u/${session.username}/c/${item?.id}/${slugifiedName}`)
        }

        if(page === 'tags'){
            const slugifiedName = item?.slug || slugify(item?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g });

            return navigate.push(`/u/${item?.author?.username || session?.username}/tags/${item?.id}/${slugifiedName}`)
        }
    }

    const handleNavigatePublic = (item) => {
        if(type === 'tag-public'){
            const slugifiedName = item?.slug || slugify(item?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g });
            return navigate.push(`/u/${item?.author?.username}/tags/${item?.id}/${slugifiedName}`)
        }

        const slugifiedName = item?.slug || slugify(item?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g });

        return navigate.push(`/u/${item?.author?.username}/c/${item?.id}/${slugifiedName}`)
    }

    return(
        <div>
        {
        result && result?.length>0 && (page === 'collection' || page === 'tags') &&
        <Breadcrumb>
            {
            result?.map((item, index) => {
                const isLastItem = index === result.length - 1;
                return (
                    <Breadcrumb.Item 
                        key={item.id}
                        className={!isLastItem ? 'cursor-pointer transition p-1 rounded-md hover:bg-gray-200' : ''}
                        onClick={!isLastItem ? () => handleNavigate(item) : null}
                    >
                        {item?.name || item?.tag}
                    </Breadcrumb.Item>
                );
                })
            }
        </Breadcrumb>
        }

        {
        fromPage === 'collection-public-shared' && parentData?.length>0 &&
        <Breadcrumb>
            <Breadcrumb.Item className="cursor-pointer transition p-1 rounded-md hover:bg-gray-200" onClick={() => handleNavigatePublic(parentData[0])}>{type === 'collection-public' ? `${parentData[0]?.name}` : `${parentData[0]?.tag}`}</Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        }
        </div>
    )
}

export default BreadCrumbCollection;