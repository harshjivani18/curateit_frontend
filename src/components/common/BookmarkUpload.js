"use client";
import { FileUploader } from "react-drag-drop-files";

import { Button, message } from "antd";
import { IMPORT_FILE_TYPE } from "@utils/constants";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  addImportCollection,
  createCollectionActivity,
  fetchCollectionWiseCounts,
  getCollectionById,
  importGemsWithIcon,
  updateCollectionDataForImport,
  uploadCsvTextLinks,
} from "@actions/collection";
import { useState } from "react";
import store from "@store/index";
import { updateScore } from "@actions/gamification-score";
import {
  openDrawer,
  setCurrentImportStatus,
  setCurrentUploadItems,
  setNoLoaderFromOnboarding,
  setPercentageData,
  setSyncingCollection,
} from "@actions/app";
import session from "@utils/session";
import { processBookmarkJson } from "@utils/process-bookmark-json";
import { groupByParentAndCollection } from "@utils/commonFunctions";
import Image from "next/image";
import { HiMiniChevronRight } from "react-icons/hi2";
import UploadHintModal from "@components/modal/UploadHintModal";
import { useRouter } from "next/navigation";

const module = ["gem", "collection"];

const BookmarkUpload = ({ fromDrawer = false, fromOnboarding = false }) => {
  const navigate = useRouter()
  let importedItems = 0;
  let totalImportItems = 0;
  let folderT = null;
  let bookmarkT = null;
  const dispatch = useDispatch();
  const [showSpin, setShowSpin] = useState(false);
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { isSyncing, totals } = useSelector((state) => state.app);

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
      if (fromDrawer) {
        dispatch(openDrawer(""));
      }
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
              link: b.link,
              icon: b.icon,
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

  const handleChange = async (file) => {
    if (file.type === "text/plain" || file.type === "text/csv") {
      const formData = new FormData();
      formData.append("file", file);

      if (fromOnboarding) {
        dispatch(setNoLoaderFromOnboarding(true));
      }

      dispatch(setSyncingCollection(true));
      dispatch(setPercentageData(0));

      const res = await dispatch(uploadCsvTextLinks(formData));

      const jsonObjs = groupByParentAndCollection(
        res?.payload?.data?.data || []
      );
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
        if ((res.isPassed && !showSpin) || res.status === 429) {
          setShowSpin(false);
          setFile(null);
        }
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

      return;
    }

    setFile(file);
    setShowSpin(true);
    if (fromOnboarding) {
      dispatch(setNoLoaderFromOnboarding(true));
    }
    dispatch(setSyncingCollection(true));
    dispatch(setPercentageData(0));
    const reader = new FileReader();
    reader.onload = async function (e) {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(reader.result, "text/html");
      var htmlElement = htmlDoc.getElementsByTagName("title")[0];

      if (htmlElement.textContent === "Bookmarks") {
        const jsonObjs = await processBookmarkJson(htmlDoc);
        let totalCount = calculateTotalItems(jsonObjs);
        getTotalFoldersAndBookmarks(jsonObjs);
        totalImportItems = totalCount;
        dispatch(
          setCurrentImportStatus({ processedItems: 0, totalItems: totalCount })
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
          if ((res.isPassed && !showSpin) || res.status === 429) {
            setShowSpin(false);
            setFile(null);
          }
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
      } else {
        message.error(
          "Please upload a valid bookmark file in html or csv or text format"
        );
        setShowSpin(false);
        return;
      }
    };
    reader.readAsText(file);
  };

  const onCancellingSync = async () => {
    dispatch(setSyncingCollection(false));
  };

  const renderFileUploader = () => {
    return (
      <>
        <FileUploader
          handleChange={handleChange}
          name="drop-zone-section-file"
          types={IMPORT_FILE_TYPE}
          onTypeError={(err) => message.error(err)}
          disabled={isSyncing}
        >
          <div className="my-0 mx-auto w-[348px] h-[218px] bg-white border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center">
            <div>
              <FiUpload
                className="h-6 w-6 text-gray-500 my-0 mx-auto mb-2"
                disabled={isSyncing}
              />
              {fromOnboarding ? (
                <></>
              ) : (
                <div className="font-medium">No Bookmarks</div>
              )}
              <div>Drag & drop to upload html, text, csv files</div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <hr className="w-12" />
                <span className="text-gray-500">OR</span>
                <hr className="w-12" />
              </div>
              {
                <Button
                  type="primary"
                  disabled={isSyncing}
                  className="rounded bg-[#347AE2] hover:bg-[#347AE2] border-[#347AE2] hover:border-[#347AE2]"
                >
                  Browse
                </Button>
              }

              <div className="flex items-center justify-center mt-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/browsers.png`}
                  alt={"upload bookmark"}
                  priority={true}
                  width={100}
                  height={50}
                  // style={{
                  //   width: "100%",
                  // }}
                />
              </div>
            </div>
          </div>
        </FileUploader>

        <div
          className="flex items-center cursor-pointer block justify-center mt-2"
          onClick={() => {
            if(fromOnboarding){
              window.open(
                `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?download=true`,
                "_blank"
              );
              return;
            }
            navigate.push(
              `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?download=true`
            );
            if (fromDrawer) {
              dispatch(openDrawer(""));
            }
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/platforms.png`}
            alt={"upload bookmark"}
            priority={true}
            width={100}
            height={50}
          />

          <div className="flex items-center ml-2">
            <span className="block text-[#347AE2] cursor-pointer">
              Get more apps
            </span>
            <HiMiniChevronRight className="text-[#347AE2] ml-2 h-5 w-5" />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="underline cursor-pointer text-[#347AE2] my-1 flex items-center justify-center"
        onClick={(e) => {
          setOpenModal(true);
        }}
      >
        Click here to know the steps
      </div>
      <div className="w-full flex items-center justify-center my-1">
        {isSyncing && !totals?.totalBookmarks && !totals?.totalFolders && (
          <button
            className="text-[red] w-[fit-content]"
            onClick={onCancellingSync}
          >
            Stop
          </button>
        )}
      </div>
      <div className="mt-4">{renderFileUploader()}</div>

      {fromOnboarding ? (
        <></>
      ) : (
        <a
          className="mt-1 block"
          href="https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/upload-new.png`}
            alt={"upload"}
            priority={true}
            width={585}
            height={450}
          />
        </a>
      )}

      {openModal && <UploadHintModal open={openModal} setOpen={setOpenModal} />}
    </>
  );
};

export default BookmarkUpload;
