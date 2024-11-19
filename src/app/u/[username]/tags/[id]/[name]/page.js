
import Tags from '@containers/tags'
import TagShared from '@containers/shareTags/TagShared';
import { cookies } from 'next/headers'
import slugify from "slugify";
import { redirect }     from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
  const { id, username }  = params
  const uArr              = username.split("@")
  const usernameParam     = uArr.length > 0 ? uArr[uArr.length - 1] : username
  const uStr              = usernameParam.replaceAll("%40", "")

  const res   = await fetch(`${process.env.API_URL}/api/tags/${id}/seo-details`)
  const data  = await res.json()

  if (!data?.seo) {
    const capitalized = data?.tag ? data?.tag.charAt(0).toUpperCase() + data?.tag.slice(1) : "Tag"
    const uName       = data?.users?.length > 0 ? data?.users[0]?.username : uStr
    const defaultURL = `${process.env.WEBAPP_URL}/u/${uStr}/tags/${id}/${data?.slug || slugify(data?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`

    return {
      title: capitalized.includes("| Curateit") ? capitalized : `${capitalized} | Curateit`,
      description: capitalized,
      keywords: [data?.tag],
      authors: data?.users?.map((user) => {
        return {
            name: user?.firstname && user?.lastname ? `${user?.firstname} ${user?.lastname}` : user?.username,
            url: `${process.env.WEBAPP_URL}/u/${user?.username}`,
        }
      }),
      creator: uName,
      publisher: "Curateit",
      custom: {
        dateCreated: data?.createdAt,
        dateModified: data?.updatedAt,
        datePublished: data?.createdAt,
      },
      openGraph: {
          title: `${data?.tag} | Curateit`,
          description: data?.tag,
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
  const defaultURL = `${process.env.WEBAPP_URL}/u/${uStr}/tags/${id}/${data?.slug || slugify(data?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
  // const canURL     = seo?.seo?.canonical
  const uName      = data?.users?.length > 0 ? data?.users[0]?.username : uStr
  const isPublicRes = await fetch(`${process.env.API_URL}/api/is-public-tag/${id}`)
  const isPublic     = await isPublicRes.json()
  const obj        = {
    title: seo?.seo?.title?.includes("Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
    description: seo?.seo?.description,
    keywords: seo?.seo?.keywords,
    authors: data?.users?.map((user) => {
      return {
          name: user?.firstname && user?.lastname ? `${user?.firstname} ${user?.lastname}` : user?.username,
          url: `${process.env.WEBAPP_URL}/u/${user?.username}`,
          identifier: user?.id,
          username: user?.username,
      }
    }),
    creator: uName,
    publisher: "Curateit",
    custom: {
      dateCreated: data?.createdAt,
      dateModified: data?.updatedAt,
      datePublished: data?.createdAt,
    },
    openGraph: {
        title: `${seo?.seo?.title}`,
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

const getSEOTag = async (username, id) => {
  const res   = await fetch(`${process.env.API_URL}/api/tags/${id}/seo-details`)
  const tag   = await res.json()

  let jsonLd    = null
  if (tag?.seo) {
      const { seo }     = tag
      const author      = tag?.users?.length > 0 ? tag?.users[0] : null
      jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: tag.tag,
          headline: seo?.title,
          image: [seo?.opengraph?.image],
          description: seo?.description,
          url: `${process.env.WEBAPP_URL}/u/${username}/tags/${id}/${tag?.slug || slugify(tag?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
          identifier: tag.id,
          author: {
              "@type": "Person",
              "name": author?.firstname && author?.lastname ? `${author?.firstname} ${author?.lastname}` : author?.username ? author?.username : username,
              "url": `${process.env.WEBAPP_URL}/u/${author?.username || username}`,
              "identifier": author?.id,
              "username": author?.username
          },
          creator: [
              author?.firstname && author?.lastname ? `${author?.firstname} ${author?.lastname}` : author?.username ? author?.username : username
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
          dateCreated: tag?.createdAt,
          datePublished: tag?.createdAt,
          dateModified: tag?.updatedAt,
          mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}/tags/${id}/${tag?.slug || slugify(tag?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
      }
  } 
  else {
    const author      = tag?.users?.length > 0 ? tag?.users[0] : null
    jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: tag.tag,
        headline: tag?.tag,
        image: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
        description: tag?.tag,
        url: `${process.env.WEBAPP_URL}/u/${username}/tags/${id}/${tag?.slug || slugify(tag?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
        identifier: tag.id,
        author: {
            "@type": "Person",
            "name": author?.firstname && author?.lastname ? `${author?.firstname} ${author?.lastname}` : author?.username ? author?.username : username,
            "url": `${process.env.WEBAPP_URL}/u/${author?.username || username}`,
            "identifier": author?.id,
            "username": author?.username
        },
        creator: [
            author?.firstname && author?.lastname ? `${author?.firstname} ${author?.lastname}` : author?.username ? author?.username : username
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
        dateCreated: tag?.createdAt,
        datePublished: tag?.createdAt,
        dateModified: tag?.updatedAt,
        mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}/tags/${id}/${tag?.slug || slugify(tag?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`
    }
  }

  return jsonLd
}

const getBk = async (tagId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
      return null;
    }
    
    return true;
}

const getTagPermissions = (data, idToFind, topLevelAccess=null, topLevelPermissions=null,topLevel=true) => {
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
      const result = getTagPermissions(item.folders, idToFind, nextTopLevelAccess, nextTopLevelPermissions,false);
      
      if (result) {
        return result;
      }
    }
  }
  
  return null;
};

const getSharedPermissions = async (tagId) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get('curateit-jwt')
    if(!cookie){
        return null;
    }
    
    try {
        const res = await fetch(`${process.env.API_URL}/api/share-with-me-tags`,{
        headers: {Authorization: `Bearer ${cookie.value}`},
        next: {
            revalidate: 0
        }
    })

    const data = await res.json()
    const value = getTagPermissions(data?.data || [],Number(tagId))

    return value
    } catch (error) {
        return null
    }
}

const TagsPage = async ({params,searchParams}) => {
  const jsonLd      = await getSEOTag(params.username.replaceAll("%40", ""),params.id)
  if ((searchParams && searchParams?.public && searchParams?.public === 'true') || (searchParams && searchParams?.embeded && searchParams?.embeded === 'true')) {
    redirect(jsonLd.url)
  }
  const permissions = await getSharedPermissions(params.id)
  const items       = await getBk(params.id)
  const cookieStore   = cookies()
  const cookie        = cookieStore.get('userId')
  const authorName = params.username.replaceAll("%40", "")
  if (!items || (!items && !permissions) || (items && !permissions && jsonLd?.author?.identifier !== parseInt(cookie?.value))) {
    return (
      <>
          {jsonLd && <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />}
          <TagShared />
      </>
    );
  }
    // const items =  await getBk(params.id)
    // const permissions =  await getSharedPermissions(params.id)
    if(!items){
      redirect('/403')
    }
    // const jsonLd = await getSEOTag(params.username.replaceAll("%40", ""),params.id)
    return(
        <>
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        <Tags
        id={params.id}
        // name={jsonLd.name}
        permissionsRes={permissions || null}
        authorName={authorName}
        />
        </>
    )
}
 
export default TagsPage;