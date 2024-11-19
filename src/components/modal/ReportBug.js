"use client";

import './ReportBug.css';
import React, { useState }                 from "react";
import { FileUploader }                    from "react-drag-drop-files";
import { WithContext as ReactTags }        from 'react-tag-input';
import { FiUpload }                        from "react-icons/fi";

import { Modal, Input,
         message, Button, 
         Spin, Avatar, Badge,
         Select }                          from "antd";

import { FEEDBACK_TYPES, 
         KEY_CODES }                       from "@utils/constants";     
import { FIELD_REQUIRED }                  from '@utils/messages';
import session                             from "@utils/session";
import { Validator }                       from "@utils/validations";

import { addReportBug,
         uploadImage,
         deleteImage }                     from "@actions/report-bugs";     
import { addTag }                          from "@actions/tags";
import { useDispatch } from 'react-redux';
         
const { Option }        = Select;
const { TextArea }      = Input;
const fileTypes         = ["JPG", "PNG", "GIF","JPEG","WEBP"];

const ReportBug = ({ showPopup, onCancel }) => {
    const dispatch                   = useDispatch()
    const [title,setTitle]           = useState('')
    const [url,setUrl]               = useState('')
    const [description,
           setDescription]           = useState('')
    const [feedbackTag,
           setFeedbackTag]           = useState([])
    const [category,setCategory]     = useState(FEEDBACK_TYPES[1].name || null)
    const [loadingImg,setLoadingImg] = useState(false)
    const [imageFiles,setImageFiles] = useState([])

    const [titleError,setTitleError] = useState('')
    const [imageFilesError,
           setImageFilesError]       = useState('')

    const children = [];
    for (let i = 0; i < FEEDBACK_TYPES.length; i++) {
        children.push(<Option key={FEEDBACK_TYPES[i].name}>{FEEDBACK_TYPES[i].name}</Option>);
    }

    const uploadImg = async(file) => {
        const formData = new FormData();

        formData.append('files',file)

        const res = await dispatch(uploadImage(formData))
        return res;
    }

    const handleChange = async(files) => {
        const temp =[]
        
        for (let i = 0; i < files.length; i++) {
            setLoadingImg(true)
            const res = await uploadImg(files[i])
            if(res.error === undefined){
                setLoadingImg(false)
                const img = res.payload.data.media[0]
                temp.push(img)
            }else{
                setLoadingImg(false)
            }
        }

        setImageFiles([...imageFiles,...temp])
        setImageFilesError('')
    };

    const renderFileUploader = () => {
        return (
            <>
                <FileUploader 
                handleChange={handleChange} 
                name="drop-zone-section-file" 
                types={fileTypes} 
                onTypeError={(err) => message.error(err)}
                multiple={true}
                disabled={loadingImg}
                >
                    <div className='my-0 mx-auto w-[348px] h-[218px] bg-white border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center'>
                        <div>
                            <FiUpload className='h-6 w-6 text-gray-500 my-0 mx-auto mb-2' disabled={loadingImg}/>
                            <span>Drag & drop to upload attachment</span>
                            <div className='flex justify-center items-center gap-2 mt-2'>
                                <hr className='w-12' />
                                <span className='text-gray-500'>OR</span>
                                <hr className='w-12' />
                            </div>
                            <Button variant="mt-2 primary" disabled={loadingImg}>Browse Attachment</Button>
                        </div>
                    </div>
                </FileUploader>
            </>
        )
    }

    //with tag apis
    const onTagDelete = (i) => {
        feedbackTag.splice(i, 1)
        setFeedbackTag([ ...feedbackTag ])
    }

    const onTagAdd = async (tag) => {
        const res = await dispatch(addTag({ data: { tag: tag.text, users: session.userId }}))
        if (res.error === undefined && res.payload.error === undefined) {
            setFeedbackTag([ ...feedbackTag, { id: res.payload?.data?.data?.id ,tag: tag.text} ])
        }
    }

    const handleTitle = (e) => {
        const { value } = e.target
        setTitleError(Validator.validate('title',value,null,null,true))
        setTitle(value)
    }

    const resetValues = () => {
        setTitle('')
        setDescription('')
        setFeedbackTag([])
        setImageFiles([])
        setTitleError('')
        setImageFilesError('')
    }


    const onSubmitReportBug = async () => {
        if (titleError !== '' || title === '') {
            setTitleError(title === "" ? FIELD_REQUIRED : titleError)
            // setImageFilesError(imageFiles.length === 0 ? 'Please Upload an Image' : '')
            return;
        } 

        const tagsWithIdOnly = (feedbackTag && feedbackTag.length>0)? feedbackTag.map(item => item.id) : []

        const payload = {
            title,
            description,
            url,
            tags:tagsWithIdOnly,
            category,
            isExtension: true,
            imageLinks: imageFiles
        }
        
        const res = await dispatch(addReportBug(payload))

        resetValues()
        onCancel()
        if(res.error === undefined){
            message.success('Report has been submitted');
        }else{
            message.error('Error Occured!.Try again later');
        }
    }

    const handleDeleteImage = async(image) => {
        setLoadingImg(true)
        const res = await dispatch(deleteImage(image))
        
        if(res.error === undefined){
            const existing = imageFiles.filter(item => item !== image)
            setLoadingImg(false)
            setImageFiles([...existing])
        }else{
            setLoadingImg(false)
        }
    }

    return (
        <Modal title="Report Bug"
               open={showPopup}
               okText="Submit"
               onOk={onSubmitReportBug}
               className="welcome-modal-container"
               onCancel={onCancel}>
            <div className='h-full'>
                <div className='mt-4'>
                    <h6 className='text-xs text-gray-500 mb-1'>Title</h6>
                    <Input size="medium w-full mb-2" className="rounded-md" type="text" name="link" placeholder="Enter Title" 
                        value={title} 
                        onChange={handleTitle}
                    />
                    <span className='errorLabel'>{titleError}</span>
                </div>

                <div className='mt-4'>
                    <h6 className='text-xs text-gray-500 mb-1'>URL</h6>
                    <Input size="medium w-full mb-2" type="text" name="link" placeholder="Enter URL" className="rounded-md"
                        value={url} 
                        onChange={(e)=>setUrl(e.target.value)}
                    />
                </div>

                <div className='mt-4'>
                    <h6 className='text-xs text-gray-500 mb-1'>Description</h6>
                    <TextArea placeholder='Enter Description' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    className='w-full text-sm p-2 border-2 rounded-md h-14 resize-none outline-none'></TextArea>
                </div>

                <div className='mt-4'>
                    <h6 className='text-xs text-gray-500 mb-1'>Category</h6>
                    <Select placeholder="Select" className='w-full rounded-md'
                        onChange={value => setCategory(value)}
                        value={category}
                        >
                        {children}
                    </Select>
                </div>

                <div className='mt-4'>
                    <h6 className='text-xs text-gray-500 mb-1'>Feedback Tags</h6>
                    <div className='bg-white border-2 border-gary-400 p-2 rounded-lg'>
                        <ReactTags 
                            tags={feedbackTag.map((t) => { return { id: t.tag, text: t.tag }  })}
                            delimiters={[KEY_CODES.enter, KEY_CODES.comma]}
                            handleDelete={onTagDelete}
                            handleAddition={onTagAdd}
                            inputFieldPosition="bottom"
                            placeholder="Enter Feedback Tag"
                            autocomplete
                            clearAll
                            onClearAll={() => setFeedbackTag([])}
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <h6 className='text-xs text-gray-500 mb-1'>Attachment</h6>
                    <div className='my-0 mx-auto w-[348px] h-[218px]'>
                        {
                        loadingImg ? 
                        <div className="flex items-center justify-center">
                            <Spin size='middle' tip='Loading...'/>
                        </div> : 
                        renderFileUploader()
                        }

                        <span className='errorLabel'>{imageFilesError}</span>               
                    </div>

                    {
                        loadingImg ? '' : 
                        <div className="mt-4 flex flex-wrap items-center">
                        {
                        imageFiles && imageFiles.length>0 && imageFiles.map((item,i) => (
                            <div key={i} style={{marginRight:'20px'}}>
                                <Badge
                                count='X'
                                style={{cursor:'pointer'}}
                                onClick={() => handleDeleteImage(item)}
                                >
                                    <Avatar
                                        src={item}
                                        size={50}
                                        shape='square'
                                    />
                                </Badge>
                            </div>
                        ))
                        }
                    </div>
                    }
                    
                </div>
            </div>
        </Modal>
    )
}

export default ReportBug