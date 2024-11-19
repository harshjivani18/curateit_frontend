"use client"
import session from '@utils/session';
import * as ActionTypes from './action-types';

export const getLeaderBoard = (page,country) => (
    {
    type: ActionTypes.GET_LEADERBOARD,
    payload: {
        request: {
            url: country ? `/api/leaderboard-widget?country=${country}&perPage=100&page=${page}`: `/api/leaderboard-widget?perPage=100&page=${page}`,
            method: "get"
        }
    },
    meta: {
        page
    }
});

export const getActivityLogs = (page) => (
    {
    type: ActionTypes.GET_ACTIVITY_LOGS,
    payload: {
        client: 'commentClient',
        request: {
            url: `/api/activitylogs/all/${session.userId}?perPage=100&page=${page}`,
            method: "get"
        }
    }
});