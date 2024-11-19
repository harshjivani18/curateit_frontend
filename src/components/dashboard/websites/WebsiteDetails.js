import { useEffect, useState } from 'react';
import { Loading } from 'react-basics';
import Page from '../layout/Page';
import WebsiteChart from '../metrics/WebsiteChart';
import WebsiteTableView from './WebsiteTableView';
import { useDispatch } from 'react-redux';
import { authorizedUmami, getWebsite } from '../../../actions/analytics';
import { DEFAULT_ANIMATION_DURATION } from '../../../lib/constants';
import WebsiteMenuView from './WebsiteMenuView';
import usePageQuery from '../../../hooks/usePageQuery';

export default function WebsiteDetails({ websiteId, dashUrl = null, showClearFilter=true, isPagePadding=true }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartLoaded, setChartLoaded] = useState(true);
  const [websiteData, setWebsiteData] = useState({});
  const {
    query: { view },
  } = usePageQuery();

  useEffect(() => {
    dispatch(authorizedUmami()).then(res => {
      dispatch(getWebsite()).then(res => {
        if (res?.payload?.data) {
          setError(false);
          setWebsiteData(res?.payload?.data);
        } else {
          setError(true);
        }
        setIsLoading(false);
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleDataLoad() {
    if (!chartLoaded) {
      setTimeout(() => setChartLoaded(true), DEFAULT_ANIMATION_DURATION);
    }
  }

  return (
    <Page loading={isLoading} error={error} isPagePadding={isPagePadding}>
      <WebsiteChart
        websiteId={websiteId}
        name={websiteData?.name}
        domain={websiteData?.domain}
        onDataLoad={handleDataLoad}
        showLink={false}
        stickyHeader={true}
        dashUrl={dashUrl}
        showClearFilter={showClearFilter}
      />
      {!chartLoaded && <Loading icon="dots" style={{ minHeight: 300 }} />}
      {chartLoaded && (
        <>
          {!view && <WebsiteTableView websiteId={websiteId} showClearFilter={showClearFilter} dashUrl={dashUrl} />}
          {view && <WebsiteMenuView websiteId={websiteId} />}
        </>
      )}
    </Page>
  );
}
