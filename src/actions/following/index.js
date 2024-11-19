import * as ActionTypes from './action-types';

export const followUser = (data) => ({
    type: ActionTypes.FOLLOW_USER,
    payload: {
        request: {
            url: `/api/following-users`,
            method: "post",
            data
        }
    }
});

export const unfollowUser = (data) => ({
    type: ActionTypes.UNFOLLOW_USER,
    payload: {
        request: {
            url: `/api/unfollowing-users`,
            method: "post",
            data
        }
    }
});