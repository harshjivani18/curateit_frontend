"use client"
import store from "@store/index"
import session from "./session"

export const addNewOrUpdateGemInCollection = (collections, gem, parent, action) => {
    collections.forEach((c, index) => {
        if (c.id === parent.id) {
            if (action === "add") {
                collections[index].bookmarks = [
                    ...collections[index].bookmarks,
                    gem
                ]
                // collections[index].gems = [
                //     ...collections[index].gems,
                //     gem
                // ]
            }
            else {
                const bidx = collections[index].bookmarks.findIndex((b) => { return b.id === gem.id })
                // const gidx = collections[index].gems.findIndex((g) => { return g.id === gem.id })
                if (bidx !== -1) {
                    collections[index].bookmarks[bidx] = { ...gem }
                }
                // if (gidx !== -1) {
                //     collections[index].gems[gidx] = { ...gem }
                // }
            }
            // collections[index].gems       = [ ...collections[index].gems ]
            collections[index].bookmarks  = [ ...collections[index].bookmarks ]
            collections = [ ...collections ]
            return collections
        }
        else if (c.folders.length !== 0) {
            addNewOrUpdateGemInCollection(c.folders, gem, parent, action)
        }        
    })
    return collections
}

export const updateAndGetNewCollection = (collections, id, newValue=null) => {
    if (newValue !== null) {
        collections.forEach((c, index) => {
            if (c.id === id) {
                collections[index] = {
                    ...collections[index],
                    name: newValue
                }
                collections = [ ...collections ]
            }
            else if (c.folders.length !== 0) {
                updateAndGetNewCollection(c.folders, id, newValue)
            }
        })
    }
    else {
        collections.forEach((c, index) => {
            if (c.id === id) {
                collections.splice(index, 1)
                collections = [ ...collections ]
            }
            else if (c.folders.length !== 0){
                updateAndGetNewCollection(c.folders, id, null)
            }
        })
    }

    return collections
}

export const removeGemFromCollections = (collections, gemId, collectionId) => {
    collections.forEach((c, index) => {
        if (c.id === Number(collectionId)) {
            const idx = c.bookmarks.findIndex((f) => { return f.id === Number(gemId)})
            if (idx !== -1) {
                collections[index].bookmarks.splice(idx, 1)
                collections[index].bookmarks = [ ...collections[index].bookmarks ]
                collections = [ ...collections ]
            }
            return collections
        }
        else if (c.folders.length !== 0) {
            removeGemFromCollections(c.folders, gemId, collectionId)
        }
    })

    return collections
}

const removeGemOrCollection = (collections, dragObj, dropObj, isRemoved) => {
    collections.forEach((c, index) => {
        // consider as folder
        if (dragObj.collection && dragObj.collection.id === c.id) {
            const idx = c.folders.findIndex((f) => { return f.id === dragObj.id })
            if (idx !== -1) {
                collections[index].folders.splice(idx, 1)
                collections[index].folders = [ ...collections[index].folders ]
                collections = [ ...collections ]
                isRemoved   = true
            } 
        }
        else if (dragObj.collection === null && dragObj.media === undefined && dragObj.id === c.id) {
            collections.splice(index, 1)
            collections = [ ...collections ]
            isRemoved   = true
        }
        // consider as bookmark
        else if (dragObj.collection === undefined && dragObj.media) {
            collections[index].gems_count = (collections[index].gems_count > 0) ? collections[index].gems_count - 1 : 0;
                collections = [ ...collections ]
                isRemoved   = true
        }

        if (isRemoved === false && c.folders.length !== 0) {
            removeGemOrCollection(c.folders, dragObj, dropObj, isRemoved)
        }
    })
    return collections
}

const addGemOrCollection = (collections, dragObj, dropObj, isAdded) => {
    collections.forEach((c, index) => {
        if (dropObj.id === c.id) {
            if (dragObj.folders !== undefined) {
                collections[index].folders = [
                    ...collections[index].folders,
                    dragObj
                ]
            }
            else {
                collections[index].gems_count = collections[index].gems_count + 1
            }
            collections = [ ...collections ]
            isAdded     = true
        }

        if (isAdded === false && c.folders.length !== 0) {
            addGemOrCollection(c.folders, dragObj, dropObj, isAdded)
        }
    })
    return collections
}

export const manageMove = (collections, dragObj, dropObj) => {
    const finalDragObj        = (dragObj?.folders !== undefined) ? { ...dragObj, collection: { ...dropObj }, is_sub_collection: true } : { ...dragObj }
    const filteredCollections = removeGemOrCollection(collections, dragObj, dropObj, false)
    if (dropObj === null) {
        return [ ...filteredCollections, { ...dragObj, collection: null, is_sub_collection: false } ]
    }
    return addGemOrCollection(filteredCollections, finalDragObj, dropObj, false)
}

export const addMultipleGems = (collections, gems, parent) => {
    collections.forEach((c, index) => {
        if (c.id === parent.id) {
            collections[index].bookmarks = [
                ...collections[index].bookmarks,
                ...gems
            ]
                
            collections[index].bookmarks  = [ ...collections[index].bookmarks ]
            collections = [ ...collections ]
            return collections
        }
        else if (c.folders.length !== 0) {
            addMultipleGems(c.folders, gems, parent)
        }        
    })
    return collections
}

export const getAllCollectionWithSub = (collectionData, arr=[]) => {
    collectionData?.forEach((c) => {
        if (c?.folders?.length !== 0) {
            getAllCollectionWithSub(c.folders, arr)
        }
        c?.folders?.forEach((f) => {
            arr.push(f)
        })
        if (!c?.collection) {
            arr.push(c)
        }
    })
    return arr
}

export const updateMediaInBookmark = (collections, gemId, mediaObj) => {
    collections.forEach((c, index) => {
        if (c.bookmarks.length !== 0) {
            const bIdx = c.bookmarks.findIndex((b) => { return b.id === parseInt(gemId) })
            if (bIdx !== -1) {
                collections[index].bookmarks[bIdx] = {
                    ...collections[index].bookmarks[bIdx],
                    media: {
                        ...collections[index].bookmarks[bIdx].media,
                        ...mediaObj
                    }
                }
                collections[index].bookmarks = [ ...collections[index].bookmarks ]
                collections = [ ...collections ]
                return collections
            }
        }
        if (c.folders.length !== 0) {
            updateMediaInBookmark(c.folders, gemId, mediaObj)
        }
    })
    return collections
}

export const checkBookmarkExists = (collections, url) => {
  let isExist = false;
  collections.forEach((c) => {
    if (Number(c.id) === Number(session.unfiltered_collection_id)) {
      collections["folders"] = [];
    }
    if (c.bookmarks && c.bookmarks.length !== 0) {
      c.bookmarks.forEach((b) => {
        if (b.url === url && b.media_type === "Link") {
          isExist = true;
        }
      });
    }
    if (c.folders?.length && !isExist) {
      isExist = checkBookmarkExists(c.folders, url);
    }
  });
  return isExist;
};

export const checkCollectionExists = (collections,query) => {
    let isExist = false
    collections.forEach((c) => {
        if(c.name === query){
            isExist = true
        }
    })
    return isExist
}

export const getCollectionById = (collections, collectionId) => {
    let collection = null
    collections.forEach((c) => {
        if (c.id === collectionId) {
            collection = c
        }
        else if (c.folders.length !== 0 && collection === null) {
           collection = getCollectionById(c.folders, collectionId)
        }
    })
    return collection
}

export const getCollectionByName = (collections, query) => {
    let collection = null
    collections.forEach((c) => {
        if (c.name === query) {
            collection = c
        } else if (c.folders.length !== 0 && collection === null) {
            collection = getCollectionByName(c.folders, query)
        }
    })
    return collection
}

export const modifyCollection = (collections, id, data) => {
    collections.forEach((c, index) => {
            if (c.id === Number(id)) {
                collections[index] = {
                    ...collections[index],
                    ...data
                }
                collections = [ ...collections ]
            }
            else if (c.folders.length !== 0) {
                modifyCollection(c.folders, id, data)
            }
    })
    return collections
}

export const getTagByTagId = (tags, tagId) => {
    let result = null
    tags?.forEach((c) => {
        if (c.id === tagId) {
            result = c
        }
        else if (c?.folders?.length !== 0 && result === null) {
           result = getTagByTagId(c.folders, tagId)
        }
    })
    return result
}

export const modifyTag = (tags, id, data) => {
    tags.forEach((c, index) => {
            if (c.id === id) {
                tags[index] = {
                    ...tags[index],
                    ...data
                }
                tags = [ ...tags ]
            }
            else if (c.folders.length !== 0) {
                modifyTag(c.folders, id, data)
            }
    })
    return tags
}

export const updateBookmarkInNestedData = (data, id, newData) => {
    return data.map(item => {
      if (item.bookmarks.length > 0) {
        item.bookmarks = item.bookmarks.map(bookmark => {
          if (bookmark.id === id) {
            return { ...bookmark, ...newData };
          }
          return bookmark;
        });
      }
  
      if (item.folders.length > 0) {
        item.folders = updateBookmarkInNestedData(item.folders, id, newData);
      }
  
      return item;
    });
};

export const manageMoveTag = (tags, dragObj, dropObj) => {
    const finalDragObj        = (dragObj?.folders !== undefined) ? { ...dragObj, parent_tag
: { ...dropObj }, is_sub_tag: true, collection: { ...dropObj }} : { ...dragObj }
    const filteredCollections = removeGemOrCollectionTag(tags, dragObj, dropObj, false)
    if (dropObj === null) {
        return [ ...filteredCollections, { ...dragObj, parent_tag: null, is_sub_tag: false,collection:null } ]
    }
    return addGemOrCollectionTag(filteredCollections, finalDragObj, dropObj, false)
}

const removeGemOrCollectionTag = (collections, dragObj, dropObj, isRemoved) => {
    collections.forEach((c, index) => {
        if (dragObj?.collection && dragObj?.collection?.id === c.id) {
            const idx = c.folders.findIndex((f) => { return f.id === dragObj.id })
            if (idx !== -1) {
                collections[index].folders.splice(idx, 1)
                collections[index].folders = [ ...collections[index].folders ]
                collections = [ ...collections ]
                isRemoved   = true
            } 
        }
        else if (dragObj?.collection === null && dragObj?.media === undefined && dragObj?.id === c.id) {
            collections.splice(index, 1)
            collections = [ ...collections ]
            isRemoved   = true
        }
        // consider as bookmark
        else if (dragObj?.collection === undefined && dragObj?.media) {
            const dIdx = c?.bookmarks?.findIndex((b) => { return b?.id === dragObj?.id })
            if (dIdx !== -1) {
                collections[index].bookmarks.splice(dIdx, 1)
                collections[index].bookmarks = [ ...collections[index].bookmarks ]
                collections = [ ...collections ]
                isRemoved   = true
            }
        }

        if (isRemoved === false && c?.folders?.length !== 0) {
            removeGemOrCollectionTag(c?.folders, dragObj, dropObj, isRemoved)
        }
    })
    return collections
}

const addGemOrCollectionTag = (collections, dragObj, dropObj, isAdded) => {
    collections.forEach((c, index) => {
        if (dropObj?.id === c.id) {
            if (dragObj?.folders !== undefined) {
                collections[index].folders = [
                    ...collections[index].folders,
                    dragObj
                ]
            }
            else {
                collections[index].bookmarks = [
                    ...collections[index].bookmarks,
                    dragObj
                ]
                // collections[index].gems = [
                //     ...collections[index].gems,
                //     dragObj
                // ]
            }
            collections = [ ...collections ]
            isAdded     = true
        }

        if (isAdded === false && c?.folders.length !== 0) {
            addGemOrCollectionTag(c?.folders, dragObj, dropObj, isAdded)
        }
    })
    return collections
}

export const updateAndGetNewTagData = (collections, id, newValue=null) => {
    if (newValue !== null) {
        collections.forEach((c, index) => {
            if (c.id === id) {
                collections[index] = {
                    ...collections[index],
                    name: newValue
                }
                collections = [ ...collections ]
            }
            else if (c.folders.length !== 0) {
                updateAndGetNewTagData(c.folders, id, newValue)
            }
        })
    }
    else {
        collections.forEach((c, index) => {
            if (c.id === id) {
                collections.splice(index, 1)
                collections = [ ...collections ]
            }
            else if (c.folders.length !== 0){
                updateAndGetNewTagData(c.folders, id, null)
            }
        })
    }

    return collections
}

export const updateAddGemAllTag = (inputArr, tagIdsToUpdate, gemId, newGemObj) => {
    let data = JSON.parse(JSON.stringify(inputArr));
  let gemFound = false;
  
  const helper = (arr, tagIds) => {
    for (let i = 0; i < arr.length; i++) {
      const bookmarks = arr[i].bookmarks;
      for (let j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].id === gemId) {
          // If the tag's id is in the tagIdsToUpdate, update the gem.
          if (tagIds.includes(arr[i].id)) {
            bookmarks[j] = newGemObj;
            gemFound = true;
          } 
          // If the tag's id is not in the tagIdsToUpdate, remove the gem from this tag.
          else {
            bookmarks.splice(j, 1);
            j--; // Decrease the counter to adjust the index after splicing.
            gemFound = true;
          }
        }
      }

      // If the tag's id is in the tagIdsToUpdate and the gem was not found in the bookmarks, add the new gem.
      if (tagIds.includes(arr[i].id) && !bookmarks.some(bookmark => bookmark.id === gemId)) {
        bookmarks.push(newGemObj);
        gemFound = true;
      }

      if (arr[i].folders && arr[i].folders.length > 0) {
        arr[i].folders = helper(arr[i].folders, tagIds);
      }
    }
    return arr;
  }
  const newArray = helper(data, tagIdsToUpdate);
  
  if (!gemFound) {
    console.log(`No gem found with the id: ${gemId}`);
  }
  
  return newArray;
};

export const removeGemFromTagState = (inputArr, gemId) => {
  let arr = JSON.parse(JSON.stringify(inputArr));

  let gemFound = false;
  
  const helper = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const bookmarks = arr[i].bookmarks;
      for (let j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].id === gemId) {
          bookmarks.splice(j, 1);
          gemFound = true;
          // After deleting a gem, decrease j to shift the bookmarks index back by one
          j--;
        }
      }
      if (arr[i].folders && arr[i].folders.length > 0) {
        arr[i].folders = helper(arr[i].folders);
      }
    }
    return arr;
  }

  const newArray = helper(arr);

  if (!gemFound) {
    console.log(`No gem found with the id: ${gemId}`)
  }

  return newArray;
};

export function updateBulkBookmarks(collection, updatedData, isTopLevel = true) {
  for (let folder of collection) {
    if (folder?.bookmarks?.length) {
      folder.bookmarks = folder.bookmarks.filter(bm => {
        const update = updatedData.find(u => u.id === bm.id);
        if (update) {
          if (update.collection_gems !== folder.id) {
            const parentFolder = collection.find(c => c.id === update.collection_gems);
            if (parentFolder) {
              parentFolder.bookmarks.push({ ...bm, ...update });
            }
            return false;
          }
          Object.assign(bm, update);
        }
        return true;
      });
    }
    if (folder.folders.length) {
      updateBulkBookmarks(folder.folders, updatedData, false);
    }
  }

  if (isTopLevel) {
    return collection;
  }
}


export function deleteBulkBookmarks(collection, idsToDelete) {

    function recursiveDelete(folders) {
        for (let folder of folders) {
            if (folder?.bookmarks?.length) {
                folder.bookmarks = folder.bookmarks.filter(bookmark => !idsToDelete.includes(bookmark.id));
            }
            if (folder?.folders?.length) {
                recursiveDelete(folder.folders);
            }
        }
    }

    recursiveDelete(collection);

    return collection;
}

export const countReplies = (replies) => {
    let replyCount = replies.length;
    replies.map(comment => {
        if (comment.replies){
            replyCount += comment.replies.length
        }
        return true;
    })

    return replyCount;
}

export function filterCollectionByName(data, query) {
    let results = [];
    for (let item of data) {
        if (item.name.toLowerCase().trim().includes(query.toLowerCase().trim())) {
            results.push(item);
        }
        if (item.folders.length > 0) {
            const nestedResults = filterCollectionByName(item.folders, query);
            results = results.concat(nestedResults);
        }
    }
    return results;
}

export function filterTagByName(data, query) {
    let results = [];
    for (let item of data) {
        if (item.tag.toLowerCase().trim().includes(query.toLowerCase().trim())) {
            results.push(item);
        }
        if (item?.folders?.length > 0) {
            const nestedResults = filterTagByName(item.folders, query);
            results = results.concat(nestedResults);
        }
    }
    return results;
}

// export const moveGemFromOwnToSharedCollection = (collections, collectionId,gem) => {
//     collections.forEach((c, index) => {
//         if (c.id === Number(collectionId)) {
//             collections[index].bookmarks = [
//                     ...collections[index].bookmarks,
//                     gem
//                 ]
//             return collections
//         }
//         else if (c.folders.length !== 0) {
//             moveGemFromOwnToSharedCollection(c.folders, collectionId,gem)
//         }        
//     })
//     return collections
// }
// export function removeBookmarkById(data, targetCollectionId, targetBookmarkId) {
//     function removeBookmarkFromFolders(folders, targetBookmarkId) {
//         for (const folder of folders) {
//             const index = folder.bookmarks.findIndex(b => b.id === Number(targetBookmarkId));
//             if (index > -1) {
//                 folder.bookmarks.splice(index, 1);
//                 return true; 
//             }

//             if (removeBookmarkFromFolders(folder.folders, targetBookmarkId)) {
//                 return true; 
//             }
//         }
//         return false; 
//     }

//     for (const collection of data) {
//         if (collection.id === Number(targetCollectionId)) {
//             const index = collection.bookmarks.findIndex(b => b.id === Number(targetBookmarkId));
            
//             if (index > -1) {
//                 collection.bookmarks.splice(index, 1);
//                 return data; 
//             } 
            
//             removeBookmarkFromFolders(collection.folders, targetBookmarkId);
//             return data; 
//         }
//     }
//     return data;
// }

// export function manageMoveShared(data, collectionId, newData) {
//     const insertDataInTargetCollection = (collection) => {
//         if (collection.id === Number(collectionId)) {
//             collection.folders = [...collection.folders, newData];
//             return true;  
//         }

//         for (const folder of collection.folders) {
//             if (insertDataInTargetCollection(folder)) {
//                 return true;  
//             }
//         }
//         return false;  
//     };
//     data.some(insertDataInTargetCollection);

//     return data;
// }

export const removeBookmarkById = (data, collectionId, bookmarkId) => {
    const searchAndRemove = (array) => {
        for (const item of array) {
            if (item.id === Number(collectionId)) {
                const index = item.bookmarks.findIndex(b => b.id === Number(bookmarkId));
                if (index !== -1) {
                    item.bookmarks.splice(index, 1);
                    return true;  
                }
            }
            
            if (item.folders && item.folders.length > 0) {
                if (searchAndRemove(item.folders)) {
                    return true;  
                }
            }
        }
        return false; 
    };

    searchAndRemove(data);

    return data;
};

export function getBookmarkPermissions(data, targetBookmarkId) {
    function hasBookmarkInFolders(folders, targetId) {
        for (const folder of folders) {
            if (folder?.bookmarks?.some(bookmark => bookmark?.id === Number(targetId))) {
                return true;
            }
            
            if (hasBookmarkInFolders(folder?.folders, targetId)) {
                return true;
            }
        }
        return false;
    }

    for (const collection of data) {
        if (collection?.bookmarks?.some(bookmark => bookmark?.id === Number(targetBookmarkId))) {
            return collection.permissions;
        }
        if (hasBookmarkInFolders(collection.folders, targetBookmarkId)) {
            return collection.permissions;
        }
    }

    return null;
}

export const getAllLevelCollectionPermissions = (data, idToFind, topLevelAccess=null, topLevelPermissions=null,topLevel=true) => {
  for (const item of data) {
    if (item.id === Number(idToFind)) {
      return {
        accessType: item.accessType || topLevelAccess,
        permissions: item.permissions || topLevelPermissions,
        data: item,
        topLevel:topLevel
      };
    }
    
    if (item.folders && item.folders.length > 0) {
      const nextTopLevelAccess = item.accessType || topLevelAccess;
      const nextTopLevelPermissions = item.permissions || topLevelPermissions;
      const result = getAllLevelCollectionPermissions(item.folders, idToFind, nextTopLevelAccess, nextTopLevelPermissions,false);
      
      if (result) {
        return result;
      }
    }
  }
  
  return null;
};

export function manageMoveShared(data, collectionId, objectToAdd) {
    function addRecursive(folders) {
        for (let folder of folders) {
            if (folder.id === Number(collectionId)) {
                folder.folders = [...folder.folders, objectToAdd];
                return true;
            }
            if (addRecursive(folder.folders)) return true;
        }
        return false;
    }

    for (let collection of data) {
        if (collection.id === Number(collectionId)) {
            collection.folders = [...collection.folders, objectToAdd];
            return data;
        }
    }

    for (let collection of data) {
        if (addRecursive(collection.folders)) return data;
    }

    return data;
}

export function moveGemFromOwnToSharedCollection(data, targetCollectionId, newBookmark) {
    function addBookmarkToFolders(folders) {
        for (const folder of folders) {
            if (folder.id === Number(targetCollectionId)) {
                folder.bookmarks.push(newBookmark);
                return true; 
            }

            if (addBookmarkToFolders(folder.folders)) {
                return true; 
            }
        }
        return false; 
    }

    for (const collection of data) {
        if (collection.id === Number(targetCollectionId)) {
            collection.bookmarks.push(newBookmark);
            return data; 
        }
    
        if (addBookmarkToFolders(collection.folders)) {
            return data; 
        }
    }

    return data;
}

export function updateBulkBookmarksShared(data, arrayToUpdate) {
    function findAndRemoveBookmark(bookmarkId) {
        let removedBookmark = null;

        function removeRecursive(folders) {
            for (const folder of folders) {
                const idx = folder.bookmarks.findIndex(b => b.id === bookmarkId);
                if (idx !== -1) {
                    removedBookmark = folder.bookmarks.splice(idx, 1)[0];
                    return removedBookmark;
                }
                const foundBookmark = removeRecursive(folder.folders);
                if (foundBookmark) return foundBookmark;
            }
            return null;
        }

        for (const collection of data) {
            const idx = collection.bookmarks.findIndex(b => b.id === bookmarkId);
            if (idx !== -1) {
                removedBookmark = collection.bookmarks.splice(idx, 1)[0];
                return removedBookmark;
            }

            const foundBookmark = removeRecursive(collection.folders);
            if (foundBookmark) return foundBookmark;
        }
        return removedBookmark;
    }
    function addBookmarkToCollection(folders, collectionId, bookmark) {
        for (const folder of folders) {
            if (folder.id === collectionId) {
                folder.bookmarks.push(bookmark);
                return true;
            }
            if (addBookmarkToCollection(folder.folders, collectionId, bookmark)) return true;
        }
        return false;
    }

    arrayToUpdate.forEach(update => {
        const bookmark = findAndRemoveBookmark(update.id);
        
        if (!bookmark) return; 
        
        let added = false;

        for (const collection of data) {
            if (collection.id === update.collection_gems) {
                collection.bookmarks.push(bookmark);
                added = true;
                break;
            }
        }

        if (!added) {
            for (const collection of data) {
                if (addBookmarkToCollection(collection.folders, update.collection_gems, bookmark)) break;
            }
        }
    });

    return data;
}

export function moveAndUpdateSharedCollection(data, sourceCollectionId, destinationCollectionId, updatedSourceObject) {
    // Recursive function to find and remove the source folder
    function findAndRemove(collection) {
        if (!collection || !collection.folders) return;

        for (let i = 0; i < collection.folders.length; i++) {
            if (collection.folders[i].id === Number(sourceCollectionId)) {
                collection.folders.splice(i, 1);
                return true;
            }
            if (findAndRemove(collection.folders[i])) return true;
        }

        return false;
    }

    // Recursive function to find the destination and append the updated source folder
    function findAndInsert(collection) {
        if (!collection || !collection.folders) return;

        if (collection.id === Number(destinationCollectionId)) {
            collection.folders.push(updatedSourceObject);
            return true;
        }

        for (let folder of collection.folders) {
            if (findAndInsert(folder)) return true;
        }

        return false;
    }

    // First, traverse the top-level and then go deeper using recursive function for source collectionId
    for (let collection of data) {
        if (collection.id === Number(sourceCollectionId)) {
            data.splice(data.indexOf(collection), 1);
            break;
        }
        if (findAndRemove(collection)) break;
    }

    // Then, traverse again for the destination collectionId and insert the updated source folder
    for (let collection of data) {
        if (findAndInsert(collection)) break;
    }

    return data;
}

export function modifySharedCollection(data, collectionId, updatedObj) {
    // Recursive function to find and update the collection
    function findAndUpdate(collection) {
        if (!collection) return false;

        // If the collection ID matches, update it
        if (collection.id === Number(collectionId)) {
            Object.assign(collection, updatedObj);
            return true;
        }

        if (collection.folders) {
            for (let folder of collection.folders) {
                if (findAndUpdate(folder)) return true;
            }
        }

        return false;
    }

    // Traverse the top-level and then go deeper using the recursive function
    for (let collection of data) {
        if (findAndUpdate(collection)) break;
    }

    return data;
}

export function sharedCollectionRoot(data, collectionId, updatedObj) {
    // Recursive function to find and remove the collection
    function findAndRemove(parentArray, collectionId) {
        for (let i = 0; i < parentArray.length; i++) {
            if (parentArray[i].id === Number(collectionId)) {
                parentArray.splice(i, 1);
                return true;
            }
            
            if (parentArray[i].folders && findAndRemove(parentArray[i].folders, collectionId)) {
                return true;
            }
        }
        return false;
    }

    // Remove the collection
    findAndRemove(data, collectionId);

    // Add the updated object at the top level
    data.push(updatedObj);

    return data;
}

export function removeSharedCollection(collections,id){
    collections.forEach((c, index) => {
            if (c.id === Number(id)) {
                collections.splice(index, 1)
                collections = [ ...collections ]
            }
            else if (c.folders.length !== 0){
                removeSharedCollection(c.folders, id, null)
            }
        })
    
    return collections
}

export function updateBookmarkState(sampleData, updatedData) {
  const updatedDataMap = new Map(updatedData.map(obj => [obj.id, obj]));

  const newSampleData = sampleData.map(obj => {
    if (updatedDataMap.has(obj.id)) {
      return { ...obj, ...updatedDataMap.get(obj.id) };
    }
   
    return obj;
  });

  return newSampleData;
}

export function deleteBookmarkState(sampleData, idsToRemove) {
  return sampleData.filter(item => !idsToRemove.includes(item.id));
}

export function updateGemCount(data, currentCollectionId, changedCollectionId) {
    return data.map(collection => {
        if (collection.id === currentCollectionId) {
            collection.gems_count = (collection.gems_count > 0) ? collection.gems_count - 1 : 0;
        } else if (collection.id === changedCollectionId) {
            collection.gems_count += 1;
        }

        if (collection.folders && collection.folders.length > 0) {
            collection.folders = updateGemCount(collection.folders, currentCollectionId, changedCollectionId);
        }

        return collection;
    });
}

export function decrementGemCount(data, currentCollectionId) {
    return data.map(collection => {
        if (collection.id === currentCollectionId) {
            collection.gems_count = (collection.gems_count > 0) ? collection.gems_count - 1 : 0;
        }

        if (collection.folders && collection.folders.length > 0) {
            collection.folders = decrementGemCount(collection.folders, currentCollectionId);
        }

        return collection;
    });
}

export function updateBulkGemCounts(data, currentCollectionId, changedCollectionId, itemsChanged) {
    return data.map(collection => {
        if (collection.id === currentCollectionId) {
            collection.gems_count = Math.max(0, collection.gems_count - itemsChanged);
        }
        if (collection.id === changedCollectionId) {
            collection.gems_count += itemsChanged;
        }

        if (collection.folders && collection.folders.length > 0) {
            collection.folders = updateBulkGemCounts(collection.folders, currentCollectionId, changedCollectionId, itemsChanged);
        }

        return collection;
    });
}

export function modifyFilterCount (data,mediaType,process) {
    if(process === 'add'){
        let updatedArray = data?.map(item => ({ ...item }));

        const foundItem = updatedArray?.find(item => item?.title?.toLowerCase() === mediaType?.toLowerCase());
        if (foundItem) {
            foundItem.count += 1;
        }
        return updatedArray;
    }

    if(process === 'delete'){
        let updatedArray = data.map(item => ({ ...item }));
        const foundItem = updatedArray.find(item => item?.title?.toLowerCase() === mediaType?.toLowerCase());
        if (foundItem && foundItem.count > 0) {
            foundItem.count -= 1;
        }
        return updatedArray;
    }
}

export function incrementCollectionCount(dataArray, collectionId) {
    let updatedArray = dataArray?.map(item => {
        let newItem = { ...item, folders: item.folders ? [...item.folders] : [] };

        if (newItem.id === Number(collectionId)) {
            newItem.gems_count += 1;
        } else if (newItem.folders.length > 0) {
            newItem.folders = incrementCollectionCount(newItem.folders, collectionId);
        }

        return newItem;
    });

    return updatedArray;
}

export function incrementTagCount(dataArray, tagNames,process) {
    if(process === 'add'){
        return dataArray.map(item => {
            let newItem = { ...item, folders: item.folders ? [...item.folders] : [] };

            if (tagNames.includes(newItem.tag)) {
                newItem.gems_count += 1;  
            }

            if (newItem.folders.length > 0) {
                newItem.folders = incrementTagCount(newItem.folders, tagNames,process);
            }

            return newItem;
        });
    }

    if(process === 'delete'){
        return dataArray.map(item => {
        let newItem = { ...item, folders: item.folders ? [...item.folders] : [] };

        
        if (tagNames.includes(newItem.tag) && newItem.gems_count > 0) {
            newItem.gems_count -= 1; 
        }

        
        if (newItem.folders.length > 0) {
            newItem.folders = incrementTagCount(newItem.folders, tagNames,process);
        }

        return newItem;
    });
    }
}

export const updateShape = (blocks, id, shape) => {
    blocks.forEach((c, index) => {
            if (c.id === Number(id)) {
                blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        shape
                    }
                }
                blocks = [ ...blocks ]
            }
    })
    return blocks
}

export const updatePosition = (blocks, id, range) => {
    blocks.forEach((c, index) => {
            if (c.id === Number(id)) {
                blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        x: range.x,
                        y: range.y
                    }
                }
                blocks = [ ...blocks ]
            }
    })
    return blocks
}

export const updateNoteOptions = (blocks, id, type,value) => {
    blocks.forEach((c, index) => {
            if (c.id === Number(id)) {
                if(type === 'text-align') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        textAlign: value
                    }
                    }
                }
                if(type === 'justify-content') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        justifyContent: value
                    }
                    }
                }
                if(type === 'color') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        color: value
                    }
                    }
                }

                if(type === 'bold') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        fontWeight: value
                    }
                    }
                }
                if(type === 'italic') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        textItalic: value
                    }
                    }
                }
                if(type === 'underline') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        textUnderline: value
                    }
                    }
                }
                if(type === 'fontSize') {
                    blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        fontSize: value
                    }
                    }
                }
                blocks = [ ...blocks ]
            }
    })
    return blocks
}

export const updateColorOptions = (blocks, id, value) => {
    blocks.forEach((c, index) => {
            if (c.id === Number(id)) {
                blocks[index] = {
                    ...blocks[index],
                    media: {
                        ...blocks[index].media,
                        cardBgColor : value
                    }
                }
                blocks = [ ...blocks ]
            }
    })
    return blocks
}

export const updateRejectApproveGem = (blocks, id, data) => {
    blocks.forEach((c, index) => {
            if (c.id === Number(id)) {
                blocks[index] = {
                    ...blocks[index],
                    ...data
                }
                blocks = [ ...blocks ]
            }
    })
    return blocks
}

export function updateCountForGemAddedInPublicCollection(data, currentCollectionId) {
    return data.map(collection => {
        if (collection.id === Number(currentCollectionId)) {
            collection.gems_count = (collection.gems_count > 0) ? collection.gems_count + 1 : 0;
        } 

        if (collection.folders && collection.folders.length > 0) {
            collection.folders = updateCountForGemAddedInPublicCollection(collection.folders, currentCollectionId);
        }

        return collection;
    });
}

export function findFolderAndRoot(data, targetId) {
  let result = null;
  
  function searchFolders(folders, path) {
    for (let folder of folders) {
      const currentPath = [...path, { id: folder.id, name: folder.name, slug: folder?.slug, author: folder?.author,isFollowerCollection: folder?.isFollowerCollection,isShareCollection: folder?.isShareCollection,tag:folder?.tag }];
      if (folder.id === Number(targetId)) {
        result = currentPath;
        return true;
      }
      if (folder.folders.length > 0) {
        if (searchFolders(folder.folders, currentPath)) {
          return true;
        }
      }
    }
    return false;
  }

  for (let item of data) {
    const currentPath = [{ id: item.id, name: item.name, slug: item?.slug, author: item?.author,isFollowerCollection: item?.isFollowerCollection,isShareCollection: item?.isShareCollection,tag:item?.tag }];
    if (item.id === Number(targetId)) {
      return currentPath;
    }
    if (item.folders.length > 0) {
      if (searchFolders(item.folders, currentPath)) {
        return result;
      }
    }
  }
  
  return result;
}

export function addGemsCount(obj) {
  if ('bookmarks' in obj) {
    obj.gems_count = obj.bookmarks.length;
  }
  
  if ('folders' in obj) {
    obj.folders.forEach(folder => addGemsCount(folder));
  }

  return obj;
}

export const addSubPageById = (collections, id, data) => {
  collections.forEach((c, index) => {
    if (c.id === id) {
      collections[index] = {
        ...collections[index],
        ...data,
      };
      collections = [...collections];
    } else if (c.children.length !== 0) {
      addSubPageById(c.children, id, data);
    }
  });
  return collections;
};

export function modifyNavPage(arr, id, updatedData) {
  function updateObject(arr) {
    return arr.map((obj) => {
      if (obj.id === id) {
        return { ...obj, ...updatedData };
      } else if (obj.children && obj.children.length > 0) {
        return { ...obj, children: updateObject(obj.children) };
      }
      return obj;
    });
  }

  return updateObject(arr);
}

// export function addSubPageById(arr, id, newChild) {
//   // Helper function to add new child by id
//   function addChild(arr) {
//     return arr.map((obj) => {
//       if (obj.id === id) {
//         return { ...obj, children: [...obj.children, newChild] };
//       } else if (obj.children && obj.children.length > 0) {
//         return { ...obj, children: addChild(obj.children) };
//       }
//       return obj;
//     });
//   }

//   // Call the helper function on the root array
//   return addChild(arr);
// }