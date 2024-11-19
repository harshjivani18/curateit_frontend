import * as ActionTypes from "./action-types";


export const importPocketData = (data) => ({
    type: ActionTypes.GET_POCKET_DATA,
    payload: {
        request: {
            url: `/api/get-pocket-access-token`,
            method: "POST",
            headers: { "Authorization": `Bearer ${data.token}` },
            data:{
                "requestCode": data.requestCode
            }
        }
    }
});

export const syncPocketData = (data) => ({
    type: ActionTypes.SYNC_POCKET_DATA,
    payload: {
        request: {
            url: `/api/pocket-data-save`,
            method: "POST",
            headers: { "Authorization": `Bearer ${data.token}` },
            data:{
                "pocketData": data.pocketData
            }
        }
    }
});