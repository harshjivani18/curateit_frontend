const axios = require("axios")
const moment = require("moment")
const slugify = require("slugify")

const { SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASSWORD,
        SUPER_ADMIN_USERNAME,
        SUPER_ADMIN_FIRST_NAME,
        SUPER_ADMIN_LAST_NAME,
        SITEMAP_LIMITS
        }   = process.env;

const API_URL  = process.env.API_URL || 'http://localhost:3000'
const BASE_URL = process.env.WEBAPP_URL || 'http://localhost:3000'

const fetchLoginInformation = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/api/auth/local`, {
            identifier: SUPER_ADMIN_EMAIL,
            password: SUPER_ADMIN_PASSWORD
        }, {
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json"
            },
        })
        .then(data => {
            resolve(data?.data);
        })
        .catch((err) => {
            axios.post(`${API_URL}/api/auth/local/register`, {
                username: SUPER_ADMIN_USERNAME,
                email: SUPER_ADMIN_EMAIL,
                password: SUPER_ADMIN_PASSWORD,
                firstname: SUPER_ADMIN_FIRST_NAME,
                lastname: SUPER_ADMIN_LAST_NAME
            }).then((res) => {
                resolve(res?.data);
            }).catch((err) => {
                resolve(err);
            })
        })
    });  
}

const getPriority = (updatedAt) => {
    const now = moment()
    const lastUpdate = moment(updatedAt)
    const diff = now.diff(lastUpdate, 'days')
    if (diff > 30) {
        return 0.1
    } else if (diff > 7) {
        return 0.3
    } else if (diff > 1) {
        return 0.5
    } else {
        return 0.7
    }
}

const getChangeFreq = (updatedAt) => {
    const now = moment()
    const lastUpdate = moment(updatedAt)
    const diff = now.diff(lastUpdate, 'days')
    if (diff > 30) {
        return 'monthly'
    } else if (diff > 7) {
        return 'weekly'
    } else if (diff > 1) {
        return 'daily'
    } else {
        return 'hourly'
    }
}

async function getCollections(jwt){
    let collectionPage      = 1
    let isCollectionFetched = false
    const collectionArr     = []
    while (!isCollectionFetched) {
        const collections = await axios.get(`${API_URL}/api/get-all-public-collections?page=${collectionPage}&perPage=40`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (collections?.data?.data?.length === 0) {
            isCollectionFetched = true
        } else {
            collectionArr.push(...collections?.data?.data)
            collectionPage++
        }
    }

    return collectionArr
}

async function getGems(jwt){
    let gemPage      = 1
    let isGemFetched = false
    const gemArr     = []
    while (!isGemFetched) {
        const gems = await axios.get(`${API_URL}/api/get-all-public-gems?page=${gemPage}&perPage=40`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (gems?.data?.data?.length === 0) {
            isGemFetched = true
        } else {
            gemArr.push(...gems?.data?.data)
            gemPage++
        }
    }

    return gemArr
}

async function getTags(jwt){
    let tagPage      = 1;
    let isTagFetched = false
    const tagArr     = []
    while (!isTagFetched) {
        const tags = await axios.get(`${API_URL}/api/get-all-public-tags?page=${tagPage}&perPage=40`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (tags?.data?.data?.length === 0) {
            isTagFetched = true
        } else {
            tagArr.push(...tags?.data?.data)
            tagPage++
        }
    }

    return tagArr
}

async function getUsers(jwt){
    let userPage      = 1
    let isUserFetched = false
    const userArr     = []
    while (!isUserFetched) {
        const users = await axios.get(`${API_URL}/api/get-all-public-users?page=${userPage}&perPage=40`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (users?.data?.data?.length === 0) {
            isUserFetched = true
        } else {
            userArr.push(...users?.data?.data)
            userPage++
        }
    }

    return userArr
}

async function getPaths() {
    if (process.env.NEXT_PUBLIC_ENV === 'local') return [];
    const { jwt }   = await fetchLoginInformation();

    const newURLs = []

    const collectionsData = await getCollections(jwt)

    const gemsData = await getGems(jwt)

    const tagsData = await getTags(jwt)

    const usersData = await getUsers(jwt)

    collectionsData?.forEach((collection) => {
        const priorityRatio = getPriority(collection?.updatedAt)
        const freq          = getChangeFreq(collection?.updatedAt)
        newURLs.push({
            loc: `${BASE_URL}/u/${collection?.author?.username?.replaceAll(" ", "+")}/c/${collection?.id}/${slugify(collection?.slug || collection?.name, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g  })}`,
            priority: priorityRatio,
            lastmod: moment(collection.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
            changefreq: freq
        })
    })

    gemsData?.forEach((gem) => {
        const priorityRatio = getPriority(gem?.updatedAt)
        const freq          = getChangeFreq(gem?.updatedAt)
        if (gem?.media_type === "Blog" && gem?.media?.blogId) {
            const blogSlug = `${gem?.slug || (gem?.title ? slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }) : "default")}?bid=${gem?.media?.blogId}`
            let url        = `${BASE_URL}/u/${gem?.author?.username}/${blogSlug}`
            if (gem?.author?.isInternalUser === true) {
                url          = `${BASE_URL}/blog/${blogSlug}`
            }
            newURLs.push({
                loc: url,
                priority: priorityRatio,
                lastmod: moment(gem.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
                changefreq: freq
            })
        }
        newURLs.push({
            loc: `${BASE_URL}/u/${gem?.author?.username?.replaceAll(" ", "+")}/g/${gem?.id}/${gem?.slug || slugify(gem?.title, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g  })}`,
            priority: priorityRatio,
            lastmod: moment(gem.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
            changefreq: freq
        })
    })

    tagsData?.forEach((tag) => {
        tag?.users?.forEach((user) => {
            const priorityRatio = getPriority(tag?.updatedAt)
            const freq          = getChangeFreq(tag?.updatedAt)
            newURLs.push({
                loc: `${BASE_URL}/u/${user?.username?.replaceAll(" ", "+")}/tags/${tag?.id}/${tag?.slug || slugify(tag?.tag, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g  })}`,
                priority: priorityRatio,
                lastmod: moment(tag?.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
                changefreq: freq
            })
        })
    })

    usersData?.forEach((user) => {
        const priorityRatio = getPriority(user?.updatedAt)
        const freq          = getChangeFreq(user?.updatedAt)
        newURLs.push({
            loc: `${BASE_URL}/u/${user.username.replaceAll(" ", "+")}`,
            priority: priorityRatio,
            lastmod: moment(user.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
            changefreq: freq
        })
    })

    const fields  = [ ...newURLs ]
    return fields;
}

module.exports = {
  siteUrl: BASE_URL,
  sitemapSize: Number(SITEMAP_LIMITS),
  exclude: [
    "/403",
    "/404",
    "/check-user-tags/public",
    "/check-user/public",
    "/check-user/un-register",
    "/check-user/link",
    "/check-user/register",
    "/check-user-tags/link",
    "/check-user-tags/register",
    "/check-user-tags/un-register",
    "/extension-onboarding",
    "/forgot-password-success",
    "/reset-password",
    "/instawall",
    "/pinterestmiddleware",
    "/verify",
    "/email-verified",
    "/onboarding",
  ],
  additionalPaths: async (config) => await getPaths(),
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/403",
          "/404",
          "/check-user-tags/public",
          "/check-user/public",
          "/check-user/un-register",
          "/check-user/link",
          "/check-user/register",
          "/check-user-tags/link",
          "/check-user-tags/register",
          "/check-user-tags/un-register",
          "/extension-onboarding",
          "/forgot-password-success",
          "/instawall",
          "/pinterestmiddleware",
          "/verify",
          "/email-verified",
          "/onboarding",
        ],
      },
      { userAgent: "*", allow: "/" },
    ],
  },
};