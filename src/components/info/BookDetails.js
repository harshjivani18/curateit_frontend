import "./BookDetails.css"
import React, { 
       useState, 
       useEffect }          from 'react'
import { useDispatch }      from 'react-redux';
import { Spin, Rate }       from 'antd';
import { RiUser2Line,
         RiPriceTagLine,
         RiCalendar2Line,
         RiLinksLine,
         RiPagesLine }      from 'react-icons/ri';

import { getBookDetails }   from '../../actions/bookmark';
// import CopyToClipboard from 'react-copy-to-clipboard';
// import { RiStackLine } from 'react-icons/ri';
// import ImageViewer from '../imageViewer/ImageViewer';
// import CompanyDetail from '../companyDetail/CompanyDetail';
// import Social from '../socialLinks/SocialLinks';
// import Technology from '../technology/Technology';
// import MetaDetails from '../metaDetails/MetaDetails';
// import Image from '../image/Image';
// import SimilarCompanies from '../similarCompany.js/SimilarCompanies';
// import Branding from '../branding/Branding';
// import { CheckIcon } from '@heroicons/react/24/outline';
// import { AiOutlineCopy } from 'react-icons/ai';
// import { IoOpenOutline } from "react-icons/io5

const BookDetails = ({ title, altInfo }) => {
    const dispatch              = useDispatch();
    const [isLoading,
           setIsLoading]        = useState(false)
    const [book, setBook]       = useState(null)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getBookDetails(title)).then((res) => {
            setIsLoading(false)
            if (res.error === undefined) {
                if (res?.payload?.data?.items && res?.payload?.data?.items?.length !== 0) {
                    setBook(res?.payload?.data?.items[0])
                }
            }
        })
    }, [dispatch, title])

    const renderBookInformation = (book) => {
        return (
            <>
                {book?.volumeInfo?.imageLinks?.thumbnail && <div className="div-icon">
                    <img src={book?.volumeInfo?.imageLinks?.thumbnail} alt={altInfo} className="w-40 h-40" />
                </div>}
                <div className="isbn-number">
                    <span className="text-md font-bold">{book?.volumeInfo?.industryIdentifiers && book?.volumeInfo?.industryIdentifiers?.length !== 0 ? book?.volumeInfo?.industryIdentifiers[0]?.identifier : book?.id}</span>
                </div>
                <br/>
                <div className="rating-count">
                    <div className="rating-row">
                        <RiPagesLine className='mr-1' />
                        <span className="text-md font-bold">{book?.volumeInfo?.pageCount}</span>
                    </div>
                    <div className="rating-row">
                        <Rate allowHalf defaultValue={book?.volumeInfo?.averageRating} disabled />
                    </div>
                </div>
                <br />
                <div>
                    <span className="text-md font-bold">{book?.volumeInfo?.title}</span>
                    {book?.volumeInfo?.description && (
                        <p className="text-sm text-gray-500 py-2">
                            {book?.volumeInfo?.description}
                        </p>
                    )}
                </div>
                
                {book?.volumeInfo?.authors && <>
                    <br />
                <div className="text-sm">
                    <div className="flex justify-start items-center mb-3">
                        <RiUser2Line className="mr-2 h-5 w-5" />
                        <span className="text-md font-bold">{book?.volumeInfo?.authors?.length > 1 ? "Authors" : "Author"}</span>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <span className="col-span-2">
                        {book?.volumeInfo?.authors?.map((a) => { return a }).join(", ")}
                    </span>
                </div></>}
                <br />
                <div className="text-sm">
                    <div className="flex justify-start items-center mb-3">
                        <RiPriceTagLine className="mr-2 h-5 w-5" />
                        <span className="text-md font-bold">{book?.volumeInfo?.categories.length > 1 ? "Categories" : "Category"}</span>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <span className="col-span-2">
                        {book?.volumeInfo?.categories.map((a) => { return a }).join(", ")}
                    </span>
                </div>
                <br />
                {book?.volumeInfo?.publishedDate && <div className="text-sm">
                    <div className="flex justify-start items-center mb-3">
                        <RiCalendar2Line className="mr-2 h-5 w-5" />
                        <span className="text-md font-bold">Published At</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <span className="col-span-2">
                            {book?.volumeInfo?.publishedDate}
                        </span>
                    </div>
                </div>}
                <br />
                {book?.volumeInfo?.infoLink && <div className="text-sm">
                    <div className="flex justify-end items-center mb-3">
                        <a className="text-md text-blue-800 flex" href={book?.volumeInfo?.infoLink}>
                            <RiLinksLine className="mr-2 h-5 w-5" />
                            Info Link
                        </a>
                    </div>
                </div>}
            </>
        )
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        )
    }

    return book ? renderBookInformation(book) : null
}

export default BookDetails