"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import TableView from "@components/views/TableView";
import MoodboardView from "@components/views/MoodboardView";
import ListView from "@components/views/ListView";
import { ArrowTopRightOnSquareIcon, FolderIcon } from "@heroicons/react/24/outline";
import { Button, Spin } from "antd";
import axios from "axios";
// import InboxView from "../../components/common/views/InboxView";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import BookmarkCard from "@components/views/card/BookmarkCard";
import { handleSorted } from "@utils/commonFunctions";
import MadeWithCurateit from "@components/common/FloatingLogos/MadeWithCurateit";

const Embed = () => {
    const {id,username} = useParams()
    const searchParams = useSearchParams()
    const navigate = useRouter()
    const view = searchParams.get('view')
    const sort = searchParams.get('sort')
    const dispatch = useDispatch()

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    const [collectionName, setCollectionName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const loadMoreData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/embed-collection/${id}?isEmbed=true&page=${page}&perPage=20`)
            if(res.error === undefined){
                setLoading(false)
                setData(prevData => [...prevData, ...res?.data?.collection?.gems || []])
                setCollectionName(res?.data?.collection?.name)
                setHasMore(res?.data?.collection?.gems.length > 0)
            }else{
                setLoading(false)
                setHasMore(false)
            }
        }
        catch (err) {
            if (err.response?.data?.error?.status === 403) {
                navigate.push("/403")
                return
            }
        }
        
        
    };

    if (hasMore) {
      loadMoreData();
    }
  }, [page, hasMore,id,dispatch, navigate]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore) {   
      setPage((prev) => prev + 1);
    }
  }

    const [sortArr,setSortArr] = useState([])
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if(sort){
            if(sort === 'title (A-Z)'){
                const newObj = {
                by: 'title',
                order: 'ascending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'title (Z-A)'){
                const newObj = {
                by: 'title',
                order: 'descending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'description (A-Z)'){
                const newObj = {
                by: 'description',
                order: 'ascending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'description (Z-A)'){
                const newObj = {
                by: 'description',
                order: 'descending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'tags (A-Z)'){
                const newObj = {
                by: 'tags',
                order: 'ascending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'tags (Z-A)'){
                const newObj = {
                by: 'tags',
                order: 'descending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'links (A-Z)'){
                const newObj = {
                by: 'url',
                order: 'ascending',
                }
                setSortArr([newObj])
                return
            }
            if(sort === 'links (Z-A)'){
                const newObj = {
                by: 'url',
                order: 'descending',
                }
                setSortArr([newObj])
                return
            }
        }
    },[sort])

    const dataSorted = handleSorted(data || [],sortArr || [])

    return(
        <div className="border border-2 w-full">
            <header 
            className={`w-full bg-white fixed top-0 z-50  p-2 flex items-center justify-between transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}
            >
                <div className="flex items-center">
                    <FolderIcon className='h-8 w-8 text-[#97A0B5]'/>
                    <h1 className="text-3xl font-bold text-gray-700 ml-2">{collectionName}</h1>
                </div>

                <div>
                    <Button icon={<ArrowTopRightOnSquareIcon className="h-5 w-5"/>} 
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}/embed-more/${id}?view=${view}`, "_blank");
                    }}
                    className='bookmark-shareBtn mr-2' aria-labelledby="Share Icon">More</Button>
                </div>
            </header>

            <div className="fixed z-50 right-4 bottom-4">
                <MadeWithCurateit/>
            </div>

            <div className="p-4 pt-[64px]">
            {/* card */}
                {
                view === 'card' &&   
                <div className="grid-container">
                <BookmarkCard 
                items={dataSorted || []}
                collectionName={collectionName || ''}
                page='embed'
                />
                </div>
                }

                {/* list */}

                {
                    view === 'list' &&
                    <div>
                        <ListView
                        items={dataSorted || []}
                        collectionName={collectionName}
                        page='embed'
                        />
                    </div>
                }

                {/* board view */}
                {/* {
                    view === 'board' && 
                    <div>
                        <BoardView
                        items={dataSorted || []}
                        collectionName={collectionName}
                        page='embed'
                        />
                    </div>
                } */}

                {/* moodboard */}
                {
                    view === 'moodboard' && 
                    <div>
                        <MoodboardView
                        items={dataSorted || []}
                        collectionName={collectionName}
                        page='embed'
                        layout={view}
                        />
                    </div>
                }

                {/* table */}
                {
                    view === 'table' && 
                    <div>
                        <TableView
                        items={dataSorted || []}
                        collectionName={collectionName}
                        checkedBookmark={[]}
                        page='embed'
                        />
                    </div>
                }

                {/* {
                view === 'inbox' &&
                <>
                <InboxView 
                items={dataSorted || []}
                collectionName={collectionName || ''}
                checkedBookmark={[]}
                page='embed'
                />
                </>
                } */}
            </div>

            <div ref={loader}>
            {
            (hasMore && loading) ? 
            <div className="spinDiv">
                <Spin size='middle' tip='Loading...'/>
            </div> 
            : ''
            }
            </div>
        </div>
        
    )
}

export default Embed;