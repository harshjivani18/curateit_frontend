import React                            from 'react'
import { RiFileCopyLine }               from 'react-icons/ri'
import { message }                      from 'antd'
import { convertHtmlToReact } from '@hedgedoc/html-to-react'

// import { copyText }                     from '../../utils/message-operations'

const HighlightBody = (props) => {
  const onTextCopy = () => {
    try {
      window.navigator.clipboard.writeText(props.text);
      message.success('Text Copied to clipboard');
    } catch (err) {
      message.error('Not have permission')
    }
  }

  // const onCopyLinkHighlight = () => {
  //   props.copyLinkToHighlight()
  // };
  
  return (
    <div className='flex justify-start items-start gap-2'>
          <p className={`flex-1 text-xs text-gray-600 flex flex-col items-center`}>{convertHtmlToReact(props.text) || "Curateit"}</p>
          <div>
              {/* <RiCheckboxBlankCircleFill className={`h-4 w-4 ${props.color && props.color.text ? props.color.text : "text-pink-400"} mb-3 cursor-pointer`} /> */}
              <RiFileCopyLine className='h-4 w-4 text-gray-500 mb-3 cursor-pointer' onClick={onTextCopy} />
              {/* <RiLinkM className='h-4 w-4 text-gray-500 cursor-pointer' onClick={onCopyLinkHighlight} /> */}
          </div>
    </div>
  )
}

export default HighlightBody