import { getPageConfig } from "@actions/bookmark";
import { getRandomBookmarkGem } from "@actions/collection";
import MoodboardView from "@components/views/MoodboardView";
import { defaultPropertyOrder } from "@utils/constants";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RelatedGems = ({bookmark,handleShowAddToBookmark,shrink,setShrink,gemPublicView,openPagesIn,handleOpenPagesIn,showComment,gemId}) => {
    const dispatch = useDispatch()
    const [items,setItems] = useState([])
    const [totalRandomGemsCount,setTotalRandomGemsCount] = useState(0)
    const [page,setPage] = useState(1)
    const [propertyOrder, setPropertyOrder] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const getRandomGems = async (page) => {

    if(!gemPublicView){
        if(page === 1){
        setLoading(true)
        }else{
            setLoading(false)
        }

        if(page !== 1){
            setButtonLoading(true)
        }
      const res = await dispatch(
      getRandomBookmarkGem({ gemId: gemId, page: page })
      );
      if(page === 1){
        const res1 = await dispatch(getPageConfig());
        setPropertyOrder(res1?.payload?.data?.data?.propertyOrder);
      } 
      if (
        res?.payload?.data?.data?.id &&
        res?.payload?.data?.data?.attributes?.randomGems
      ) {
        setItems((prev) => [...prev,...res?.payload?.data?.data?.attributes?.randomGems])
        setTotalRandomGemsCount(res?.payload?.data?.data?.attributes?.totalCount)
      }
      setButtonLoading(false)
      setLoading(false)
      return;
    }
    
    if(page === 1){
        setLoading(true)
    }else{
        setLoading(false)
    }

    if(page !== 1){
        setButtonLoading(true)
    }
    const res = await dispatch(getRandomBookmarkGem({ gemId: gemId, page: page }));
    if (
        res?.payload?.data?.data?.id &&
        res?.payload?.data?.data?.attributes?.randomGems
      ){
        setItems((prev) => [...prev,...res?.payload?.data?.data?.attributes?.randomGems])
        setPropertyOrder(defaultPropertyOrder?.moodboard?.propertyOrder)
        setTotalRandomGemsCount(res?.payload?.data?.data?.attributes?.totalCount)
      }

      setButtonLoading(false)
      setLoading(false)
};


    useEffect(() => {
        getRandomGems(1)
    },[gemId])

    const loadMore = () => {
        const nextPage = page + 1;
        getRandomGems(nextPage);
        setPage(nextPage);
    };

    if(loading){
        return(
            <div className="w-full flex items-center justify-center mt-4">
            <Spin size="medium"/>
            </div>
        )
    }
    return(
        <>
        {
        items?.length>0 &&
        <div className="mt-4">
        <h2 className="text-lg font-semibold text-center">Related Gems</h2>
        <div>
          <MoodboardView
            items={items}
            propertyOrder={propertyOrder}
            page="random-bookmark"
            cardSize={"large"}
            user={bookmark?.attributes?.author?.data?.attributes}
            showAddToBookmark={handleShowAddToBookmark}
            showComment={showComment}
            openPagesIn={openPagesIn}
            handleOpenPagesIn={handleOpenPagesIn}
            shrink={shrink}
            setShrink={setShrink}
            gemPublicView={gemPublicView}
          />
        </div>
        {items?.length < totalRandomGemsCount && (
          <div className="flex justify-center items-center py-2">
            <button
              className={`${buttonLoading && 'cursor-not-allowed'} px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-2xl text-white`}
              onClick={loadMore}
              disabled={buttonLoading}
            >
              {buttonLoading ? 'Loading' : 'See more'}
            </button>
          </div>
        )}
        </div>
        }
        </>
        
    )
}

export default RelatedGems;