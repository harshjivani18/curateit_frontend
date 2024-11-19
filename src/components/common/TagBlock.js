import FavIconComponent from "./FavIconComponent";

const TagBlock = ({tags=[]}) => {
    return(
        <div className="flex flex-wrap truncate">
        {
        tags?.map((data,i) => {
            return(
            <div key={i} 
            style={{
                textAlign: 'center !important',
                justifyContent: 'center !important',
                alignItems: 'center !important',
                padding: '2px 6px !important',
                fontSize: '12px !important',
                border:'1px solid #d9d9d9 !important',
                height:'22px !important',
                lineHeight:'20px !important'
            }}      
            className="ant-tag !text-xs !flex !items-center !rounded !bg-white my-1 !shadow-md !truncate">
                {data?.avatar && <FavIconComponent data={data?.avatar || null} renderingPlace="tag"/>}
                <div className={`truncate text-[#222630] text-xs font-medium capitalize ${data?.avatar?.type ? 'ml-1' : ''}`}>{data?.tag || data?.attributes?.tag}</div>
            </div>
            )
        })
        }
        </div>
    )
}

export default TagBlock;