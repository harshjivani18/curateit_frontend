"use client"
import { Pagination, Spin, } from "antd";
import TimelinePageHeading        from "@components/pageHeader/TimelinePageHeading";
import TimelineViewRender from "@components/common/views/TimelineViewRender";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarMenuClicked, sidebarSetPage } from "@actions/app";
import { handleTimelineFilter } from "@utils/commonFunctions";
import { getActivityLogs } from "@actions/activity";

const TimelineView = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all time')
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const { activityLogs, activityTotalCount } = useSelector(state => state.activity)

  useEffect(() => {
    dispatch(sidebarSetPage('Activity'))
    dispatch(sidebarMenuClicked('activity'))
  }, [dispatch])

  useEffect(() => {
    const getCall = async () => {
      setLoading(true)
      const res = await dispatch(getActivityLogs(page))

      if (res) {
        setLoading(false)
      }
    }

    getCall()
  }, [dispatch, page])

  const handleFilter = (value) => {
    setFilter(value)
  }

  const handleLoadMore = (page) => {
    setPage(page - 1)
  }

  const dataSorted = handleTimelineFilter(activityLogs, filter)

  return (
    <div>

      {
        loading ? <div className="spinDiv">
          <Spin size='middle' tip='Loading...' />
        </div>
          :
          <>
            <TimelinePageHeading
              page={'timeline'}
              title='Activity'
              filter={filter} handleFilter={handleFilter}
            />

            <TimelineViewRender
              data={dataSorted}
            />

            <div className='my-1'>
              <Pagination
                pageSize={100}
                showTotal={total => `Total ${total} items`}
                current={page + 1}
                total={activityTotalCount}
                onChange={handleLoadMore}
                className="my-2"
                showSizeChanger={false}
              />
            </div>

          </>
      }

    </div>
  )
}

export default TimelineView;