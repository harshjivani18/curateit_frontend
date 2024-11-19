import SingleBlogPage       from '@containers/gem/SingleBlogPage'
import { redirect }         from 'next/navigation'
import { cookies }          from 'next/headers'
import slugify              from 'slugify'

export async function generateMetadata({ params, searchParams }, parent) {
    const { bid }               = searchParams
    const cookieStore           = cookies()
    const cookie                = cookieStore.get('curateit-jwt')
    const headers               = (!cookie) ? {} : {Authorization: `Bearer ${cookie.value}`}

    if (!headers) {
        return null
    }
  
    const res   = await fetch(`${process.env.API_URL}/api/single-blog?blogId=${bid}`, {
        headers,
        next: {
            revalidate: 0
        }
    })
    const data  = await res.json()
    
    if (!data?.seo) {
      const capitalized = data?.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : "Gems"
      return {
        title: capitalized.includes("| Curateit") ? capitalized : `${capitalized} | Curateit`,
        robots: {
        index: true,
        follow: true,
        nocache: true,
    },
      }
    }
  
    const { seo }    = data
    const defaultURL = data?.author?.isInternalUser ? `${process.env.WEBAPP_URL}/blog/${slugify(data?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}?bid=${bid}` : `${process.env.WEBAPP_URL}/u/${data?.author?.username}/${slugify(data?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}?bid=${bid}`
    const canURL     = seo?.seo?.canonical
    const obj        = {
        title: seo?.seo?.title.includes("| Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
        description: seo?.seo?.description,
        keywords: seo?.seo?.keywords,
        authors: [{
            name: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
            url: `${process.env.WEBAPP_URL}/u/${data?.author?.username}`,
        }],
        creator: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
        publisher: "Curateit",
        openGraph: {
            title: seo?.seo?.title.includes("| Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
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
            index: true,
            follow: true,
            nocache: true,
        },
    }
    return obj
}

const getBk = async (bId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    const headers = (!cookie) ? {} : {Authorization: `Bearer ${cookie.value}`}
    if (!headers) {
        return null
    }
  
    const res   = await fetch(`${process.env.API_URL}/api/single-blog?blogId=${bId}`, {
        headers,
        next: {
            revalidate: 0
        }
    })
    const data = await res.json()

    if(!data){
        return []
    }
    return data
}

const getGemSEO = async (bId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    const headers = (!cookie) ? {} : {Authorization: `Bearer ${cookie.value}`}
    if (!headers) {
        return null
    }
    const res   = await fetch(`${process.env.API_URL}/api/single-blog?blogId=${bId}`, {
        headers,
        next: {
            revalidate: 0
        }
    })
    const gem          = await res.json()
  
    let jsonLd     = null
    const blogSlug = `${slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}?bid=${bId}`
    const gURL     = gem?.author?.isInternalUser ? `${process.env.WEBAPP_URL}/blog/${blogSlug}` : `${process.env.WEBAPP_URL}/u/${gem?.author?.username}/${blogSlug}`
    if (gem?.seo) {
        const { seo }     = gem
        jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: gem.title,
            headline: seo?.title,
            image: [seo?.opengraph?.image],
            description: seo?.description,
            url: gURL,
            identifier: gem.id,
            author: {
                "@type": "Person",
                "name": gem?.author?.firstname && gem?.author?.lastname ? `${gem?.author?.firstname} ${gem?.author?.lastname}` : gem?.author?.username,
                "url": `${process.env.WEBAPP_URL}/u/${gem?.author?.username}`,
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
            mainEntityOfPage: gURL
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

const SingleBlog = async ({params,searchParams}) => {
    const bId           = searchParams?.bid
    const items         = await getBk(bId)
    const jsonLd        = await getGemSEO(bId)
    // const isPublic      = await isPublicGem(jsonLd?.identifier)

    if (items?.error?.status === 403) {
        redirect("/403")
    }
    if (!items) {
        return <h1>No blog exists!</h1>
    }
    // const cookieStore   = cookies()
    // const token         = cookieStore.get('curateit-jwt')
    // const userId        = cookieStore.get('userId')
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
                        <img id="closePopup" alt="Close popup icon" title="minimize"
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
            <SingleBlogPage items={items} gemId={jsonLd?.identifier} gemPublicView={true} />
        </>
    );
}
 
export default SingleBlog;