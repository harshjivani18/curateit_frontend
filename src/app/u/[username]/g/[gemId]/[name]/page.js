import SingleGem from '@containers/gem/SingleGem'
import BlogPage from '@containers/gem/BlogPage'
import { cookies } from 'next/headers'
import slugify from 'slugify'
import { redirect }     from "next/navigation";
import ArticlePage from '@containers/gem/ArticlePage';

export async function generateMetadata({ params, searchParams }, parent) {
    const { gemId, username } = params
    const uArr                = username.split("@")
    const usernameParam       = uArr.length > 0 ? uArr[uArr.length - 1] : username
    const uStr                = usernameParam.replaceAll("%40", "")
  
    const res   = await fetch(`${process.env.API_URL}/api/gems/${gemId}/seo-details`)
    const data  = await res.json()
    
    if (!data?.seo) {
        // const idx = data?.tags?.findIndex((tag) => tag.seo !== null)
        // const capitalized = data?.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : "Gems"
        const defaultURL = `${process.env.WEBAPP_URL}/u/${uStr}/g/${gemId}/${data?.slug || slugify(data?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
        return {
            title: data?.title.includes("| Curateit") ? data?.title : `${data?.title} | Curateit`,
            description: data?.description,
            keywords: [data?.title],
            authors: [{
                name: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
                url: `${process.env.WEBAPP_URL}/u/${data?.author?.username}`,
            }],
            creator: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
            publisher: "Curateit",
            openGraph: {
                title: data?.title.includes("| Curateit") ? data?.title : `${data?.title} | Curateit`,
                description: data?.description,
                type: "website",
                url: defaultURL,
                siteName: "Curateit",
                images: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
            },
            alternates: {
                canonical: defaultURL,
            },
            robots: {
                index: false,
                follow: true,
                nocache: true,
            },
        }
    }
  
    const { seo }    = data
    const defaultURL = `${process.env.WEBAPP_URL}/u/${uStr}/g/${gemId}/${data?.slug || slugify(data?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
    const canURL     = seo?.seo?.canonical
    const isPublicRes = await fetch(`${process.env.API_URL}/api/is-public-gem/${gemId}`)
    const isPublic     = await isPublicRes.json()
    const obj        = {
        title: seo?.seo?.title?.includes("| Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
        description: seo?.seo?.description,
        keywords: seo?.seo?.keywords,
        authors: [{
            name: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
            url: `${process.env.WEBAPP_URL}/u/${data?.author?.username}`,
        }],
        creator: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
        publisher: "Curateit",
        openGraph: {
            title: seo?.seo?.title?.includes("| Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
            description: seo?.seo?.description,
            type: "website",
            url: defaultURL,
            siteName: "Curateit",
            images: [seo?.opengraph?.image],
        },
        alternates: {
            canonical: defaultURL,
        },
        robots: {
            index: isPublic,
            follow: true,
            nocache: true,
        },
    }
    return obj
}

const getBk = async (gemId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    const headers = (!cookie) ? {} : {Authorization: `Bearer ${cookie.value}`}
    try {
        const res = await fetch(`${process.env.API_URL}/api/gems/${gemId}?populate=*`,{
            headers,
            next: {
                revalidate: 0
            }
        })
        const data = await res.json()

        if(!data){
            return []
        }
        return data?.data 
    } catch (error) {
        return null
    }
}

const getGemSEO = async (username, id) => {
    const res          = await fetch(`${process.env.API_URL}/api/gems/${id}/seo-details`)
    const gem          = await res.json()
  
    let jsonLd    = null
    if (gem?.seo) {
        const { seo }     = gem
        jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: gem.title,
            headline: seo?.title,
            image: [seo?.opengraph?.image],
            description: seo?.description,
            url: `${process.env.WEBAPP_URL}/u/${username}/g/${id}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
            identifier: gem.id,
            author: {
                "@type": "Person",
                "name": gem?.author?.firstname && gem?.author?.lastname ? `${gem?.author?.firstname} ${gem?.author?.lastname}` : gem?.author?.username,
                "url": `${process.env.WEBAPP_URL}/u/${gem?.author?.username}`,
                "identifier": gem?.author?.id,
                "username": gem?.author?.username
            },
            creator: [
                gem?.author?.firstname && gem?.author?.lastname ? `${gem?.author?.firstname} ${gem?.author?.lastname}` : gem?.author?.username
            ],
            publisher: {
                "@type": "Organization",
                name: "Curateit",
                url: "curateit.com",
                logo: {
                    "@type": "ImageObject",
                    width: 200,
                    height: 200,
                    url: `${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`
                }
            },
            dateCreated: gem.createdAt,
            datePublished: gem.createdAt,
            dateModified: gem.updatedAt,
            mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}/g/${id}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
        }
    } 
    else {
        jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: gem.title,
            headline: gem?.title,
            image: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
            description: gem?.description,
            url: `${process.env.WEBAPP_URL}/u/${username}/g/${id}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
            identifier: gem.id,
            author: {
                "@type": "Person",
                "name": gem?.author?.firstname && gem?.author?.lastname ? `${gem?.author?.firstname} ${gem?.author?.lastname}` : gem?.author?.username,
                "url": `${process.env.WEBAPP_URL}/u/${gem?.author?.username}`,
                "identifier": gem?.author?.id,
                "username": gem?.author?.username
            },
            creator: [
                gem?.author?.firstname && gem?.author?.lastname ? `${gem?.author?.firstname} ${gem?.author?.lastname}` : gem?.author?.username
            ],
            publisher: {
                "@type": "Organization",
                name: "Curateit",
                url: "curateit.com",
                logo: {
                    "@type": "ImageObject",
                    width: 200,
                    height: 200,
                    url: `${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`
                }
            },
            dateCreated: gem.createdAt,
            datePublished: gem.createdAt,
            dateModified: gem.updatedAt,
            mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}/g/${id}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
        }
    }
  
    return jsonLd
}

const isPublicGem = async (gemId) => {
    const cookieStore   = cookies()
    const token         = cookieStore.get('curateit-jwt')
    const headers       = (!token) ? {} : {Authorization: `Bearer ${token.value}`}
    const res = await fetch(`${process.env.API_URL}/api/is-public-gem/${gemId}`, { headers })
    const data = await res.json()
    return data
}


const GemViewPage = async ({params,searchParams}) => {
    const gemId    = params?.gemId
    const items    = await getBk(gemId)
    const jsonLd   = await getGemSEO(params?.username.replaceAll("%40", ""), params?.gemId)
    if (searchParams && searchParams?.public && searchParams?.public === 'true') {
        redirect(jsonLd.url)
    }
    const isPublic      = await isPublicGem(gemId)
    const cookieStore   = cookies()
    const token         = cookieStore.get('curateit-jwt')
    const userId        = cookieStore.get('userId')
    return (
            <>
            {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
            <div id="lbth_main" style={{zIndex:'999999',display:'none'}}>
                <div id="lbthmydiv" className="lbthmodal">
                    <div>
                    <div id="full-width" className="lbthmodal" tabIndex="">
                        <div id="lbthmydivheader" className="lbthmodal-header" style={{position:'relative'}}>
                        <span style={{fontSize:'40px'}} id="myTextModalLabel"></span> 
                        {/* <img id="removePopup" alt=""  title="close"
                        style={{position:'absolute',top:'4px',right:'9px',zIndex:'99999'}}
                        />  */}
                        <span id="removePopup" title="close" style={{position:'absolute',top:'4px',right:'9px',zIndex:'99999'}}>X</span>
                        <img id="closePopup" alt="Close image btn" title="minimize"
                        style={{position:'absolute',top:'4px',right:'80px',zIndex:'99999'}}
                        />
                        </div>
                        <div className="lbthmodal-body">
                        <div className="lbth-flex">
                            <img id="undoImg" 
                            style={{maxWidth:'30px',cursor:'pointer',marginRight:'8px'}} src="#" alt="Undo image icon" /> 
                            <span id="lbthchange" style={{fontSize:'17px',cursor:'pointer'}}>Start</span> 
                            <img id="redoImg" style={{maxWidth:'30px',cursor:'pointer',marginLeft:'8px'}}src="#" alt="Redo image icon" />
                        </div>
                        <div className="lbth-flex" style={{fontSize:'17px',}}>WPM : &nbsp; 
                            <select name="selectorId" id="lbthSelectorId"></select>
                        </div>
                        <div className="lbth-flex" style={{fontSize:'17px',}}>Font Size : &nbsp; 
                            <select name="fontSize" id="fontSize"></select>
                        </div>
                        <div className="lbth-flex" style={{fontSize:'17px',}}>Words at a time : &nbsp; 
                            <select name="no_words" id="no_words"></select>
                        </div>
                        </div>
                    </div>
                    </div>
                        
                </div>
            </div>
            {items?.attributes?.media_type === "Blog" 
                ? <BlogPage gemId={gemId}
                            items={items}
                            gemPublicView={(isPublic && !token?.value) || (isPublic && token?.value && parseInt(userId?.value) !== jsonLd?.author?.identifier)} /> 
                : items?.attributes?.media_type === "Article" 
                        ? <ArticlePage gemId={gemId}
                                       items={items}
                                       gemPublicView={(isPublic && !token?.value) || (isPublic && token?.value && parseInt(userId?.value) !== jsonLd?.author?.identifier)} /> 

                        : <SingleGem gemId={gemId}
                                     items={items}
                                     gemPublicView={(isPublic && !token?.value) || (isPublic && token?.value && parseInt(userId?.value) !== jsonLd?.author?.identifier)} />
            }
            </>
        );
}
 
export default GemViewPage;