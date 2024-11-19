import * as ActionTypes from './action-types';

// export const getAuthorizationToken = () => (
//     {
//         type: ActionTypes.GET_AUTHORAIZATION_TOKEN,
//         payload: {
//             client: "analyticsClient",
//             request: {
//                 url: `/api/auth/login`,
//                 method: "post",
//                 data: {
//                     username: process.env.UMAMI_USERNAME,
//                     password: process.env.UMAMI_PASSWORD,
//                 }
//             }
//         }
//     });


// export const getWebsiteDetails = (payload) => (
//     {
//         type: ActionTypes.GET_WEBSITE_DETAILS,
//         payload: {
//             client: "analyticsClient",
//             request: {
//                 url: `/api/websites/${process.env.WEBSITE_ID}`,
//                 method: "get"
//             }
//         }
//     });





export const setLocale = (payload) => {
    return (
        {
            type: ActionTypes.SET_LOCALE,
            payload: payload
        })
};


export const setShareToken = (payload) => {
    return (
        {
            type: ActionTypes.SET_SHARE_TOKEN,
            payload: payload
        })
};

export const setDashboardUser = (payload) => {
    return (
        {
            type: ActionTypes.SET_DASHBOARD_USER,
            payload: payload
        })
};

export const setDashboardConfig = (payload) => {
    return (
        {
            type: ActionTypes.SET_DASHBOARD_CONFIG,
            payload: payload
        })
};

export const setDateRange = (payload) => {
    return (
        {
            type: ActionTypes.SET_DATE_RANGE,
            payload: payload
        })
};