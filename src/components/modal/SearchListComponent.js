const SearchListComponent = ({ items, highlightedIndex, itemRefs, setHighlightedIndex, handleNavigate, mobileScreen }) => {
    const handleMouseEnter = (index) => {
        setHighlightedIndex(index)
    };
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return(
        <>
            <div className="list-wrapper">
                {
                    (items && items.length > 0) ? 
                        items.map((item,index) => {
                            const imgSrc = item?.metadata?.covers?.length > 0 ? (item?.metadata?.covers[0] || item?.metadata?.app_screenshot) : ''
                            const favSrc = item?.metadata ? item?.metadata?.icon : ''
                            const isActive = index === highlightedIndex;
                            return(
                                <div 
                                ref={el => itemRefs.current[index] = el}
                                onMouseEnter={() => handleMouseEnter(index)}
                                className={`relative h-[60px] group flex items-start cursor-pointer ${isActive ? 'bg-[#eff3f9]' : ''}`} 
                                onClick={() => handleNavigate(item)}
                                >
                                    <span className={`absolute left-0 w-[3px] bg-[#6068d2] ${isActive ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}></span>
                                    <img src={imgSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/20x20_contain`) || (favSrc && typeof favSrc === "string" ?  favSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/20x20_contain`) : favSrc && typeof favSrc === "object" && favSrc?.icon ? favSrc?.icon?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/20x20_contain`) : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`)  || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt="Logo" className='h-5 w-5 ml-[5%] mt-1'/>

                                    <div className='ml-2 w-[80%]'>
                                        <div className='text-[#2b2d41] font-medium text-sm truncate'>
                                            {item?.title}
                                        </div>
                                        <div className='text-sm text-[#929db2]'>{item?.media_type} | {item?.collectionName}</div>
                                    </div>

                                    {!mobileScreen && <div className={`search-item-select ${isActive ? 'flex' : 'hidden'}`}>
                                        Select
                                        <span className='shortcut-keys'>↵</span>
                                    </div>}
                                </div>
                            )
                        })
                        : ''
                }
            </div>
        </>
    )
}

export default SearchListComponent;