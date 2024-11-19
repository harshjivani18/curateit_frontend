import * as ActionTypes from "./action-types";

export const getReferralUSers = () => ({
    type: ActionTypes.GET_REFERRAL_USERS,
    payload: {
        request: {
            url: `/api/referral-users`,
            method: "GET"
        }
    }
});

export const inviteViaEmail = (emails) => ({
    type: ActionTypes.INVITE_VIA_EMAIL,
    payload: {
        request: {
            url: `/api/invite-user`,
            method: "POST",
            data: {
                emails,
                platform: "email"
            }
        }
    }
});