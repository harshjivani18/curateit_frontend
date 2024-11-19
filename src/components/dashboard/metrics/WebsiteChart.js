import { useEffect, useMemo, useState } from 'react';
import { Button, Icon, Text, Row, Column } from 'react-basics';
import classNames from 'classnames';
import WebsiteHeader from './WebsiteHeader';
import Icons from '../icons';
import FilterTags from './FilterTags';
import useSticky from '../../../hooks/useSticky';
import MetricsBar from './MetricsBar';
import styles from "./WebsiteChart.module.css";
import RefreshButton from '../input/RefreshButton';
import DateFilter from '../input/DateFilter';
import ErrorMessage from '../common/ErrorMessage';
import { getDateArray, getDateLength } from '../../../lib/date';
import PageviewsChart from './PageviewsChart';
import useDateRange from '../../../hooks/useDateRange';
import { getPageViews } from '../../../actions/analytics';
import { useDispatch } from 'react-redux';
import usePageQuery from '../../../hooks/usePageQuery';


export function WebsiteChart({
  websiteId,
  name,
  domain,
  stickyHeader = false,
  showChart = true,
  showDetailsButton = false,
  dashUrl = null,
  showClearFilter=true
  // onDataLoad = () => { },
}) {
  const dispatch = useDispatch();
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate, unit, value, modified } = dateRange;
  const {
    query: { url, referrer, os, browser, device, country, region, city, title }
  } = usePageQuery();
  const { ref, isSticky } = useSticky({ enabled: stickyHeader });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartDetails, setChartDetails] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const payload = {
      startAt: +startDate,
      endAt: +endDate,
      unit,
      url: dashUrl ? dashUrl : url,
      referrer,
      os,
      browser,
      device,
      country,
      region,
      city,
      title
    }
    dispatch(getPageViews(payload)).then(res => {
      if (res?.payload?.data) {
        setError(false);
        setChartDetails(res.payload.data);
      } else {
        setError(true);
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modified])




  const chartData = useMemo(() => {
    if (chartDetails) {
      return {
        pageviews: getDateArray(chartDetails.pageviews, startDate, endDate, unit),
        sessions: getDateArray(chartDetails.sessions, startDate, endDate, unit),
      };
    }
    return { pageviews: [], sessions: [] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartDetails]);

  const dir = "rtl11";

  const renderMainView = () => {
    return (
      <>
        <Row
          ref={ref}
          className={classNames(styles.header, {
            [styles.sticky]: stickyHeader,
            [styles.isSticky]: isSticky,
          })}
        >
          <Column defaultSize={12} xl={8}>
            <MetricsBar websiteId={websiteId} dashUrl={dashUrl} />
          </Column>
          <Column defaultSize={12} xl={4}>
            <div className={styles.actions}>
              <RefreshButton websiteId={websiteId} isLoading={isLoading} />
              <DateFilter websiteId={websiteId} value={value} className={styles.dropdown} />
            </div>
          </Column>
        </Row>
        <Row>
          <Column className={styles.chart}>
            {error && <ErrorMessage />}
            {showChart && (
              <PageviewsChart
                websiteId={websiteId}
                data={chartData}
                unit={unit}
                records={getDateLength(startDate, endDate, unit)}
                loading={isLoading}
              />
            )}
          </Column>
        </Row>
      </>
    )
  }

  const renderDrawerView = () => {
    return (
      <>
        <Row
          className={styles.header}
        >
          <Column defaultSize={12}>
            <MetricsBar websiteId={websiteId} dashUrl={dashUrl} />
          </Column>
        </Row>
        <Row>
          <Column defaultSize={12}>
            <div className={styles.actions}>
              <RefreshButton websiteId={websiteId} isLoading={isLoading} />
              <DateFilter websiteId={websiteId} value={value} className={styles.dropdown} />
            </div>
          </Column>
        </Row>
        <Row>
          <Column className={styles.chart}>
            {error && <ErrorMessage />}
            {showChart && (
              <PageviewsChart
                websiteId={websiteId}
                data={chartData}
                unit={unit}
                records={getDateLength(startDate, endDate, unit)}
                loading={isLoading}
              />
            )}
          </Column>
        </Row>
      </>
    )
  }
  return (
    <>
      {dashUrl === null && <WebsiteHeader websiteId={websiteId} name={name} domain={domain} >
        {showDetailsButton && (
          // <div href={`/websites/${websiteId}`}>
          <div>
            <Button variant="primary">
              <Text>View Details</Text>
              <Icon>
                <Icon rotate={dir === 'rtl' ? 180 : 0}>
                  {/* <Icons.ArrowRight /> */}
                  <img src={Icons.ArrowRight} alt="Arrow icon" />
                </Icon>
              </Icon>
            </Button>
          </div>
        )}
      </WebsiteHeader>}
      <FilterTags
        websiteId={websiteId}
        params={{ url: dashUrl ? dashUrl : url, referrer, os, browser, device, country, region, city, title }}
        showClearFilter={showClearFilter}
      />
      {dashUrl 
        ? renderDrawerView() 
        : renderMainView()}
    </>
  );
}

export default WebsiteChart;
