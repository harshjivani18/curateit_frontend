import React, { useState } from 'react'
import CommentHeader from './CommentHeader'
import CommentEngagement from './CommentEngagement'
import Editor from './Editor'
import { addCommentReply, deleteComment, removeComment, showCommentReplies } from '@actions/comment'
import { useDispatch } from 'react-redux'
import Replies from './Replies'
import session from '@utils/session'

const Comment = ({ comment, onResponded, isReply=false }) => {
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyVal, setReplyVal] = useState("");
  const [loading, setLoading]    = useState(false);

  const onReplyClick = () => {
    if (!showEditor && !showReplies) showRepliesHandler();
    setShowEditor(prev => !prev)
  };

  const cancelReply = () => {
    setReplyVal("");
    setShowEditor(false)
  }

  const respondReply = () => {
    setLoading(true);
    const data = {
      comment: replyVal,
      comment_by: {
        id: session.userId,
        username: session.username
      },
      comment_to: comment?.comment_to,
      page_type: comment?.page_type,
      page_id: comment?.page_id,
      comment_id: comment?._id,
      parent_comment_id: comment?.parent_comment_id || comment?._id
    }
    dispatch(addCommentReply(data)).then(res => {
      setLoading(false);
      setReplyVal("");
      setShowEditor(false)
      onResponded && onResponded();
    });
  }

  const showRepliesHandler = () => {
    dispatch(showCommentReplies({ comment_id: comment?._id })).then(res => {
      setShowReplies(true);
    });
  }
  const hideRepliesHandler = () => {
      setShowReplies(false);
  }

  const handleDeleteComment = () => {
    const data = {
      comment,
      comment_id: comment?._id,
      user_id: session?.userId
    }

    dispatch(deleteComment(data)).then(res => {
      if(res?.payload?.data?.status){
        dispatch(removeComment(comment));
      }
    });
  }


  return (
    <div>
      <div className='border-b-[1px] py-4'>
        <CommentHeader comment={comment} deleteComment={handleDeleteComment} />
        <div className='py-3' dangerouslySetInnerHTML={{ __html: comment?.comment}} />
        <CommentEngagement onReplyClick={onReplyClick} comment={comment} isReply={isReply} />
      </div>
      {showEditor  && <div className='ml-2 pl-4 border-l-[1.5px] my-1'>
        <Editor 
          commentVal={replyVal}
          setCommentVal={setReplyVal}
          cancelComment={cancelReply}
          respondComment={respondReply}
          loading={loading}
        />
      </div>}
      {comment?.replies && comment?.replies.length > 0 && <div className='pl-8'>
        {showReplies ? (
          <>
            <div className='flex justify-end mb-2'>
              <button className='text-blue-800 text-xs font-semibold' onClick={hideRepliesHandler}>Hide Replies</button>
            </div>
            <Replies replies={comment?.replies} loading={loading} parentComment={comment} />
          </>
        ): (
          <div className='flex justify-end'>
            <button className='text-blue-800 text-xs font-semibold' onClick={showRepliesHandler}>Show Replies</button>
          </div>
        )}
      </div>}
    </div>
  )
}

export default Comment