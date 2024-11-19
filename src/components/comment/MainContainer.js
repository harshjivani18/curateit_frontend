import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllComment, getMoreComment } from '@actions/comment';
import { Spin } from 'antd';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CommentContainer } from './CommentContainer';

const MainContainer = ({ hideCommentDrawer, openDrawer, selectedGem, user, hideCloseButton = false, onResponded=null }) => {
    const dispatch = useDispatch();
    const totalCount = useSelector(state => state.comments?.totalComments);
    const getAllComments = useSelector(state => state.comments.comments)
    const [processingData, setProcessingData] = useState(false);
    const [totalResponses, setTotalResponse] = useState(totalCount || 0);
    const [allComments, setAllComments] = useState(getAllComments || []);
    const [loadingMore, setLoadingMore] = useState(false);
    const [noMoreComments, setNoMoreComments] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const perPageCount = 20;

    useEffect(() => {
        setTotalResponse(totalCount);
        setAllComments(getAllComments);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalCount, getAllComments])

    useEffect(() => {
        if (openDrawer && selectedGem) {
            setProcessingData(true);
            setPageNo(0);
            setNoMoreComments(false);
            const payload = {
                page_id: selectedGem,
                type: "gem",
                per_page: perPageCount,
                pageNo: 0,
                skip: 0,
            }
            dispatch(getAllComment(payload)).then(res => {
                setNoMoreComments(res?.payload?.data.data.noMoreReplies);
                setPageNo(prev => prev + 1);
                setProcessingData(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openDrawer, selectedGem])

    const loadMoreComment = () => {
        setLoadingMore(true);
        const payload = {
            page_id: selectedGem,
            type: "gem",
            per_page: perPageCount,
            pageNo,
            skip: allComments.length
        }
        dispatch(getMoreComment(payload)).then(res => {
            setNoMoreComments(res?.payload?.data.data.noMoreReplies);
            setPageNo(prev => prev + 1);
            setLoadingMore(false);
        });
    }

    const Header = () => (
        <div className='flex justify-between items-center mb-2'>
            <h2 className='font-bold text-lg'>Comments {totalResponses > 0 ? `(${totalResponses})` : ""}</h2>
            {!hideCloseButton && <button className='outline-none border-none' onClick={() => hideCommentDrawer(false)}>
                <XMarkIcon className='h-5 w-5 text-gray-700' />
            </button>}
        </div>
    )



    return (
        <div>
            <Header />
            {processingData ? (
                <div className="spinDiv">
                    <Spin size='middle' tip='Loading...' />
                </div>
            ) :
                (<>
                    <CommentContainer selectedGem={selectedGem} user={user} onResponded={onResponded} />
                    {!noMoreComments &&
                        <div className='flex justify-center py-4'>
                            {loadingMore ?
                                (
                                    <Spin size='small' tip='Loading...' />
                                )
                                : (
                                    <button className='bg-light-blue rounded-full px-4 py-[0.2rem] text-white' onClick={loadMoreComment}>
                                        Load more
                                    </button>)}
                        </div>
                    }
                </>)}
        </div>
    )
}

export default MainContainer