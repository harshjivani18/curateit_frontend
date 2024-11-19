import SingleBlogPage       from '@containers/gem/SingleBlogPage'
import { cookies }          from 'next/headers'
import { redirect }         from 'next/navigation'
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
    const defaultURL = data?.author?.isInternalUser ? `${process.env.WEBAPP_URL}/blog/${data?.slug || (slugify(data?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }))}?bid=${bid}` : `${process.env.WEBAPP_URL}/u/${data?.author?.username}/${data?.slug || (slugify(data?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }))}?bid=${bid}`
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
    const blogSlug = `${gem?.slug || (slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }))}?bid=${bId}`
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


const SingleBlog = async ({params,searchParams}) => {
    const bId   = searchParams?.bid
    const items =  await getBk(bId)
    const jsonLd = await getGemSEO(bId)
    
    if (items?.error?.status === 403) {
        redirect("/403")
    }
    if (!items) {
        return <h1>No blog exists!</h1>
    }
    return (
        <>
            {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
            <SingleBlogPage items={items} gemPublicView={true} gemId={items?.id} />
        </>
    );
}
 
export default SingleBlog;