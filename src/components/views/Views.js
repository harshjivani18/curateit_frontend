"use client"

import session from "@utils/session";
import MoodboardView from "./MoodboardView";
import BookmarkCard from "./card/BookmarkCard";
import TableView from "./TableView";
import ListView from "./ListView";
import StreamView from "./StreamView";
import Inbox from "./Inbox";

const Views = ({
  layout,
  propertyOrder,
  openDrawer,
  setOpenDrawer,
  setGemSingleIdSingleId,
  checkedBookmark,
  setCheckedBookmark,
  showComment,
  shrink,
  setShrink,
  cardSize,
  openPagesIn,
  items,
  page,
  tableWrapColumns,
  showTableVerticalLine,
  permissions,
  isSharedAndAllowEdit,
  pageNumber,
  count,
  isFilter,
  type = "",
  collectionId = "",
  tagId = "",
  sortArr,
  filterArr,
  collectionName = "",
  tagName = "",
  userId = "",
  subCollectionsCount = 0,
  showSocialIcons = "",
  getSortedItems = () => {},
  subTagsCount = 0,
  viewSubCollections,
  gemOnClickEvent,
}) => {
  return (
    <>
      {
        items && items.length > 0 ? (
          <>
            {/* card */}
            {layout === "card" && (
              <div
                className={`${
                  !shrink
                    ? cardSize === "medium"
                      ? "grid-container"
                      : cardSize === "large"
                      ? "grid-container-large"
                      : "grid-container-small"
                    : ""
                }`}
              >
                <BookmarkCard
                  items={items}
                  propertyOrder={propertyOrder}
                  page={page}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showComment={showComment}
                  user={{ username: session.username }}
                  showEdit={true}
                  shrink={shrink}
                  setShrink={setShrink}
                  cardSize={cardSize}
                  openPagesIn={openPagesIn}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  collectionName={collectionName}
                  showSocialIcons={showSocialIcons}
                  getSortedItems={getSortedItems}
                  isFilter={isFilter}
                  gemOnClickEvent={gemOnClickEvent}
                />
              </div>
            )}

            {/* list */}
            {layout === "list" && (
              <div>
                <ListView
                  items={items}
                  propertyOrder={propertyOrder}
                  page={page}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showEdit={true}
                  showComment={showComment}
                  user={{ username: session.username }}
                  shrink={shrink}
                  setShrink={setShrink}
                  cardSize={cardSize}
                  openPagesIn={openPagesIn}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  collectionName={collectionName}
                  showSocialIcons={showSocialIcons}
                  getSortedItems={getSortedItems}
                  isFilter={isFilter}
                  gemOnClickEvent={gemOnClickEvent}
                />
              </div>
            )}

            {/* moodboard view */}
            {layout === "moodboard" && (
              <div>
                <MoodboardView
                  items={items}
                  propertyOrder={propertyOrder}
                  page={page}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showComment={showComment}
                  cardSize={cardSize}
                  user={{ username: session.username }}
                  showEdit={true}
                  shrink={shrink}
                  setShrink={setShrink}
                  openPagesIn={openPagesIn}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  collectionName={collectionName}
                  layout={layout}
                  showSocialIcons={showSocialIcons}
                  getSortedItems={getSortedItems}
                  isFilter={isFilter}
                  gemOnClickEvent={gemOnClickEvent}
                />
              </div>
            )}

            {/* table view */}
            {layout === "table" && (
              <div>
                <TableView
                  items={items}
                  propertyOrder={propertyOrder}
                  page={page}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showComment={showComment}
                  showTableVerticalLine={showTableVerticalLine}
                  tableWrapColumns={tableWrapColumns}
                  user={{ username: session.username }}
                  showEdit={true}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  collectionName={collectionName}
                  showSocialIcons={showSocialIcons}
                  gemOnClickEvent={gemOnClickEvent}
                />
              </div>
            )}

            {/* inbox view */}
            {layout === "inbox" && (
              <>
                <Inbox
                  // totalCount={isFilter ? filteredBookmarksCount : totalCount}
                  items={items}
                  propertyOrder={propertyOrder}
                  pageNumber={pageNumber}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showComment={showComment}
                  showTableVerticalLine={showTableVerticalLine}
                  tableWrapColumns={tableWrapColumns}
                  user={{ username: session.username }}
                  showEdit={true}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  page={page}
                  count={count}
                  isFilter={isFilter}
                  type={type}
                  collectionId={collectionId}
                  tagId={tagId}
                  sortArr={sortArr}
                  filterArr={filterArr}
                  collectionName={collectionName}
                  tagName={tagName}
                  userId={userId}
                  showSocialIcons={showSocialIcons}
                  gemOnClickEvent={gemOnClickEvent}
                />
                {/* <InboxView
                  totalCount={isFilter ? filteredBookmarksCount : totalCount}
                  items={isFilter ? filteredBookmarks :allBookmarks}
                  propertyOrder={propertyOrder}
                  page="bookmark"
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  setPreviewBookmark={setPreviewBookmark}
                  setIsPreviewVisible={setIsPreviewVisible}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showComment={showComment}
                  user={{ username: session.username }}
                  showEdit={true}
                /> */}
              </>
            )}

            {/* stream view */}
            {layout === "stream" && (
              <div>
                <StreamView
                  items={items}
                  propertyOrder={propertyOrder}
                  page={page}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  setGemSingleIdSingleId={setGemSingleIdSingleId}
                  checkedBookmark={checkedBookmark}
                  setCheckedBookmark={setCheckedBookmark}
                  showComment={showComment}
                  cardSize={cardSize}
                  user={{ username: session.username }}
                  showEdit={true}
                  shrink={shrink}
                  setShrink={setShrink}
                  openPagesIn={openPagesIn}
                  isSharedAndAllowEdit={isSharedAndAllowEdit}
                  permissions={permissions}
                  layout={layout}
                  showSocialIcons={showSocialIcons}
                  getSortedItems={getSortedItems}
                  isFilter={isFilter}
                  gemOnClickEvent={gemOnClickEvent}
                />
              </div>
            )}
          </>
        ) : (
          <></>
        )
        // (page === 'collection' && subCollectionsCount !== 0) || (page === 'tags' && subTagsCount !== 0) || (page === 'collection-public-shared' && viewSubCollections) || (page === 'bookmark') ?
        // <>
        // </>:
        // <></>
        // <div className="text-center py-10">
        //   <div className="relative mt-2">
        //     <img
        //       className="h-50 w-50 my-0 mx-auto"
        //       src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
        //       alt="Cloud ellipse icons"
        //     />
        //     <div className="absolute top-[85px] left-0 justify-center w-full text-xs text-gray-400">
        //       No data! Please add bookmark
        //     </div>
        //   </div>
        // </div>
      }
    </>
  );
};

export default Views;