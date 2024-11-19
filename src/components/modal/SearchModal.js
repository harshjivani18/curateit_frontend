"use client";

import './SearchModal.css'
import { Modal, Spin }                  from "antd";
import { useDispatch, useSelector }                      from 'react-redux';
import { useEffect, 
         useRef, 
         useState }                     from "react";
import { useRouter }                    from 'next/navigation';
import slugify                          from "slugify";

import SearchListComponent              from "./SearchListComponent";
import session                          from '@utils/session';

import { openSearchModal }              from "@actions/app";
import { searchBookmark }               from "@actions/gems";

const SearchModal = (props) => {
    const {showSearchModal}         = useSelector(state => state.app)
    const dispatch                  = useDispatch()
    const navigate                  = useRouter()
    const inputRef                  = useRef()
    const itemRefs                  = useRef([]);
    const [searchedBookmarks,
           setSearchedBookmarks]    = useState([])
    const [loading,setLoading]      = useState(false)
    const [highlightedIndex, 
           setHighlightedIndex]     = useState(-1);
    const [mobileScreen, 
           setMobileScreen]         = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            function handleResize() {
                if (window.innerWidth <= 600) {
                    setMobileScreen(true)
                } else {
                    setMobileScreen(false)
                }
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        };
        // inputRef.current.focus()
    }, []);

    useEffect(() => {
        if (showSearchModal) {
            const timer = setTimeout(() => {
                inputRef.current.focus();
            }, 500);
    
            return () => clearTimeout(timer);
        }
    }, [showSearchModal]);
    
    const onHideModal = () => {
        dispatch(openSearchModal(false))
    }

    const debounce = (cb, timeout = 300) => {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                cb(...args)
            }, timeout)
        }
    }

    const handleSearch = debounce(async (e) => {
        const { value } = e.target;
        if(!value) {
            setSearchedBookmarks([])
            return;
        };

        setLoading(true)
        setSearchedBookmarks([])
        const res = await dispatch(searchBookmark(value))
        setLoading(false)
        setSearchedBookmarks(res.error === undefined ? res.payload.data : [])
    });

    const handleNavigate = (item) => {
        navigate.push(`/u/${session.username}/g/${item.g_id}/${item?.slug || slugify(item.title || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })}`)
        dispatch(openSearchModal(false))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex(prevIndex => Math.min(prevIndex + 1, searchedBookmarks.length - 1));
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex(prevIndex => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < searchedBookmarks.length) {
                const selectedItem = searchedBookmarks[highlightedIndex];
                if (selectedItem) {
                    handleNavigate(selectedItem);
                }
            }
        }
    };
  
    useEffect(() => {
        if (itemRefs.current[highlightedIndex]) {
            itemRefs.current[highlightedIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightedIndex, searchedBookmarks]);

    return(
        <>
            <Modal
                open={showSearchModal}
                title={''}
                footer={null}
                onCancel={onHideModal}
                bodyStyle={{ padding: '5px 0px' }}
                width={mobileScreen ? '90%' : '60%'}
                height={600}
                destroyOnClose
                closable={false}
            >   
                <input ref={inputRef} placeholder="Search bookmarks..." className="search-input-class" onChange={handleSearch}/>
                {loading 
                    ? <div className="spinDiv"><Spin size="middle" tip="Loading..." /></div> 
                    : <SearchListComponent 
                        items={searchedBookmarks} highlightedIndex={highlightedIndex}
                        itemRefs={itemRefs} setHighlightedIndex={setHighlightedIndex} 
                        handleNavigate={handleNavigate} mobileScreen={mobileScreen} />
                }
                <>
                    <div className="search-footer">
                        <div className="search-result">{searchedBookmarks.length} {(searchedBookmarks.length === 1 || searchedBookmarks.length === 0) ? 'result' : 'results'}
                        </div>
                        {!mobileScreen && 
                            <div className='text-[#929db2] text-xs font-medium'>
                                Use arrow keys
                                <span className='shortcut-keys mx-1'>↑</span>
                                <span className='shortcut-keys mx-1'>↓</span>
                                to navigate
                            </div>
                        }
                    </div>
                </>
            </Modal>
        </>
    )
}

export default SearchModal;