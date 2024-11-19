"use client";
import { useDispatch }      from "react-redux"
import { useEffect, 
         useState }         from "react"

import { getArticle }       from "@actions/gems"
import Blog                 from "@components/blog/Blog"

const ArticlePage = (props) => {
    const dispatch                        = useDispatch()
    const [extraDetails, setExtraDetails] = useState(null)
    const { items, gemId, gemPublicView,
            permissions,
            isInboxView }                 = props

    useEffect(() => {
        dispatch(getArticle(items?.attributes?.url)).then((res) => {
            if (res.payload?.data?.article) {
                setExtraDetails(res.payload?.data?.article)
            }
        })
    }, [])
    
    return (<Blog 
        permissions={permissions} 
        blog={{ ...items.attributes, id: items.id }} 
        extraDetails={extraDetails} 
        gemPublicView={gemPublicView} 
        gemId={gemId} 
        isInboxView={isInboxView} />)
}

export default ArticlePage