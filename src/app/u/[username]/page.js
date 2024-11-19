import Profile          from "@containers/profile-page";

export async function generateMetadata({ params, searchParams }, parent) {
    const { username }  = params
    const uArr          = username.split("@")
    const usernameParam = uArr.length > 0 ? uArr[uArr.length - 1] : username
    const uStr          = usernameParam.replaceAll("%40", "")

    const res   = await fetch(`${process.env.API_URL}/api/users/seo-details?username=${uStr}`)
    const data  = await res.json()
    
    const { seo } = data
    if (!seo) {
        return {
            title: "Profile | Curateit",
            robots: {
                index: true,
                follow: true,
                nocache: true,
            },
        }
    }

    const profileImg  = data?.profilePhoto || `${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`
    const defaultURL  = `${process.env.WEBAPP_URL}/u/${uStr}`
    const canURL      = seo?.seo?.canonical
    // const uName      = data?.userDetails?.firstname && data?.userDetails?.lastname ? `${data?.userDetails?.firstname} ${data?.userDetails?.lastname} | Curateit` : seo?.title
    const obj        = {
        title: seo?.seo?.title.includes("| Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
        description: seo?.seo?.description,
        keywords: seo?.seo?.keywords,
        authors: [{
            name: data?.firstname && data?.lastname ? `${data?.firstname} ${data?.lastname}` : data?.username,
            url: defaultURL,
        }],
        creator: data?.firstname && data?.lastname ? `${data?.firstname} ${data?.lastname}` : data?.username,
        publisher: "Curateit",
        openGraph: {
            title: seo?.seo?.title.includes("| Curateit") ? seo?.seo?.title : `${seo?.seo?.title} | Curateit`,
            description: seo?.seo?.description,
            type: "profile",
            url: defaultURL,
            siteName: "Curateit",
            images: [seo?.opengraph?.image?.includes("example.com") ? profileImg : seo?.opengraph?.image],
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

const getProfile = async (username) => {
    const res       = await fetch(`${process.env.API_URL}/api/users/seo-details?username=${username}`)
    const profile   = await res.json()

    let jsonLd    = null
    if (profile?.seo) {
        const profileImg  = profile?.profilePhoto || `${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`
        jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: profile.firstname && profile.lastname ? `${profile.firstname} ${profile.lastname}` : profile.username,
            headline: profile.seo.seo?.title,
            image: [profile.seo.opengraph?.image?.includes("example.com") ? profileImg : profile?.seo?.opengraph?.image],
            description: profile.seo.seo?.description,
            url: `${process.env.WEBAPP_URL}/u/${username}`,
            identifier: profile.id,
            author: {
                "@type": "Person",
                "name": profile.firstname && profile.lastname ? `${profile.firstname} ${profile.lastname}` : profile.username,
                "url": `${process.env.WEBAPP_URL}/u/${profile.username}`,
            },
            creator: [
                profile.firstname && profile.lastname ? `${profile.firstname} ${profile.lastname}` : profile.username
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
            mainEntityOfPage: `${process.env.WEBAPP_URL}/u/${username}`
        }
    } 

    return jsonLd
}

const ProfilePage = async ({ params }) => {
    const uStr    = params.username.replaceAll("%40", "")
    const jsonLd  = await getProfile(uStr)

    return (<>
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        <Profile />
    </>);
}

export default ProfilePage;