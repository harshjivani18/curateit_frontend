"use client"
import React from 'react'
import { Avatar, Spin } from 'antd';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import "./style.css"
import session from '@utils/session';
import EditorComponent from './EditorComponent';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Editor = ({ commentVal, setCommentVal, cancelComment, respondComment, loading=false }) => {
    
    return (
        <div className="p-2 border-[1px] shadow-md rounded-md text-editor">
            <div className='flex justify-start items-center gap-2 mb-2'>
                <Avatar
                    icon={<UserCircleIcon />}
                    className="cursor-pointer"
                />
            <h3 className='font-semibold m-0 leading-5'>{session.username}</h3>
            </div>
            <div className="text-editor">
                <EditorComponent setCommentVal={setCommentVal} commentVal={commentVal} editable={true}/>
            </div>
            <div className='flex justify-end gap-2 items-center py-2'>
                <button className='border-none outline-none bg-transparent p-[0.4rem]' onClick={cancelComment}>Cancel</button>
                <Spin spinning={loading}>
                    <button className={classNames(commentVal ? 'bg-green-700' : 'bg-gray-300', 'text-white p-[0.4rem] px-4 rounded-2xl relative')} onClick={respondComment} disabled={loading || commentVal === "" }>
                    Respond
                </button>
                </Spin>
            </div>
        </div>
    )
}

export default Editor