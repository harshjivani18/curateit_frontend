import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRefresh } from "react-icons/md";
import {
  ChevronUpIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import CollectionSiderList from "./CollectionSiderList";

import {
  selectedSecondarySidebar,
  openDrawer,
  setIsMobileSidebar,
} from "@actions/app";
import {
  fetchCollectionWiseCounts,
  getFollowByMeCollection,
  getSharedCollections,
} from "@actions/collection";

const CollectionList = ({ handleChangeSidebar }) => {
  const dispatch = useDispatch();
  const { secondarySidebarSelected, isMobileView } = useSelector(
    (state) => state.app
  );
  const collectionWithCount = useSelector(
    (state) => state.collections.collectionsAndItsCount
  );
  const [refreshing, setRefreshing] = useState(false);
  const [showCollections, setShowCollections] = useState(true);

  useEffect(() => {
    if (collectionWithCount === null) {
      setRefreshing(true);
      dispatch(fetchCollectionWiseCounts()).then((res) => {
        if(res?.payload?.data){
          let collectionsData = JSON.stringify(res?.payload?.data)
          localStorage.setItem("collectionsData", collectionsData);
        }
        setRefreshing(false);
      });
      dispatch(getSharedCollections());
      dispatch(getFollowByMeCollection());
    }
    if(collectionWithCount){
      localStorage.setItem("collectionsData", JSON.stringify(collectionWithCount));
    }
  }, []);

  const onRefreshCollection = async (e) => {
    e.stopPropagation();
    setRefreshing(true);
    await dispatch(fetchCollectionWiseCounts());
    await dispatch(getSharedCollections());
    await dispatch(getFollowByMeCollection());

    setRefreshing(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg flex flex-col px-2 py-2 mt-2 border-[0.6px] border-solid border-[#DFE4EC] shadow">
        <div
          className={`${
            secondarySidebarSelected === "collections"
              ? "bg-[#E5F0FF]"
              : "bg-white"
          } rounded w-full flex items-center px-1 py-[3px] justify-between  cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeSidebar("collections");
            isMobileView && dispatch(setIsMobileSidebar(false));
          }}
        >
          <div className="flex items-center cursor-pointer">
            {/* <FolderOpenIcon className="h-4 w-4 text-[#97A0B5]"/> */}
            <div className="ml-2 text-[#1A3D71] font-medium">Collections</div>
          </div>

          <div className="flex items-center">
            <MdOutlineRefresh className="h-4 w-4 cursor-pointer" onClick={onRefreshCollection}/>
            <PlusIcon
              className="h-4 w-4 cursor-pointer mx-1"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(selectedSecondarySidebar("collections"));
                isMobileView && dispatch(setIsMobileSidebar(false));
                dispatch(openDrawer("collection"));
              }}
              id="tour-collection-plus-icon"
            />
            {showCollections ? (
              <ChevronUpIcon
                className="h-4 w-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCollections(!showCollections);
                }}
              />
            ) : (
              <ChevronDownIcon
                className="h-4 w-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCollections(!showCollections);
                }}
              />
            )}
          </div>
        </div>

        {showCollections && (
          <div className="bg-white rounded-lg flex flex-col">
            <CollectionSiderList
              loading={refreshing}
              collectionWithCount={collectionWithCount}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionList;
