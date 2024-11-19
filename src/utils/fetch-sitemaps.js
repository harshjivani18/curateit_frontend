import axios                        from "axios";
import moment                       from "moment";
import slugify                      from "slugify";
import { fetchLoginInformation }    from "@utils/fetch-super-admin-cred"

const API_URL  = process.env.API_URL || 'http://localhost:3000'
const BASE_URL = process.env.WEBAPP_URL || 'http://localhost:3000'
const LIMIT    = process.env.SITEMAP_LIMITS || 50000

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

export const getSitemaps = async () => {
    const { jwt }   = await fetchLoginInformation();

    const usersArr  = [];
    const gemsArr   = [];
    const tagsArr   = [];
    const collsArr  = [];

    let isUserFetching  = true
    let uCount          = 0
    while (isUserFetching) {
        const users = await axios.get(`${API_URL}/api/get-all-public-users?page=${uCount}&perPage=${LIMIT}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (users?.data?.data?.length === 0) {
            isUserFetching = false
        }

        usersArr.push(...users?.data?.data)
        uCount++
    }

    let isGemFetching   = true
    let gCount          = 0
    while (isGemFetching) {
        const gems = await axios.get(`${API_URL}/api/get-all-public-gems?page=${gCount}&perPage=${LIMIT}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (gems?.data?.data?.length === 0) {
            isGemFetching = false
        }

        gemsArr.push(...gems?.data?.data)
        gCount++
    }

    let isCollectionFetching   = true
    let cCount                  = 0
    while (isCollectionFetching) {
        const collections = await axios.get(`${API_URL}/api/get-all-public-collections?page=${cCount}&perPage=${LIMIT}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (collections?.data?.data?.length === 0) {
            isCollectionFetching = false
        }

        collsArr.push(...collections?.data?.data)
        cCount++
    }

    let isTagFetching   = true
    let tCount          = 0
    while (isTagFetching) {
        const tags = await axios.get(`${API_URL}/api/get-all-public-tags?page=${tCount}&perPage=${LIMIT}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (tags?.data?.data?.length === 0) {
            isTagFetching = false
        }

        tagsArr.push(...tags?.data?.data)
        tCount++
    }

    const newURLs = []
    usersArr.forEach((user) => {
        const priorityRatio = getPriority(user?.updatedAt)
        const freq          = getChangeFreq(user?.updatedAt)
        newURLs.push({
            loc: `${BASE_URL}/u/${user.username.replaceAll(" ", "+")}`,
            priority: priorityRatio,
            lastmod: moment(user.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
            changefreq: freq,
            isPublic: user?.isPublic || false
        })
    })

    collsArr.forEach((collection) => {
        const priorityRatio = getPriority(collection?.updatedAt)
        const freq          = getChangeFreq(collection?.updatedAt)
        newURLs.push({
            loc: `${BASE_URL}/u/${collection?.author?.username?.replaceAll(" ", "+")}/c/${collection?.id}/${collection?.slug || slugify(collection?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
            priority: priorityRatio,
            lastmod: moment(collection.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
            changefreq: freq,
            isPublic: (collection?.sharable_links !== null && collection?.sharable_links !== "") || false
        })
    })

    gemsArr.forEach((gem) => {
        const priorityRatio = getPriority(gem?.updatedAt)
        const freq          = getChangeFreq(gem?.updatedAt)
        newURLs.push({
            loc: `${BASE_URL}/u/${gem?.author?.username?.replaceAll(" ", "+")}/g/${gem?.id}/${gem?.slug || slugify(gem?.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
            priority: priorityRatio,
            lastmod: moment(gem.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
            changefreq: freq,
            isPublic: (gem?.collection_gems?.sharable_links !== null && gem?.collection_gems?.sharable_links !== "") || false
        })
    })

    tagsArr.forEach((tag) => {
        tag.users.forEach((user) => {
            const priorityRatio = getPriority(tag?.updatedAt)
            const freq          = getChangeFreq(tag?.updatedAt)
            newURLs.push({
                loc: `${BASE_URL}/u/${user?.username?.replaceAll(" ", "+")}/tags/${tag?.id}/${tag?.slug || slugify(tag?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g })}`,
                priority: priorityRatio,
                lastmod: moment(tag?.updatedAt)?.format("YYYY-MM-DD") || moment().format('YYYY-MM-DD'),
                changefreq: freq,
                isPublic: tag?.isPublicLink || false
            })
        })
    })

    return [ ...newURLs ];
}

