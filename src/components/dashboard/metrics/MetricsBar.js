import { useEffect, useState } from 'react';
import { Loading } from 'react-basics';
// import ErrorMessage from 'components/common/ErrorMessage';
// import useApi from 'hooks/useApi';
// import useDateRange from 'hooks/useDateRange';
// import usePageQuery from 'hooks/usePageQuery';
// import { formatShortTime, formatNumber, formatLongNumber } from 'lib/format';
import MetricCard from './MetricCard';
// import useMessages from 'hooks/useMessages';
import styles from './MetricsBar.module.css';
import { formatLongNumber, formatNumber, formatShortTime } from '../../../lib/format';
import useDateRange from '../../../hooks/useDateRange';
import { useDispatch } from 'react-redux';
import { getWebsiteStats } from '../../../actions/analytics';
import ErrorMessage from './ErrorMessage';
import usePageQuery from '../../../hooks/usePageQuery';

export function MetricsBar({ websiteId, dashUrl=null }) {
  const dispatch = useDispatch();
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate, modified } = dateRange;
  const {
    query: { url, referrer, os, browser, device, country, region, city }
  } = usePageQuery();
  const [format, setFormat] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const payload = {
      startAt: +startDate,
      endAt: +endDate,
      url: dashUrl ? dashUrl : url,
      referrer,
      os,
      browser,
      device,
      country,
      region,
      city
    }
    dispatch(getWebsiteStats(payload)).then(res => {
      if (res?.payload?.data) {
        setError(false);
        setData(res.payload.data);
      } else {
        setError(true)
      }
      setIsLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modified]);

  const formatFunc = format
    ? n => (n >= 0 ? formatLongNumber(n) : `-${formatLongNumber(Math.abs(n))}`)
    : formatNumber;

  function handleSetFormat() {
    setFormat(state => !state);
  }

  const { pageviews, uniques, bounces, totaltime } = data || {};
  const num = Math.min(data && uniques.value, data && bounces.value);
  const diffs = data && {
    pageviews: pageviews.value - pageviews.change,
    uniques: uniques.value - uniques.change,
    bounces: bounces.value - bounces.change,
    totaltime: totaltime.value - totaltime.change,
  };

  return (
    <div className={styles.bar} onClick={handleSetFormat}>
      {isLoading && <Loading icon="dots" />}
      {error && <ErrorMessage />}
      {data && !error && !isLoading && (
        <>
          <MetricCard
            className={styles.card}
            label="Views"
            value={pageviews.value}
            change={pageviews.change}
            format={formatFunc}
          />
          <MetricCard
            className={styles.card}
            label="Visitors"
            value={uniques.value}
            change={uniques.change}
            format={formatFunc}
          />
          <MetricCard
            className={styles.card}
            label="Bounce rate"
            value={uniques.value ? (num / uniques.value) * 100 : 0}
            change={
              uniques.value && uniques.change
                ? (num / uniques.value) * 100 -
                (Math.min(diffs.uniques, diffs.bounces) / diffs.uniques) * 100 || 0
                : 0
            }
            format={n => Number(n).toFixed(0) + '%'}
            reverseColors
          />
          <MetricCard
            className={styles.card}
            label="Average visit time"
            value={
              totaltime.value && pageviews.value
                ? totaltime.value / (pageviews.value - bounces.value)
                : 0
            }
            change={
              totaltime.value && pageviews.value
                ? (diffs.totaltime / (diffs.pageviews - diffs.bounces) -
                  totaltime.value / (pageviews.value - bounces.value)) *
                -1 || 0
                : 0
            }
            format={n => `${n < 0 ? '-' : ''}${formatShortTime(Math.abs(~~n), ['m', 's'], ' ')}`}
          />
        </>
      )}
    </div>
  );
}

export default MetricsBar;
