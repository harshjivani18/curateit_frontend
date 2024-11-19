import {
  openDrawer,
  setCurrentImportStatus,
  setCurrentUploadItems,
  setPercentageData,
  setSyncingCollection,
} from "@actions/app";
import { DocumentPlusIcon, LinkIcon } from "@heroicons/react/24/outline";
import { Button, Drawer, Space, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { WithContext as ReactTags } from "react-tag-input";

import TypeComboBox from "@components/collectionCombobox/TypeComboBox";
import ComboBox from "@components/collectionCombobox/ComboBox";
import session from "@utils/session";
import { KEY_CODES } from "@utils/constants";
import BookmarkUpload from "@components/common/BookmarkUpload"
import {
  addImportCollection,
  createCollectionActivity,
  fetchCollectionWiseCounts,
  getCollectionById,
  importGemsWithIcon,
  updateCollectionDataForImport,
  uploadCsvTextLinks,
} from "@actions/collection";
import { groupByParentAndCollection } from "@utils/commonFunctions";
import store from "@store/index";
import { updateScore } from "@actions/gamification-score";
import { updateTagsPromise } from "@utils/update-tags";
import { getUserDetails } from "@actions/user";

const module = ["gem", "collection"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UploadBookmarkDrawer = ({
  open,
  fromPage = "",
  setOpen = () => {},
  isMobile,
}) => {
  let importedItems = 0;
  let totalImportItems = 0;
  let folderT = null;
  let bookmarkT = null;
  const dispatch = useDispatch();
  const { isMobileView } = useSelector((state) => state.app);
  const { collectionsAndItsCount, sharedCollections } = useSelector(
    (state) => state.collections
  );
  const { userTags } = useSelector((state) => state.users);

  const [optionSelected, setOptionSelected] = useState("file");
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [showCollectionInput, setShowCollectionInput] = useState(false);
  const [allCollections, setAllCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({
    id: Number(session.unfiltered_collection_id),
    name: "Unfiltered",
  });
  const [selectedType, setSelectedType] = useState("Link");
  const [selectedTags, setSelectedTags] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [linkPasted, setLinkPasted] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let collsArr = [];
    if (sharedCollections && sharedCollections.length > 0) {
      const filtered = sharedCollections?.filter(
        (item) => item?.accessType !== "viewer"
      );
      collsArr = collectionsAndItsCount
        ? [...collectionsAndItsCount, ...filtered]
        : [...filtered];
    } else {
      collsArr = collectionsAndItsCount ? [...collectionsAndItsCount] : [];
    }
    setAllCollections(collsArr);
    dispatch(getUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedCollections, collectionsAndItsCount]);

  const onLayoutClick = () => {
    setShowCollectionInput(false);
    setShowTypeInput(false);
  };

  const prepareTags = () => {
    const tagArr = [];
    userTags.forEach((t) => {
      if (t.tag) {
        tagArr.push({
          id: t.tag,
          text: t.tag,
        });
      }
    });
    return tagArr;
  };

  const onTagAdd = async (tag) => {
    const existingIdx = userTags?.findIndex((t) => {
      return t.tag === tag.text;
    });
    if (existingIdx !== -1) {
      setSelectedTags([
        ...selectedTags,
        { id: userTags[existingIdx].id, tag: userTags[existingIdx].tag },
      ]);
    } else {
      setSelectedTags([...selectedTags, { id: tag?.text, tag: tag?.text }]);
    }
  };

  const onTagDelete = (i) => {
    selectedTags.splice(i, 1);
    setSelectedTags([...selectedTags]);
  };

  const sendChunkRecordsForImport = async (
    collection,
    parentId,
    parentCollectionName,
    index
  ) => {
    let finalCollection = {};
    let recentErrStatus = null;
    const cRes = await dispatch(
      addImportCollection({
        data: {
          name: collection.title,
          is_sub_collection: parentId ? true : false,
          collection: parentId ? parentId : null,
          parent_collection_name: parentCollectionName
            ? parentCollectionName
            : null,
          isBulk: true,
          isBasicImport: true,
          author: parseInt(session.userId),
        },
      })
    );
    if (index === "0" && cRes) {
      dispatch(openDrawer(""));
    }

    if (cRes.error === undefined) {
      finalCollection = {
        ...cRes.payload.data.data,
        isPassed: true,
        bookmarks: [],
        folders: [],
      };
      if (cRes.payload.data?.data?.id) {
        if (collection?.bookmarks?.length !== 0) {
          const collectionGems = collection?.bookmarks?.map((b) => {
            return {
              title: b.title,
              link: b.url,
              icon: b.icon,
              tags: b?.Tags || [],
              remarks: b?.remarks || "",
              thumbnail: b?.thumbnail || "",
              collection_gems: cRes.payload.data?.data?.id,
            };
          });

          if (collectionGems?.length <= 20) {
            const res = await dispatch(
              importGemsWithIcon({ data: collectionGems })
            );
            if (bookmarkT) {
              bookmarkT = bookmarkT - collectionGems?.length;
              importedItems += collectionGems?.length;
              dispatch(
                setCurrentImportStatus({
                  processedItems: importedItems,
                  totalItems: totalImportItems,
                })
              );
              dispatch(
                setCurrentUploadItems({
                  totalFolders: folderT,
                  totalBookmarks: bookmarkT,
                })
              );
              updateProgress(importedItems, totalImportItems);
            }
            if (res.error === undefined) {
              finalCollection.bookmarks =
                res.payload.data?.data?.map((r) => {
                  return { ...r, showThumbnail: true };
                }) || [];
            }
            if (res.error?.response?.data?.error?.status === 429) {
              return { status: 429 };
            }
          } else if (collectionGems?.length > 20) {
            const chunkSize = 10;
            const chunks = [];
            for (let i = 0; i < collectionGems?.length; i += chunkSize) {
              chunks.push(collectionGems?.slice(i, i + chunkSize));
            }
            for (const index in chunks) {
              const chunkRes = await dispatch(
                importGemsWithIcon({ data: chunks[index] })
              );
              if (bookmarkT) {
                bookmarkT = bookmarkT - chunks[index]?.length;
                dispatch(
                  setCurrentUploadItems({
                    totalFolders: folderT,
                    totalBookmarks: bookmarkT,
                  })
                );
              }
              importedItems += chunks[index]?.length;
              dispatch(
                setCurrentImportStatus({
                  processedItems: importedItems,
                  totalItems: totalImportItems,
                })
              );
              updateProgress(importedItems, totalImportItems);
              if (chunkRes.error === undefined) {
                const newChunk = chunkRes.payload.data?.data?.map((r) => {
                  return { ...r, showThumbnail: true };
                });
                finalCollection.bookmarks = [
                  ...finalCollection.bookmarks,
                  ...newChunk,
                ];
              }
              if (chunkRes.error?.response?.data?.error?.status === 429) {
                recentErrStatus = 429;
                break;
              }
            }
            if (recentErrStatus === 429) {
              return { status: 429 };
            }
          }
        }

        if (collection?.folders?.length !== 0) {
          for (const index in collection?.folders) {
            const folderRes = await sendChunkRecordsForImport(
              collection?.folders[index],
              cRes.payload.data?.data?.id,
              cRes.payload.data?.data?.name,
              index
            );
            if (folderRes.status === 429) {
              recentErrStatus = 429;
              break;
            }
            if (folderT) {
              folderT = folderT - 1;
              dispatch(
                setCurrentUploadItems({
                  totalBookmarks: bookmarkT,
                  totalFolders: folderT,
                })
              );
            }
            importedItems += 1;
            dispatch(
              setCurrentImportStatus({
                processedItems: importedItems,
                totalItems: totalImportItems,
              })
            );
            updateProgress(importedItems, totalImportItems);
            if (folderRes.error === undefined) {
              finalCollection.folders = [
                ...finalCollection?.folders,
                folderRes,
              ];
            }
          }
          if (recentErrStatus === 429) {
            return { status: 429 };
          }
        }
      }
    } else if (cRes.error?.response?.data?.error?.status === 429) {
      recentErrStatus = 429;
    }

    return recentErrStatus !== null
      ? { status: recentErrStatus }
      : finalCollection;
  };

  const getTotalFoldersAndBookmarks = (collections) => {
    let folderTotal = collections.length;
    let bookmarkTotal = 0;
    collections.forEach((collection) => {
      bookmarkTotal += collection.bookmarks.length;
      const countFolders = (folders) => {
        folders.forEach((folder) => {
          folderTotal++;
          bookmarkTotal += folder.bookmarks.length;
          if (folder.folders.length > 0) {
            countFolders(folder.folders);
          }
        });
      };
      countFolders(collection.folders);
    });
    folderT = folderTotal;
    bookmarkT = bookmarkTotal;
    dispatch(
      setCurrentUploadItems({
        totalFolders: folderTotal,
        totalBookmarks: bookmarkTotal,
      })
    );
    return { folderTotal, bookmarkTotal };
  };

  const calculateTotalItems = (collections) => {
    let total = collections.length;
    collections.forEach((collection) => {
      total += collection.bookmarks.length;
      const countFolders = (folders) => {
        folders.forEach((folder) => {
          total++;
          total += folder.bookmarks.length;
          if (folder.folders.length > 0) {
            countFolders(folder.folders);
          }
        });
      };
      countFolders(collection.folders);
    });
    return total;
  };

  const calculateProcessedItems = (collection) => {
    let count = 1;
    count += collection.bookmarks.length;
    collection.folders.forEach((folder) => {
      count += calculateProcessedItems(folder);
    });
    return count;
  };

  const updateProgress = (processed, total) => {
    const percentage = Math.round((processed / total) * 100);
    dispatch(setPercentageData(percentage));
  };

  const handleSubmit = async () => {
    if (!linkPasted) {
      message.error("Enter valid hyperlinks");
      return;
    }
    if (!selectedCollection.id) {
      setError(true);
      return;
    }

    setButtonLoading(true);

    const payload = {
      links: linkPasted,
    };

    const res = await dispatch(uploadCsvTextLinks(payload));

    if (res?.payload?.data?.status === 400) {
      message.error(res?.payload?.data?.message || "No valid hyperlinks found");
      setButtonLoading(false);
      return;
    }

    if (res?.payload?.data?.status === 200) {
      let newTags = [];
      const filtered = selectedTags.filter(
        (item) => typeof item.id === "string"
      );
      const filteredNumber = selectedTags.filter(
        (item) => typeof item.id === "number"
      );
      const tagNames = filtered?.map((item) => item?.tag);
      if (tagNames && tagNames?.length > 0) {
        newTags = await updateTagsPromise(tagNames, userTags, tagNames?.length);
      }
      newTags = [...newTags, ...filteredNumber];

      const tagIds = newTags?.map((t) => {
        return t?.id;
      });

      const cName = selectedCollection?.name;

      const changedResponseArray = res?.payload?.data?.data?.map((item) => {
        return {
          ...item,
          Collection: cName,
          Tags: tagIds,
          remarks: remarks || item?.remarks,
          MediaType: selectedType?.name || "Link",
        };
      });

      dispatch(setSyncingCollection(true));
      dispatch(setPercentageData(0));

      const jsonObjs = groupByParentAndCollection(changedResponseArray || []);

      let totalCount = calculateTotalItems(jsonObjs);
      getTotalFoldersAndBookmarks(jsonObjs);
      totalImportItems = totalCount;
      dispatch(
        setCurrentImportStatus({
          processedItems: 0,
          totalItems: totalCount,
        })
      );
      dispatch(getCollectionById(Number(session.unfiltered_collection_id)));
      for (const index in jsonObjs) {
        const o = jsonObjs[index];
        const res = await sendChunkRecordsForImport(o, null, null, index);
        importedItems += 1;
        updateProgress(importedItems, totalCount);
        dispatch(
          setCurrentImportStatus({
            processedItems: importedItems,
            totalItems: totalCount,
          })
        );
        dispatch(updateCollectionDataForImport(res));
        dispatch(fetchCollectionWiseCounts());
        if (res.status === 429) {
          dispatch(setSyncingCollection(false));
          dispatch(setPercentageData(100));
          dispatch(setCurrentUploadItems(null));
          folderT = null;
          bookmarkT = null;
          dispatch(setCurrentUploadItems(null));
          break;
        } else if (folderT) {
          folderT = folderT - 1;
          dispatch(
            setCurrentUploadItems({
              totalBookmarks: bookmarkT,
              totalFolders: folderT,
            })
          );
        }
      }
      dispatch(setCurrentUploadItems(null));
      dispatch(setCurrentImportStatus(null));
      dispatch(
        createCollectionActivity({
          action: "Imported",
          module: "Collection",
          actionType: "Collection",
          count: jsonObjs?.length,
          author: {
            id: parseInt(session.userId),
            username: session.username,
          },
        })
      );
      module.forEach((m) => {
        store.dispatch(updateScore(m));
      });

      setButtonLoading(false);
      return;
    }
  };

  return (
    <>
      <Drawer
        placement={isMobileView || isMobile ? "bottom" : "right"}
        height={isMobileView || isMobile ? "90%" : "inherit"}
        width={isMobileView || isMobile ? "90%" : "460px"}
        title={"Upload Bookmark"}
        onClose={() => {
          if (fromPage === "profile") {
            setOpen(false);
            return;
          }
          dispatch(openDrawer(""));
        }}
        open={open}
        maskClosable={isMobileView || isMobile ? true : false}
        bodyStyle={{
          padding: isMobileView || isMobile ? "24px 12px" : "24px",
          backgroundColor: "#fff",
        }}
        footer={
          <Space className="flex items-center justify-end">
            <Button
              onClick={() => {
                if (fromPage === "profile") {
                  setOpen(false);
                  return;
                }
                dispatch(openDrawer(""));
              }}
              disabled={buttonLoading}
            >
              Cancel
            </Button>

            {optionSelected === "file" ? (
              <></>
            ) : (
              <Button
                type="primary"
                className="bg-[#40a9ff] border-[#40a9ff]"
                onClick={handleSubmit}
                disabled={buttonLoading}
              >
                {buttonLoading ? "Loading" : "Submit"}
              </Button>
            )}
          </Space>
        }
      >
        <div className="w-full flex p-1 rounded-md bg-[#F8FAFB] cursor-pointer items-center justify-between mb-6">
          <div
            className={`shareInviteBtn ${
              optionSelected === "file"
                ? "rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white"
                : ""
            } ${isMobileView || isMobile ? "w-[50%]" : "w-[190px]"}`}
            onClick={() => {
              setOptionSelected("file");
            }}
          >
            <DocumentPlusIcon
              className={`h-5 w-5 ${
                optionSelected === "file" ? "text-[#347AE2]" : "text-[#74778B]"
              }`}
            />
            <div
              className={`${
                optionSelected === "file" ? "text-[#347AE2]" : "text-[#74778B]"
              } font-medium text-sm`}
            >
              File
            </div>
          </div>

          <div
            className={`shareInviteBtn ${
              optionSelected === "links"
                ? "rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white"
                : ""
            } ${isMobileView || isMobile ? "w-[50%]" : "w-[190px]"}`}
            onClick={() => setOptionSelected("links")}
          >
            <LinkIcon
              className={`h-5 w-5 ${
                optionSelected === "links" ? "text-[#347AE2]" : "text-[#74778B]"
              }`}
            />
            <div
              className={`font-medium text-sm ${
                optionSelected === "links" ? "text-[#347AE2]" : "text-[#74778B]"
              }`}
            >
              Links
            </div>
          </div>
        </div>

        {optionSelected === "file" && (
            <div>
              <div className="my-4">
                <BookmarkUpload fromDrawer={true} />
              </div>
            </div>
          )}

        {optionSelected === "links" && (
          <div onClick={onLayoutClick}>
            <TextareaAutosize
              value={linkPasted}
              onChange={(e) => setLinkPasted(e.target.value)}
              placeholder="Paste all your links here"
              minRows={4}
              className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border"
            />

            <div className="my-2 flex justify-between space-x-2">
              <div className={classNames("flex-1", showTypeInput && "hidden")}>
                <h6 className="block text-xs font-medium text-gray-500 mb-1">
                  Collections
                </h6>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <div
                    onClick={() => setShowCollectionInput(true)}
                    className="w-full"
                  >
                    <ComboBox
                      inputShown={showCollectionInput}
                      setShowCollectionInput={setShowCollectionInput}
                      collectionData={allCollections || []}
                      userId={session.userId}
                      setSelectedCollection={setSelectedCollection}
                      selectedCollection={selectedCollection}
                      error={error}
                    />
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  "flex-1",
                  showCollectionInput && "hidden"
                )}
              >
                <h6 className="block text-xs font-medium text-gray-500 mb-1">
                  Type
                </h6>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <div
                    onClick={() => setShowTypeInput(true)}
                    className="w-full"
                  >
                    <TypeComboBox
                      inputShown={showTypeInput}
                      setShowTypeInput={setShowTypeInput}
                      updateInputShow={setShowTypeInput}
                      setSelectedType={setSelectedType}
                      type={selectedType}
                      action="add"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <ReactTags
              tags={selectedTags?.map((t) => {
                return {
                  id: t?.attributes?.tag || t?.tag,
                  text: t?.attributes?.tag || t?.tag,
                };
              })}
              suggestions={prepareTags()}
              delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
              handleDelete={onTagDelete}
              handleAddition={onTagAdd}
              inputFieldPosition="inline"
              placeholder="Type to enter tags"
              onClearAll={() => setSelectedTags([])}
              clearAll
              autocomplete
              inline={true}
            />

            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Remarks
              </h6>
              <TextareaAutosize
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add your remarks"
                minRows={4}
                className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border"
              />
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default UploadBookmarkDrawer;
