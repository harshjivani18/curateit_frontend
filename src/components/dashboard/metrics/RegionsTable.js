import MetricsTable from './MetricsTable';
import { emptyFilter } from '../../../lib/filters';
import FilterLink from '../common/FilterLink';
import useMessages from '../../../hooks/useMessages';
import useCountryNames from '../../../hooks/useCountryNames';
import regions from '../assets/iso-3166-2.json';

export function RegionsTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();
  const countryNames = useCountryNames();

  const renderLabel = x => {
    return regions[x] ? `${regions[x]}, ${countryNames[x.split('-')[0]]}` : x;
  };

  const renderLink = ({ x: code }) => {
    return (
      <FilterLink id="region" className='en-US' value={code} label={renderLabel(code)}>
        {/* <img src={`/images/flags/${code?.split('-')?.[0]?.toLowerCase() || 'xx'}.png`} alt={code} /> */}
        <img src={`https://curateit-files.s3.amazonaws.com/analytics/flags/${code?.split('-')?.[0]?.toLowerCase() || 'xx'}.png`} alt={code} />
      </FilterLink>
    );
  };

  return (
    <MetricsTable
      {...props}
      dashUrl={dashUrl}
      title={labels.regions}
      type="region"
      metric={labels.visitors}
      websiteId={websiteId}
      dataFilter={emptyFilter}
      renderLabel={renderLink}
    />
  );
}

export default RegionsTable;
