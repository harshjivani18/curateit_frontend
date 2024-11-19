import FilterLink from '../common/FilterLink';
import MetricsTable from '../metrics/MetricsTable';
import { BROWSERS } from '../../../lib/constants';
import useMessages from '../../../hooks/useMessages';

export function BrowsersTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  function renderLink({ x: browser }) {
    const key = Object.keys(BROWSERS).find(key => BROWSERS[key] === browser);
    return <FilterLink id="browser" value={browser} label={BROWSERS[browser] || browser}>
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/umami/browsers/${key || 'unknown'}.png`}
          alt={browser}
          width={16}
          height={16}
        />
    </FilterLink>;
  }

  return (
    <MetricsTable
      {...props}
      title={labels.browsers}
      type="browser"
      metric={labels.visitors}
      websiteId={websiteId}
      renderLabel={renderLink}
      dashUrl={dashUrl}
    />
  );
}

export default BrowsersTable;
