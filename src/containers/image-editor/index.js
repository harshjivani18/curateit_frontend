"use client";
import 'tui-image-editor/dist/tui-image-editor.css'
import "./ImageEditor.css"
import React, { useEffect, 
       useRef}                  from "react";
import { useParams, 
         useSearchParams}       from 'next/navigation'
import { useDispatch }          from 'react-redux';
import { message }              from 'antd';
import * as Editor              from "tui-image-editor";
import FileSaver                from 'file-saver';

import { 
    getImageTypeFromBase64,
    getExtFromURL 
}                               from '@utils/image-type';
// import session                  from '@utils/session';

import { updateScreenshot }     from "@actions/gems";

const ImageEditor = () => {
    const dispatch             = useDispatch();
    const searchParams         = useSearchParams();
    const url                  = searchParams.get('url');
    const { gemId, token }     = useParams();
    const imageEditorRef       = useRef(null);

    useEffect(() => {
        let instance      = null
        const onImageSave = async () => {
            if (instance) {
                const image     = instance?.toDataURL(`image/${getExtFromURL(url)}`)
                const imgResp   = await dispatch(updateScreenshot(token, { image, gemId, s3URL: url }))
                if (imgResp.error === undefined) {
                    message.success('Image saved successfully')
                }
                else {
                    message.error('An error occurred while saving the image')
                }
            }
            window.close()
        }

        const onImageDownload = () => {
            if (instance) { 
                const image     = instance?.toDataURL()
                const imageType = getImageTypeFromBase64(image)
                const fileName  = `screenshot-${new Date().getTime()}.${imageType}`
                FileSaver.saveAs(image, fileName)
            }
        }

        const div = document.createElement('div')
        div.style.backgroundColor = '#fff'
        div.style.border = '1px solid #ddd'
        div.style.color = '#222'
        div.style.fontFamily = "'Noto Sans', sans-serif"
        div.style.fontSize = '12px'
        div.textContent = 'Save'
        div.addEventListener('click', onImageSave)

        const downloadBtn = document.createElement("button")
        downloadBtn.style.backgroundColor = '#105FD3'
        downloadBtn.style.border = '1px solid #105FD3'
        downloadBtn.style.color = '#fff'
        downloadBtn.style.fontFamily = "'Noto Sans', sans-serif"
        downloadBtn.style.fontSize = '12px'
        downloadBtn.style.marginLeft = '10px'
        downloadBtn.textContent = 'Download'
        downloadBtn.addEventListener('click', onImageDownload)

        try {
            if (imageEditorRef) {
                const myTheme         = {
                    'common.bi.image': `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo.png`,
                    'common.bisize.width': '140px',
                    'common.bisize.height': '30px',
                    'common.backgroundImage': 'none',
                    'common.backgroundColor': '#ffffff',
                    'common.border': '0px',
                }
                instance  = new Editor(imageEditorRef.current, {
                    includeUI: {
                        loadImage: {
                            path: url,
                            name: 'SampleImage'
                        },
                        menu: [
                            'shape', 
                            'filter', 
                            'text', 
                            'mask', 
                            'draw', 
                            'icon', 
                            // 'image', // not working
                            'flip', 
                            'rotate', 
                            'crop', 
                            'resize'
                        ],
                        theme: myTheme,
                        initMenu: 'filter',
                        uiSize: {
                            width: "auto",
                            height: "100vh"
                        },
                        menuBarPosition: 'bottom'
                    }
                })
    
                const imageEditorControls = document.querySelector('.tui-image-editor-header-buttons')
                if (imageEditorControls?.children?.length > 1) {   
                    imageEditorControls.innerHTML = ''
                    imageEditorControls.appendChild(div)
                    imageEditorControls.appendChild(downloadBtn)
                }
            }
        }
        catch (err) {
            console.error(err)
        }

        return () => {
            if (div) {
                div.removeEventListener('click', onImageSave)
            }

            if (downloadBtn) {
                downloadBtn.removeEventListener('click', onImageDownload)
            }
        }
    }, [imageEditorRef, dispatch, url, gemId, token])

    

    return (
        <div className='main-editor-container' ref={imageEditorRef}></div>
    )
} 

export default ImageEditor;