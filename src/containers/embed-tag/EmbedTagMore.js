'use client'

import { useDispatch } from "react-redux";
import TableView from "@components/views/TableView";
import MoodboardView from "@components/views/MoodboardView";
import ListView from "@components/views/ListView";
import BookmarkCard from "@components/views/card/BookmarkCard";
import { useEffect, useState } from "react";
// import PageHeading from "../../components/common/pageHeader/PageHeading";
import { Pagination, Spin } from "antd";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
// import InboxView from "../../components/common/views/InboxView";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Topbar from "@components/layouts/Topbar/Topbar";
import { defaultPropertyOrder } from "@utils/constants";
import MadeWithCurateit from "@components/common/FloatingLogos/MadeWithCurateit";

const EmbedTagMore = () => {
    const { id, username } = useParams()
    const dispatch = useDispatch()
    const navigate = useRouter()
    const searchParams = useSearchParams()
    const view = searchParams.get('view')

    const [data, setData] = useState([]);
    const [filterArr, setFilterArr] = useState([])
    const [sortArr, setSortArr] = useState([])
    const [layout, setLayout] = useState(view || 'moodboard')
    const [page, setPage] = useState(1)
    const [loadingState, setLoadingState] = useState(false)
    const [collectionName, setCollectionName] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [propertyOrder,setPropertyOrder] = useState([])

    const [isSticky, setIsSticky] = useState(false);

    const checkSticky = () => {
        setIsSticky(window.scrollY > 60);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkSticky);
        return () => {
            window.removeEventListener('scroll', checkSticky);
        };
    }, []);

    useEffect(() => {
        setPage(1)
        // dispatch(sidebarSetPage('Embed'))
    }, [dispatch,])


    useEffect(() => {
        const getCall = async () => {
            setLoadingState(true)
            
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/embed-tag/${id}?isEmbed=true&page=${1}&perPage=20`)
                if (res.error === undefined) {
                    setLoadingState(false)
                    setData(res?.data?.tags?.gems || [])
                    setCollectionName(res?.data?.tags?.name || '')
                    setTotalCount(res?.data?.totalBookmark || 0)
                } else {
                    setLoadingState(false)
                }
            }
            catch (err) {
                if (err.response?.data?.error?.status === 403) {
                    navigate.push("/403")
                }
            }
        }

        getCall()
    }, [id, dispatch, navigate])

    const handleLayout= (item) => {
        setLayout(item)
        if(item === 'card'){
            const data = defaultPropertyOrder?.card?.propertyOrder
            // setPropertyOrder(data)
        }
        if(item === 'list'){
            const data = defaultPropertyOrder?.list?.propertyOrder
            // setPropertyOrder(data)
        }
        if(item === 'table'){
            const data = defaultPropertyOrder?.table?.propertyOrder
            // setPropertyOrder(data)
        }
        if(item === 'moodboard'){
            const data = defaultPropertyOrder?.moodboard?.propertyOrder
            // setPropertyOrder(data)
        }
        if(item === 'stream'){
            const data = defaultPropertyOrder?.stream?.propertyOrder
            // setPropertyOrder(data)
        }
        if(item === 'inbox'){
            const data = defaultPropertyOrder?.inbox?.propertyOrder
            // setPropertyOrder(data)
        }
    }

    const handleLoadMore = async (page) => {
        setPage(page)
        setLoadingState(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/embed-tag/${id}?isEmbed=true&page=${page}&perPage=20`)
            if (res.error === undefined) {
                setLoadingState(false)
                setData(res?.data?.tags?.gems || [])
                setCollectionName(res?.data?.tags?.name || '')
                setTotalCount(res?.data?.totalBookmark || 0)
            } else {
                setLoadingState(false)
            }
        }
        catch (err) {
            if (err.response?.data?.error?.status === 403) {
                navigate.push("/403")
                return
            }
        }
    }


    return (
        <>
            {
                loadingState ?
                    <div className="spinDiv">
                        <Spin size='middle' tip='Loading...' />
                    </div>
                    :
                    <div
                        className="relative pb-4"
                    // className="p-4 pt-[64px]"
                    >

                        <div className="p-4">
                            <div className="flex items-center">
                                <div className="rounded-[50%] bg-[#F3F5F6] p-1 flex items-center justify-center hover:shadow">
                                    <ChevronLeftIcon className="h-4 w-4 text-[#70767A] cursor-pointer font-medium" />
                                </div>
                                <span className="font-medium text-md text-[#70767A] ml-4">{decodeURIComponent(username)}</span>
                            </div>
                        </div>

                        <div
                            // className="sticky top-0"
                            className={`p-4 w-full bg-white sticky top-0 z-50  p-2 transition-shadow duration-300 ${isSticky ? 'shadow-lg' : ''}`}
                        >
                            <Topbar
                                title={collectionName || ''}
                                page='embed'
                                layout={layout}
                                hideHr={isSticky ? true : false}
                                checkedBookmark={[]}
                                permissions={null}
                                handleLayout={handleLayout}
                            />
                        </div>

                        <div className="fixed z-50 right-4 bottom-4">
                           <MadeWithCurateit/>
                         </div>

                        <div className="px-4">
                            {/* card */}
                        {
                            layout === 'card' &&
                            <div className="grid-container">
                                <BookmarkCard
                                    items={data || []}
                                    collectionName={collectionName || ''}
                                    page='embed'
                                />
                            </div>
                        }

                        {/* list */}

                        {
                            layout === 'list' &&
                            <div>
                                <ListView
                                    items={data || []}
                                    collectionName={collectionName || ''}
                                    page='embed'
                                />
                            </div>
                        }

                        {/* board view */}
                        {/* {
                            layout === 'board' &&
                            <div>
                                <BoardView
                                    items={dataSorted || []}
                                    collectionName={collectionName || ''}
                                    page='embed'
                                />
                            </div>
                        } */}

                        {/* moodboard */}
                        {
                            layout === 'moodboard' &&
                            <div>
                                <MoodboardView
                                    items={data || []}
                                    collectionName={collectionName || ''}
                                    page='embed'
                                    layout={layout}
                                />
                            </div>
                        }

                        {/* table */}
                        {
                            layout === 'table' &&
                            <div>
                                <TableView
                                    items={data || []}
                                    collectionName={collectionName || ''}
                                    checkedBookmark={[]}
                                    page='embed'
                                />
                            </div>
                        }

                        {/* {
                            layout === 'inbox' &&
                            <>
                                <InboxView
                                    totalCount={totalCount}
                                    items={dataSorted || []}
                                    collectionName={collectionName || ''}
                                    checkedBookmark={[]}
                                    page='embed'
                                />
                            </>
                        } */}
                        </div>

                        <div className='my-4 px-4'>
                            <Pagination
                                pageSize={20}
                                showTotal={total => `Total ${total} items`}
                                current={page}
                                total={totalCount}
                                onChange={handleLoadMore}
                                showSizeChanger={false}
                            />
                        </div>
                    </div>
            }
        </>
    )
}

export default EmbedTagMore;