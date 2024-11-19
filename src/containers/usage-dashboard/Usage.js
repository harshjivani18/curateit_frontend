import "./Usage.css"
import { useState, useEffect }                from "react"
import { useSelector, useDispatch }           from "react-redux"
import { Chart as ChartJS, 
         ArcElement, Tooltip, Legend }        from "chart.js";
import { Bar, Doughnut }                      from "react-chartjs-2"
import { Card, Switch, Spin, Row, Col }       from "antd"
import { fetchGemsFilters, getUsageCount }    from "@actions/gems"
import UserCurrentPlanCard from "@components/profile-edit-components/UserCurrentPlanCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const Usage = () => {
    const dispatch              = useDispatch()
    const gemCounts             = useSelector(state => state.gems.mediaTypeChartData)
    const [isPie, setIsPie]     = useState(true)
    const [isProcessing, 
           setIsProcessing]     = useState(false)
    const [gemList, setGemList] = useState()
    const [isLoading, 
           setIsLoading]     = useState(false)

    useEffect(() => {
        if (!gemCounts || gemCounts?.length === 0) {
            setIsProcessing(true)
            dispatch(fetchGemsFilters()).then((res) => {
                setIsProcessing(false)
            })
        }
    }, [gemCounts])

    useEffect(() => {
        setIsLoading(true)
        dispatch(getUsageCount())
        .then((res) => {
            setIsLoading(false)
            setGemList(res?.payload?.data?.message || [])
        })
    }, [])

    const onChartChange = (checked) => {
        setIsPie(checked)
    }

    const renderPieChart = () => {
        if (!gemCounts) return null
        const types  = []
        const dataArr   = []
        const colors = []
        gemCounts.forEach((a) => {
            types.push(a.title)
            dataArr.push(a.count)
            // colors.push('#'+Math.floor(Math.random()*16777215).toString(16))
            colors.push(a.color)
        })
        const data = {
            labels: types,
            datasets: [{
                label: 'Media Types',
                data: dataArr,
                backgroundColor: colors,
            }]
        }
        return (
            <Doughnut data={data}
                    width={400}
                    height={200}
                 options={{
                    maintainAspectRatio: true,
                    plugins: {
                        legend: false,
                        title: {
                            display: true,
                            text: "Count by Media Types",
                        },
                    },
                 }} 
            />
        )
    }

    const renderBarChart = () => {
        if (!gemCounts) return null
        const types  = []
        const dataArr   = []
        const colors = []
        gemCounts.forEach((a) => {
            types.push(a.title)
            dataArr.push(a.count)
            // colors.push('#'+Math.floor(Math.random()*16777215).toString(16))
            colors.push(a.color);
        })
        const data = {
            labels: types,
            datasets: [{
                label: 'Media Types',
                data: dataArr,
                backgroundColor: colors,
            }]
        }
        return (
            <Bar
                data={data}
                height={600}
                width={400}
                options={{
                    maintainAspectRatio: true,
                    // responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                        title: {
                            display: true,
                            text: 'Count by Media Types',
                        },
                    },
                }}
            />
        )
    }

    const renderTypesSection = () => {
        return (
            <div className="flex w-full justify-between">
                <div className="ct-pie-chart">
                    {isPie ? renderPieChart() : renderBarChart()}
                </div>
                <div className="ct-types-section">
                    <Row gutter={[8, 8]}>
                        {gemCounts?.map((type) => {
                            return (
                                <Col span={8} className="w-full flex justify-between items-center ct-media-type">
                                    <div className="flex">
                                        <span className="mr-1" style={{color: type.color}}>{type.icon}</span>
                                        <span className="font-bold">{type.title}</span>
                                    </div>
                                    <span className="font-bold">{type.count}</span>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        )
    }

    return (
        <div className="ct-card-containers">
            <UserCurrentPlanCard isUsagePage={true} />
            <Card title="Types" className="mb-3" extra={<Switch style={{ background: isPie ? "#1890ff" : "#00000040" }} checkedChildren="Pie" unCheckedChildren="Bar" checked={isPie} onChange={onChartChange}/>}>
                <div className={`flex w-full ${isProcessing ? "items-center" : ""}`}>
                    {isProcessing 
                        ? <Spin tip="Processing ..."/>
                        : renderTypesSection()
                    }
                </div>
            </Card>
            <Card title="Most Favourite Website Sources" className="mb-3">
                <div className={`flex flex-col ${isLoading ? "items-center" : ""}`}>
                    {isLoading
                        ? <Spin tip="Processing ..."/>
                        : gemList?.mostVisitedDomain?.length > 0 && gemList.mostVisitedDomain?.map((g) => {
                            const imgSrc = g?.metaData?.icon?.icon ? g?.metaData?.icon?.icon : g?.metaData?.covers?.length !== 0 ? g?.metaData?.covers[0] : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-200x200.png`
                            return (
                                <div className="flex items-center justify-between w-full mb-1">
                                    <div className="flex">
                                        <img src={imgSrc} className="w-[20px] h-[20px] mr-3" alt="site icon" />
                                        {/* <a href={g?.url} className="ct-link-usage-text">{g.url.length > 150 ? `${g.url.substring(0, 150)}...` : g.url}</a> */}
                                        <a href={g.hostname} className="ct-link-usage-text">{g.hostname}</a>
                                    </div>
                                    <span className="ct-link-usage-text">{g.usageCount}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </Card>
            <Card title="Top 10 Visited Websites" >
                <div className={`flex flex-col ${isLoading ? "items-center" : ""}`}>
                    {isLoading
                        ? <Spin tip="Processing ..."/>
                        : gemList?.mostVisitedSite?.length > 0 && gemList?.mostVisitedSite?.map((g) => {
                            const imgSrc = g?.metaData?.icon?.icon ? g?.metaData?.icon?.icon : g?.metaData?.covers?.length !== 0 ? g?.metaData?.covers[0] : `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-200x200.png`
                            return (
                                <div className="flex items-center justify-between w-full mb-1">
                                    <div className="flex">
                                        <img src={imgSrc} className="w-[20px] h-[20px] mr-2" alt="site icon" />
                                        <a href={g?.url} className="ct-link-usage-text">{g.url.length > 150 ? `${g.url.substring(0, 150)}...` : g.url}</a>
                                        {/* <a href={g?.url} className="ct-link-usage-text">{g.url ? getDomainFromUrl(g.url) : 'Invalid URL'}</a> */}
                                    </div>
                                    <div className="flex justify-between ">
                                        <div className="ct-link-usage-text">{g.media_type}</div>
                                        <div className="ct-link-usage-text ct-usage-count">{g.usageCount}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Card>
        </div>
    )
}

export default Usage