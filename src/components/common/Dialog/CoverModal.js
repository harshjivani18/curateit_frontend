import { Button, Input, Modal, Spin, Tabs, message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FileUploader } from 'react-drag-drop-files'
import { FiUpload } from "react-icons/fi"
import ImageList from "@components/common/ImageList";
import { GALLEY_UPLOAD_COLORS} from "@utils/constants";
import { debounceFunction } from "@utils/functions";
import { BiLogoUnsplash } from "react-icons/bi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const fileTypes = ["JPG", "PNG", "GIF","JPEG","WEBP"];

const CoverModal = ({setOpenCoverModal,openCoverModal,selectedCoverImage,setSelectedCoverImage,handleImageUploadChange,loadingCoverImg,handleCoverModalSubmit,collectionCoverImage,handleDeleteCoverS3Link,handleUnSplashUploadChange,selectedCoverUnSplash,setSelectedCoverUnSplash,selectedCoverGallery,setSelectedCoverGallery,handleGalleryUploadChange,title}) => {

    const [tabKey,setTabKey] = useState('Gallery')
    const [randomImages,setRandomImages] = useState([])
    const [searchImages,setSearchImages] = useState([])
    const [searchText,setSearchText] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getCall = async () => {
            setLoading(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_UNSPLASH_API}/photos/random?count=12&&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}`)
            setRandomImages(res.data)
            setLoading(false)
        }

        getCall()
    },[])


    const getSearchPhotos = useCallback(async (value) => {
        if (totalPages && page > totalPages) return;
        setLoading(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_UNSPLASH_API}/search/photos?query=${value}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY}&page=${page}`)
        setSearchImages([...searchImages,...res.data.results])
        setTotalPages(res.data.total_pages)
        setPage(page + 1)
        setLoading(false)
    }, [page, searchImages, totalPages])

    const handleSearchChange = useCallback((value) => {
        if(!value){
            setSearchImages([])
            setPage(1)
            setTotalPages(null)
            return;
        }

        setSearchText(value)
        getSearchPhotos(value)
    }, [getSearchPhotos])

    const debounceOnChange = useCallback(debounceFunction(handleSearchChange, 500), []);

    const renderGallery = () => {
        return(
            <div className="w-full flex flex-wrap py-0">
                {
                GALLEY_UPLOAD_COLORS.map(item => (
                <div className="w-[25%] p-1 cursor-pointer" key={item.id} onClick={(e) => handleGalleryUploadChange(e)}>
                    <div className={`w-[120px] h-[64px] rounded-[3px]`} style={{background: item.bg}}>
                    </div>
                </div>
                ))
                }
            </div>
        )
    }

    const renderUpload = () => {
        return(
        <div>
            <FileUploader 
            handleChange={handleImageUploadChange} 
            name="drop-zone-section-file" 
            types={fileTypes} 
            onTypeError={(err) => message.error(err)}
            disabled={loadingCoverImg}
        >
        <div className='my-0 mx-auto w-[348px] h-[218px] bg-white border-2 border-dashed border-gray-400 flex text-center justify-center align-middle items-center'>
            <div>
                <FiUpload className='h-6 w-6 text-gray-500 my-0 mx-auto mb-2' 
                disabled={loadingCoverImg}
                />
                <span>Drag & drop to upload file</span>
                <div className='flex justify-center items-center gap-2 mt-2'>
                    <hr className='w-12' />
                    <span className='text-gray-500'>OR</span>
                    <hr className='w-12' />
                </div>
                <Button variant="mt-2 primary" 
                disabled={loadingCoverImg}
                >Browse File</Button>
                </div>
            </div>
            </FileUploader>

            <div className='mt-3 w-full flex items-center justify-center flex-col'>
                <div className='text-sm text-[#37352fa6]'>
                    Images wider than 1500 pixels work best.
                </div>
                <div className='text-sm text-[#37352fa6] mt-2'>
                    The maximum size per file is 5 MB.
                </div>
            </div>
        </div>
        )
    }

    const renderUnsplash = () => {
        return(
            <>
            <Input placeholder="Search for an image" className="mb-4 rounded-[50px]" onChange={e => debounceOnChange(e.target.value)}
            prefix={<MagnifyingGlassIcon className="h-4 w-4 text-[#a8a1a1]"/>}
            />

            <div className="w-full flex flex-wrap py-0">
                <ImageList data={searchImages.length>0 ? searchImages : randomImages} handleUnSplashUploadChange={handleUnSplashUploadChange}/>
            </div>

            {
            loading && <div className="flex items-center justify-center my-1">
                        <Spin size='middle' tip='Loading...'/>
                    </div>
            }

            {
            searchImages?.length > 0 &&
                <div className="text-center">
                    <Button type="link" onClick={(e) => {
                    e.stopPropagation();
                    getSearchPhotos(searchText)
                }}>See more</Button>
                </div>
            }
            
            </>
        )
    }

    const handleTabChange = (key) => {
        setTabKey(key)
    }

    return(
        <>
        {
        openCoverModal && 
        <Modal 
        width={'550px'}
        title={title}
        open={openCoverModal} 
        onOk={handleCoverModalSubmit} 
        onCancel={() => {
            setSelectedCoverImage('')
            setSelectedCoverGallery('')
            setSelectedCoverUnSplash('')
            setOpenCoverModal(false)
            setSearchImages([])
            setPage(1)
            setTotalPages(null)
        }}
        maskClosable={false}
        okButtonProps={{
          className: "bg-[#40a9ff] border-[#40a9ff]",
          disabled: loadingCoverImg
        }}
        cancelButtonProps= {{
          disabled: loadingCoverImg  
        }}
        >
        <>
        {
        collectionCoverImage && (collectionCoverImage?.type === 'upload' || collectionCoverImage?.type === 'unsplash') &&
        <div className="flex justify-between w-full">
            <div>
                <img src={collectionCoverImage?.icon} alt="Cover modal selected image" className="h-[100px]"/>
            </div>

            <div className="text-right">
                <Button type="text" className="text-[#EB5757] hover:text-[#EB5757]" onClick={handleDeleteCoverS3Link} disabled={loadingCoverImg}>Remove Cover</Button>
            </div>
            
        </div>
        }
        {
        collectionCoverImage && collectionCoverImage?.type === 'gallery' && collectionCoverImage?.icon !=='#fff' &&
        <div className="flex justify-between w-full">
            <div className="w-[100px] h-[100px]" style={{background: collectionCoverImage?.icon}}>
            </div>

            <div className="text-right">
                <Button type="text" className="text-[#EB5757] hover:text-[#EB5757]" onClick={handleDeleteCoverS3Link} disabled={loadingCoverImg}>Remove Cover</Button>
            </div>
            
        </div>
        }

        <div className="">
            {
            selectedCoverImage &&
            <div className='flex items-center mr-2'>
              <div className="mr-2">Your selected cover is:</div>
              <img src={URL.createObjectURL(selectedCoverImage) || ""} alt="Selected cover image" className="h-[100px]"/>
            </div>
            }
            {
            selectedCoverUnSplash &&
            <div className='flex items-center mr-2'>
              <div className="mr-2">Your selected cover is:</div>
              <div className="truncate">
                <img src={selectedCoverUnSplash} alt="Selected cover image" className="h-[100px]"/>
              </div>
            </div>
            }
            {
            selectedCoverGallery &&
            <div className='flex items-center mr-2'>
              <div className="mr-2">Your selected cover is:</div>
              <div className="mr-2">{selectedCoverGallery}</div>   
            </div>
            }
        </div>

        <Tabs
                defaultActiveKey={tabKey}
                onChange={handleTabChange}
                items={[
                {
                    label: `Gallery`,
                    key: 'Gallery',
                    children: renderGallery(),
                },
                {
                    label: `Upload`,
                    key: 'Upload',
                    children: renderUpload(),
                },
                {
                    label: <div className="flex items-center">
                        <BiLogoUnsplash className="h-5 w-5 mr-1"/>
                        <div>Unsplash</div>
                    </div>,
                    key: 'Unsplash',
                    children: renderUnsplash(),
                },
                ]}
            />
        </>
        </Modal>
        }
        </>
    )
}

export default CoverModal;