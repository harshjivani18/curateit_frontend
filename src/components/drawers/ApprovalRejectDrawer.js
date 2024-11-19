import { approveRejectGem, getPendingGems, getResolvedGems, updateCountPublicAddedGem } from "@actions/collection";
import ApproveRejectCard from "@components/views/card/ApproveRejectCard";
import { TextMessage } from "@utils/constants";
import { updateRejectApproveGem } from "@utils/find-collection-id";
import session from "@utils/session";
import { Drawer, Pagination, Radio, Select, Spin, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Option = Select;

const ApprovalRejectDrawer = ({openDrawer,setOpenDrawer, onGemEditClick, collectionId,setPendingGemsCount=()=>{},setBookmarkData=()=>{},bookmarkData=[],pendingGemsCount=0,}) => {
    const dispatch = useDispatch()
    const {isMobileView} = useSelector(state => state.app)
    const [loadingState,setLoadingState] = useState(false)
    const [currentTab,setCurrentTab] = useState('pending')
    const [pendingGems,setPendingGems] = useState([])
    const [resolvedGems,setResolvedGems] = useState([])
    const [dateSort,setDateSort] = useState('thisweek')
    const [gemType,setGemType] = useState('all')
    const [loading,setLoading] = useState(false)
    const [pendingTotalCount,setPendingTotalCount] = useState(0)
    const [resolvedTotalCount,setResolvedTotalCount] = useState(0)
    const [resolvedPage,setResolvedPage] = useState(1)
    const [pendingPage,setPendingPage] = useState(1)

    useEffect(() => {
      const getCall = async () => {
        setLoadingState(true)
        const res = await dispatch(getPendingGems(collectionId,1))
        setPendingGems(res?.payload?.data?.gems || [])
        setPendingTotalCount(res?.payload?.data?.totalCount || 0)
        const res1 = await dispatch(getResolvedGems(collectionId,dateSort,gemType,1))
        setResolvedGems(res1?.payload?.data?.data || [])
        setResolvedTotalCount(res1?.payload?.data?.totalCount || 0)
        setLoadingState(false)
      }
      getCall()
    },[collectionId])

    const handleTabChange = (e) => {
      setCurrentTab(e.target.value)
      setResolvedPage(1)
      setPendingPage(1)
    }

    const handleGemType = async (value) => {
      setGemType(value)
      setResolvedPage(1)
      setLoadingState(true)
      const res1 = await dispatch(getResolvedGems(collectionId,dateSort,value,1))
      setResolvedGems(res1?.payload?.data?.data || [])
      setResolvedTotalCount(res1?.payload?.data?.totalCount || 0)
      setLoadingState(false)
    }

    const handleDateType = async(value) => {
      setDateSort(value)
      setResolvedPage(1)
      setLoadingState(true)
      const res1 = await dispatch(getResolvedGems(collectionId,value,gemType,1))
      setResolvedGems(res1?.payload?.data?.data || [])
      setResolvedTotalCount(res1?.payload?.data?.totalCount || 0)
      setLoadingState(false)
    }

    const handleApprove = async (gem,type) => {
      const payload = {
        isApproved: true,
        isPending: false,
        processAt: moment().format('YYYY-MM-DD')
      }
      
      setLoading(true)
      const res = await dispatch(approveRejectGem(collectionId,gem.id,payload))
      if(res.error === undefined){
        setLoading(false)
        message.success(TextMessage.GEM_APPROVE_TEXT)
        if(type === 'pending'){
          if(pendingGemsCount > 0){
            setPendingGemsCount(pendingGemsCount - 1)
          }else{
            setPendingGemsCount(0)
          }
          
          if(pendingTotalCount > 0) {
            setPendingTotalCount(pendingTotalCount - 1)
          }else{
            setPendingTotalCount(0)
          }
          setResolvedTotalCount(prev => prev + 1)
          const filtered = pendingGems?.filter(item => item.id !== gem.id)
          setPendingGems(filtered)
          const newItem ={
            ...gem,
            isApproved: true,
            isPending: false,
            processAt: moment().format('YYYY-MM-DD'),
            author: {
              id: Number(session?.userId)
            }
          }
          setResolvedGems([...resolvedGems,newItem])
          setBookmarkData([...bookmarkData,newItem])
          dispatch(updateCountPublicAddedGem(collectionId))
          return;
        }
        if(type === 'resolved'){
          const newItem ={
            ...gem,
            isApproved: true,
            isPending: false,
            processAt: moment().format('YYYY-MM-DD'),
            author: {
              id: Number(session?.userId)
            }
          }
          const data = updateRejectApproveGem(resolvedGems,gem.id,payload)
          setResolvedGems(data)
          setBookmarkData([...bookmarkData,newItem])
          dispatch(updateCountPublicAddedGem(collectionId))
        }
      }else{
        setLoading(false)
        // message.error(TextMessage.ERROR_TEXT)
      }
      
    }

    const handleReject = async (gem) => {
      const payload = {
        isApproved: false,
        isPending: false,
        processAt: moment().format('YYYY-MM-DD')
      }

      setLoading(true)
      const res = await dispatch(approveRejectGem(collectionId,gem.id,payload))
      if(res.error === undefined){
        setLoading(false)
        message.success(TextMessage.GEM_REJECT_TEXT)
        if(pendingGemsCount > 0){
            setPendingGemsCount(pendingGemsCount - 1)
          }else{
            setPendingGemsCount(0)
          }
          
          if(pendingTotalCount > 0) {
            setPendingTotalCount(pendingTotalCount - 1)
          }else{
            setPendingTotalCount(0)
          }
        setResolvedTotalCount(prev => prev + 1)
        const filtered = pendingGems?.filter(item => item.id !== gem.id)
        setPendingGems(filtered)
        const newItem ={
          ...gem,
          isApproved: false,
          isPending: false,
          processAt: moment().format('YYYY-MM-DD')
        }
        setResolvedGems([...resolvedGems,newItem])
      }else{
        setLoading(false)
        // message.error(TextMessage.ERROR_TEXT)
      }
    }

    const handleLoadMorePending = async (page) => {
        setPendingPage(page)
        setLoadingState(true)
        const res = await dispatch(getPendingGems(collectionId,page))
        setPendingGems(res?.payload?.data?.gems || [])
        setLoadingState(false)
    }

    const handleLoadMoreResolved = async(page) => {
        setResolvedPage(page)
        setLoadingState(true)
        const res1 = await dispatch(getResolvedGems(collectionId,dateSort,gemType,page))
        setResolvedGems(res1?.payload?.data?.data || [])
        setLoadingState(false)
    }

    const onEditClick = (gemId) => {
      onGemEditClick && onGemEditClick(gemId)
    }

    return(
        <>
        <Drawer
            placement={isMobileView  ? 'bottom' : 'right'}
            height={isMobileView ? '90%' : 'inherit'}
            width={isMobileView ? '90%' : '460px'}
            title={'Approvals'}
            open={openDrawer}
            maskClosable={isMobileView ? true :false}
            onClose={() => {
              setOpenDrawer(false)
            }}
            footer={
            <div>
                <Pagination  
                    pageSize={20}
                    showTotal={total => `Total ${total} items`}
                    current={currentTab === 'pending' ? pendingPage : resolvedPage} 
                    total={currentTab === 'pending' ? pendingTotalCount : resolvedTotalCount} 
                    onChange={currentTab === 'pending' ? handleLoadMorePending : handleLoadMoreResolved}
                    showSizeChanger={false}
                />
            </div>
            }>
            {
            loadingState ? 
            <div className="spinDiv">
                <Spin size='middle' tip='Loading...'/>
            </div> :
            <>
            <div className="w-full flex items-center justify-center my-2">
                <Radio.Group 
                    value={currentTab} 
                    onChange={handleTabChange}
                    buttonStyle="solid"
                    style={{width:'100%'}}
                 >
                    <Radio.Button value={`pending`} 
                        style={{background: currentTab === 'pending' ? '#347AE2' :'white',
                        borderColor:currentTab === 'pending' ? '#347AE2' :'#D0D5DD'
                        ,color:currentTab === 'pending' ? 'white' :'#344054',
                        width:'50%',
                        textAlign:'center',
                        borderTopLeftRadius: '5px',
                        borderBottomLeftRadius: '5px',
                        }}>Pending {pendingTotalCount >0 ? (`(${pendingTotalCount})`) : ''}</Radio.Button>
                    <Radio.Button value={`resolved`} 
                        style={{background: currentTab === 'resolved' ? '#347AE2' :'white',
                        borderColor:currentTab === 'resolved' ? '#347AE2' :'#D0D5DD'
                        ,color:currentTab === 'resolved' ? 'white' :'#344054',
                        width:'50%',
                        textAlign:'center',
                        borderTopRightRadius: '5px',
                        borderBottomRightRadius: '5px',
                        }}>Resolved</Radio.Button>
                </Radio.Group>
            </div>

             {
             currentTab === 'pending' && 
             <>
             {
              pendingGems?.length>0 ? 
              <div className="md:px-6">
              {
              pendingGems.map(item => {
                    return(
                        <div key={item.id}>
                            <ApproveRejectCard
                                item={item}
                                isMobileView={isMobileView}
                                currentTab={currentTab}
                                handleApprove={handleApprove}
                                handleReject={handleReject}
                                onEditClick={onEditClick}
                                loading={loading}
                            />
                        </div>
                    )
                }) 
                }
              </div>
                :
                <div className="text-center py-10">
                  <div className="relative mt-2">
                    <img
                      className="h-50 w-50 my-0 mx-auto"
                      src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                      alt="Cloud ellipse icons"
                    />
                    <div className="absolute top-[85px] left-0 justify-center w-full text-xs text-gray-400">
                      No data!
                    </div>
                  </div>
                </div>
             }
             </>
             }   

             {
             currentTab === 'resolved' && 
             <>
             <div className="my-2 flex items-center">
                    <Select
                    value={gemType}
                    onChange={handleGemType}
                    className="w-[110px]"
                    >
                        <Option value='all'>All</Option>
                        <Option value='approved'>Approved</Option>
                        <Option value='rejected'>Rejected</Option>
                    </Select>
                    <Select
                    value={dateSort}
                    onChange={handleDateType}
                    >
                        <Option value='lastweek'>Last Week</Option>
                        <Option value='lastmonth'>Last Month</Option>
                        <Option value='yesterday'>Yesterday</Option>
                        <Option value='today'>Today</Option>
                        <Option value='thisweek'>This Week</Option>
                    </Select>
              </div>
             {
              resolvedGems.length>0 ?
             <div className="md:px-6">
                {
                resolvedGems.map(item => {
                    return(
                        <div key={item.id}>
                            <ApproveRejectCard
                                item={item}
                                isMobileView={isMobileView}
                                currentTab={currentTab}
                                handleApprove={handleApprove}
                                loading={loading}
                                onEditClick={onEditClick}
                            />
                        </div>
                    )
                })
                }
             </div> :
             <div className="text-center py-10">
                  <div className="relative mt-2">
                    <img
                      className="h-50 w-50 my-0 mx-auto"
                      src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                      alt="Cloud ellipse icons"
                    />
                    <div className="absolute top-[85px] left-0 justify-center w-full text-xs text-gray-400">
                      No data!
                    </div>
                  </div>
              </div>
             }
             </>
             } 
             </>  
            }

            
        </Drawer>
        </>
    )
}

export default ApprovalRejectDrawer;