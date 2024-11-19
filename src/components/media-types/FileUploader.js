import { getPlanService } from '@actions/plan-service'
import React, { useRef } from 'react'

const FileUploader = ({ onFileChange, mediaType }) => {
    const fileRef = useRef(null)

    const onUploadFileClick = () => {
        if (fileRef) {
            fileRef.current.click()
        }
    }

    const onFileUpload = async (e) => {
        const { files } = e.target
        const file = files[0]
        const filePath = file.name;
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        // if (fileSize > 25) {
        //     message.error('File size must be less than 25MB');
        //     return
        // }
        const planFileSize = await dispatch(getPlanService(session.userId))
        const planFileSizeMB = parseInt(planFileSize?.payload?.data?.data?.file_upload_size_limit) / 1024 / 1024;

        if (fileSize >= planFileSizeMB) {
            message.error('File size must be less than 25MB');
            return
        }


        onFileChange && onFileChange(file, filePath)
    }

    if(mediaType === 'PDF'){
        return (
            <>
                <input type={"file"} className={"hidden"} onChange={onFileUpload} ref={fileRef} accept='application/pdf' />
                <Button onClick={onUploadFileClick}>Upload PDF!</Button>
            </>
        )
    }
    if(mediaType === 'Audio'){
        return (
            <>
                <input type={"file"} className={"hidden"} onChange={onFileUpload} ref={fileRef} accept="audio/*" />
                <Button onClick={onUploadFileClick}>Upload Audio!</Button>
            </>
        )
    }
    if (mediaType === 'Video'){
        return (
            <>
                <input type={"file"} className={"hidden"} onChange={onFileUpload} ref={fileRef} accept="video/*" />
                <Button onClick={onUploadFileClick}>Upload Video!</Button>
            </>
        )
    }
    if(mediaType === 'Image'){
        return (
            <>
                <input type={"file"} className={"hidden"} onChange={onFileUpload} ref={fileRef} accept="image/*" />
                <Button onClick={onUploadFileClick}>Upload Image!</Button>
            </>
        )
    }
    if(mediaType === 'Testimonial'){
        return (
            <>
                <input type={"file"} className={"hidden"} onChange={onFileUpload} ref={fileRef} accept="image/*" />
                <Button onClick={onUploadFileClick}>Upload Image!</Button>
            </>
        )
    }
    return null;
}

export default FileUploader