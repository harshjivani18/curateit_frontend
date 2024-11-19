import React                from 'react'
import { BsLink45Deg }      from 'react-icons/bs'
import { FiDownload, FiEye }       from 'react-icons/fi'

const FloatingButtons = (props) => {

    const onLinkCopy = () => {
        props.onLinkCopy && props.onLinkCopy()
    }

    const onDownload = () => {
        props.onDownload && props.onDownload()
    }

    const onShowPreview = () => {
        props.onPreview && props.onPreview()
    }

    return (
        <div className='flex flex-col gap-2 absolute right-2 top-2'>
            <button className='flex justify-center items-center h-7 w-7 rounded-md bg-slate-200 bg-opacity-40 hover:bg-opacity-60' onClick={onLinkCopy}>
                <BsLink45Deg className='text-white h-5 w -5' />
            </button>
            {!props.isHidePreview && 
                <button className='flex justify-center items-center h-7 w-7 rounded-md bg-slate-200 bg-opacity-40 hover:bg-opacity-60' onClick={onShowPreview}>
                    <FiEye className='text-white h-5 w -5' />
                </button>
            }
            {!props.isHideDownload &&
                <button className='flex justify-center items-center h-7 w-7 rounded-md bg-slate-200 bg-opacity-40 hover:bg-opacity-60' onClick={onDownload}>
                    <FiDownload className='text-white h-5 w -5' />
                </button>
            }
        </div>
    )
}

export default FloatingButtons