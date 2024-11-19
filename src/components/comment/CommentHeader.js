import { TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Avatar } from 'antd'
import React from 'react'
import moment from 'moment'
import session from '@utils/session'

const CommentHeader = ({ comment, deleteComment }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex justify-start items-center gap-2'>
        <Avatar
          icon={<UserCircleIcon />}
          className="cursor-pointer"
        />
        <div>
          <h3 className='font-semibold m-0 leading-5'>{comment?.comment_by?.username}</h3>
          <h6 className='text-gray-600 text-xs m-0 leading-3'>{moment(comment?.updatedAt).fromNow()}</h6>
        </div>
      </div>
      {comment?.comment_by?.id.toString() === session?.userId?.toString() && <TrashIcon className='w-5 h-5 text-red-400 cursor-pointer' onClick={deleteComment} />}
    </div>
  )
}

export default CommentHeader