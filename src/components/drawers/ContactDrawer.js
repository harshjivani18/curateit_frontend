import { getBookmarkInBio } from "@actions/collection";
import ContactBlock from "@components/common/profileCollections/ContactBlock";
import { Drawer, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactDrawer = ({openDrawer,setOpenDrawer,bioContactId=''}) => {
    const dispatch = useDispatch()
    const {isMobileView} = useSelector(state => state.app)
    const [loadingState,setLoadingState] = useState(false)
    const [contacts,setContacts] = useState([])
    const [page,setPage] = useState(1)
    const [totalCount,setTotalCount] = useState(0)

    useEffect(() => {
      if(bioContactId){
        const getCall = async() => {
            setLoadingState(true)
            const res = await dispatch(getBookmarkInBio(bioContactId, page))
            if(res){
            const uniqueData = [...res?.payload?.data?.collection?.gems || []]?.filter((value, index, self) => 
                index === self.findIndex((v) => (
                    v.id === value.id
                ))
            );

            setContacts(uniqueData || []);
            setLoadingState(false)
            setTotalCount(res?.payload?.data?.totalBookmark || 0)
            }
        }

        getCall()
      }
    },[bioContactId,page])

    const handleLoadMore = (page) => {
        setPage(page)
    }

    return(
        <>
        <Drawer
            placement={isMobileView  ? 'bottom' : 'right'}
            height={isMobileView ? '90%' : 'inherit'}
            width={isMobileView ? '90%' : '460px'}
            title={'Contacts'}
            open={openDrawer}
            maskClosable={isMobileView ? true :false}
            onClose={() => {
              setOpenDrawer(false)
            }}
            footer={
            <div>
                {totalCount > 0 && <Pagination  
                    pageSize={20}
                    showTotal={total => `Total ${total} items`}
                    current={page} 
                    total={totalCount} 
                    onChange={handleLoadMore}
                    showSizeChanger={false}
                />}
            </div>
            }>
            {
            loadingState ? 
            <div className="spinDiv">
                <Spin size='middle' tip='Loading...'/>
            </div>
            :
            contacts?.length >0 ? 
            <div className="mt-4">
            {
            contacts?.map((item) => {
                return(
                    <div key={item?.id}>
                        <ContactBlock
                            item={item}
                        />
                    </div>
                )
            })
            }
            </div>
            :
            <div className="text-xl flex justify-center items-center">
            <div className="relative mt-2">
                    <img
                    className="h-50 w-50 my-0 mx-auto"
                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                    alt="Cloud ellipse icons"
                    />
                    <div className="justify-center w-full text-xs text-center text-gray-400">
                    No Contacts!
                    </div>
            </div>
            </div>
            }
            </Drawer>
        </>
    )
}

export default ContactDrawer;