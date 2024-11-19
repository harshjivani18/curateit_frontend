import session from "./session"

export const activitylogStr = (item) => {

    const username = item?.author?.username || session.username
    const action = item?.action
    const count = item?.count || ''
    let actionType

    if (item?.module === "Gem" && item?.gems_info?.length > 1) actionType = item?.actionType
    else if (item?.module === "Gem" && item?.gems_info?.length === 1) actionType = item?.gems_info[0]?.name
    else if (item?.module === "Collection" && item?.collection_info?.name) actionType = item?.collection_info?.name
    else actionType = item?.actionType

    let module
    if (item?.module === "Gem") {
        module = item?.collection_info?.name ? `in ${item?.collection_info?.name}` : "in Collection"
    } else {
        module = ''
    }

    return `${username} ${action} ${count} ${actionType} ${module}`
}