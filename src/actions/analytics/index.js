import session from '@utils/session';
import * as ActionTypes from './action-types';

export const authorizedUmami = () => ({
    type: ActionTypes.AUTHORIZED_UMAMI,
    payload: {
        client: 'analyticsClient',
        request: {
            url: `/api/auth/login`,
            method: "POST",
            data: {
                username: process.env.NEXT_PUBLIC_UMAMI_USERNAME,
                password: process.env.NEXT_PUBLIC_UMAMI_PASSWORD
            }
        }
    }
})

export const getWebsite = () => ({
    type: ActionTypes.GET_WEBSITE,
    payload: {
        client: 'analyticsClient',
        request: {
            url: `/api/websites/${process.env.NEXT_PUBLIC_WEBSITE_ID}`,
            method: "get"
        }
    }
})


export const getPageViews = (payload) => {
    return {
        type: ActionTypes.PAGE_VIEWS,
        payload: {
            client: 'analyticsClient',
            request: {
                // url: `/api/websites/${process.env.WEBSITE_ID}/pageviews?startAt=${payload?.startAt}&endAt=${payload?.endAt}&unit=${payload?.unit}&timezone=Asia%2FCalcutta&url=/u/${session.username}`,
                url: `/api/websites/${process.env.NEXT_PUBLIC_WEBSITE_ID}/pageviews?startAt=${payload?.startAt}&endAt=${payload?.endAt}&unit=${payload?.unit}&timezone=Asia%2FCalcutta&url=${payload?.url || `/u/${session.username}`}${payload?.referrer !== undefined ? `&referrer=${payload?.referrer}` : ""}${payload?.os !== undefined ? `&os=${payload?.os}` : ""}${payload?.browser !== undefined ? `&browser=${payload?.browser}` : ""}${payload?.device !== undefined ? `&device=${payload?.device}` : ""}${payload?.country !== undefined ? `&country=${payload?.country}` : ""}${payload?.region !== undefined ? `&region=${payload?.region}` : ""}${payload?.city !== undefined ? `&city=${payload?.city}` : ""}`,
                method: "get"
            }
        }
    }
}

export const getActiveUser = () => ({
    type: ActionTypes.ACTIVE_USER,
    payload: {
        client: 'analyticsClient',
        request: {
            url: `/api/websites/${process.env.NEXT_PUBLIC_WEBSITE_ID}/active`,
            method: "get"
        }
    }
})

export const getWebsiteStats = (payload) => {
    return {
        type: ActionTypes.GET_WEBSITE_STATS,
        payload: {
            client: 'analyticsClient',
            request: {
                // url: `/api/websites/${process.env.WEBSITE_ID}/stats?startAt=${payload?.startAt}&endAt=${payload?.endAt}&url=/u/${session.username}`,
                url: `/api/websites/${process.env.NEXT_PUBLIC_WEBSITE_ID}/stats?startAt=${payload?.startAt}&endAt=${payload?.endAt}&url=${payload?.url || `/u/${session.username}`}${payload?.referrer !== undefined ? `&referrer=${payload?.referrer}` : ""}${payload?.os !== undefined ? `&os=${payload?.os}` : ""}${payload?.browser !== undefined ? `&browser=${payload?.browser}` : ""}${payload?.device !== undefined ? `&device=${payload?.device}` : ""}${payload?.country !== undefined ? `&country=${payload?.country}` : ""}${payload?.region !== undefined ? `&region=${payload?.region}` : ""}${payload?.city !== undefined ? `&city=${payload?.city}` : ""}`,
                method: "get"
            }
        }
    }
}


export const getWebsiteMetrics = (payload) => {
    return {
        type: ActionTypes.GET_WEBSITE_METRICS,
        payload: {
            client: 'analyticsClient',
            request: {
                // url: `/api/websites/${process.env.WEBSITE_ID}/metrics?type=${payload?.type}&startAt=${payload?.startAt}&endAt=${payload?.endAt}&url=/u/${payload?.url || session.username}&referrer=${payload?.referrer || ""}&os=${payload?.os || ""}&browser=${payload?.browser || ""}&device=${payload?.device || ""}&country=${payload?.country || ""}&region=${payload?.region || ""}&city=${payload?.city || ""}`


                url: `/api/websites/${process.env.NEXT_PUBLIC_WEBSITE_ID}/metrics?type=${payload?.type}&startAt=${payload?.startAt}&endAt=${payload?.endAt}&url=${payload?.url || `/u/${session.username}`}${payload?.referrer !== undefined ? `&referrer=${payload?.referrer}` : ""}${payload?.os !== undefined ? `&os=${payload?.os}` : ""}${payload?.browser !== undefined ? `&browser=${payload?.browser}` : ""}${payload?.device !== undefined ? `&device=${payload?.device}` : ""}${payload?.country !== undefined ? `&country=${payload?.country}` : ""}${payload?.region !== undefined ? `&region=${payload?.region}` : ""}${payload?.city !== undefined ? `&city=${payload?.city}` : ""}`,
                method: "get"
            }
        }
    }
}