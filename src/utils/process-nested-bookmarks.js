import Folder           from "@components/collections/Folder";
import TagLevels        from "@components/tags/TagLevels";

export const renderFolder = (c, callbacks, sharedCollections) => {
    return (
        <Folder obj={c} 
            openCollection={callbacks.openCollection} 
            editCollection={callbacks.editCollection} 
            shareCollection={callbacks.shareCollection}
            sharedCollections={sharedCollections}
        />
    )
}

export const renderTagLevels = (c, callbacks,sharedCollections) => {
    return (
        <TagLevels obj={c}  openCollection={callbacks.openTag} editCollection={callbacks.editTag} sharedTags={sharedCollections}/>
    )
}

export const processNestedBookmarks = (collections, callbacks, sharedCollections=[]) => {
    const newArr        = []
    collections?.forEach((c, key) => {
        const k = `Folder-${c.id}`
        const o = {
            key: k,
            title: callbacks.openTag ? renderTagLevels(c, callbacks,sharedCollections) : renderFolder(c, callbacks, sharedCollections),
            children: [],
        }
        if (c?.isFollowerCollection && !c?.publicSubCollection) {
            o.children = []
        }
        else if (c?.folders?.length !== 0) {
            o.children = processNestedBookmarks(c.folders, callbacks,sharedCollections,)
        }
        newArr.push(o)
    })
    return newArr
}