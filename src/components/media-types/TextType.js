import { useRef }                       from "react";
import { HIGHLIGHTED_COLORS }           from "@utils/constants";
import { copyText }                     from "@utils/functions"

const TextType = ({ highlightedText, highlightedColor, action, onHighlightBlur, onColorSet }) => {
    const highlightRef = useRef(null);

    const onTextCopy = () => {
        copyText(highlightedText, "Text copied to clipboard");
    }

    return (
        <div className="pt-4">
                <div className='bg-white rounded-md p-2 border-2 relative'>
                    <div>
                        <svg 
                            className='highlight-copy-svg'
                            onClick={onTextCopy}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"/></svg>
                        <div style={{height:'auto'}}
                            ref={highlightRef}
                            onBlur={() => onHighlightBlur(highlightRef.current.innerText)}
                            contentEditable={action === 'add' ? true : false}
                            className={`${highlightedColor?.border} flex-1 text-xs text-gray-500 border-l-4 pl-2 py-0 outline-none highlight-content-container`}>
                            {highlightedText}
                        </div>
                    </div>
                    <div className='flex justify-end items-baseline space-x-3'>
                        <div className='flex justify-end space-x-2 items-center'>
                            {HIGHLIGHTED_COLORS.map(color => (
                                <button 
                                    key={color.id} 
                                    style={{backgroundColor: `${color.bg}`}}
                                    className={'flex justify-center items-center h-4 w-4 rounded-full border-[1px] border-gray-400'}
                                    onClick={() => { 
                                        onColorSet(color, color.className)
                                    }}
                                >
                                    <CheckIcon 
                                    className={`${color.id === highlightedColor?.id ? "" : color.text} h-2 w-2`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default TextType