import * as ActionTypes from "./action-types";

export const syncRaindropCollections = (data) => ({
    type: ActionTypes.SYNC_RAINDROP_DATA,
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

export const syncRaindropHighlights = (data) => ({
    type: ActionTypes.SYNC_RAINDROP_HIGHLIGHTS,
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
})

export const getRaindropAccessToken = (code) => ({
    type: ActionTypes.GET_RAINDROP_ACCESS_TOKEN,
    payload: {
        request: {
            url: `/api/raindrop/get-raindrop-access-token?code=${code}`,
            method: "get"
        }
    }
})

export const uploadRaindropHighlights = (data, token) => ({
    type: ActionTypes.UPLOAD_RAINDROP_HIGHLIGHTS,
    payload: {
        request: {
            url: `/api/import/raindrop-highlights`,
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            data
        }
    }
})