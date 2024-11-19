import React from 'react'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { voteComment } from '@actions/comment';
import { countReplies } from '@utils/find-collection-id';
import session from '@utils/session';
import { openAuthModal } from '@actions/app';
import { useParams, usePathname } from 'next/navigation';


const CommentEngagement = ({ onReplyClick, comment, isReply }) => {
    const dispatch = useDispatch();

    const searchParams = useParams();
    const searchPathname = usePathname();
    const uname = searchParams?.username;
    const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
    const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
    const slug = searchParams?.name;
    // const searchParams = window.location.pathname.split("/");
    // const uname = searchParams[2];
    // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
    // const idOfGem = searchParams[4];
    // const slug = searchParams[5];

    const handleVoteComment = (type) => {

        let payload = {};
        if(type === "upvote"){
            payload = {
                comment_id : comment?._id,
                user_id : session?.userId,
                upvotes: 1
            }
        }else{
            payload = {
                comment_id: comment?._id,
                user_id: session?.userId,
                downvotes: 1
            }
        }

        dispatch(voteComment(payload));


    };


  return (
    <div className='flex justify-between items-baseline text-sm'>
        <div className='flex justify-start items-center gap-3'>
              <div className='flex justify-start items-center gap-1 cursor-pointer' 
              onClick={() => {
                if(session && session?.userId){
                    handleVoteComment('upvote')
                }else{
                    dispatch(openAuthModal({
                        open: true,
                        action: 'login',
                        extraInfo: {
                            trigger: 'upvote',
                            username: uname,
                            id: sourceId,
                            module: module,
                            slug: slug
                        }
                    }))
                }
              }}
              >
                  {comment?.upvotes.findIndex(vote => vote?.userId?.toString() === session?.userId?.toString()) !== -1 ? (
                      <img className='w-4 h-4' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/box-arrow-up-solid.svg`} alt="Upvote solid icon" />
                  ):(
                      <img className='w-4 h-4' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/box-arrow-up.svg`} alt="Upvote normal icon" />
                  )}
                  <span>{comment?.upvotes && comment?.upvotes.length}</span>
              </div>
              <div className='flex justify-start items-center gap-1 cursor-pointer' 
              onClick={() => {
                if(session && session?.userId){
                    handleVoteComment('downvote')
                }else{
                    dispatch(openAuthModal({
                        open: true,
                        action: 'login',
                        extraInfo: {
                            trigger: 'downvote',
                            username: uname,
                            id: sourceId,
                            module: module,
                            slug: slug
                        }
                    }))
                }
              }}
              >
                  
                  {comment?.downvotes.findIndex(vote => vote?.userId?.toString() === session?.userId?.toString()) !== -1 ? (
                      <img className='w-4 h-4' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/box-arrow-down-solid.svg`} alt="Upvote solid icon" />
                  ) : (
                    <img className='w-4 h-4' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/box-arrow-down.svg`} alt="Upvote normal icon" />
                  )}
                  <span>{comment?.downvotes && comment?.downvotes.length}</span>
              </div>
              {!isReply && <div className='flex justify-start items-center gap-1'>
                  <ChatBubbleOvalLeftIcon className='w-4 h-4' />
                  <span>{comment?.replies && countReplies(comment?.replies)}</span>
              </div>}
        </div>
        <button className='outline-none border-none' onClick={() => {
            if(session && session?.userId){
                onReplyClick()
            }else{
                dispatch(openAuthModal({
                        open: true,
                        action: 'login',
                        extraInfo: {
                            trigger: 'reply',
                            username: uname,
                            id: sourceId,
                            module: module,
                            slug: slug
                        }
                    }))
            }
        }}>Reply</button>
    </div>
  )
}

export default CommentEngagement