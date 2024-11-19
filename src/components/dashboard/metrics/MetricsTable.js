import { useEffect, useMemo, useState } from 'react';
import { Loading, Icon, Text, Button } from 'react-basics';
import firstBy from 'thenby';
import classNames from 'classnames';
import { percentFilter } from '../../../lib/filters';
import ErrorMessage from '../common/ErrorMessage';
import DataTable from './DataTable';
import Icons from '../icons';
import useMessages from '../../../hooks/useMessages';
import styles from './MetricsTable.module.css';
import useDateRange from '../../../hooks/useDateRange';
import { getWebsiteMetrics, getWebsiteStats } from '../../../actions/analytics';
import { useDispatch } from 'react-redux';
import usePageQuery from '../../../hooks/usePageQuery';
import session from '../../../utils/session';

export function MetricsTable({
  websiteId,
  type,
  className,
  dataFilter,
  filterOptions,
  limit,
  onDataLoad,
  delay = null,
  dashUrl = null,
  ...props
  
}) {
  const dispatch = useDispatch();
  const { labels } = useMessages();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  // const [{ startDate, endDate, modified }] = useDateRange(websiteId);
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate, modified } = dateRange;

  const {
    resolveUrl,
    query: { url, referrer, os, browser, device, country, region, city }
  } = usePageQuery();


  const fecthData = async (type) => {
    setIsLoading(true)
    const payload = {
      type,
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

    if (type === "os") {
      let osData = [];
      const newPayloadForW10 = { ...payload, os: "Windows 10" }
      dispatch(getWebsiteStats(newPayloadForW10)).then(res => {
        setError(false)
        if (res?.payload?.data) {
          const windowObj = {
            x: "Windows 10",
            y: res?.payload?.data?.uniques?.value || 0
          }
          osData.push(windowObj)
        }

        const newPayloadForMac = { ...payload, os: "MAC OS" }
        dispatch(getWebsiteStats(newPayloadForMac)).then(res => {
          if (res?.payload?.data) {
            const macObj = {
              x: "Mac OS",
              y: res?.payload?.data?.uniques?.value || 0
            }
            osData.push(macObj)
          }

          const newPayloadForLinux = { ...payload, os: "Linux" }
          dispatch(getWebsiteStats(newPayloadForLinux)).then(res => {
            if (res?.payload?.data) {
              const linuxObj = {
                x: "Linux",
                y: res?.payload?.data?.uniques?.value || 0
              }
              osData.push(linuxObj)
            }
            setData(osData);
            setIsLoading(false)
          })
        })
      })

    } else if (type === "browser") {
      let finalData = [];
      const chromePayload = { ...payload, browser: "chrome" }
      dispatch(getWebsiteStats(chromePayload)).then(res => {
        setError(false)
        if (res?.payload?.data) {
          finalData.push({
            x: "Chrome",
            y: res?.payload?.data?.uniques?.value || 0
          })
        }

        const criosPayload = { ...payload, browser: "crios" }
        dispatch(getWebsiteStats(criosPayload)).then(res => {
          if (res?.payload?.data) {
            finalData.push({
              x: "Chrome (iOS)",
              y: res?.payload?.data?.uniques?.value || 0
            })
          }

          const edgePayload = { ...payload, browser: "edge-chromium" }
          dispatch(getWebsiteStats(edgePayload)).then(res => {
            if (res?.payload?.data) {
              finalData.push({
                x: "Edge (Chromium)",
                y: res?.payload?.data?.uniques?.value || 0
              })
            }

            const firefoxPayload = { ...payload, browser: "firefox" }
            dispatch(getWebsiteStats(firefoxPayload)).then(res => {
              if (res?.payload?.data) {
                finalData.push({
                  x: "Firefox",
                  y: res?.payload?.data?.uniques?.value || 0
                })
              }

              const iOsPayload = { ...payload, browser: "ios" }
              dispatch(getWebsiteStats(iOsPayload)).then(res => {
                if (res?.payload?.data) {
                  finalData.push({
                    x: "iOS",
                    y: res?.payload?.data?.uniques?.value || 0
                  })
                }

                const safariPayload = { ...payload, browser: "safari" }
                dispatch(getWebsiteStats(safariPayload)).then(res => {
                  if (res?.payload?.data) {
                    finalData.push({
                      x: "Safari",
                      y: res?.payload?.data?.uniques?.value || 0
                    })
                  }

                  const yandexPayload = { ...payload, browser: "yandexbrowser" }
                  dispatch(getWebsiteStats(yandexPayload)).then(res => {
                    if (res?.payload?.data) {
                      finalData.push({
                        x: "Yandex",
                        y: res?.payload?.data?.uniques?.value || 0
                      })
                    }

                    setData(finalData);
                    setIsLoading(false)
                  })
                })

              })

            })

          })
        })
      })
    } else if (type === "device"){
      let finalData = [];
      const laptopPayload = { ...payload, device: "laptop" }
      dispatch(getWebsiteStats(laptopPayload)).then(res => {
        setError(false)
        if (res?.payload?.data) {
          finalData.push({
            x: "laptop",
            y: res?.payload?.data?.uniques?.value || 0
          })
        }

        const mobilePayload = { ...payload, device: "mobile" }
        dispatch(getWebsiteStats(mobilePayload)).then(res => {
          if (res?.payload?.data) {
            finalData.push({
              x: "mobile",
              y: res?.payload?.data?.uniques?.value || 0
            })
          }

          const desktopPayload = { ...payload, device: "desktop" }
          dispatch(getWebsiteStats(desktopPayload)).then(res => {
            if (res?.payload?.data) {
              finalData.push({
                x: "desktop",
                y: res?.payload?.data?.uniques?.value || 0
              })
            }

            const tabletPayload = { ...payload, device: "tablet" }
            dispatch(getWebsiteStats(tabletPayload)).then(res => {
              if (res?.payload?.data) {
                finalData.push({
                  x: "tablet",
                  y: res?.payload?.data?.uniques?.value || 0
                })
              }

              setData(finalData);
              setIsLoading(false)

            })

          })

        })
      })
    } else {

      dispatch(getWebsiteMetrics(payload)).then(res => {
        setIsLoading(true)
        if (res?.payload?.data) {
          setError(false)
          if (type === "url") {
            const myUrls = [];
            res.payload.data.map(url => {
              if (url.x.includes(session.username)) {
                myUrls.push(url)
              }
              return true
            })
            setData(myUrls);
          } else {
            setData(res?.payload?.data)
          }
        } else {
          setError(true)
        }
        setIsLoading(false)
      })
    }


  }

  useEffect(() => {
    if (type === "url") {
      fecthData("url");
    } else if (type === "title") {
      fecthData("title");
    } else if (type === "referrer") {
      fecthData("referrer");
    } else if (type === "browser") {
      fecthData("browser");
    } else if (type === "os") {
      fecthData("os");
    } else if (type === "device") {
      fecthData("device");
    } else if (type === "country") {
      fecthData("country");
    } else if (type === "event") {
      fecthData("event");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, modified])

  const filteredData = useMemo(() => {
    if (data) {
      let items = percentFilter(dataFilter ? dataFilter(data, filterOptions) : data);
      if (limit) {
        items = items.filter((e, i) => i < limit);
      }
      if (filterOptions?.sort === false) {
        return items;
      }
      return items.sort(firstBy('y', -1).thenBy('x'));
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, dataFilter, filterOptions, limit]);

  const dir = null;

  return (
    <div className={classNames(styles.container, className)}>
      {!data && isLoading && <Loading icon="dots" />}
      {error && <ErrorMessage />}
      {data && !error && <DataTable {...props} data={filteredData} className={className} />}
      <div className={styles.footer}>
        {data && !error && limit && dashUrl === null && (
          <a href={resolveUrl({ view: type })} onClick={() => resolveUrl({ view: type })}>
            <Button variant="quiet">
              <Text>{labels.more?.defaultMessage}</Text>
              <Icon size="sm" rotate={dir === 'rtl' ? 180 : 0}>
                <Icons.ArrowRight />
              </Icon>
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default MetricsTable;
