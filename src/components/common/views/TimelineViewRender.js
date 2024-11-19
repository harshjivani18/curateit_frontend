import { Timeline } from "antd"
import session from "@utils/session"
import moment from "moment"
import { activitylogStr } from "@utils/activitylog"

const TimelineViewRender = ({ data }) => {

    return (
        <>
            {
                (data && data.length > 0) ?
                    <Timeline>
                        {
                            data.map((item, i) => (
                                <Timeline.Item key={i} className="max-w-[400px]">
                                    <div>
                                        <span className="text-sm text-[#111827] font-medium block mb-[2px]">{item?.author?.username || session.username}</span>
                                        <span className="text-xs text-[#6B7280] block mb-[5px]">{moment(item.createdAt).format('DD-MM-YYYY hh:mm:ss A')}</span>

                                        <div className="flex items-center">
                                            <span className="text-sm text-[#374151] block">

                                                {activitylogStr(item)}

                                            </span>
                                        </div>
                                    </div>
                                </Timeline.Item>
                            ))
                        }
                    </Timeline>
                    : <span className="font-medium text-md">
                        No Data
                    </span>
            }
        </>
    )
}

export default TimelineViewRender;