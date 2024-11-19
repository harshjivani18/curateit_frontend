import { useState }             from "react"
import FileUploader             from "./FileUploader"

const ImageFileType = () => {

    const [imageSrc, 
           setImageSrc]             = useState(null)
    const [imageFile, 
           setImageFile]            = useState(null)
    const [textExtractLoading, 
           setTextExtractLoading]   = useState(false)

    const onFileChange = (file, filePath) => {
        const url = URL.createObjectURL(file)
        setImageFile(file)
        setImageSrc(url)
        URL.revokeObjectURL(file)
        return;
    }

    const onDownloadImg = (url) => {
        const element = document.createElement('a');
        element.href = url;
        element.download = url;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const onEditImageClick = () => {

    }

    return (
        <div className="pt-4 relative">
            <div className="image-header">
                <h6 className="block text-xs font-medium text-gray-500 mb-1">Image</h6>
                {imageSrc &&
                    <div className="flex items-center justify-end w-full">   
                        <Tooltip 
                        title= {textExtractLoading ? "Extracting Image Text" : "Copy image text"} placement="bottom"
                        >
                            {textExtractLoading 
                                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" title="Extracting Image Text" className="mr-10 cursor-pointer" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z"/></svg> 
                                : <svg onClick={onCopyImageText} className="mr-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" title="Extracting Image Text" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
                            }
                        </Tooltip>
                        <Tooltip title="Download Image" placement="bottom">
                            <svg 
                            onClick={() => onDownloadImg(imageSrc)}
                            className="mr-10 cursor-pointer"
                            title="Download"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z"/></svg>
                        </Tooltip>
                        <Tooltip title="Copy Image Link" placement="bottom">
                            <svg 
                            onClick={onCopyImageLink}
                            className="mr-5 cursor-pointer"
                            title="Copy Text"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z"/></svg>
                        </Tooltip>
                        {action !== 'add' && <Tooltip title="Edit Image" placement="bottom">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                className="cursor-pointer"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                width="20" height="20"
                                onClick={onEditImageClick}>
                                <path stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>
                        </Tooltip>}
                    </div>
                }
            </div>
            <div className='bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer'>
                <div>
                    {imageSrc 
                        ? <img src={imageSrc ? imageSrc : ''} alt="Curateit logo" /> 
                        : <FileUploader mediaType={'Image'} onFileChange={onFileChange} />}
                </div>
            </div>
        </div>
    )
}

export default ImageFileType