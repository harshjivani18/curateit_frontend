export const findFollowCollection = (collectionId, followCollections, isChild=false) => {
    let isFollowedCollection = false
    let isChildCollection    = false
    let followCollection     = null

    for (const f of followCollections) {
        if (isFollowedCollection && followCollection) {
            break;
        }
        if (!isFollowedCollection && !followCollection && f.folders && f.folders.length !== 0) {
            const collectionRes  = findFollowCollection(collectionId, f.folders, true)
            isFollowedCollection = collectionRes.isFollowedCollection
            followCollection     = collectionRes.followCollection
            isChildCollection    = collectionRes.isChildCollection
        }
        if (!isFollowedCollection && !followCollection) {
            isFollowedCollection     = f.id === collectionId
            followCollection         = f.id === collectionId ? f : null
            isChildCollection        = isChild
        }
    }
    return { isFollowedCollection, followCollection, isChildCollection }
}

export const setIsFollowerCollectionToAll = (followerCollections) => {
    followerCollections.forEach((f) => {
        f.isFollowerCollection = true 
        if (f.folders.length !== 0) {
            f.folders = setIsFollowerCollectionToAll(f.folders)
        }
    })

    return followerCollections
}
