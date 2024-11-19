
// import TagLevels from "@components/tags/TagLevels";
import FolderPublic from "./FolderPublic";
import TagLevelsPublic from "./TagsLevelPublic";

export const renderFolder = (c, callbacks, sharedCollections) => {
    return (
        <FolderPublic obj={c} 
            openCollection={callbacks.openCollection} 
            // editCollection={callbacks.editCollection} 
            // shareCollection={callbacks.shareCollection}
            // sharedCollections={sharedCollections}
        />
    )
}

export const renderTagLevels = (c, callbacks) => {
    return (
        <TagLevelsPublic obj={c}  openCollection={callbacks.openTag} />
    )
}

export const processNestedBookmarksPublic = (collections, callbacks, isTags) => {
    const newArr        = []
    collections?.forEach((c, key) => {
        const k = `Folder-${c.id}`
        const o = {
            key: k,
            title: isTags ? renderTagLevels(c, callbacks) : renderFolder(c, callbacks),
            children: [],
        }
        if (c?.folders?.length !== 0) {
            o.children = processNestedBookmarksPublic(c.folders, callbacks, isTags)
        }
        newArr.push(o)
    })
    return newArr
}