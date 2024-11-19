// import Collections from "@containers/collections";
// import CollectionShared from "@containers/shareCollections/CollectionShared";
import dynamic from "next/dynamic";
const Collections = dynamic(() => import("@containers/collections"), { ssr: false });
const CollectionShared = dynamic(() => import("@containers/shareCollections/CollectionShared"), { ssr: false });
import { cookies } from 'next/headers'
import { redirect }     from "next/navigation";
import Script from "next/script";
import slugify from "slugify";

export async function generateMetadata({ params, searchParams }, parent) {
  const { id, username }            = params
  const uArr          = username.split("@")
  const usernameParam = uArr.length > 0 ? uArr[uArr.length - 1] : username
  const uStr          = usernameParam.replaceAll("%40", "")

  const res                         = await fetch(`${process.env.API_URL}/api/collections/${id}/seo-details`)
  const data                        = await res.json()

  if (!data?.seo) {
    const capitalized = data?.name ? data?.name.charAt(0).toUpperCase() + data?.name.slice(1) : "Collection"
    const defaultURL = `${process.env.WEBAPP_URL}/u/${data?.author?.username}/c/${data.id}/${data?.slug || slugify(data?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
    return {
      title: capitalized.includes("| Curateit") ? capitalized : `${capitalized} | Curateit`,
      description: data?.description,
      keywords: [capitalized],
      authors: [{
        name: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
        url: `${process.env.WEBAPP_URL}/u/${data?.author?.username}`,
      }],
      creator: data?.author?.firstname && data?.author?.lastname ? `${data?.author?.firstname} ${data?.author?.lastname}` : data?.author?.username,
      publisher: "Curateit",
      openGraph: {
          title: capitalized.includes("| Curateit") ? capitalized : `${capitalized} | Curateit`,
          description: data?.description,
          siteName: "Curateit",
          type: "website",
          url: defaultURL,
          images: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
      },
      alternates: {
        canonical: `${defaultURL}`,
      },
      robots: {
        index: false,
        follow: true,
        nocache: true,
      },
    }
  }

  const { seo }    = data
  const defaultURL = `${process.env.WEBAPP_URL}/u/${uStr}/c/${id}/${data?.slug || slugify(data?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
  const isPublicRes = await fetch(`${process.env.API_URL}/api/is-public-collection/${id}`)
  const isPublic    = await isPublicRes.json()
  // const canURL     = seo?.seo?.canonical
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
        siteName: "Curateit",
        type: "website",
        url: defaultURL,
        images: [seo?.opengraph?.image],
    },
    alternates: {
      canonical: `${defaultURL}`,
    },
    robots: {
      index: isPublic,
      follow: true,
      nocache: true,
    },
  }

  return obj
}

const getSEOCollection = async (username, id) => {
  const res          = await fetch(`${process.env.API_URL}/api/collections/${id}/seo-details`)
  const collection   = await res.json()

  let jsonLd    = null
  if (collection?.seo) {
      const { seo }     = collection
      jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: collection.name,
          headline: seo?.seo?.title,
          image: [seo?.opengraph?.image],
          description: seo?.seo?.description,
          url: `${process.env.WEBAPP_URL}/u/${username}/c/${id}/${collection?.slug || slugify(collection?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
          identifier: collection.id,
          author: {
              "@type": "Person",
              "name": collection?.author?.firstname && collection?.author?.lastname ? `${collection?.author?.firstname} ${collection?.author?.lastname}` : collection?.author?.username,
              "url": `${process.env.WEBAPP_URL}/u/${collection?.author?.username}`,
              "identifier": collection?.author?.id,
              "username": collection?.author?.username
          },
          creator: [
              collection?.author?.firstname && collection?.author?.lastname ? `${collection?.author?.firstname} ${collection?.author?.lastname}` : collection?.author?.username
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
          dateCreated: collection.createdAt,
          datePublished: collection.createdAt,
          dateModified: collection.updatedAt,
          mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}/c/${id}/${collection?.slug || slugify(collection?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
      }
  } 
  else {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: collection.name,
      headline: collection.name,
      image: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
      description: collection?.description || collection?.name,
      url: `${process.env.WEBAPP_URL}/u/${username}/c/${id}/${collection?.slug || slugify(collection?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
      identifier: collection.id,
      author: {
          "@type": "Person",
          "name": collection?.author?.firstname && collection?.author?.lastname ? `${collection?.author?.firstname} ${collection?.author?.lastname}` : collection?.author?.username,
          "url": `${process.env.WEBAPP_URL}/u/${collection?.author?.username}`,
          "identifier": collection?.author?.id,
          "username": collection?.author?.username
      },
      creator: [
          collection?.author?.firstname && collection?.author?.lastname ? `${collection?.author?.firstname} ${collection?.author?.lastname}` : collection?.author?.username
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
      dateCreated: collection.createdAt,
      datePublished: collection.createdAt,
      dateModified: collection.updatedAt,
      mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}/c/${id}/${collection?.slug || slugify(collection?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
    }
  }

  return jsonLd
}



const getFollowerPermissions = () => {
  return {
    "accessType": "viewer",
    "permissions": {
      "gems": {
        "canRead": true,
        "canShare": true,
        "canCreate": false,
        "canDelete": false,
        "canUpdate": false,
        "canAddtoBookmark": true
      },
      "subCollections": {
        "canRead": true,
        "canShare": false,
        "canCreate": false,
        "canDelete": false,
        "canUpdate": false
      },
      "existingCollections": {
        "canRead": true,
        "canShare": false,
        "canCreate": false,
        "canDelete": false,
        "canUpdate": false
      }
    },
  }
}

const getCollectionPermissions = (data, idToFind, topLevelAccess=null, topLevelPermissions=null,topLevel=true) => {
  for (const item of data) {
    if (item.id === Number(idToFind)) {
      return {
        accessType: item.accessType || topLevelAccess,
        permissions: item.permissions || topLevelPermissions,
        data: item,
        topLevel:topLevel
      };
    }
    
    if (item.folders && item.folders.length > 0) {
      const nextTopLevelAccess = item.accessType || topLevelAccess;
      const nextTopLevelPermissions = item.permissions || topLevelPermissions;
      const result = getCollectionPermissions(item.folders, idToFind, nextTopLevelAccess, nextTopLevelPermissions,false);
      
      if (result) {
        return result;
      }
    }
  }
  
  return null;
};

const getBk = async (collectionId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
        return null;
    }
    
    return true;
}

const getSharedPermissions = async (collectionId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
        return null;
    }
    
    try {
        const res = await fetch(`${process.env.API_URL}/api/share-with-me`,{
        headers: {Authorization: `Bearer ${cookie.value}`},
        next: {
            revalidate: 0
        }
    })

    const data = await res.json()
    const value = getCollectionPermissions(data?.data || [],Number(collectionId))

    return value
    } catch (error) {
        return null
    }
}

const checkIsFollowedCollection = async (collectionId) => {
  const cookieStore = cookies()
  const cookie = cookieStore.get('curateit-jwt')
  if(!cookie){
    return false;
  }
  const res = await fetch(`${process.env.API_URL}/api/is-followed-collection/${collectionId}`, {
    headers: {Authorization: `Bearer ${cookie.value}`},
      next: {
        revalidate: 0
      }
  })
  return await res.json()
}

const CollectionsPage = async ({params,searchParams}) => {
  const jsonLd        = await getSEOCollection(params.username.replaceAll("%40", ""), params.id)
  const isFollowed    = await checkIsFollowedCollection(params.id)
  const authorName    = params.username.replaceAll("%40", "")
  if ((searchParams && searchParams?.public && searchParams?.public === 'true') || (searchParams && searchParams?.embeded && searchParams?.embeded === 'true')) {
    redirect(jsonLd.url)
    // return (
    //   <>
    //       {jsonLd && <script
    //           type="application/ld+json"
    //           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    //       />}
    //       <CollectionShared/>
    //   </>
    // );
  }
  const items         = await getBk(params.id)
  const permissions   = await getSharedPermissions(params.id)
  const cookieStore   = cookies()
  const cookie        = cookieStore.get('userId')
  const BASE_URL     = process.env.NEXT_PUBLIC_BASE_URL
  const isMainDomain = BASE_URL === "https://curateit.com" || BASE_URL === "https://www.curateit.com"

  
    if(((!items || (!items && !permissions) || (items && !permissions && jsonLd?.author?.identifier !== parseInt(cookie?.value)))) && !isFollowed) {
      return (
        <>
            {jsonLd && <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />}
            {/* Reddit Pixel Code */}
            {isMainDomain && <Script strategy='lazyOnload'>
              {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_eu6xc8z7rupw', {"aaid":"<AAID-HERE>","email":"<EMAIL-HERE>","externalId":"<EXTERNAL-ID-HERE>","idfa":"<IDFA-HERE>"});rdt('track', 'PageVisit');`}
            </Script>}
            {isMainDomain && <Script strategy='lazyOnload'>
                {`gtag('event', 'conversion', {'send_to': 'AW-11434334956/tFy_CNy_xrAZEOy1qMwq'});`}
            </Script>}
            <CollectionShared defaultTitle={jsonLd.name} />
        </>
      );
    }
    
    return(
        <>
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        {/* Reddit Pixel Code */}
        {isMainDomain && <Script strategy='lazyOnload'>
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_eu6xc8z7rupw', {"aaid":"<AAID-HERE>","email":"<EMAIL-HERE>","externalId":"<EXTERNAL-ID-HERE>","idfa":"<IDFA-HERE>"});rdt('track', 'PageVisit');`}
        </Script>}
        {isMainDomain && <Script strategy='lazyOnload'>
          {`gtag('event', 'conversion', {'send_to': 'AW-11434334956/tFy_CNy_xrAZEOy1qMwq'});`}
        </Script>}

        <Collections
        id={params.id}
        permissionsRes={isFollowed ? getFollowerPermissions() : permissions ? permissions : null}
        authorName={authorName}
        />
        </>
    )
}
 
export default CollectionsPage;